import { type FormEvent, useState } from "react";
import type { Project, PublicComment, Sentiment } from "../../types";

interface FeedbackFormProps {
  projects: Project[];
  onAddComment: (comment: PublicComment) => void;
}

export const FeedbackForm = ({ projects, onAddComment }: FeedbackFormProps) => {
  const [anonymous, setAnonymous] = useState(true);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Housing");
  const [comment, setComment] = useState("");
  const [projectId, setProjectId] = useState(projects[0]?.id ?? "");
  const [sentiment, setSentiment] = useState<Sentiment>("neutral");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!comment.trim()) {
      return;
    }

    const project = projects.find((item) => item.id === projectId) ?? projects[0];
    const newComment: PublicComment = {
      id: `COM-${Date.now()}`,
      name: anonymous ? "Anonymous" : name.trim() || "Community member",
      anonymous,
      category,
      comment: comment.trim(),
      sentiment,
      status: "Pending review",
      projectId,
      location: project.location,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    onAddComment(newComment);
    setComment("");
    setName("");
  };

  return (
    <form onSubmit={submit} className="rounded-[1.5rem] border border-ink/10 bg-white/88 p-5">
      <h3 className="font-display text-xl font-semibold text-ink">Submit feedback</h3>
      <p className="mt-2 text-sm leading-6 text-ink/60">
        Public portal input is stored in browser state for the demo. Azure would persist this through Functions and Cosmos DB.
      </p>

      <div className="mt-4 grid gap-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-ink/70">
          <input type="checkbox" checked={anonymous} onChange={(event) => setAnonymous(event.target.checked)} className="h-4 w-4 accent-harbor" />
          Submit anonymously
        </label>

        {!anonymous ? (
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Name or organization"
            className="rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-sm outline-none focus:border-harbor"
          />
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2">
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-sm outline-none focus:border-harbor">
            {["Housing", "Mobility safety", "Flood resilience", "Public space", "Noise", "Economic development", "Construction logistics"].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select value={projectId} onChange={(event) => setProjectId(event.target.value)} className="rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-sm outline-none focus:border-harbor">
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
        </div>

        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Share your comment or concern"
          rows={4}
          className="rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-sm outline-none focus:border-harbor"
        />

        <div className="flex flex-wrap gap-2">
          {(["support", "neutral", "concern"] as Sentiment[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSentiment(option)}
              className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${
                sentiment === option ? "bg-harbor text-white" : "bg-paper text-ink/66"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <button type="submit" className="rounded-2xl bg-harbor px-5 py-3 text-sm font-semibold text-white">
          Submit comment
        </button>
      </div>
    </form>
  );
};
