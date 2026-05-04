import { EnvironmentalAreaList } from "../components/environment/EnvironmentalAreaList";
import { RiskMatrix } from "../components/environment/RiskMatrix";
import { KpiCard } from "../components/dashboard/KpiCard";
import { PageShell } from "../components/layout/PageShell";
import type { EnvironmentalArea, Project } from "../types";

interface EnvironmentPageProps {
  areas: EnvironmentalArea[];
  projects: Project[];
}

export const EnvironmentPage = ({ areas, projects }: EnvironmentPageProps) => {
  const averageScore = Math.round(areas.reduce((sum, area) => sum + area.score, 0) / areas.length);
  const highRisks = areas.filter((area) => area.severity === "High" || area.severity === "Critical").length;
  const linkedProjects = new Set(areas.flatMap((area) => area.linkedProjectIds)).size;

  return (
    <PageShell
      eyebrow="Impact tracking"
      title="Environmental impact tracker"
      description="Track flood sensitivity, protected habitats, noise exposure, air quality, and heat island mitigation across the planning portfolio."
    >
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-3">
          <KpiCard label="Average risk score" value={averageScore} helper="Composite score across mock risk areas." tone="clay" />
          <KpiCard label="High risk areas" value={highRisks} helper="Areas requiring mitigation or review evidence." tone="harbor" />
          <KpiCard label="Linked projects" value={linkedProjects} helper="Projects near or overlapping environmental constraints." tone="moss" />
        </div>
        <RiskMatrix areas={areas} />
        <EnvironmentalAreaList areas={areas} projects={projects} />
      </div>
    </PageShell>
  );
};
