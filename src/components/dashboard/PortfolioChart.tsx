import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Project } from "../../types";

interface PortfolioChartProps {
  projects: Project[];
}

const colors = ["#0f4c5c", "#4f7d52", "#a85032", "#7c3aed", "#2563eb", "#d97706"];

export const PortfolioChart = ({ projects }: PortfolioChartProps) => {
  const districtData = Object.values(
    projects.reduce<Record<string, { district: string; budget: number }>>((acc, project) => {
      const value = Number(project.budgetEstimate.replace(/[^0-9.]/g, ""));
      acc[project.district] = acc[project.district] ?? { district: project.district, budget: 0 };
      acc[project.district].budget += value;
      return acc;
    }, {}),
  );

  const statusData = Object.values(
    projects.reduce<Record<string, { name: string; value: number }>>((acc, project) => {
      acc[project.status] = acc[project.status] ?? { name: project.status, value: 0 };
      acc[project.status].value += 1;
      return acc;
    }, {}),
  );

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <article className="rounded-[1.5rem] border border-ink/10 bg-white/80 p-5">
        <h3 className="font-display text-xl font-semibold text-ink">Planning portfolio by district</h3>
        <p className="mt-1 text-sm text-ink/58">Budget exposure in millions of EUR.</p>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={districtData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d9dedb" />
              <XAxis dataKey="district" tick={{ fontSize: 11 }} interval={0} angle={-15} textAnchor="end" height={70} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="budget" radius={[10, 10, 0, 0]}>
                {districtData.map((entry, index) => (
                  <Cell key={entry.district} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="rounded-[1.5rem] border border-ink/10 bg-white/80 p-5">
        <h3 className="font-display text-xl font-semibold text-ink">Project status distribution</h3>
        <p className="mt-1 text-sm text-ink/58">Current phase mix across the mock portfolio.</p>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={statusData} innerRadius={55} outerRadius={92} dataKey="value" nameKey="name" paddingAngle={3}>
                {statusData.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {statusData.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
              <span className="text-ink/62">{item.name}</span>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};
