import type { Project } from "../../types";

interface ProjectTimelineProps {
  projects: Project[];
}

const phaseColors: Record<string, string> = {
  Feasibility: "#0f4c5c",
  "Public consultation": "#4f7d52",
  Approval: "#d97706",
  Procurement: "#7c3aed",
  Construction: "#a85032",
  Handover: "#2563eb",
};

export const ProjectTimeline = ({ projects }: ProjectTimelineProps) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="rounded-[1.5rem] border border-ink/10 bg-white/84 p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-display text-xl font-semibold text-ink">Delivery timeline</h3>
          <p className="mt-1 text-sm text-ink/58">CSS Gantt-style view for phase storytelling.</p>
        </div>
        <span className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-ink/60">2026 working plan</span>
      </div>

      <div className="mt-5 overflow-x-auto">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-[240px_repeat(12,1fr)] gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink/46">
            <div>Project</div>
            {months.map((month) => (
              <div key={month} className="text-center">{month}</div>
            ))}
          </div>

          <div className="mt-3 space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="grid grid-cols-[240px_1fr] items-center gap-3">
                <div>
                  <p className="font-semibold text-ink">{project.name}</p>
                  <p className="text-xs text-ink/50">{project.status}</p>
                </div>
                <div className="timeline-grid relative h-12 rounded-2xl bg-paper/70">
                  {project.phases.slice(0, 4).map((phase, index) => {
                    const left = index * 16.66;
                    return (
                      <div
                        key={`${project.id}-${phase.name}`}
                        className="absolute top-2 h-8 rounded-full px-3 py-2 text-[11px] font-semibold text-white"
                        style={{
                          left: `${left}%`,
                          width: "15.5%",
                          backgroundColor: phaseColors[phase.name],
                          opacity: phase.complete ? 0.95 : 0.72,
                        }}
                      >
                        {phase.name}
                      </div>
                    );
                  })}
                  <div
                    className="absolute top-2 h-8 rounded-full bg-clay px-3 py-2 text-[11px] font-semibold text-white"
                    style={{ left: "66.5%", width: "22%" }}
                  >
                    Construction
                  </div>
                  <div
                    className="absolute top-2 h-8 rounded-full bg-blue-600 px-3 py-2 text-[11px] font-semibold text-white"
                    style={{ left: "90%", width: "9%" }}
                  >
                    Handover
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
