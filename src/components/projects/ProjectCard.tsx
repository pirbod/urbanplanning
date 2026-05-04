import type { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
}

const riskClasses = {
  Low: "bg-moss/12 text-moss",
  Medium: "bg-amber-100 text-amber-800",
  High: "bg-clay/12 text-clay",
  Critical: "bg-red-100 text-red-700",
};

export const ProjectCard = ({ project }: ProjectCardProps) => (
  <article className="rounded-[1.5rem] border border-ink/10 bg-white/84 p-5">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-harbor">{project.district}</p>
        <h3 className="mt-2 font-display text-xl font-semibold text-ink">{project.name}</h3>
        <p className="mt-2 text-sm leading-6 text-ink/62">{project.description}</p>
      </div>
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${riskClasses[project.riskLevel]}`}>{project.riskLevel}</span>
    </div>

    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl bg-paper/70 p-3">
        <p className="text-xs uppercase tracking-[0.16em] text-ink/42">Budget</p>
        <p className="mt-1 font-semibold text-ink">{project.budgetEstimate}</p>
      </div>
      <div className="rounded-2xl bg-paper/70 p-3">
        <p className="text-xs uppercase tracking-[0.16em] text-ink/42">Team</p>
        <p className="mt-1 font-semibold text-ink">{project.responsibleTeam}</p>
      </div>
      <div className="rounded-2xl bg-paper/70 p-3">
        <p className="text-xs uppercase tracking-[0.16em] text-ink/42">Dates</p>
        <p className="mt-1 font-semibold text-ink">{project.startDate} to {project.endDate}</p>
      </div>
      <div className="rounded-2xl bg-paper/70 p-3">
        <p className="text-xs uppercase tracking-[0.16em] text-ink/42">Approval</p>
        <div className="mt-2 h-2 rounded-full bg-ink/10">
          <div className="h-2 rounded-full bg-harbor" style={{ width: `${project.approvalProgress}%` }} />
        </div>
        <p className="mt-1 text-xs font-semibold text-ink/62">{project.approvalProgress}% complete</p>
      </div>
    </div>

    <div className="mt-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/42">Milestones</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {project.milestones.map((milestone) => (
          <span key={milestone} className="rounded-full bg-harbor/10 px-3 py-1 text-xs font-semibold text-harbor">
            {milestone}
          </span>
        ))}
      </div>
    </div>
  </article>
);
