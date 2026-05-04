import type { Role } from "../../types";
import { canSeeAdminPanels } from "../../utils/rolePermissions";

export type PageId =
  | "dashboard"
  | "map"
  | "zoning"
  | "environment"
  | "projects"
  | "engagement"
  | "ai"
  | "documents"
  | "architecture";

const navItems: { id: PageId; label: string; helper: string }[] = [
  { id: "dashboard", label: "Executive Overview", helper: "Portfolio value" },
  { id: "map", label: "Planning Map", helper: "Layer command center" },
  { id: "zoning", label: "Zoning and Land Use", helper: "Regulatory checks" },
  { id: "environment", label: "Environmental Tracker", helper: "Risk and mitigation" },
  { id: "projects", label: "Project Scheduling", helper: "Long-term delivery" },
  { id: "engagement", label: "Public Engagement", helper: "Citizen feedback" },
  { id: "ai", label: "AI Assistant", helper: "Mock insights" },
  { id: "documents", label: "Workflow Center", helper: "Approvals and audit" },
  { id: "architecture", label: "Azure Readiness", helper: "Target architecture" },
];

interface SidebarProps {
  activePage: PageId;
  role: Role;
  onNavigate: (page: PageId) => void;
}

export const Sidebar = ({ activePage, role, onNavigate }: SidebarProps) => {
  return (
    <aside className="flex h-full flex-col border-r border-white/60 bg-ink text-white">
      <div className="px-5 py-6">
        <p className="text-xs uppercase tracking-[0.32em] text-white/50">UrbanTwin</p>
        <h1 className="mt-2 font-display text-2xl font-semibold leading-tight">Azure Planning PoC</h1>
        <p className="mt-3 text-sm text-white/62">
          A local demo command center for planning, engagement, and Azure-ready delivery.
        </p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          const isAdminHint = item.id === "architecture" && !canSeeAdminPanels(role);

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`w-full rounded-2xl px-4 py-3 text-left transition ${
                isActive
                  ? "bg-paper text-ink shadow-command"
                  : "text-white/74 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="block text-sm font-semibold">{item.label}</span>
              <span className={`mt-1 block text-xs ${isActive ? "text-ink/60" : "text-white/42"}`}>
                {isAdminHint ? "Admin extras hidden" : item.helper}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="m-4 rounded-2xl bg-white/10 p-4 text-sm text-white/70">
        <p className="font-semibold text-white">Demo data only</p>
        <p className="mt-1">No external secrets, paid services, or live Azure resources are required locally.</p>
      </div>
    </aside>
  );
};
