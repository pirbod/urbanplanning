import type { AiInsight, EnvironmentalArea, Project, PublicComment } from "../types";

type AiAction =
  | "traffic"
  | "environment"
  | "briefing"
  | "mitigation";

export const aiActionLabels: Record<AiAction, string> = {
  traffic: "Generate traffic impact summary",
  environment: "Generate environmental risk summary",
  briefing: "Generate stakeholder briefing",
  mitigation: "Suggest mitigation actions",
};

export const createMockInsight = (
  action: AiAction,
  project: Project,
  environmentalAreas: EnvironmentalArea[],
  publicComments: PublicComment[],
): AiInsight => {
  const linkedRisks = environmentalAreas.filter((area) => project.environmentalAreaIds.includes(area.id));
  const comments = publicComments.filter((comment) => comment.projectId === project.id);
  const concernCount = comments.filter((comment) => comment.sentiment === "concern").length;
  const supportCount = comments.filter((comment) => comment.sentiment === "support").length;
  const highestRisk = linkedRisks.sort((a, b) => b.score - a.score)[0];

  const templates: Record<AiAction, AiInsight> = {
    traffic: {
      id: `AI-${project.id}-TRAFFIC`,
      projectId: project.id,
      category: "Traffic",
      title: `${project.name} traffic impact summary`,
      body: `${project.name} is expected to create a localized mobility impact during ${project.status.toLowerCase()}. Prioritize construction logistics, protected crossings, and public transport integration. Current public feedback shows ${supportCount} support signals and ${concernCount} concern signals.`,
      confidence: project.riskLevel === "High" ? 76 : 84,
      sources: ["Mock mobility corridors", "Project schedule", "Public feedback"],
    },
    environment: {
      id: `AI-${project.id}-ENVIRONMENT`,
      projectId: project.id,
      category: "Environment",
      title: `${project.name} environmental risk summary`,
      body: highestRisk
        ? `The strongest environmental signal is ${highestRisk.name} with a score of ${highestRisk.score}. The approval pack should show mitigation ownership, monitoring triggers, and design changes before the next gate.`
        : "No high-risk environmental areas are linked to this project in the mock dataset. Continue standard screening and document assumptions.",
      confidence: highestRisk ? Math.min(91, highestRisk.score + 8) : 72,
      sources: ["Environmental risk areas", "Zoning rules", "Project links"],
    },
    briefing: {
      id: `AI-${project.id}-BRIEFING`,
      projectId: project.id,
      category: "Stakeholder",
      title: `${project.name} stakeholder briefing`,
      body: `${project.name} is a ${project.type.toLowerCase()} project in ${project.district}. It is ${project.approvalProgress}% through approval, carries ${project.riskLevel.toLowerCase()} delivery risk, and should be framed around public value, transparency, and schedule certainty.`,
      confidence: 80,
      sources: ["Project record", "Approval status", "Public comments"],
    },
    mitigation: {
      id: `AI-${project.id}-MITIGATION`,
      projectId: project.id,
      category: "Mitigation",
      title: `${project.name} mitigation actions`,
      body: linkedRisks.length
        ? `Recommended actions: ${linkedRisks.flatMap((area) => area.mitigationActions).slice(0, 4).join("; ")}. Assign owners before procurement and publish citizen-facing updates.`
        : "Recommended actions: keep a decision log, publish plain-language updates, and confirm design compliance before procurement.",
      confidence: 83,
      sources: ["Risk mitigations", "Workflow state", "Mock AI rules"],
    },
  };

  return templates[action];
};

export type { AiAction };
