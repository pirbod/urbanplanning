import { useState } from "react";
import { DocumentTable } from "../components/documents/DocumentTable";
import { WorkflowPanel } from "../components/documents/WorkflowPanel";
import { PageShell } from "../components/layout/PageShell";
import type { PlanningDocument, Project, Role } from "../types";

interface DocumentsPageProps {
  role: Role;
  documents: PlanningDocument[];
  projects: Project[];
  onUpdateDocument: (documentId: string, action: "submit" | "approve" | "changes") => void;
}

export const DocumentsPage = ({ role, documents, projects, onUpdateDocument }: DocumentsPageProps) => {
  const [selectedDocumentId, setSelectedDocumentId] = useState(documents[0]?.id);
  const selectedDocument = documents.find((document) => document.id === selectedDocumentId);

  return (
    <PageShell
      eyebrow="Document automation"
      title="Document and workflow center"
      description="Manage planning reports, environmental assessments, consultation summaries, traffic analysis, and council memos with a mock approval workflow."
      aside={<WorkflowPanel document={selectedDocument} role={role} onUpdateStatus={onUpdateDocument} />}
    >
      <DocumentTable
        documents={documents}
        projects={projects}
        selectedDocumentId={selectedDocumentId}
        onSelectDocument={setSelectedDocumentId}
      />
    </PageShell>
  );
};
