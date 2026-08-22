import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

/**
 * 极简 markdown preview。只认标题/列表/表格/引用/代码块/粗斜体/链接，
 * 全部走 React 节点，不碰 dangerouslySetInnerHTML —— 文档内容不可信。
 *
 * 从 converter.tsx 抽出来单独成模块：转换器的「预览」标签和 /markdown-preview/
 * 独立预览页都用它。抽离前 converter.tsx 已经 50KB+，把这段 240 行搬出来
 * 顺带给那个超大文件瘦身，两处也不再各存一份会走样的渲染逻辑。
 */
export function MarkdownPreview({ md }: { md: string }) {
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
          <span key={k++} className="text-pine underline underline-offset-2">
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
          className="my-3 border-l-2 border-pine pl-3 text-ink-soft italic"
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
