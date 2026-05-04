import type { AiInsight } from "../../types";

interface InsightCardProps {
  insight: AiInsight;
}

export const InsightCard = ({ insight }: InsightCardProps) => (
  <article className="rounded-[1.5rem] border border-ink/10 bg-white/86 p-5">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-harbor">{insight.category}</p>
        <h3 className="mt-2 font-display text-xl font-semibold text-ink">{insight.title}</h3>
      </div>
      <span className="rounded-full bg-moss/12 px-3 py-1 text-xs font-semibold text-moss">{insight.confidence}% confidence</span>
    </div>
    <p className="mt-3 text-sm leading-6 text-ink/66">{insight.body}</p>
    <div className="mt-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/42">Data sources used</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {insight.sources.map((source) => (
          <span key={source} className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-ink/60">
            {source}
          </span>
        ))}
      </div>
    </div>
  </article>
);
