import type { PlanningDocument, Role } from "../../types";
import { canApproveDocuments, canEditPlanningData } from "../../utils/rolePermissions";

interface WorkflowPanelProps {
  document?: PlanningDocument;
  role: Role;
  onUpdateStatus: (documentId: string, action: "submit" | "approve" | "changes") => void;
}

export const WorkflowPanel = ({ document, role, onUpdateStatus }: WorkflowPanelProps) => {
  if (!document) {
    return (
      <div className="rounded-[1.5rem] border border-ink/10 bg-white/88 p-5">
        <h3 className="font-display text-xl font-semibold text-ink">Workflow</h3>
        <p className="mt-2 text-sm leading-6 text-ink/60">Select a document to inspect its state and audit trail.</p>
      </div>
    );
  }

  return (
    <div className="rounded-[1.5rem] border border-ink/10 bg-white/88 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-harbor">Selected document</p>
      <h3 className="mt-2 font-display text-xl font-semibold text-ink">{document.title}</h3>
      <p className="mt-2 text-sm text-ink/60">{document.owner}</p>

      <div className="mt-5 grid gap-2">
        <button
          type="button"
          disabled={!canEditPlanningData(role) || document.status !== "Draft"}
          onClick={() => onUpdateStatus(document.id, "submit")}
          className="rounded-2xl bg-harbor px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-ink/20"
        >
          Submit for review
        </button>
        <button
          type="button"
          disabled={!canApproveDocuments(role) || document.status !== "In review"}
          onClick={() => onUpdateStatus(document.id, "approve")}
          className="rounded-2xl bg-moss px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-ink/20"
        >
          Approve
        </button>
        <button
          type="button"
          disabled={!canApproveDocuments(role) || document.status !== "In review"}
          onClick={() => onUpdateStatus(document.id, "changes")}
          className="rounded-2xl border border-clay/20 bg-clay/10 px-4 py-3 text-sm font-semibold text-clay disabled:cursor-not-allowed disabled:opacity-45"
        >
          Request changes
        </button>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/42">Audit trail</p>
        <div className="mt-3 space-y-2">
          {document.auditTrail.map((entry) => (
            <div key={entry} className="rounded-xl bg-paper px-3 py-2 text-sm text-ink/68">
              {entry}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
