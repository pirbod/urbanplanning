import type { PlanningDocument, Project } from "../../types";

interface DocumentTableProps {
  documents: PlanningDocument[];
  projects: Project[];
  selectedDocumentId?: string;
  onSelectDocument: (documentId: string) => void;
}

const statusClass = {
  Draft: "bg-slate-100 text-slate-700",
  "In review": "bg-amber-100 text-amber-800",
  Approved: "bg-moss/12 text-moss",
  Published: "bg-harbor/10 text-harbor",
};

export const DocumentTable = ({ documents, projects, selectedDocumentId, onSelectDocument }: DocumentTableProps) => (
  <div className="overflow-hidden rounded-[1.5rem] border border-ink/10 bg-white/84">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-ink/10 text-sm">
        <thead className="bg-ink text-white">
          <tr>
            {["Document", "Type", "Project", "Owner", "Status", "Updated"].map((header) => (
              <th key={header} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em]">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/10">
          {documents.map((document) => {
            const project = projects.find((item) => item.id === document.projectId);
            return (
              <tr
                key={document.id}
                onClick={() => onSelectDocument(document.id)}
                className={`cursor-pointer transition hover:bg-harbor/10 ${selectedDocumentId === document.id ? "bg-harbor/10" : "bg-white"}`}
              >
                <td className="px-4 py-4 font-semibold text-ink">{document.title}</td>
                <td className="px-4 py-4 text-ink/65">{document.type}</td>
                <td className="px-4 py-4 text-ink/65">{project?.name ?? document.projectId}</td>
                <td className="px-4 py-4 text-ink/65">{document.owner}</td>
                <td className="px-4 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[document.status]}`}>
                    {document.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-ink/55">{document.updatedAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);
