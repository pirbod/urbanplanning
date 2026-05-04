import { Fragment } from "react";
import type { EnvironmentalArea } from "../../types";

interface RiskMatrixProps {
  areas: EnvironmentalArea[];
}

export const RiskMatrix = ({ areas }: RiskMatrixProps) => {
  const rows = ["Critical", "High", "Medium", "Low"];
  const columns = ["Low exposure", "Moderate exposure", "High exposure"];

  return (
    <div className="rounded-[1.5rem] border border-ink/10 bg-white/84 p-5">
      <h3 className="font-display text-xl font-semibold text-ink">Risk matrix</h3>
      <p className="mt-1 text-sm text-ink/58">A simplified score view for business demos and prioritization workshops.</p>
      <div className="mt-4 grid grid-cols-[130px_repeat(3,minmax(0,1fr))] gap-2 text-sm">
        <div />
        {columns.map((column) => (
          <div key={column} className="rounded-xl bg-ink px-3 py-2 text-center text-xs font-semibold text-white">
            {column}
          </div>
        ))}
        {rows.map((row) => (
          <Fragment key={row}>
            <div key={`${row}-label`} className="rounded-xl bg-paper px-3 py-4 font-semibold text-ink">
              {row}
            </div>
            {columns.map((column, columnIndex) => {
              const matching = areas.filter((area) => {
                const scoreBucket = area.score >= 75 ? 2 : area.score >= 55 ? 1 : 0;
                return area.severity === row && scoreBucket === columnIndex;
              });
              return (
                <div key={`${row}-${column}`} className="min-h-20 rounded-xl border border-ink/10 bg-paper/60 p-2">
                  {matching.map((area) => (
                    <span key={area.id} className="mb-1 inline-block rounded-full bg-white px-2 py-1 text-xs font-semibold text-ink/70">
                      {area.name}
                    </span>
                  ))}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
