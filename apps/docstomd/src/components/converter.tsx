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
  LegacyDocError,
  NotADocxError,
  type ConvertOptions,
  type ConvertResult,
} from "@document-tools/converters/types";
import { cn } from "@/lib/utils";

type Job = {
  id: string;
  name: string;
  size: number;
  status: "waiting" | "chewing" | "done" | "failed";
  result?: ConvertResult;
  error?: string;
  legacy?: boolean;
};

const MAX_BYTES = 25 * 1024 * 1024;

function kb(n: number) {
  return n < 1024 * 1024
    ? `${Math.max(1, Math.round(n / 1024))} KB`
    : `${(n / 1024 / 1024).toFixed(1)} MB`;
}

function mdName(name: string) {
  return name.replace(/\.(docx?|DOCX?)$/, "") + ".md";
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

export function Converter({ t }: { t: T }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [opts, setOpts] = useState<ConvertOptions>(DEFAULT_OPTIONS);
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<"source" | "preview">("source");
  const inputRef = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);

  const active = jobs.find((j) => j.id === activeId) ?? null;
  const done = jobs.filter((j) => j.status === "done");

  const run = useCallback(
    async (files: File[], options: ConvertOptions, t: T) => {
      const fresh: Job[] = files.map((f, i) => ({
        id: `${f.name}-${f.size}-${i}-${jobs.length}`,
        name: f.name,
        size: f.size,
        status: "waiting",
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
          // mammoth + turndown + cfb 加起来几 MB，只在真的有文件要转时才拉进来
          const { convertDocx } = await import(
            "@document-tools/converters/docx-to-markdown"
          );
          const result = await convertDocx(file, options);
          setJobs((prev) =>
            prev.map((j) =>
              j.id === job.id ? { ...j, status: "done", result } : j,
            ),
          );
          setActiveId((cur) => cur ?? job.id);
        } catch (err) {
          const legacy = err instanceof LegacyDocError;
          const message =
            legacy || err instanceof NotADocxError
              ? err.message
              : t.readFail;
          setJobs((prev) =>
            prev.map((j) =>
              j.id === job.id
                ? { ...j, status: "failed", error: message, legacy }
                : j,
            ),
          );
        }
      }
    },
    [jobs.length],
  );

  const pick = useCallback(
    (list: FileList | null) => {
      if (!list?.length) return;
      const files = Array.from(list).filter((f) => /\.docx?$/i.test(f.name));
      if (files.length) void run(files, opts, t);
    },
    [opts, run, t],
  );

  // 改设置后，把已完成的重新跑一遍不现实（原文件已释放），
  // 所以只提示需要重新上传，避免给出过期结果。
  const [stale, setStale] = useState(false);
  const patch = (next: Partial<ConvertOptions>) => {
    setOpts((o) => ({ ...o, ...next }));
    if (jobs.some((j) => j.status === "done")) setStale(true);
  };

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  // 支持整站粘贴上传
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const files = Array.from(e.clipboardData?.files ?? []).filter((f) =>
        /\.docx?$/i.test(f.name),
      );
      if (files.length) void run(files, opts, t);
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [opts, run, t]);

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
          accept=".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
          onChange={(e) => {
            pick(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {/* ── 排版旋钮 ─────────────────────────────────────── */}
      <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-4 border border-rule-firm bg-paper/60 px-5 py-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
          {t.knobs}
        </span>

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

        <Knob label={t.tables}>
          <Chip
            on={opts.keepTables}
            onClick={() => patch({ keepTables: true })}
          >
            {t.tableKeep}
          </Chip>
          <Chip
            on={!opts.keepTables}
            onClick={() => patch({ keepTables: false })}
          >
            {t.tableFlatten}
          </Chip>
        </Knob>
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
