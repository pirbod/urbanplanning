import { useState } from "react";
import { PageShell } from "../components/layout/PageShell";
import { ComplianceCheck } from "../components/zoning/ComplianceCheck";
import { ZoningTable } from "../components/zoning/ZoningTable";
import type { EnvironmentalArea, Project, Role, Zone } from "../types";
import { canEditPlanningData } from "../utils/rolePermissions";

interface ZoningPageProps {
  role: Role;
  zones: Zone[];
  projects: Project[];
  environmentalAreas: EnvironmentalArea[];
}

export const ZoningPage = ({ role, zones, projects, environmentalAreas }: ZoningPageProps) => {
  const [selectedZoneId, setSelectedZoneId] = useState(zones[0]?.id);
  const selectedZone = zones.find((zone) => zone.id === selectedZoneId);

  return (
    <PageShell
      eyebrow="Regulation management"
      title="Zoning and land-use module"
      description="Manage zoning records, allowed uses, height envelopes, density rules, review status, and mock compliance outcomes."
      aside={
        <div className="space-y-4">
          <div className="rounded-[1.5rem] border border-ink/10 bg-white/88 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-harbor">Zone detail</p>
            {selectedZone ? (
              <>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">{selectedZone.name}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/62">{selectedZone.notes}</p>
                <div className="mt-4 grid gap-2 text-sm">
                  <div className="rounded-xl bg-paper p-3">Allowed use: {selectedZone.allowedUse}</div>
                  <div className="rounded-xl bg-paper p-3">Max building height: {selectedZone.maxHeightM} m</div>
                  <div className="rounded-xl bg-paper p-3">Density FAR: {selectedZone.far}</div>
                </div>
                <button
                  type="button"
                  disabled={!canEditPlanningData(role)}
                  className="mt-4 w-full rounded-2xl bg-harbor px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-ink/20"
                >
                  Edit mock zoning rule
                </button>
              </>
            ) : (
              <p className="mt-2 text-sm text-ink/58">No zone selected.</p>
            )}
          </div>
          <ComplianceCheck projects={projects} zones={zones} environmentalAreas={environmentalAreas} />
        </div>
      }
    >
      <ZoningTable zones={zones} selectedZoneId={selectedZoneId} onSelectZone={setSelectedZoneId} />
    </PageShell>
  );
};
