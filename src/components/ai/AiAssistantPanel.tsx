import { useState } from "react";
import type { AiInsight, EnvironmentalArea, Project, PublicComment, Role } from "../../types";
import { aiActionLabels, createMockInsight, type AiAction } from "../../utils/aiMock";
import { canRunAiActions } from "../../utils/rolePermissions";
import { InsightCard } from "./InsightCard";

interface AiAssistantPanelProps {
  role: Role;
  projects: Project[];
  environmentalAreas: EnvironmentalArea[];
  publicComments: PublicComment[];
  seedInsights: AiInsight[];
}

export const AiAssistantPanel = ({
  role,
  projects,
  environmentalAreas,
  publicComments,
  seedInsights,
}: AiAssistantPanelProps) => {
  const [projectId, setProjectId] = useState(projects[1]?.id ?? projects[0]?.id ?? "");
  const [generatedInsight, setGeneratedInsight] = useState<AiInsight | null>(seedInsights[0] ?? null);
  const selectedProject = projects.find((project) => project.id === projectId) ?? projects[0];
  const aiAllowed = canRunAiActions(role);

  const runAction = (action: AiAction) => {
    if (!selectedProject || !aiAllowed) {
      return;
    }
    setGeneratedInsight(createMockInsight(action, selectedProject, environmentalAreas, publicComments));
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
      <aside className="rounded-[1.5rem] border border-ink/10 bg-white/88 p-5">
        <h3 className="font-display text-xl font-semibold text-ink">Planning assistant</h3>
        <p className="mt-2 text-sm leading-6 text-ink/60">
          Deterministic mock AI responses show where Azure Machine Learning or Azure OpenAI-ready endpoints would connect later.
        </p>

        <label className="mt-5 block text-xs font-semibold uppercase tracking-[0.16em] text-ink/42">Project</label>
        <select
          value={projectId}
          onChange={(event) => setProjectId(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-sm font-semibold text-ink outline-none focus:border-harbor"
        >
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>

        <div className="mt-5 grid gap-2">
          {(Object.keys(aiActionLabels) as AiAction[]).map((action) => (
            <button
              key={action}
              type="button"
              onClick={() => runAction(action)}
              disabled={!aiAllowed}
              className="rounded-2xl bg-harbor px-4 py-3 text-left text-sm font-semibold text-white hover:bg-ink disabled:cursor-not-allowed disabled:bg-ink/20"
            >
              {aiActionLabels[action]}
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-2xl bg-clay/10 p-4 text-sm leading-6 text-clay">
          {aiAllowed
            ? "Demo AI output. Final planning decisions require expert review."
            : "Public User mode can read public information, but internal AI actions are disabled."}
        </div>
      </aside>

      <div className="space-y-5">
        {generatedInsight ? <InsightCard insight={generatedInsight} /> : null}
        <div className="rounded-[1.5rem] border border-ink/10 bg-ink p-5 text-white">
          <h3 className="font-display text-xl font-semibold">Example insight coverage</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {[
              "Traffic increase prediction",
              "Public objection risk",
              "Environmental mitigation recommendation",
              "Approval bottleneck forecast",
            ].map((example) => (
              <div key={example} className="rounded-2xl bg-white/10 p-4 text-sm font-semibold text-white/86">
                {example}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
