import type { EnvironmentalArea, Project } from "../../types";

interface EnvironmentalAreaListProps {
  areas: EnvironmentalArea[];
  projects: Project[];
}

export const EnvironmentalAreaList = ({ areas, projects }: EnvironmentalAreaListProps) => (
  <div className="grid gap-4 lg:grid-cols-2">
    {areas.map((area) => {
      const linkedProjects = projects.filter((project) => area.linkedProjectIds.includes(project.id));
      return (
        <article key={area.id} className="rounded-[1.5rem] border border-ink/10 bg-white/84 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-harbor">{area.type}</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink">{area.name}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/62">{area.description}</p>
            </div>
            <span className="rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ backgroundColor: area.color }}>
              {area.score}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">{area.severity}</span>
            <span className="rounded-full bg-harbor/10 px-3 py-1 text-xs font-semibold text-harbor">{area.assessmentStatus}</span>
          </div>

          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/42">Mitigation actions</p>
            <ul className="mt-2 space-y-2 text-sm text-ink/68">
              {area.mitigationActions.map((action) => (
                <li key={action} className="rounded-xl bg-paper px-3 py-2">
                  {action}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/42">Linked projects</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {linkedProjects.length ? (
                linkedProjects.map((project) => (
                  <span key={project.id} className="rounded-full bg-ink/10 px-3 py-1 text-xs font-semibold text-ink/70">
                    {project.name}
                  </span>
                ))
              ) : (
                <span className="text-sm text-ink/50">No linked projects in mock data.</span>
              )}
            </div>
          </div>
        </article>
      );
    })}
  </div>
);
