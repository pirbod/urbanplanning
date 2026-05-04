import { useMemo, useState } from "react";
import type { EnvironmentalArea, Project, Zone } from "../../types";

interface ComplianceCheckProps {
  projects: Project[];
  zones: Zone[];
  environmentalAreas: EnvironmentalArea[];
}

const statusStyle = {
  compliant: "bg-moss/12 text-moss",
  "needs review": "bg-amber-100 text-amber-800",
  "non-compliant": "bg-red-100 text-red-700",
};

export const ComplianceCheck = ({ projects, zones, environmentalAreas }: ComplianceCheckProps) => {
  const [projectId, setProjectId] = useState(projects[0]?.id ?? "");
  const [checked, setChecked] = useState(false);
  const project = projects.find((item) => item.id === projectId);

  const result = useMemo(() => {
    if (!project) {
      return { status: "needs review" as const, reasons: ["Select a project to run a compliance check."] };
    }

    const linkedZones = zones.filter((zone) => project.zoneIds.includes(zone.id));
    const linkedRisks = environmentalAreas.filter((area) => project.environmentalAreaIds.includes(area.id));
    const strictHeightZone = linkedZones.find((zone) => zone.maxHeightM < 20);
    const highRiskArea = linkedRisks.find((area) => area.severity === "High");

    if (project.id === "PRJ-002" || project.id === "PRJ-006") {
      return {
        status: "needs review" as const,
        reasons: [
          highRiskArea ? `${highRiskArea.name} requires mitigation evidence.` : "Environmental buffer proximity needs screening.",
          "Public objection count is high enough to trigger stakeholder review.",
          "Planning committee should validate public benefit commitments.",
        ],
      };
    }

    if (strictHeightZone && project.type !== "Public infrastructure") {
      return {
        status: "non-compliant" as const,
        reasons: [
          `Concept exceeds the conservative envelope for ${strictHeightZone.name}.`,
          "Height and density assumptions need redesign before submission.",
        ],
      };
    }

    return {
      status: "compliant" as const,
      reasons: [
        "Mock zoning constraints are within acceptable thresholds.",
        "No high-risk environmental overlap blocks the current phase.",
        "Approval progress can continue with standard documentation.",
      ],
    };
  }, [environmentalAreas, project, zones]);

  return (
    <div className="rounded-[1.5rem] border border-ink/10 bg-white/84 p-5">
      <h3 className="font-display text-xl font-semibold text-ink">Mock compliance check</h3>
      <p className="mt-2 text-sm leading-6 text-ink/60">
        Select a proposed project to simulate how Azure Functions could combine zoning, environmental, and public feedback rules.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <select
          value={projectId}
          onChange={(event) => {
            setProjectId(event.target.value);
            setChecked(false);
          }}
          className="flex-1 rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-sm font-semibold text-ink outline-none focus:border-harbor"
        >
          {projects.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <button type="button" onClick={() => setChecked(true)} className="rounded-2xl bg-harbor px-5 py-3 text-sm font-semibold text-white">
          Run check
        </button>
      </div>

      {checked ? (
        <div className="mt-5 rounded-2xl border border-ink/10 bg-paper/70 p-4">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${statusStyle[result.status]}`}>
            {result.status}
          </span>
          <ul className="mt-4 space-y-2 text-sm text-ink/70">
            {result.reasons.map((reason) => (
              <li key={reason} className="rounded-xl bg-white/80 px-3 py-2">
                {reason}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
