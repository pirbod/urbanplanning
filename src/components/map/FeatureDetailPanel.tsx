import type { Role, SelectedMapFeature } from "../../types";
import { canEditPlanningData, canRunAiActions } from "../../utils/rolePermissions";

interface FeatureDetailPanelProps {
  selectedFeature?: SelectedMapFeature;
  role: Role;
  onRunAi: () => void;
  onExport: () => void;
  onCreateNote: () => void;
  onStakeholderUpdate: () => void;
}

export const FeatureDetailPanel = ({
  selectedFeature,
  role,
  onRunAi,
  onExport,
  onCreateNote,
  onStakeholderUpdate,
}: FeatureDetailPanelProps) => {
  if (!selectedFeature) {
    return (
      <div className="rounded-[1.5rem] border border-ink/10 bg-white/88 p-5">
        <h3 className="font-display text-xl font-semibold text-ink">Feature details</h3>
        <p className="mt-2 text-sm leading-6 text-ink/60">
          Select a zoning polygon, project, environmental area, mobility corridor, or public comment to inspect the planning evidence.
        </p>
        <div className="mt-4 rounded-2xl bg-harbor/10 p-4 text-sm text-harbor">
          Tip: the Spree Riverside Mixed-Use Quarter is a strong demo path because it touches zoning, flood risk, habitat buffers, and public feedback.
        </div>
      </div>
    );
  }

  const aiAllowed = canRunAiActions(role);
  const editAllowed = canEditPlanningData(role);

  return (
    <div className="rounded-[1.5rem] border border-ink/10 bg-white/88 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-harbor">{selectedFeature.kind}</p>
          <h3 className="mt-2 font-display text-xl font-semibold text-ink">{selectedFeature.title}</h3>
          <p className="mt-1 text-sm text-ink/58">{selectedFeature.subtitle}</p>
        </div>
        <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">{selectedFeature.id}</span>
      </div>

      <dl className="mt-4 space-y-3">
        {Object.entries(selectedFeature.properties).map(([key, value]) => (
          <div key={key} className="rounded-2xl border border-ink/10 bg-paper/55 p-3">
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/42">{key}</dt>
            <dd className="mt-1 text-sm font-semibold text-ink">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 grid gap-2">
        <button
          type="button"
          onClick={onRunAi}
          disabled={!aiAllowed}
          className="rounded-2xl bg-harbor px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-ink/20"
        >
          Run AI impact analysis
        </button>
        <button type="button" onClick={onExport} className="rounded-2xl border border-harbor/25 bg-white px-4 py-3 text-sm font-semibold text-harbor">
          Export GeoJSON
        </button>
        <button
          type="button"
          onClick={onCreateNote}
          disabled={!editAllowed}
          className="rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-sm font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-45"
        >
          Create planning note
        </button>
        <button
          type="button"
          onClick={onStakeholderUpdate}
          disabled={role === "Public User"}
          className="rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-sm font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-45"
        >
          Simulate stakeholder update
        </button>
      </div>
    </div>
  );
};
