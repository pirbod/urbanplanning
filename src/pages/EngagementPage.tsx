import { CommentList } from "../components/engagement/CommentList";
import { EngagementStats } from "../components/engagement/EngagementStats";
import { FeedbackForm } from "../components/engagement/FeedbackForm";
import { PageShell } from "../components/layout/PageShell";
import type { Project, PublicComment, Role } from "../types";

interface EngagementPageProps {
  role: Role;
  comments: PublicComment[];
  projects: Project[];
  onAddComment: (comment: PublicComment) => void;
}

export const EngagementPage = ({ role, comments, projects, onAddComment }: EngagementPageProps) => {
  const publicMode = role === "Public User";

  return (
    <PageShell
      eyebrow={publicMode ? "Public portal mode" : "Engagement operations"}
      title={publicMode ? "Planning projects open for feedback" : "Public engagement portal"}
      description={
        publicMode
          ? "A simpler citizen-facing view for transparent project information and safe feedback submission."
          : "Collect, moderate, and understand public feedback with category, sentiment, project linkage, and moderation state."
      }
    >
      <div className="space-y-5">
        {!publicMode ? <EngagementStats comments={comments} projects={projects} /> : null}

        <div className="grid gap-5 xl:grid-cols-[420px_minmax(0,1fr)]">
          <FeedbackForm projects={projects} onAddComment={onAddComment} />
          <CommentList comments={comments} projects={projects} />
        </div>

        {publicMode ? (
          <div className="rounded-[1.5rem] border border-moss/20 bg-moss/10 p-5 text-sm leading-6 text-moss">
            Public portal mode hides internal approval and architecture controls. Submitted comments are still visible in this local demo.
          </div>
        ) : null}
      </div>
    </PageShell>
  );
};
