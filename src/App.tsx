import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/layout/Header";
import { Sidebar, type PageId } from "./components/layout/Sidebar";
import { activities } from "./data/activities";
import { aiInsights } from "./data/aiInsights";
import { documents as seedDocuments } from "./data/documents";
import { environmentalAreas } from "./data/environmentalAreas";
import { projects } from "./data/projects";
import { publicComments as seedComments } from "./data/publicComments";
import { zones } from "./data/zones";
import { AiAssistantPage } from "./pages/AiAssistantPage";
import { ArchitecturePage } from "./pages/ArchitecturePage";
import { DashboardPage } from "./pages/DashboardPage";
import { DocumentsPage } from "./pages/DocumentsPage";
import { EngagementPage } from "./pages/EngagementPage";
import { EnvironmentPage } from "./pages/EnvironmentPage";
import { MapPage } from "./pages/MapPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ZoningPage } from "./pages/ZoningPage";
import type { PlanningDocument, PublicComment, Role } from "./types";

const loadLocalState = <T,>(key: string, fallback: T): T => {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

const persistLocalState = <T,>(key: string, value: T) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Local persistence is best effort so the demo still works in privacy-restricted browsers.
  }
};

export default function App() {
  const [activePage, setActivePage] = useState<PageId>("dashboard");
  const [role, setRole] = useState<Role>("Admin");
  const [comments, setComments] = useState<PublicComment[]>(() => loadLocalState("urbantwin-comments", seedComments));
  const [documents, setDocuments] = useState<PlanningDocument[]>(() => loadLocalState("urbantwin-documents", seedDocuments));
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => persistLocalState("urbantwin-comments", comments), [comments]);
  useEffect(() => persistLocalState("urbantwin-documents", documents), [documents]);

  useEffect(() => {
    if (!notification) {
      return;
    }
    const timer = window.setTimeout(() => setNotification(null), 3200);
    return () => window.clearTimeout(timer);
  }, [notification]);

  const notify = (message: string) => setNotification(message);

  const handleAddComment = (comment: PublicComment) => {
    setComments((current) => [comment, ...current]);
    notify("Public feedback submitted and added to the local moderation queue.");
  };

  const handleDocumentUpdate = (documentId: string, action: "submit" | "approve" | "changes") => {
    const actionLabels = {
      submit: "Submitted for review",
      approve: "Approved by reviewer",
      changes: "Changes requested",
    };

    setDocuments((current) =>
      current.map((document) => {
        if (document.id !== documentId) {
          return document;
        }

        const nextStatus = action === "submit" ? "In review" : action === "approve" ? "Approved" : "Draft";
        return {
          ...document,
          status: nextStatus,
          updatedAt: new Date().toISOString().slice(0, 10),
          auditTrail: [`${actionLabels[action]} as ${role}`, ...document.auditTrail],
        };
      }),
    );
    notify(`Document workflow updated: ${actionLabels[action]}.`);
  };

  const activePageTitle = useMemo(() => {
    const labels: Record<PageId, string> = {
      dashboard: "Executive Overview",
      map: "Interactive Planning Map",
      zoning: "Zoning and Land Use",
      environment: "Environmental Impact",
      projects: "Project Scheduling",
      engagement: "Public Engagement",
      ai: "AI Planning Assistant",
      documents: "Document Workflow",
      architecture: "Azure Readiness",
    };
    return labels[activePage];
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage projects={projects} comments={comments} environmentalAreas={environmentalAreas} activities={activities} aiInsights={aiInsights} />;
      case "map":
        return <MapPage role={role} zones={zones} projects={projects} environmentalAreas={environmentalAreas} comments={comments} notify={notify} />;
      case "zoning":
        return <ZoningPage role={role} zones={zones} projects={projects} environmentalAreas={environmentalAreas} />;
      case "environment":
        return <EnvironmentPage areas={environmentalAreas} projects={projects} />;
      case "projects":
        return <ProjectsPage projects={projects} />;
      case "engagement":
        return <EngagementPage role={role} comments={comments} projects={projects} onAddComment={handleAddComment} />;
      case "ai":
        return <AiAssistantPage role={role} projects={projects} environmentalAreas={environmentalAreas} comments={comments} aiInsights={aiInsights} />;
      case "documents":
        return <DocumentsPage role={role} documents={documents} projects={projects} onUpdateDocument={handleDocumentUpdate} />;
      case "architecture":
        return <ArchitecturePage role={role} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#d8e7e1_0,#f5efe4_34%,#e7ddd1_100%)]">
      <div className="grid min-h-screen lg:grid-cols-[300px_minmax(0,1fr)]">
        <Sidebar activePage={activePage} role={role} onNavigate={setActivePage} />
        <div className="flex min-w-0 flex-col">
          <Header role={role} onRoleChange={setRole} />
          <main className="min-w-0 flex-1 overflow-y-auto p-4 lg:p-6">
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/70 bg-white/50 px-4 py-3 text-sm text-ink/58">
              <span>{activePageTitle}</span>
              <span>Local mock environment</span>
            </div>
            {renderPage()}
          </main>
        </div>
      </div>

      {notification ? (
        <div className="fixed bottom-5 right-5 z-[1000] max-w-sm rounded-2xl bg-ink px-5 py-4 text-sm font-semibold text-white shadow-command">
          {notification}
        </div>
      ) : null}
    </div>
  );
}
