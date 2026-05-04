interface KpiCardProps {
  label: string;
  value: string | number;
  helper: string;
  tone?: "harbor" | "moss" | "clay" | "ink";
}

const toneClass = {
  harbor: "from-harbor/12 to-harbor/4 text-harbor",
  moss: "from-moss/14 to-moss/4 text-moss",
  clay: "from-clay/14 to-clay/4 text-clay",
  ink: "from-ink/10 to-ink/4 text-ink",
};

export const KpiCard = ({ label, value, helper, tone = "harbor" }: KpiCardProps) => (
  <article className={`rounded-[1.5rem] border border-white/76 bg-gradient-to-br ${toneClass[tone]} p-5 shadow-sm`}>
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/48">{label}</p>
    <p className="mt-3 text-3xl font-semibold">{value}</p>
    <p className="mt-2 text-sm leading-5 text-ink/58">{helper}</p>
  </article>
);
