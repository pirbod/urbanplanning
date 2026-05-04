import { AiAssistantPanel } from "../components/ai/AiAssistantPanel";
import { PageShell } from "../components/layout/PageShell";
import type { AiInsight, EnvironmentalArea, Project, PublicComment, Role } from "../types";

interface AiAssistantPageProps {
  role: Role;
  projects: Project[];
  environmentalAreas: EnvironmentalArea[];
  comments: PublicComment[];
  aiInsights: AiInsight[];
}

export const AiAssistantPage = ({ role, projects, environmentalAreas, comments, aiInsights }: AiAssistantPageProps) => (
  <PageShell
    eyebrow="AI-native planning"
    title="AI planning assistant"
    description="Generate deterministic mock summaries for traffic, environmental risk, stakeholder communication, mitigation actions, and approval bottlenecks without calling external APIs."
  >
    <AiAssistantPanel
      role={role}
      projects={projects}
      environmentalAreas={environmentalAreas}
      publicComments={comments}
      seedInsights={aiInsights}
    />
  </PageShell>
);
