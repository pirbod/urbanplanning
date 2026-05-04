import type { ActivityItem } from "../../types";

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export const ActivityFeed = ({ activities }: ActivityFeedProps) => (
  <div className="rounded-[1.5rem] border border-ink/10 bg-white/80 p-5">
    <div className="flex items-center justify-between">
      <h3 className="font-display text-xl font-semibold text-ink">Recent activity</h3>
      <span className="rounded-full bg-harbor/10 px-3 py-1 text-xs font-semibold text-harbor">Live mock feed</span>
    </div>
    <div className="mt-4 space-y-3">
      {activities.map((activity) => (
        <article key={activity.id} className="rounded-2xl border border-ink/10 bg-paper/65 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-ink">{activity.title}</p>
            <span className="rounded-full bg-white px-2 py-1 text-xs text-ink/55">{activity.type}</span>
          </div>
          <p className="mt-1 text-sm leading-5 text-ink/62">{activity.description}</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink/38">{activity.time}</p>
        </article>
      ))}
    </div>
  </div>
);
