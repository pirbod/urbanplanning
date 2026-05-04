import { ActivityFeed } from "../components/dashboard/ActivityFeed";
import { KpiCard } from "../components/dashboard/KpiCard";
import { PortfolioChart } from "../components/dashboard/PortfolioChart";
import { PageShell } from "../components/layout/PageShell";
import type { ActivityItem, AiInsight, EnvironmentalArea, Project, PublicComment } from "../types";

interface DashboardPageProps {
  projects: Project[];
  comments: PublicComment[];
  environmentalAreas: EnvironmentalArea[];
  activities: ActivityItem[];
  aiInsights: AiInsight[];
}

export const DashboardPage = ({ projects, comments, environmentalAreas, activities, aiInsights }: DashboardPageProps) => {
  const averageApproval = Math.round(projects.reduce((sum, project) => sum + project.approvalProgress, 0) / projects.length);
  const riskAlerts = environmentalAreas.filter((area) => area.severity === "High" || area.severity === "Critical").length;

  return (
    <PageShell
      eyebrow="Executive view"
      title="Urban planning portfolio at a glance"
      description="A business-first dashboard for city planners, leadership teams, and proposal audiences. It shows what the platform coordinates, where risk lives, and why Azure-native modernization matters."
    >
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <KpiCard label="Active projects" value={projects.length} helper="Infrastructure and regeneration portfolio." tone="harbor" />
          <KpiCard label="Open public comments" value={comments.length} helper="Citizen inputs across active plans." tone="moss" />
          <KpiCard label="Risk alerts" value={riskAlerts} helper="Environmental areas needing attention." tone="clay" />
          <KpiCard label="Average approval" value={`${averageApproval}%`} helper="Weighted demo progress signal." tone="ink" />
          <KpiCard label="AI recommendations" value={aiInsights.length} helper="Deterministic mock insights generated." tone="harbor" />
        </div>

        <PortfolioChart projects={projects} />

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
          <ActivityFeed activities={activities} />
          <article className="rounded-[1.5rem] border border-ink/10 bg-harbor p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/58">Demo story</p>
            <h3 className="mt-3 font-display text-2xl font-semibold">From scattered planning tools to one command center</h3>
            <p className="mt-4 text-sm leading-7 text-white/76">
              UrbanTwin Azure Planning PoC combines map-based planning, zoning checks, environmental tracking,
              citizen engagement, document workflows, scheduling, and AI-assisted briefings. The local app is
              intentionally lightweight, while the architecture points toward Azure Static Web Apps, Functions,
              Cosmos DB, Blob Storage, Azure Maps, SignalR, AI Search, and reviewed AI services.
            </p>
            <div className="mt-5 rounded-2xl bg-white/12 p-4 text-sm text-white/80">
              Investor angle: show a focused product wedge with credible enterprise cloud direction and no expensive live cloud dependency for demos.
            </div>
          </article>
        </div>
      </div>
    </PageShell>
  );
};
