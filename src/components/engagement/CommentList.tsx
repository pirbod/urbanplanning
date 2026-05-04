import type { Project, PublicComment } from "../../types";

interface CommentListProps {
  comments: PublicComment[];
  projects: Project[];
}

const sentimentClass = {
  support: "bg-moss/12 text-moss",
  neutral: "bg-slate-100 text-slate-700",
  concern: "bg-red-100 text-red-700",
};

export const CommentList = ({ comments, projects }: CommentListProps) => (
  <div className="rounded-[1.5rem] border border-ink/10 bg-white/84 p-5">
    <h3 className="font-display text-xl font-semibold text-ink">Public comments</h3>
    <div className="mt-4 space-y-3">
      {comments.length ? (
        comments.map((comment) => {
          const project = projects.find((item) => item.id === comment.projectId);
          return (
            <article key={comment.id} className="rounded-2xl border border-ink/10 bg-paper/65 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-ink">{comment.anonymous ? "Anonymous" : comment.name}</p>
                <div className="flex flex-wrap gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${sentimentClass[comment.sentiment]}`}>{comment.sentiment}</span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink/60">{comment.status}</span>
                </div>
              </div>
              <p className="mt-2 text-sm leading-6 text-ink/68">{comment.comment}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink/42">
                {comment.category} | {project?.name ?? comment.projectId} | {comment.createdAt}
              </p>
            </article>
          );
        })
      ) : (
        <div className="rounded-2xl bg-paper p-5 text-sm text-ink/58">No comments match the current view.</div>
      )}
    </div>
  </div>
);
