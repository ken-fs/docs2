"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { count, type Dictionary } from "@/i18n/types";
import {
  DEFAULT_OPTIONS,
  EncryptedError,
  LegacyDocError,
  NoTextLayerError,
  NotADocxError,
  TooLargeError,
  WrongFormatError,
  ZipBombError,
  type ConvertOptions,
  type ConvertResult,
  type Workbook,
} from "@document-tools/converters/types";
import type { ToolInput } from "@/content/tools";
import {
  PDFJS_ASSET_VERSION,
  PDFJS_CMAP_URL,
  PDFJS_FONT_URL,
  PDFJS_WORKER_SRC,
} from "@/lib/pdfjs-assets";
import { cn } from "@/lib/utils";

type Job = {
  id: string;
  name: string;
  size: number;
  status: "waiting" | "chewing" | "done" | "failed";
  result?: ConvertResult;
  error?: string;
  legacy?: boolean;
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
 */
const SPEAKS_FOR_ITSELF = [
  EncryptedError,
  LegacyDocError,
  NoTextLayerError,
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

function kb(n: number) {
  return n < 1024 * 1024
    ? `${Math.max(1, Math.round(n / 1024))} KB`
    : `${(n / 1024 / 1024).toFixed(1)} MB`;
}

function mdName(name: string) {
  // 粘贴的内容没有文件名，t.pastedName 可能带空格甚至 CJK，压成能当文件名的样子
  const base = name
    .replace(/\.(docx?|pdf|html?|csv|tsv|txt|xlsx)$/i, "")
    .replace(/[/\\?%*:|"<>]/g, "-");
  return `${base.trim() || "document"}.md`;
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

/**
 * 哪个引擎露哪些旋钮。
 *
 * 每个引擎能受影响的选项本来就不一样：CSV 里没有图片、PDF 里没有代码块围栏、
 * 表格页没有「表格保留还是拉平」（输出本身就是表格）。全都摆出来会让用户
 * 以为调了没用的开关。
 */
const KNOBS = {
  docx: { bullet: true, fence: true, images: true, tables: true },
  html: { bullet: true, fence: true, images: true, tables: true },
  pdf: { bullet: true, pageMarks: true },
  csv: { header: true, align: true, delimiter: true },
  xlsx: { header: true, align: true },
} as const satisfies Record<
  ToolInput["engine"],
  Partial<
    Record<
      | "bullet"
      | "fence"
      | "images"
      | "tables"
      | "header"
      | "align"
      | "delimiter"
      | "pageMarks",
      true
    >
  >
>;

export function Converter({ t, input }: { t: T; input: ToolInput }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [opts, setOpts] = useState<ConvertOptions>(DEFAULT_OPTIONS);
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
   * 一个文件 → 一段 markdown。按页面配置的 engine 分派。
   *
   * 每个 engine 都是动态 import：mammoth、pdf.js、read-excel-file 加起来好几
   * MB，而一次访问只会用到其中一个。首页更是一个都不该加载 —— 方案 §8 明确
   * 要求首页不得加载全部解析库。
   */
  const convert = useCallback(
    async (file: File, options: ConvertOptions): Promise<ConvertResult> => {
      switch (input.engine) {
        case "docx": {
          const { convertDocx } = await import(
            "@document-tools/converters/docx-to-markdown"
          );
          return convertDocx(file, options);
        }
        case "pdf": {
          const { convertPdf } = await import(
            "@document-tools/converters/pdf-to-markdown"
          );
          // worker 和字体都是自己托管的同源文件，不碰任何 CDN ——
          // 「文件不出你电脑」这句话得连带请求一起算
          return convertPdf(
            file,
            {
              workerSrc: PDFJS_WORKER_SRC,
              cMapUrl: PDFJS_CMAP_URL,
              standardFontDataUrl: PDFJS_FONT_URL,
              assetVersion: PDFJS_ASSET_VERSION,
            },
            options,
          );
        }
        case "html": {
          const { convertHtml } = await import(
            "@document-tools/converters/html-to-markdown"
          );
          return convertHtml(await file.text(), options);
        }
        case "csv": {
          const { convertCsv } = await import(
            "@document-tools/converters/csv-to-markdown"
          );
          return convertCsv(await file.text(), options);
        }
        case "xlsx": {
          const { readWorkbook, renderSheets } = await import(
            "@document-tools/converters/excel-to-markdown"
          );
          const book = await readWorkbook(file);
          // 默认只转第一张表。一个工作簿常有十几张，全转出来没人看得下去，
          // 而且很容易撞上十万格的上限。
          return { ...renderSheets(book, [0], options), book } as ConvertResult & {
            book: Workbook;
          };
        }
      }
    },
    [input.engine],
  );

  const run = useCallback(
    async (files: File[], options: ConvertOptions, t: T) => {
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

        if (file.size > MAX_BYTES) {
          setJobs((prev) =>
            prev.map((j) =>
              j.id === job.id
                ? { ...j, status: "failed", error: t.tooBig }
                : j,
            ),
          );
          continue;
        }

        setJobs((prev) =>
          prev.map((j) => (j.id === job.id ? { ...j, status: "chewing" } : j)),
        );

        try {
          const result = (await convert(file, options)) as ConvertResult & {
            book?: Workbook;
          };
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
    [convert, jobs.length],
  );

  /**
   * 直接给的一段文本 —— 粘贴的富文本、贴进文本框的 HTML 源码或 CSV。
   *
   * 剪贴板里的 HTML 来自任意网页，不比上传的文件可信：页面完全可以埋一个
   * onmouseover 或 javascript: 链接等着被复制走。convertHtml 里同样是
   * 先过 DOMPurify 再进 turndown。
   */
  const runText = useCallback(
    async (
      text: string,
      kind: "html" | "csv",
      name: string,
      options: ConvertOptions,
      t: T,
    ) => {
      const job: Job = {
        id: `text-${kind}-${text.length}-${jobs.length}`,
        name,
        size: text.length,
        status: "chewing",
        text,
      };
      setJobs((prev) => [...prev, job]);

      try {
        const result =
          kind === "html"
            ? (
                await import("@document-tools/converters/html-to-markdown")
              ).convertHtml(text, options)
            : (
                await import("@document-tools/converters/csv-to-markdown")
              ).convertCsv(text, options);
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
    [jobs.length],
  );

  /** 换选工作表：拿缓存的 book 重算，不重读文件。 */
  const repick = useCallback(
    async (job: Job, picked: number[], options: ConvertOptions, t: T) => {
      if (!job.book) return;
      try {
        const { renderSheets } = await import(
          "@document-tools/converters/excel-to-markdown"
        );
        const result = renderSheets(job.book, picked, options);
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
   * 重跑，所以「改了设置请重新上传」那句话只在真的没有来源时才需要。
   */
  const redo = useCallback(
    async (job: Job, options: ConvertOptions, t: T) => {
      if (job.book) {
        void repick(job, job.result?.picked ?? [0], options, t);
        return;
      }

      setJobs((prev) =>
        prev.map((j) => (j.id === job.id ? { ...j, status: "chewing" } : j)),
      );

      try {
        let result: ConvertResult;
        if (job.text !== undefined) {
          const kind = input.paste === "csv" ? "csv" : "html";
          result =
            kind === "csv"
              ? (
                  await import("@document-tools/converters/csv-to-markdown")
                ).convertCsv(job.text, options)
              : (
                  await import("@document-tools/converters/html-to-markdown")
                ).convertHtml(job.text, options);
        } else if (job.file) {
          result = await convert(job.file, options);
        } else {
          return;
        }
        setJobs((prev) =>
          prev.map((j) =>
            j.id === job.id ? { ...j, status: "done", result } : j,
          ),
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
    [convert, input.paste, repick],
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
  const patch = (next: Partial<ConvertOptions>) => {
    const options = { ...opts, ...next };
    setOpts(options);
    if (active?.status === "done") void redo(active, options, t);
    if (done.some((j) => j.id !== active?.id)) setStale(true);
  };

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
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
      // 这是 google-docs-to-markdown 那页真正要处理的输入。
      const html = e.clipboardData?.getData("text/html");
      if (html?.trim()) void runText(html, "html", t.pastedName, opts, t);
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [opts, run, runText, t]);

  const copy = async () => {
    if (!active?.result) return;
    await navigator.clipboard.writeText(active.result.markdown);
    setCopied(true);
  };

  const downloadOne = () => {
    if (!active?.result) return;
    save(
      new Blob([active.result.markdown], {
        type: "text/markdown;charset=utf-8",
      }),
      mdName(active.name),
    );
  };

  const downloadZip = async () => {
    // 打包下载是少数人才点的按钮，JSZip 别进首屏包
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    for (const j of done) {
      if (j.result) zip.file(mdName(j.name), j.result.markdown);
    }
    save(await zip.generateAsync({ type: "blob" }), "markdown.zip");
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
          "relative border-2 border-dashed bg-paper-deep/50 px-6 py-10 transition-all duration-200 ease-snap sm:px-10 sm:py-12",
          dragging
            ? "-rotate-[0.5deg] border-rust bg-ochre/25 shadow-[6px_6px_0_0_var(--rust-deep)]"
            : "border-rule-firm hover:border-ink/45",
        )}
      >
        {/* 左上角的定位十字，纯装饰 */}
        <span
          aria-hidden
          className="absolute left-3 top-3 font-mono text-[10px] text-ink-faint"
        >
          ✛
        </span>

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
          <div className="shrink-0">
            <Icon
              icon="ph:tray-arrow-down-duotone"
              className={cn(
                "h-14 w-14 transition-transform duration-200 ease-spring",
                dragging ? "scale-110 text-rust" : "text-ink-soft",
              )}
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-display text-2xl leading-tight text-ink sm:text-3xl">
              {dragging ? t.dropActive : t.dropTitle}
            </p>
            <p className="mt-2 text-sm text-ink-soft">{t.dropHint}</p>
            <p className="mt-1 font-mono text-xs text-ink-faint">{t.dropMeta}</p>
          </div>

          <div className="flex shrink-0 flex-col gap-2">
            <Button tone="rust" onClick={() => inputRef.current?.click()}>
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
        <div className="mt-5 border border-rule-firm bg-paper/60 px-5 py-4">
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
              {t.pasteHeading}
            </h2>
            <span className="font-mono text-[11px] text-ink-faint">
              {typed.length > 0 && kb(typed.length)}
            </span>
          </div>
          <textarea
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            spellCheck={false}
            rows={6}
            placeholder={
              input.paste === "html" ? t.pastePlaceholderHtml : t.pastePlaceholderCsv
            }
            className="w-full resize-y border border-rule-firm bg-paper px-3 py-2 font-mono text-[13px] leading-relaxed text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-ink"
          />
          <div className="mt-2 flex items-center gap-2">
            <Button
              tone="rust"
              size="sm"
              disabled={!typed.trim()}
              onClick={() =>
                void runText(typed, input.paste as "html" | "csv", t.typedName, opts, t)
              }
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

      {/* ── 排版旋钮 ─────────────────────────────────────── */}
      {/* 旋钮按引擎给：CSV 页面上没有「图片怎么处理」这回事，摆一个只会让人
          以为自己漏了什么。 */}
      <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-4 border border-rule-firm bg-paper/60 px-5 py-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
          {t.knobs}
        </span>

        {knobs.bullet && (
          <Knob label={t.bullets}>
            {(["-", "*", "+"] as const).map((b) => (
              <Chip
                key={b}
                on={opts.bullet === b}
                onClick={() => patch({ bullet: b })}
              >
                <span className="font-mono">{b}</span>
              </Chip>
            ))}
          </Knob>
        )}

        {knobs.fence && (
          <Knob label={t.fence}>
            {(["```", "~~~"] as const).map((f) => (
              <Chip
                key={f}
                on={opts.codeFence === f}
                onClick={() => patch({ codeFence: f })}
              >
                <span className="font-mono">{f}</span>
              </Chip>
            ))}
          </Knob>
        )}

        {knobs.images && (
          <Knob label={t.images}>
            {(
              [
                ["inline", t.imageInline],
                ["placeholder", t.imagePlaceholder],
                ["strip", t.imageStrip],
              ] as const
            ).map(([v, label]) => (
              <Chip
                key={v}
                on={opts.images === v}
                onClick={() => patch({ images: v })}
              >
                {label}
              </Chip>
            ))}
          </Knob>
        )}

        {knobs.tables && (
          <Knob label={t.tables}>
            <Chip on={opts.keepTables} onClick={() => patch({ keepTables: true })}>
              {t.tableKeep}
            </Chip>
            <Chip on={!opts.keepTables} onClick={() => patch({ keepTables: false })}>
              {t.tableFlatten}
            </Chip>
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

        {knobs.align && (
          <Knob label={t.align}>
            {(
              [
                ["none", t.alignNone],
                ["left", t.alignLeft],
                ["center", t.alignCenter],
                ["right", t.alignRight],
              ] as const
            ).map(([v, label]) => (
              <Chip key={v} on={opts.align === v} onClick={() => patch({ align: v })}>
                {label}
              </Chip>
            ))}
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

        {knobs.pageMarks && (
          <Knob label={t.pageMarks}>
            <Chip on={opts.pageMarks} onClick={() => patch({ pageMarks: true })}>
              {t.pageMarksOn}
            </Chip>
            <Chip on={!opts.pageMarks} onClick={() => patch({ pageMarks: false })}>
              {t.pageMarksOff}
            </Chip>
          </Knob>
        )}
      </div>

      {stale && (
        <p className="anim-drift mt-3 flex items-center gap-2 border-l-2 border-rust bg-ochre/20 py-2 pl-3 text-sm text-ink-soft">
          <Icon icon="ph:arrow-counter-clockwise-bold" className="h-4 w-4" />
          {t.stale}
        </p>
      )}

      {/* ── 结果：非对称双栏，左窄右宽且顶部错位 ─────────── */}
      {jobs.length > 0 && (
        <div className="mt-8 grid gap-6 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-8">
          {/* Queue */}
          <aside className="lg:pt-7">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                {t.queue} · {jobs.length}
              </h2>
              {done.length > 1 && (
                <button
                  onClick={downloadZip}
                  className="font-mono text-[11px] text-rust underline decoration-dotted underline-offset-4 transition-colors hover:text-rust-deep"
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
                      "group relative w-full border px-3 py-2.5 text-left transition-all duration-150 ease-snap",
                      j.status === "done" &&
                        j.id === activeId &&
                        "-translate-x-[2px] -translate-y-[2px] border-ink bg-paper shadow-[4px_4px_0_0_var(--rust-deep)]",
                      j.status === "done" &&
                        j.id !== activeId &&
                        "border-rule-firm bg-paper/55 hover:border-ink hover:bg-paper",
                      j.status === "failed" &&
                        "cursor-default border-rust/45 bg-rust/8",
                      (j.status === "waiting" || j.status === "chewing") &&
                        "cursor-default border-rule-firm bg-paper/40",
                    )}
                  >
                    <div className="flex items-start gap-2.5">
                      <StatusMark status={j.status} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-medium text-ink">
                          {j.name}
                        </p>
                        <p className="mt-0.5 font-mono text-[11px] text-ink-faint">
                          {j.status === "done" && j.result
                            ? `${count(j.result.stats.words, t.units.words)} · ${j.result.stats.ms}ms`
                            : j.status === "chewing"
                              ? t.chewing
                              : j.status === "failed"
                                ? t.failed
                                : kb(j.size)}
                        </p>
                        {j.error && (
                          <p className="mt-1.5 text-[12px] leading-snug text-rust-deep">
                            {j.error}
                          </p>
                        )}
                      </div>
                    </div>
                    {j.status === "chewing" && (
                      <span className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden bg-rule">
                        <span className="anim-chew block h-full w-1/3 bg-rust" />
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* 出片 */}
          <div className="min-w-0">
            {active?.result ? (
              <Tabs
                value={view}
                onValueChange={(v) => setView(v as "source" | "preview")}
                className="anim-drift"
              >
                <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl text-ink">
                      {mdName(active.name)}
                    </h2>
                    <p className="mt-1 flex flex-wrap gap-x-3 font-mono text-[11px] text-ink-faint">
                      <span>{count(active.result.stats.words, t.units.words)}</span>
                      {active.result.stats.headings > 0 && (
                        <span>
                          {count(active.result.stats.headings, t.units.headings)}
                        </span>
                      )}
                      {active.result.stats.tables > 0 && (
                        <span>
                          {count(active.result.stats.tables, t.units.tables)}
                        </span>
                      )}
                      {active.result.stats.images > 0 && (
                        <span>
                          {count(active.result.stats.images, t.units.images)}
                        </span>
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
                        className={cn(copied && "text-moss")}
                      />
                      {copied ? t.copied : t.copy}
                    </Button>
                    <Button tone="ink" size="sm" onClick={downloadOne}>
                      <Icon icon="ph:download-simple-bold" />
                      {t.download}
                    </Button>
                  </div>
                </div>

                {/* 工作表选择。只在真有多张表时出现 —— 单表工作簿摆一排
                    只能选一个的按钮没有意义。 */}
                {active.book && active.book.sheets.length > 1 && (
                  <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 border border-rule-firm bg-paper/60 px-4 py-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
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
                      className="font-mono text-[11px] text-rust underline decoration-dotted underline-offset-4 transition-colors hover:text-rust-deep"
                    >
                      {t.sheetsAll}
                    </button>
                  </div>
                )}

                {active.result.warnings.length > 0 && (
                  <details className="mb-3 border-l-2 border-ochre bg-ochre/14 py-2 pl-3 pr-3">
                    <summary className="cursor-pointer text-[13px] text-ink-soft">
                      {active.result.legacy
                        ? t.legacyWarn
                        : count(active.result.warnings.length, t.styleWarn)}
                    </summary>
                    <ul className="mt-2 space-y-1 font-mono text-[11px] leading-relaxed text-ink-faint">
                      {active.result.warnings.map((w, i) => (
                        <li key={i}>· {w}</li>
                      ))}
                    </ul>
                  </details>
                )}

                <div className="border border-ink bg-paper shadow-[4px_4px_0_0_var(--ink)]">
                  <div className="tick h-[7px] border-b border-rule-firm opacity-45" />
                  <TabsContent value="source">
                    <pre className="max-h-[34rem] overflow-auto p-5 font-mono text-[13px] leading-relaxed text-ink">
                      {active.result.markdown || t.emptyDoc}
                    </pre>
                  </TabsContent>
                  <TabsContent value="preview">
                    <div className="max-h-[34rem] overflow-auto p-5">
                      <Preview md={active.result.markdown} />
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            ) : (
              <div className="flex h-full min-h-[15rem] items-center border border-dashed border-rule-firm px-6 py-10">
                <p className="text-sm text-ink-faint">
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
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[12px] text-ink-soft">{label}</span>
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
        "border px-2 py-1 text-[12px] leading-none transition-all duration-150 ease-snap",
        on
          ? "border-ink bg-ink text-paper"
          : "border-rule-firm bg-paper/70 text-ink-soft hover:border-ink hover:text-ink",
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
        className="anim-stamp mt-0.5 h-4 w-4 shrink-0 text-moss"
      />
    );
  if (status === "failed")
    return (
      <Icon
        icon="ph:x-square-bold"
        className="mt-0.5 h-4 w-4 shrink-0 text-rust"
      />
    );
  if (status === "chewing")
    return (
      <Icon
        icon="ph:circle-notch-bold"
        className="mt-0.5 h-4 w-4 shrink-0 animate-spin text-rust"
      />
    );
  return (
    <Icon
      icon="ph:square-bold"
      className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint"
    />
  );
}

/**
 * 极简 markdown preview。只认标题/列表/表格/引用/代码块/粗斜体/链接，
 * 全部走 React 节点，不碰 dangerouslySetInnerHTML —— 文档内容不可信。
 */
function Preview({ md }: { md: string }) {
  const lines = md.split("\n");
  const out: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  const inline = (s: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    const re =
      /(\*\*[^*]+\*\*)|(_[^_]+_)|(`[^`]+`)|(~~[^~]+~~)|(!?\[[^\]]*\]\([^)]*\))/g;
    let last = 0;
    let m: RegExpExecArray | null;
    let k = 0;
    while ((m = re.exec(s))) {
      if (m.index > last) parts.push(s.slice(last, m.index));
      const t = m[0];
      if (t.startsWith("**"))
        parts.push(<strong key={k++}>{t.slice(2, -2)}</strong>);
      else if (t.startsWith("~~"))
        parts.push(<del key={k++}>{t.slice(2, -2)}</del>);
      else if (t.startsWith("_")) parts.push(<em key={k++}>{t.slice(1, -1)}</em>);
      else if (t.startsWith("`"))
        parts.push(
          <code
            key={k++}
            className="border border-rule-firm bg-paper-deep px-1 font-mono text-[0.9em]"
          >
            {t.slice(1, -1)}
          </code>,
        );
      else if (t.startsWith("![")) {
        const alt = t.slice(2, t.indexOf("]"));
        parts.push(
          <span
            key={k++}
            className="inline-flex items-center gap-1 border border-rule-firm bg-paper-deep px-1.5 py-0.5 font-mono text-[11px] text-ink-faint"
          >
            <Icon icon="ph:image-square-bold" className="h-3 w-3" />
            {alt || "image"}
          </span>,
        );
      } else {
        const label = t.slice(1, t.indexOf("]"));
        parts.push(
          <span key={k++} className="text-rust underline underline-offset-2">
            {label}
          </span>,
        );
      }
      last = m.index + t.length;
    }
    if (last < s.length) parts.push(s.slice(last));
    return parts;
  };

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    const fence = line.match(/^(```|~~~)/);
    if (fence) {
      const body: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith(fence[1])) {
        body.push(lines[i]);
        i++;
      }
      i++;
      out.push(
        <pre
          key={key++}
          className="my-3 overflow-auto border border-rule-firm bg-paper-deep p-3 font-mono text-[12px] leading-relaxed"
        >
          {body.join("\n")}
        </pre>,
      );
      continue;
    }

    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const size = [
        "text-2xl",
        "text-xl",
        "text-lg",
        "text-base",
        "text-sm",
        "text-sm",
      ][level - 1];
      out.push(
        // 用 p + role，而不是真的 h1 —— 文档里的 # 不该跟页面自己的 h1 打架，
        // 所以整体下沉一级，读屏还能拿到层级
        <p
          key={key++}
          role="heading"
          aria-level={Math.min(level + 1, 6)}
          className={cn(
            "mt-4 mb-2 font-display leading-tight text-ink first:mt-0",
            size,
          )}
        >
          {inline(h[2])}
        </p>,
      );
      i++;
      continue;
    }

    if (/^\|/.test(line) && /^\|[\s:|-]+\|?$/.test(lines[i + 1] ?? "")) {
      // 只在“没被反斜杠转义的”竖线上切，否则 `binary \| OLE` 会被拆成两格
      const cells = (r: string) => {
        const body = r.replace(/^\|/, "").replace(/\|\s*$/, "");
        const out: string[] = [];
        let buf = "";
        for (let n = 0; n < body.length; n++) {
          const ch = body[n];
          if (ch === "\\" && body[n + 1] === "|") {
            buf += "|";
            n++;
          } else if (ch === "|") {
            out.push(buf.trim());
            buf = "";
          } else {
            buf += ch;
          }
        }
        out.push(buf.trim());
        return out;
      };
      const head = cells(line);
      i += 2;
      const body: string[][] = [];
      while (i < lines.length && /^\|/.test(lines[i])) {
        body.push(cells(lines[i]));
        i++;
      }
      out.push(
        <div key={key++} className="my-3 overflow-x-auto">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                {head.map((c, n) => (
                  <th
                    key={n}
                    className="border border-rule-firm bg-paper-deep px-2 py-1.5 text-left font-semibold"
                  >
                    {inline(c)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((r, n) => (
                <tr key={n}>
                  {r.map((c, m2) => (
                    <td
                      key={m2}
                      className="border border-rule-firm px-2 py-1.5 align-top"
                    >
                      {inline(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (/^>\s?/.test(line)) {
      const body: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        body.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      out.push(
        <blockquote
          key={key++}
          className="my-3 border-l-2 border-rust pl-3 text-ink-soft italic"
        >
          {inline(body.join(" "))}
        </blockquote>,
      );
      continue;
    }

    const bullet = /^\s*([-*+])\s+/;
    const ordered = /^\s*\d+[.)]\s+/;
    if (bullet.test(line) || ordered.test(line)) {
      const isOrdered = ordered.test(line);
      const items: string[] = [];
      while (
        i < lines.length &&
        (bullet.test(lines[i]) || ordered.test(lines[i]))
      ) {
        items.push(lines[i].replace(bullet, "").replace(ordered, ""));
        i++;
      }
      const List = isOrdered ? "ol" : "ul";
      out.push(
        <List
          key={key++}
          className={cn(
            "my-3 space-y-1 pl-5 text-[14px] leading-relaxed",
            isOrdered ? "list-decimal" : "list-disc",
          )}
        >
          {items.map((t, n) => (
            <li key={n}>{inline(t)}</li>
          ))}
        </List>,
      );
      continue;
    }

    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,6}\s|>|\||```|~~~|\s*[-*+]\s|\s*\d+[.)]\s)/.test(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    out.push(
      <p key={key++} className="my-2.5 text-[14px] leading-relaxed text-ink">
        {inline(para.join(" "))}
      </p>,
    );
  }

  return <div>{out}</div>;
}
