"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { bytes as fmtBytes, count, type Dictionary } from "@/i18n/types";
import {
  DEFAULT_HTML_OPTIONS,
  EncryptedError,
  LegacyDocError,
  NotADocxError,
  TooLargeError,
  WrongFormatError,
  ZipBombError,
  type HtmlOptions,
  type HtmlResult,
  type Workbook,
} from "@document-tools/converters/types";
import {
  acceptExtensions,
  acceptSummary,
  extensionOf,
  SIBLING_EXTENSIONS,
  type ToolInput,
} from "@/content/tools";
import { cn } from "@/lib/utils";

type Job = {
  id: string;
  name: string;
  size: number;
  status: "waiting" | "chewing" | "done" | "failed";
  result?: HtmlResult;
  error?: string;
  legacy?: boolean;
  /** 拖错文件时「去这一页」的链接，跟着 error 一起显示。 */
  hint?: { label: string; href: string };
  /** XLSX：解析出来的工作簿留着，用户换选表时不用重读文件。 */
  book?: Workbook;
  /**
   * 输入留一份，改设置时能就地重跑。
   *
   * File 引用在页面生命周期内一直可读（浏览器只是握着一个磁盘偏移），
   * 所以不需要把文件内容抄进内存。
   */
  file?: File;
  text?: string;
};

const MAX_BYTES = 25 * 1024 * 1024;

/**
 * 这些错误类自己的话说得比通用文案清楚 —— 哪种格式、为什么拒绝、下一步该做
 * 什么。通用的「文件无法读取」会让用户反复重试一个注定失败的文件。
 *
 * 这站没有 PDF 页，所以没有 NoTextLayerError。
 */
const SPEAKS_FOR_ITSELF = [
  EncryptedError,
  LegacyDocError,
  NotADocxError,
  TooLargeError,
  WrongFormatError,
  ZipBombError,
];

function message(err: unknown, fallback: string) {
  return SPEAKS_FOR_ITSELF.some((E) => err instanceof E)
    ? (err as Error).message
    : fallback;
}

/** 输入名 → 产物文件名。粘贴的内容没有文件名，所以要压成能当文件名的样子。 */
function htmlName(name: string) {
  const base = name
    .replace(/\.(docx?|md|markdown|mdown|html?|csv|tsv|txt|text|xlsx)$/i, "")
    .replace(/[/\\?%*:|"<>]/g, "-");
  return `${base.trim() || "document"}.html`;
}

function save(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

type T = Dictionary["converter"];

/** 失败卡片里那条「去这一页」链接的样式，站内站外共用。 */
const HINT_LINK =
  "mt-1.5 inline-block font-mono text-[11px] text-prussian underline decoration-dotted underline-offset-4 transition-colors hover:text-prussian-deep";

/**
 * 哪个引擎露哪些旋钮。
 *
 * 每个引擎能受影响的选项本来就不一样：CSV 里没有图片，DOCX 里没有「裸 URL
 * 变链接」（Word 自己就带超链接），表格页没有换行开关。全都摆出来会让用户
 * 以为调了没用的开关。
 *
 * mode 和 pretty 每个引擎都有 —— 那两个是关于「产物长什么样」的，
 * 跟输入格式无关。
 */
const KNOBS = {
  markdown: { linkify: true, lineBreaks: true },
  docx: { images: true },
  richhtml: {},
  text: { linkify: true, lineBreaks: true },
  csv: { responsive: true, header: true, delimiter: true },
  xlsx: { responsive: true, header: true },
} as const satisfies Record<
  ToolInput["engine"],
  Partial<
    Record<"linkify" | "lineBreaks" | "images" | "responsive" | "header" | "delimiter", true>
  >
>;

export function Converter({
  t,
  input,
  lang,
  elsewhere,
  sibling,
}: {
  t: T;
  input: ToolInput;
  /** 整页模式产物的 <html lang>，跟着当前站点语言走。 */
  lang: string;
  /**
   * 扩展名 → 本站哪一页收它（页名 + 链接）。查不到 = 全站都不收。
   * 由 ToolShell 算好传进来，因为路由和页名都在那一层；而且它是
   * Server Component，只能传数据不能传函数。
   */
  elsewhere: Record<string, { label: string; href: string }>;
  /**
   * 全站都不收时链到哪儿 —— 兄弟站 docstomd。文案取 chrome.siblingCta
   * （"docstomd.com"），因为那是站外链接，不属于 converter 的词汇表。
   */
  sibling: { label: string; href: string };
}) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [opts, setOpts] = useState<HtmlOptions>({
    ...DEFAULT_HTML_OPTIONS,
    lang,
  });
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<"source" | "preview">("source");
  const [typed, setTyped] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);

  const active = jobs.find((j) => j.id === activeId) ?? null;
  const done = jobs.filter((j) => j.status === "done");
  const knobs: Partial<Record<string, true>> = KNOBS[input.engine];

  /**
   * 一段输入 → 一段 HTML。按页面配置的 engine 分派。
   *
   * 每个 engine 都是动态 import：mammoth、markdown-it、read-excel-file 加起来
   * 好几 MB，而一次访问只会用到其中一个。首页更是不该把六个都加载 ——
   * 方案 §8 明确要求首页不得加载全部解析库。
   *
   * 六条路里只有 docx 和 xlsx 要 File（二进制），其余四条吃字符串，
   * 所以文件路径先 file.text() 再进同一个入口。
   */
  const convert = useCallback(
    async (
      src: { file?: File; text?: string },
      options: HtmlOptions,
      name: string,
    ): Promise<HtmlResult & { book?: Workbook }> => {
      switch (input.engine) {
        case "docx": {
          if (!src.file) throw new Error("no file");
          const { convertDocxToHtml } = await import(
            "@document-tools/converters/docx-to-html"
          );
          return convertDocxToHtml(src.file, options);
        }
        case "xlsx": {
          if (!src.file) throw new Error("no file");
          const { readWorkbook, renderSheetsToHtml } = await import(
            "@document-tools/converters/excel-to-html"
          );
          const book = await readWorkbook(src.file);
          // 默认只转第一张表。一个工作簿常有十几张，全转出来没人看得下去，
          // 而且很容易撞上十万格的上限。
          return { ...renderSheetsToHtml(book, [0], options, name), book };
        }
        case "markdown": {
          const { convertMarkdown } = await import(
            "@document-tools/converters/markdown-to-html"
          );
          return convertMarkdown(src.text ?? (await src.file!.text()), options, name);
        }
        case "richhtml": {
          const { cleanHtml } = await import(
            "@document-tools/converters/clean-html"
          );
          return cleanHtml(src.text ?? (await src.file!.text()), options, name);
        }
        case "text": {
          const { convertText } = await import(
            "@document-tools/converters/text-to-html"
          );
          return convertText(src.text ?? (await src.file!.text()), options, name);
        }
        case "csv": {
          const { convertCsvToHtml } = await import(
            "@document-tools/converters/csv-to-html"
          );
          return convertCsvToHtml(src.text ?? (await src.file!.text()), options, name);
        }
      }
    },
    [input.engine],
  );

  const run = useCallback(
    async (files: File[], options: HtmlOptions, t: T) => {
      const fresh: Job[] = files.map((f, i) => ({
        id: `${f.name}-${f.size}-${i}-${jobs.length}`,
        name: f.name,
        size: f.size,
        status: "waiting",
        file: f,
      }));

      setJobs((prev) => [...prev, ...fresh]);
      setActiveId((cur) => cur ?? fresh[0]?.id ?? null);

      for (let i = 0; i < files.length; i++) {
        const job = fresh[i];
        const file = files[i];

        /*
         * 扩展名预检。放在大小检查前面 —— 格式不对就没必要谈大小。
         *
         * 以前没有这一步：拖一个 PDF 进 Markdown 页，转换器会把二进制当文本
         * 转出 <p>%PDF-1.7<br>… 然后标成「成功」，还生成 report.pdf.html 让人
         * 下载。用户拿到的是看着像成功的垃圾，比报错糟得多。
         *
         * 只有扩展名对不上才挡。没有扩展名的一律放过去让转换器试 —— 用户
         * 可能真的有个没后缀的 Markdown，而这一页的转换器本来就能读它。
         * accept 只管系统选择器的过滤器，挡不住从 Finder 拖进来的文件，
         * 所以这道检查必须在 JS 这边再做一遍。
         *
         * 三种去处，按「离用户最近」排：本站有专门页 → 只有兄弟站收 →
         * 谁都不收。最后那种不给链接 —— 无处可去时递一个链接是骗人白跑一趟。
         */
        const ext = extensionOf(file.name);
        if (ext && !acceptExtensions(input.accept).includes(ext)) {
          const other = elsewhere[ext];
          const onSibling = SIBLING_EXTENSIONS.includes(ext);
          setJobs((prev) =>
            prev.map((j) =>
              j.id === job.id
                ? {
                    ...j,
                    status: "failed",
                    error: (other
                      ? t.wrongType
                      : onSibling
                        ? t.wrongTypeElsewhere
                        : t.wrongTypeNowhere
                    ).replaceAll("{ext}", ext),
                    hint: other ?? (onSibling ? sibling : undefined),
                  }
                : j,
            ),
          );
          continue;
        }

        if (file.size > MAX_BYTES) {
          setJobs((prev) =>
            prev.map((j) =>
              j.id === job.id ? { ...j, status: "failed", error: t.tooBig } : j,
            ),
          );
          continue;
        }

        setJobs((prev) =>
          prev.map((j) => (j.id === job.id ? { ...j, status: "chewing" } : j)),
        );

        try {
          const result = await convert({ file }, options, file.name);
          setJobs((prev) =>
            prev.map((j) =>
              j.id === job.id
                ? { ...j, status: "done", result, book: result.book }
                : j,
            ),
          );
          setActiveId((cur) => cur ?? job.id);
        } catch (err) {
          setJobs((prev) =>
            prev.map((j) =>
              j.id === job.id
                ? {
                    ...j,
                    status: "failed",
                    error: message(err, t.readFail),
                    legacy: err instanceof LegacyDocError,
                  }
                : j,
            ),
          );
        }
      }
    },
    [convert, jobs.length, input.accept, elsewhere, sibling],
  );

  /**
   * 直接给的一段文本 —— 贴进文本框的 Markdown / HTML / 纯文本 / CSV，
   * 或者从 Google Docs 复制过来的富文本。
   *
   * 剪贴板里的 HTML 来自任意网页，不比上传的文件可信：页面完全可以埋一个
   * onmouseover 或 javascript: 链接等着被复制走。所以这条路和文件路走的是
   * 同一个转换器，DOMPurify 一样跑（方案 §13）。
   */
  const runText = useCallback(
    async (text: string, name: string, options: HtmlOptions, t: T) => {
      const job: Job = {
        id: `text-${text.length}-${jobs.length}`,
        name,
        size: text.length,
        status: "chewing",
        text,
      };
      setJobs((prev) => [...prev, job]);

      try {
        const result = await convert({ text }, options, name);
        setJobs((prev) =>
          prev.map((j) => (j.id === job.id ? { ...j, status: "done", result } : j)),
        );
        setActiveId(job.id);
      } catch (err) {
        setJobs((prev) =>
          prev.map((j) =>
            j.id === job.id
              ? { ...j, status: "failed", error: message(err, t.readFail) }
              : j,
          ),
        );
      }
    },
    [convert, jobs.length],
  );

  /** 换选工作表：拿缓存的 book 重算，不重读文件。 */
  const repick = useCallback(
    async (job: Job, picked: number[], options: HtmlOptions, t: T) => {
      if (!job.book) return;
      try {
        const { renderSheetsToHtml } = await import(
          "@document-tools/converters/excel-to-html"
        );
        const result = renderSheetsToHtml(job.book, picked, options, job.name);
        setJobs((prev) =>
          prev.map((j) => (j.id === job.id ? { ...j, status: "done", result } : j)),
        );
      } catch (err) {
        setJobs((prev) =>
          prev.map((j) =>
            j.id === job.id
              ? { ...j, status: "failed", error: message(err, t.readFail) }
              : j,
          ),
        );
      }
    },
    [],
  );

  /**
   * 改了设置后就地重跑一个任务。
   *
   * 有三种来源：缓存的工作簿（换选表最快）、原始文本、原始 File。三种都能
   * 重跑，所以「改了设置请重新上传」那句话一次都不用说。
   */
  const redo = useCallback(
    async (job: Job, options: HtmlOptions, t: T) => {
      if (job.book) {
        void repick(job, job.result?.picked ?? [0], options, t);
        return;
      }
      if (job.text === undefined && !job.file) return;

      setJobs((prev) =>
        prev.map((j) => (j.id === job.id ? { ...j, status: "chewing" } : j)),
      );

      try {
        const result = await convert(
          { file: job.file, text: job.text },
          options,
          job.name,
        );
        setJobs((prev) =>
          prev.map((j) => (j.id === job.id ? { ...j, status: "done", result } : j)),
        );
      } catch (err) {
        setJobs((prev) =>
          prev.map((j) =>
            j.id === job.id
              ? { ...j, status: "failed", error: message(err, t.readFail) }
              : j,
          ),
        );
      }
    },
    [convert, repick],
  );

  const pick = useCallback(
    (list: FileList | null) => {
      const files = Array.from(list ?? []);
      if (files.length) void run(files, opts, t);
    },
    [opts, run, t],
  );

  // 改设置后只重跑当前看着的这一个：批量转了二十个文件时，动一下旋钮
  // 就把二十份重解析一遍会卡住整个页面。其余的用提示说明结果已过期。
  const [stale, setStale] = useState(false);
  const patch = (next: Partial<HtmlOptions>) => {
    const options = { ...opts, ...next };
    setOpts(options);
    if (active?.status === "done") void redo(active, options, t);
    if (done.some((j) => j.id !== active?.id)) setStale(true);
  };

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  // 支持整站粘贴：优先当文件，其次收剪贴板里的富文本
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      // 在文本框里粘贴是在填那个框，不该同时触发一次转换
      const el = e.target as HTMLElement | null;
      if (el?.tagName === "TEXTAREA" || el?.tagName === "INPUT") return;

      const files = Array.from(e.clipboardData?.files ?? []);
      if (files.length) {
        void run(files, opts, t);
        return;
      }

      // 从 Google Docs / Word 网页版复制过来的是 text/html，没有文件。
      // 这是 google-docs-to-html 那页真正要处理的输入（方案 §6.3：
      // 不用 Google API、不需要登录）。
      if (!input.rich) return;
      const html = e.clipboardData?.getData("text/html");
      if (html?.trim()) void runText(html, t.pastedName, opts, t);
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [input.rich, opts, run, runText, t]);

  const copy = async () => {
    if (!active?.result) return;
    await navigator.clipboard.writeText(active.result.html);
    setCopied(true);
  };

  const downloadOne = () => {
    if (!active?.result) return;
    save(
      new Blob([active.result.html], { type: "text/html;charset=utf-8" }),
      htmlName(active.name),
    );
  };

  /**
   * HTML + images/ 打成一个 ZIP。方案 §6.2 的「下载 HTML 与图片 ZIP」。
   *
   * 只在抽图模式下有意义：内嵌模式的图片已经在 HTML 里了，再打包就是
   * 一个只装了一个文件的压缩包。
   */
  const downloadWithAssets = async () => {
    if (!active?.result?.assets?.length) return;
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    zip.file(htmlName(active.name), active.result.html);
    for (const asset of active.result.assets) {
      zip.file(asset.path, asset.bytes);
    }
    save(
      await zip.generateAsync({ type: "blob" }),
      htmlName(active.name).replace(/\.html$/, ".zip"),
    );
  };

  const downloadZip = async () => {
    // 打包下载是少数人才点的按钮，JSZip 别进首屏包
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    for (const j of done) {
      if (j.result) zip.file(htmlName(j.name), j.result.html);
    }
    save(await zip.generateAsync({ type: "blob" }), "html.zip");
  };

  return (
    <section id="convert" className="relative">
      {/* ── 投料口 ───────────────────────────────────────── */}
      <div
        onDragEnter={(e) => {
          e.preventDefault();
          dragDepth.current++;
          setDragging(true);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => {
          e.preventDefault();
          dragDepth.current--;
          if (dragDepth.current <= 0) setDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          dragDepth.current = 0;
          setDragging(false);
          pick(e.dataTransfer.files);
        }}
        className={cn(
          "relative border bg-sheet-deep/50 px-6 py-10 transition-all duration-200 ease-draft sm:px-10 sm:py-12",
          dragging
            ? "border-prussian bg-wash/60 shadow-[0_4px_0_0_var(--prussian-deep)]"
            : "border-dashed border-grid-firm hover:border-prussian/60",
        )}
      >
        {/* 图纸编号，纯装饰 */}
        <span
          aria-hidden
          className="absolute top-3 left-3 font-mono text-[10px] text-graphite-faint"
        >
          IN /
        </span>

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
          <div className="shrink-0">
            <Icon
              icon="ph:tray-arrow-down-duotone"
              className={cn(
                "h-14 w-14 transition-transform duration-200 ease-tick",
                dragging ? "scale-110 text-prussian" : "text-graphite-soft",
              )}
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-display text-2xl leading-tight text-graphite sm:text-3xl">
              {dragging ? t.dropActive : t.dropTitle}
            </p>
            <p className="mt-2 text-sm text-graphite-soft">{t.dropHint}</p>
            <p className="mt-1 font-mono text-xs text-graphite-faint">
              {acceptSummary(input.accept)} / {t.dropMeta}
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-2">
            <Button tone="prussian" onClick={() => inputRef.current?.click()}>
              <Icon icon="ph:folder-open-bold" />
              {t.pick}
            </Button>
            {jobs.length > 0 && (
              <Button
                tone="ghost"
                size="sm"
                onClick={() => {
                  setJobs([]);
                  setActiveId(null);
                  setStale(false);
                }}
              >
                {t.clear}
              </Button>
            )}
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept={input.accept}
          className="hidden"
          onChange={(e) => {
            pick(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {/* ── 文本输入 ─────────────────────────────────────── */}
      {input.paste !== "none" && (
        <div className="mt-5 border border-grid-firm bg-sheet px-5 py-4">
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-mono text-[11px] tracking-[0.18em] text-graphite-faint uppercase">
              {t.pasteHeading}
            </h2>
            <span className="font-mono text-[11px] text-graphite-faint">
              {typed.length > 0 && fmtBytes(typed.length)}
            </span>
          </div>
          {/* 富文本那页多一句话：得复制文档内容本身，不是复制文档链接。
              这是 Google Docs 用户最常踩的坑。 */}
          {input.rich && (
            <p className="mb-2 flex items-baseline gap-2 text-[13px] leading-relaxed text-graphite-soft">
              <Icon
                icon="ph:clipboard-text-bold"
                className="mt-[3px] h-3.5 w-3.5 shrink-0 text-graphite-faint"
              />
              {t.pasteRichHint}
            </p>
          )}
          <textarea
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            spellCheck={false}
            rows={6}
            placeholder={
              input.paste === "markdown"
                ? t.pastePlaceholderMarkdown
                : input.paste === "html"
                  ? t.pastePlaceholderHtml
                  : input.paste === "csv"
                    ? t.pastePlaceholderCsv
                    : t.pastePlaceholderText
            }
            className="w-full resize-y border border-grid-firm bg-sheet px-3 py-2 font-mono text-[13px] leading-relaxed text-graphite outline-none transition-colors placeholder:text-graphite-faint focus:border-prussian"
          />
          <div className="mt-2 flex items-center gap-2">
            <Button
              tone="prussian"
              size="sm"
              disabled={!typed.trim()}
              onClick={() => void runText(typed, t.typedName, opts, t)}
            >
              <Icon icon="ph:play-bold" />
              {t.pasteRun}
            </Button>
            {typed.length > 0 && (
              <Button tone="ghost" size="sm" onClick={() => setTyped("")}>
                {t.pasteClear}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* ── 输出旋钮 ─────────────────────────────────────── */}
      {/* 旋钮按引擎给：CSV 页面上没有「图片怎么处理」这回事，摆一个只会让人
          以为自己漏了什么。 */}
      <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-4 border border-grid-firm bg-sheet px-5 py-4">
        <span className="font-mono text-[11px] tracking-[0.18em] text-graphite-faint uppercase">
          {t.knobs}
        </span>

        {/* 片段 / 整页。方案 §6.1、§6.4 要求两种模式，而且这是这站最重要的
            一个选择 —— 贴进现有页面和存成独立文件，要的东西完全不同。 */}
        <Knob label={t.mode} hint={t.modeHint}>
          <Chip
            on={opts.mode === "fragment"}
            onClick={() => patch({ mode: "fragment" })}
          >
            {t.modeFragment}
          </Chip>
          <Chip
            on={opts.mode === "document"}
            onClick={() => patch({ mode: "document" })}
          >
            {t.modeDocument}
          </Chip>
        </Knob>

        <Knob label={t.pretty}>
          <Chip on={opts.pretty} onClick={() => patch({ pretty: true })}>
            {t.prettyOn}
          </Chip>
          <Chip on={!opts.pretty} onClick={() => patch({ pretty: false })}>
            {t.prettyOff}
          </Chip>
        </Knob>

        {knobs.responsive && (
          <Knob label={t.responsive}>
            <Chip on={opts.responsive} onClick={() => patch({ responsive: true })}>
              {t.responsiveOn}
            </Chip>
            <Chip on={!opts.responsive} onClick={() => patch({ responsive: false })}>
              {t.responsiveOff}
            </Chip>
          </Knob>
        )}

        {knobs.linkify && (
          <Knob label={t.linkify}>
            <Chip on={opts.linkify} onClick={() => patch({ linkify: true })}>
              {t.linkifyOn}
            </Chip>
            <Chip on={!opts.linkify} onClick={() => patch({ linkify: false })}>
              {t.linkifyOff}
            </Chip>
          </Knob>
        )}

        {knobs.lineBreaks && (
          <Knob label={t.lineBreaks}>
            <Chip on={opts.lineBreaks} onClick={() => patch({ lineBreaks: true })}>
              {t.lineBreaksOn}
            </Chip>
            <Chip on={!opts.lineBreaks} onClick={() => patch({ lineBreaks: false })}>
              {t.lineBreaksOff}
            </Chip>
          </Knob>
        )}

        {knobs.images && (
          <Knob label={t.images}>
            {(
              [
                ["inline", t.imageInline],
                ["extract", t.imageExtract],
                ["strip", t.imageStrip],
              ] as const
            ).map(([v, label]) => (
              <Chip key={v} on={opts.images === v} onClick={() => patch({ images: v })}>
                {label}
              </Chip>
            ))}
          </Knob>
        )}

        {knobs.header && (
          <Knob label={t.header}>
            <Chip
              on={opts.firstRowHeader}
              onClick={() => patch({ firstRowHeader: true })}
            >
              {t.headerFirstRow}
            </Chip>
            <Chip
              on={!opts.firstRowHeader}
              onClick={() => patch({ firstRowHeader: false })}
            >
              {t.headerNone}
            </Chip>
          </Knob>
        )}

        {knobs.delimiter && (
          <Knob label={t.delimiter}>
            {(
              [
                ["", t.delimiterAuto],
                [",", t.delimiterComma],
                [";", t.delimiterSemicolon],
                ["\t", t.delimiterTab],
                ["|", t.delimiterPipe],
              ] as const
            ).map(([v, label]) => (
              <Chip
                key={v || "auto"}
                on={opts.delimiter === v}
                onClick={() => patch({ delimiter: v })}
              >
                {label}
              </Chip>
            ))}
          </Knob>
        )}
      </div>

      {stale && (
        <p className="anim-plot mt-3 flex items-center gap-2 border-l-2 border-prussian bg-wash/45 py-2 pl-3 text-sm text-graphite-soft">
          <Icon icon="ph:arrow-counter-clockwise-bold" className="h-4 w-4" />
          {t.stale}
        </p>
      )}

      {/* ── 结果：左窄右宽，右侧顶部错位一格 ─────────────── */}
      {jobs.length > 0 && (
        <div className="mt-8 grid gap-6 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-8">
          <aside className="lg:pt-7">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="font-mono text-[11px] tracking-[0.18em] text-graphite-faint uppercase">
                {t.queue} · {jobs.length}
              </h2>
              {done.length > 1 && (
                <button
                  onClick={downloadZip}
                  className="font-mono text-[11px] text-prussian underline decoration-dotted underline-offset-4 transition-colors hover:text-prussian-deep"
                >
                  {count(done.length, t.zip)}
                </button>
              )}
            </div>

            <ul className="space-y-2">
              {jobs.map((j) => (
                <li key={j.id}>
                  <button
                    onClick={() => j.status === "done" && setActiveId(j.id)}
                    disabled={j.status !== "done"}
                    className={cn(
                      "group relative w-full border px-3 py-2.5 text-left transition-all duration-150 ease-draft",
                      j.status === "done" &&
                        j.id === activeId &&
                        "-translate-y-[2px] border-prussian bg-sheet shadow-[0_3px_0_0_var(--prussian-deep)]",
                      j.status === "done" &&
                        j.id !== activeId &&
                        "border-grid-firm bg-sheet/55 hover:border-prussian hover:bg-sheet",
                      j.status === "failed" &&
                        "cursor-default border-amber/60 bg-amber/12",
                      (j.status === "waiting" || j.status === "chewing") &&
                        "cursor-default border-grid-firm bg-sheet/40",
                    )}
                  >
                    <div className="flex items-start gap-2.5">
                      <StatusMark status={j.status} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-medium text-graphite">
                          {j.name}
                        </p>
                        <p className="mt-0.5 font-mono text-[11px] text-graphite-faint">
                          {j.status === "done" && j.result
                            ? `${fmtBytes(j.result.stats.bytes)} · ${j.result.stats.ms}ms`
                            : j.status === "chewing"
                              ? t.chewing
                              : j.status === "failed"
                                ? t.failed
                                : fmtBytes(j.size)}
                        </p>
                        {/* 报错正文用中性的石墨色，不用蓝 —— 加了「去这一页」
                            的链接之后，同一张卡片里蓝色得只有一个意思：能点。
                            原来这条是 prussian-deep，和紧跟着的链接差一档明度，
                            看着像两句都能点，实际只有下面那句能。 */}
                        {j.error && (
                          <p className="mt-1.5 text-[12px] leading-snug text-graphite-soft">
                            {j.error}
                          </p>
                        )}
                        {/* 报错说了「去 X」就得能点过去 —— 只说不给路是把
                            找路的活推给用户。整个卡片是个 <button>，所以要
                            拦住冒泡，否则点链接会先触发选中这个任务。
                            站外（兄弟站）用 <a rel="noopener">，站内用 Link。 */}
                        {j.hint &&
                          (j.hint.href.startsWith("http") ? (
                            <a
                              href={j.hint.href}
                              rel="noopener"
                              onClick={(e) => e.stopPropagation()}
                              className={HINT_LINK}
                            >
                              {j.hint.label} ↗
                            </a>
                          ) : (
                            <Link
                              href={j.hint.href}
                              onClick={(e) => e.stopPropagation()}
                              className={HINT_LINK}
                            >
                              {j.hint.label} →
                            </Link>
                          ))}
                      </div>
                    </div>
                    {j.status === "chewing" && (
                      <span className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden bg-grid">
                        <span className="anim-scan block h-full w-1/3 bg-prussian" />
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="min-w-0">
            {active?.result ? (
              <Tabs
                value={view}
                onValueChange={(v) => setView(v as "source" | "preview")}
                className="anim-slide"
              >
                <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl text-graphite">
                      {htmlName(active.name)}
                    </h2>
                    <p className="mt-1 flex flex-wrap gap-x-3 font-mono text-[11px] text-graphite-faint">
                      <span>{fmtBytes(active.result.stats.bytes)}</span>
                      <span>{count(active.result.stats.words, t.units.words)}</span>
                      {active.result.stats.headings > 0 && (
                        <span>
                          {count(active.result.stats.headings, t.units.headings)}
                        </span>
                      )}
                      {active.result.stats.tables > 0 && (
                        <span>{count(active.result.stats.tables, t.units.tables)}</span>
                      )}
                      {active.result.stats.images > 0 && (
                        <span>{count(active.result.stats.images, t.units.images)}</span>
                      )}
                      {active.result.stats.links > 0 && (
                        <span>{count(active.result.stats.links, t.units.links)}</span>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <TabsList className="mr-1">
                      <TabsTrigger value="source">{t.source}</TabsTrigger>
                      <TabsTrigger value="preview">{t.preview}</TabsTrigger>
                    </TabsList>
                    <Button tone="ghost" size="sm" onClick={copy}>
                      <Icon
                        icon={copied ? "ph:check-bold" : "ph:copy-bold"}
                        className={cn(copied && "text-prussian")}
                      />
                      {copied ? t.copied : t.copy}
                    </Button>
                    {active.result.assets?.length ? (
                      <Button tone="graphite" size="sm" onClick={downloadWithAssets}>
                        <Icon icon="ph:file-zip-bold" />
                        {t.downloadZip}
                      </Button>
                    ) : null}
                    <Button tone="graphite" size="sm" onClick={downloadOne}>
                      <Icon icon="ph:download-simple-bold" />
                      {t.download}
                    </Button>
                  </div>
                </div>

                {/* 工作表选择。只在真有多张表时出现 —— 单表工作簿摆一排
                    只能选一个的按钮没有意义。 */}
                {active.book && active.book.sheets.length > 1 && (
                  <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 border border-grid-firm bg-sheet px-4 py-3">
                    <span className="font-mono text-[11px] tracking-[0.18em] text-graphite-faint uppercase">
                      {t.sheets}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {active.book.sheets.map((sheet, i) => {
                        const on = active.result?.picked?.includes(i) ?? false;
                        return (
                          <Chip
                            key={`${sheet.name}-${i}`}
                            on={on}
                            onClick={() => {
                              const cur = active.result?.picked ?? [];
                              // 至少留一张 —— 全取消掉的话没有东西可渲染
                              const next = on
                                ? cur.filter((n) => n !== i)
                                : [...cur, i].sort((a, b) => a - b);
                              if (next.length) void repick(active, next, opts, t);
                            }}
                          >
                            {sheet.name}
                            <span className="ml-1.5 font-mono text-[10px] opacity-60">
                              {count(sheet.rows, t.sheetMeta)}
                            </span>
                          </Chip>
                        );
                      })}
                    </div>
                    <button
                      onClick={() =>
                        void repick(
                          active,
                          active.book!.sheets.map((_, i) => i),
                          opts,
                          t,
                        )
                      }
                      className="font-mono text-[11px] text-prussian underline decoration-dotted underline-offset-4 transition-colors hover:text-prussian-deep"
                    >
                      {t.sheetsAll}
                    </button>
                  </div>
                )}

                {active.result.warnings.length > 0 && (
                  <details className="mb-3 border-l-2 border-amber bg-amber/14 py-2 pr-3 pl-3">
                    <summary className="cursor-pointer text-[13px] text-graphite-soft">
                      {active.result.legacy
                        ? t.legacyWarn
                        : count(active.result.warnings.length, t.styleWarn)}
                    </summary>
                    <ul className="mt-2 space-y-1 font-mono text-[11px] leading-relaxed text-graphite-faint">
                      {active.result.warnings.map((w, i) => (
                        <li key={i}>· {w}</li>
                      ))}
                    </ul>
                  </details>
                )}

                <div className="plate border border-grid-firm bg-sheet">
                  <div className="ticks h-[7px] border-b border-grid-firm opacity-45" />
                  <TabsContent value="source">
                    <pre className="max-h-[34rem] overflow-auto p-5 font-mono text-[13px] leading-relaxed text-graphite">
                      {active.result.html || t.emptyDoc}
                    </pre>
                  </TabsContent>
                  <TabsContent value="preview">
                    {/*
                      方案 §13 要求预览放进受限制的 sandbox iframe。

                      sandbox 写成空串是最严的一档：脚本不跑、表单不提交、
                      顶层不能被导航、而且拿到的是一个独立的 opaque origin，
                      读不到我们的 cookie 和 localStorage。产物已经过了
                      DOMPurify，这个 iframe 是第二道墙 —— 万一净化有漏，
                      漏出来的东西也在墙里面。

                      用 srcDoc 而不是 dangerouslySetInnerHTML：后者会把用户
                      文档直接塞进主页面 DOM，那正是 §13 明令禁止的。
                    */}
                    <iframe
                      title={t.preview}
                      sandbox=""
                      referrerPolicy="no-referrer"
                      srcDoc={active.result.preview}
                      className="h-[34rem] w-full border-0 bg-white"
                    />
                    <p className="border-t border-grid px-5 py-2 font-mono text-[11px] text-graphite-faint">
                      {t.previewNote}
                    </p>
                  </TabsContent>
                </div>
              </Tabs>
            ) : (
              <div className="flex h-full min-h-[15rem] items-center border border-dashed border-grid-firm px-6 py-10">
                <p className="text-sm text-graphite-faint">
                  {jobs.some((j) => j.status === "chewing")
                    ? t.chewingFirst
                    : t.pickOne}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

/* ── 零件 ──────────────────────────────────────────────── */

function Knob({
  label,
  hint,
  children,
}: {
  label: string;
  /** 补一句说明。只有 mode 用得上 —— 那个选择的后果最不直观。 */
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[12px] text-graphite-soft" title={hint}>
        {label}
      </span>
      <div className="flex gap-1">{children}</div>
    </div>
  );
}

function Chip({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-[2px] border px-2 py-1 text-[12px] leading-none transition-all duration-150 ease-draft",
        on
          ? "border-prussian-deep bg-prussian text-sheet"
          : "border-grid-firm bg-sheet text-graphite-soft hover:border-prussian hover:text-graphite",
      )}
    >
      {children}
    </button>
  );
}

function StatusMark({ status }: { status: Job["status"] }) {
  if (status === "done")
    return (
      <Icon
        icon="ph:check-square-bold"
        className="anim-plot mt-0.5 h-4 w-4 shrink-0 text-prussian"
      />
    );
  if (status === "failed")
    return (
      <Icon icon="ph:x-square-bold" className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
    );
  if (status === "chewing")
    return (
      <Icon
        icon="ph:circle-notch-bold"
        className="mt-0.5 h-4 w-4 shrink-0 animate-spin text-prussian"
      />
    );
  return (
    <Icon icon="ph:square-bold" className="mt-0.5 h-4 w-4 shrink-0 text-graphite-faint" />
  );
}
