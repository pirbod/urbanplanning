import type { Feature, Geometry, Polygon, Point, LineString } from "geojson";

export type Role = "Admin" | "Planner" | "Reviewer" | "Public User";

export type RiskLevel = "Low" | "Medium" | "High" | "Critical";

export type ProjectStatus =
  | "Feasibility"
  | "Public consultation"
  | "Approval"
  | "Procurement"
  | "Construction"
  | "Handover";

export type DocumentStatus = "Draft" | "In review" | "Approved" | "Published";

export type CommentStatus = "Pending review" | "Accepted" | "Responded";

export type Sentiment = "support" | "neutral" | "concern";

export type MapFeatureKind =
  | "zone"
  | "project"
  | "environment"
  | "comment"
  | "mobility";

export interface ProjectPhase {
  name: ProjectStatus;
  start: string;
  end: string;
  complete: boolean;
}

export interface Project {
  id: string;
  name: string;
  district: string;
  type: string;
  description: string;
  status: ProjectStatus;
  location: [number, number];
  geometry?: Feature<Polygon>;
  budgetEstimate: string;
  responsibleTeam: string;
  startDate: string;
  endDate: string;
  approvalProgress: number;
  riskLevel: RiskLevel;
  phases: ProjectPhase[];
  dependencies: string[];
  milestones: string[];
  zoneIds: string[];
  environmentalAreaIds: string[];
}

export interface Zone {
  id: string;
  name: string;
  district: string;
  type: string;
  allowedUse: string;
  maxHeightM: number;
  far: number;
  status: "Draft" | "Active" | "Under review";
  lastUpdated: string;
  color: string;
  notes: string;
  geometry: Feature<Polygon>;
}

export interface EnvironmentalArea {
  id: string;
  name: string;
  district: string;
  type: string;
  description: string;
  score: number;
  severity: RiskLevel;
  color: string;
  mitigationActions: string[];
  assessmentStatus: "Screening" | "Assessment in progress" | "Mitigation planned" | "Cleared";
  linkedProjectIds: string[];
  geometry: Feature<Polygon>;
}

export interface PublicComment {
  id: string;
  name: string;
  anonymous: boolean;
  category: string;
  comment: string;
  sentiment: Sentiment;
  status: CommentStatus;
  projectId: string;
  location: [number, number];
  createdAt: string;
}

export interface PlanningDocument {
  id: string;
  title: string;
  type: string;
  projectId: string;
  owner: string;
  status: DocumentStatus;
  updatedAt: string;
  auditTrail: string[];
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "Project" | "Comment" | "Risk" | "Document" | "AI";
}

export interface AiInsight {
  id: string;
  projectId: string;
  category: "Traffic" | "Environment" | "Stakeholder" | "Mitigation" | "Approval";
  title: string;
  body: string;
  confidence: number;
  sources: string[];
}

export interface MapLayerConfig {
  id: MapFeatureKind;
  label: string;
  color: string;
  visible: boolean;
}

export interface SelectedMapFeature {
  id: string;
  kind: MapFeatureKind;
  title: string;
  subtitle: string;
  properties: Record<string, string | number>;
  geometry?: Geometry;
}

export type PlanningMapFeature =
  | Feature<Polygon>
  | Feature<Point>
  | Feature<LineString>;
