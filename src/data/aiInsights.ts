import type { AiInsight } from "../types";

export const aiInsights: AiInsight[] = [
  {
    id: "AI-001",
    projectId: "PRJ-002",
    category: "Traffic",
    title: "Traffic increase prediction",
    body: "Peak-hour vehicle trips are likely to rise by 6 to 9 percent unless shared mobility and cargo-bike logistics are included in the first delivery phase.",
    confidence: 82,
    sources: ["Project phasing", "Mobility corridor layer", "Public feedback themes"],
  },
  {
    id: "AI-002",
    projectId: "PRJ-002",
    category: "Environment",
    title: "Environmental mitigation recommendation",
    body: "Flood resilience and habitat buffers are the main approval risks. Pair raised thresholds with a continuous planted edge and low-light public realm design.",
    confidence: 86,
    sources: ["Flood sensitivity buffer", "Protected habitat link", "Zoning rules"],
  },
  {
    id: "AI-003",
    projectId: "PRJ-006",
    category: "Stakeholder",
    title: "Public objection risk",
    body: "Objection risk is moderate-high because noise concerns and construction timing are concentrated near the site. A transparent work-hours charter would reduce escalation risk.",
    confidence: 78,
    sources: ["Public comments", "Noise exposure layer", "Project milestones"],
  },
  {
    id: "AI-004",
    projectId: "PRJ-001",
    category: "Approval",
    title: "Approval bottleneck forecast",
    body: "Utility relocation and school crossing design are the most likely schedule bottlenecks. Resolve both before procurement to avoid late-stage scope changes.",
    confidence: 74,
    sources: ["Dependencies", "Public comments", "Project schedule"],
  },
];
