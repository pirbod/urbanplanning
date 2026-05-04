import { useMemo, useState } from "react";
import { PageShell } from "../components/layout/PageShell";
import { ProjectCard } from "../components/projects/ProjectCard";
import { ProjectTimeline } from "../components/projects/ProjectTimeline";
import type { Project, ProjectStatus } from "../types";

interface ProjectsPageProps {
  projects: Project[];
}

export const ProjectsPage = ({ projects }: ProjectsPageProps) => {
  const [status, setStatus] = useState<ProjectStatus | "All">("All");
  const [district, setDistrict] = useState("All");
  const districts = Array.from(new Set(projects.map((project) => project.district)));
  const statuses = Array.from(new Set(projects.map((project) => project.status))) as ProjectStatus[];

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        const statusMatches = status === "All" || project.status === status;
        const districtMatches = district === "All" || project.district === district;
        return statusMatches && districtMatches;
      }),
    [district, projects, status],
  );

  return (
    <PageShell
      eyebrow="Infrastructure delivery"
      title="Project scheduling dashboard"
      description="Coordinate long-running planning initiatives with phases, dependencies, milestones, budget, teams, progress, and risk."
      actions={
        <>
          <select value={status} onChange={(event) => setStatus(event.target.value as ProjectStatus | "All")} className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-semibold text-ink">
            <option value="All">All statuses</option>
            {statuses.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select value={district} onChange={(event) => setDistrict(event.target.value)} className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm font-semibold text-ink">
            <option value="All">All districts</option>
            {districts.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </>
      }
    >
      <div className="space-y-5">
        <ProjectTimeline projects={filteredProjects} />
        {filteredProjects.length ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-ink/10 bg-white/84 p-8 text-center text-ink/60">
            No projects match the selected filters.
          </div>
        )}
      </div>
    </PageShell>
  );
};
