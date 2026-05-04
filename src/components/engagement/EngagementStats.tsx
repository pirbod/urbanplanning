import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { Project, PublicComment } from "../../types";

interface EngagementStatsProps {
  comments: PublicComment[];
  projects: Project[];
}

const colors = ["#4f7d52", "#64748b", "#dc2626", "#0f4c5c", "#a85032"];

export const EngagementStats = ({ comments, projects }: EngagementStatsProps) => {
  const categoryData = Object.values(
    comments.reduce<Record<string, { name: string; value: number }>>((acc, comment) => {
      acc[comment.category] = acc[comment.category] ?? { name: comment.category, value: 0 };
      acc[comment.category].value += 1;
      return acc;
    }, {}),
  );

  const sentimentData = Object.values(
    comments.reduce<Record<string, { name: string; value: number }>>((acc, comment) => {
      acc[comment.sentiment] = acc[comment.sentiment] ?? { name: comment.sentiment, value: 0 };
      acc[comment.sentiment].value += 1;
      return acc;
    }, {}),
  );

  const mostDiscussed = Object.entries(
    comments.reduce<Record<string, number>>((acc, comment) => {
      acc[comment.projectId] = (acc[comment.projectId] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1])[0];

  const mostDiscussedProject = projects.find((project) => project.id === mostDiscussed?.[0]);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <article className="rounded-[1.5rem] border border-ink/10 bg-white/84 p-5">
        <h3 className="font-display text-lg font-semibold text-ink">Comments by category</h3>
        <div className="mt-3 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={70}>
                {categoryData.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </article>
      <article className="rounded-[1.5rem] border border-ink/10 bg-white/84 p-5">
        <h3 className="font-display text-lg font-semibold text-ink">Sentiment split</h3>
        <div className="mt-3 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={sentimentData} dataKey="value" nameKey="name" innerRadius={38} outerRadius={70}>
                {sentimentData.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </article>
      <article className="rounded-[1.5rem] border border-ink/10 bg-harbor p-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/58">Most discussed project</p>
        <h3 className="mt-3 font-display text-2xl font-semibold">{mostDiscussedProject?.name ?? "No comments yet"}</h3>
        <p className="mt-3 text-sm leading-6 text-white/72">
          {mostDiscussed ? `${mostDiscussed[1]} public comments in the local engagement dataset.` : "Submit a comment to populate this card."}
        </p>
      </article>
    </div>
  );
};
