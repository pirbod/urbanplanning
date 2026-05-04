import type { Role } from "../types";

export const roles: Role[] = ["Admin", "Planner", "Reviewer", "Public User"];

export const canEditPlanningData = (role: Role) => role === "Admin" || role === "Planner";

export const canRunAiActions = (role: Role) => role !== "Public User";

export const canApproveDocuments = (role: Role) => role === "Admin" || role === "Reviewer";

export const canSeeAdminPanels = (role: Role) => role === "Admin";

export const roleSummary = (role: Role) => {
  const summaries: Record<Role, string> = {
    Admin: "Full PoC access, Azure readiness panels, and admin actions.",
    Planner: "Can edit mock planning records, create notes, and run analysis.",
    Reviewer: "Can approve documents and inspect evidence packs.",
    "Public User": "Can browse public information and submit feedback only.",
  };

  return summaries[role];
};
