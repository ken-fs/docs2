"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { DEFAULT_HTML_OPTIONS } from "@document-tools/converters/types";

/**
 * Markdown → PDF，靠浏览器打印。
 *
 * 为什么不引 pdf 库（jsPDF / pdf-lib）：那类库要么自己排版中文（字体子集化，
 * 几 MB），要么把页面画成图片（选不中字、搜索不到、打印店不收）。而每个用户
 * 手里已经有一个排版正确、带字体、带分页的 PDF 生成器 —— 浏览器的打印对话框，
 * 里面的「存储为 PDF」就是目标。我们只负责把 Markdown 排成一份干净的打印稿。
 *
 * 预览 iframe 用 sandbox=""（跟 converter 一致，第二道墙），但打印**不能**在
 * 那个 iframe 里做：sandbox 拿不到 print 权限。所以点按钮时另起一个同源、
 * 无 sandbox 的隐藏 iframe，把同一份已净化 HTML 写进去再 print()，印完拆掉。
 *
 * @page 和分页规则写在打印样式里，而不是复用页面样式：PDF 的页边距、标题不许
 * 出现在页尾、表格不许从中间断行，这些只有打印上下文里才生效。
 */

type Labels = {
  button: string;
  hint: string;
};

/** 打印稿的样式。只在打印时生效的东西（@page、break-*）都在这儿。 */
const PRINT_CSS = `
  @page { size: A4; margin: 18mm 16mm; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body {
    margin: 0;
    font: 11pt/1.55 -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #111;
    /* 预览里也照打印宽度排，所见即所印 */
    max-width: 178mm;
    margin-inline: auto;
    padding: 8mm 0;
  }
  h1, h2, h3, h4 { line-height: 1.25; margin: 1.4em 0 0.5em; break-after: avoid; }
  h1 { font-size: 1.9em; margin-top: 0; }
  h2 { font-size: 1.4em; }
  h3 { font-size: 1.15em; }
  p, ul, ol, blockquote, pre, table { break-inside: avoid; }
  p { margin: 0.7em 0; }
  ul, ol { margin: 0.7em 0; padding-left: 1.4em; }
  li { margin: 0.2em 0; }
  blockquote { margin: 1em 0; padding: 0.2em 0 0.2em 1em; border-left: 3px solid #ccc; color: #333; }
  code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.92em; }
  pre {
    padding: 0.7em 0.9em;
    background: #f5f5f5;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    overflow-x: auto;
    /* 长代码行宁可换行也不要横向溢出成半页白 */
    white-space: pre-wrap;
    word-break: break-word;
  }
  pre code { font-size: 0.88em; }
  table { width: 100%; border-collapse: collapse; margin: 0.9em 0; font-size: 0.95em; }
  th, td { border: 1px solid #d4d4d4; padding: 0.35em 0.5em; text-align: left; vertical-align: top; }
  th { background: #f2f2f2; }
  img { max-width: 100%; height: auto; }
  a { color: #0b57d0; text-decoration: underline; }
  hr { border: 0; border-top: 1px solid #ddd; margin: 1.6em 0; }
`;

/** 把已净化的 HTML 片段包成一份可打印文档。 */
function printDocument(fragment: string, lang: string, title: string): string {
  const safeTitle = title.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c] as string);
  return `<!DOCTYPE html>
<html lang="${lang.replace(/[^a-zA-Z-]/g, "")}">
<head>
<meta charset="utf-8">
<title>${safeTitle}</title>
<style>${PRINT_CSS}</style>
</head>
<body>${fragment}</body>
</html>`;
}

export function PrintTool({
  labels,
  lang,
  placeholder,
  fileLabel,
  clearLabel,
  previewTitle,
  emptyLabel,
}: {
  labels: Labels;
  lang: string;
  /** 粘贴框的占位文案（借 converter 的 markdown 占位） */
  placeholder: string;
  fileLabel: string;
  clearLabel: string;
  previewTitle: string;
  emptyLabel: string;
}) {
  const [md, setMd] = useState("");
  const [preview, setPreview] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 卸载时清掉未触发的重排，免得 setState 落在已卸载的组件上
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  /** 输入变了：立即更新正文，预览延后重排（每敲一个字重排整份文档没必要） */
  function update(next: string) {
    setMd(next);
    if (timer.current) clearTimeout(timer.current);
    if (!next.trim()) {
      setPreview("");
      return;
    }
    timer.current = setTimeout(() => {
      void (async () => {
        try {
          const { convertMarkdown } = await import("@document-tools/converters/markdown-to-html");
          const result = convertMarkdown(next, { ...DEFAULT_HTML_OPTIONS, mode: "document", lang }, "Document");
          setPreview(result.html);
        } catch {
          setPreview("");
        }
      })();
    }, 220);
  }

  async function openFile(file: File | undefined) {
    if (!file) return;
    update(await file.text());
    setError("");
    if (fileRef.current) fileRef.current.value = "";
  }

  async function printPdf() {
    if (!md.trim()) return;
    setBusy(true);
    setError("");
    try {
      const { convertMarkdown } = await import("@document-tools/converters/markdown-to-html");
      // 片段模式：不带壳，壳和打印样式由 printDocument 自己给
      const result = convertMarkdown(md, { ...DEFAULT_HTML_OPTIONS, mode: "fragment", lang }, "Document");
      const title = (result.html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "")
        .replace(/<[^>]*>/g, "")
        .trim() || "Document";

      const frame = document.createElement("iframe");
      frame.setAttribute("aria-hidden", "true");
      frame.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden";
      document.body.appendChild(frame);
      const doc = frame.contentDocument;
      if (!doc) throw new Error("no frame");
      doc.open();
      doc.write(printDocument(result.html, lang, title));
      doc.close();
      // 图片多数是内联 base64，但 Markdown 里可以写远程图。等它们到位再印，
      // 否则打印出来是一堆空框；最多等 1.5 秒，宁可少一张图也不要卡住。
      await new Promise<void>((resolve) => {
        const started = Date.now();
        const tick = () => {
          const imgs = Array.from(frame.contentDocument?.images ?? []);
          if (imgs.every((img) => img.complete) || Date.now() - started > 1500) resolve();
          else setTimeout(tick, 80);
        };
        tick();
      });
      // 拆 iframe 留够时间：有的浏览器打印对话框是异步的
      frame.contentWindow?.focus();
      frame.contentWindow?.print();
      setTimeout(() => frame.remove(), 60_000);
    } catch (e) {
      setError(String((e as Error)?.message ?? e).slice(0, 120));
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="border border-grid-firm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-grid-firm bg-paper-deep px-3 py-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-graphite-faint">
          {previewTitle}
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            accept=".md,.markdown,.txt,.mdown,text/markdown,text/plain"
            className="sr-only"
            onChange={(e) => void openFile(e.target.files?.[0])}
          />
          <Button tone="ghost" size="sm" onClick={() => fileRef.current?.click()}>
            <Icon icon="ph:folder-open-bold" />
            {fileLabel}
          </Button>
          <Button
            tone="bare"
            size="sm"
            disabled={!md}
            onClick={() => {
              update("");
              setError("");
            }}
          >
            {clearLabel}
          </Button>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-2">
        <textarea
          value={md}
          onChange={(e) => update(e.target.value)}
          spellCheck={false}
          placeholder={placeholder}
          className="min-h-[26rem] w-full resize-y border-0 border-b border-grid-firm bg-paper p-4 font-mono text-[13px] leading-relaxed text-ink outline-none placeholder:text-graphite-faint lg:min-h-[38rem] lg:border-b-0 lg:border-r"
        />
        {preview ? (
          <iframe
            title={previewTitle}
            sandbox=""
            referrerPolicy="no-referrer"
            srcDoc={preview}
            className="h-[26rem] w-full border-0 bg-white lg:h-[38rem]"
          />
        ) : (
          <div className="flex h-[26rem] items-center px-6 text-sm text-graphite-faint lg:h-[38rem]">
            {emptyLabel}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-grid-firm px-3 py-3">
        <Button onClick={() => void printPdf()} disabled={!md.trim() || busy}>
          <Icon icon="ph:file-pdf-bold" />
          {labels.button}
        </Button>
        <p className="text-[12px] leading-snug text-graphite-soft">{labels.hint}</p>
        {error ? <p className="text-[12px] text-red-700">{error}</p> : null}
      </div>
    </section>
  );
}
