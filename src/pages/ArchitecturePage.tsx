import { ArchitectureCards } from "../components/architecture/ArchitectureCards";
import { CostTable } from "../components/architecture/CostTable";
import { PageShell } from "../components/layout/PageShell";
import type { Role } from "../types";
import { canSeeAdminPanels } from "../utils/rolePermissions";

interface ArchitecturePageProps {
  role: Role;
}

export const ArchitecturePage = ({ role }: ArchitecturePageProps) => (
  <PageShell
    eyebrow="Azure readiness"
    title="Architecture and deployment direction"
    description="This PoC runs entirely with local mock data. The cards below show how the same product shape can move toward a cost-conscious Azure-native architecture."
  >
    <div className="space-y-5">
      <ArchitectureCards />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
        <CostTable />
        <article className="rounded-[1.5rem] border border-ink/10 bg-ink p-5 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/54">Mocked locally</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-white/76">
            <li>React state replaces real authentication, Cosmos DB, and workflow APIs.</li>
            <li>Leaflet and OpenStreetMap tiles replace Azure Maps for the local demo.</li>
            <li>Deterministic TypeScript functions replace AI endpoints.</li>
            <li>Local GeoJSON export demonstrates the future QGIS and Blob Storage path.</li>
          </ul>
        </article>
      </div>

      <div className="rounded-[1.5rem] border border-ink/10 bg-white/84 p-5">
        <h3 className="font-display text-xl font-semibold text-ink">Production upgrade path</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            "Replace mock data with Azure Functions backed by Cosmos DB containers.",
            "Add Entra ID roles and audit trails for planner, reviewer, admin, and public access.",
            "Move documents and exports into Blob Storage with AI Search indexing and Terraform-managed environments.",
          ].map((step) => (
            <div key={step} className="rounded-2xl bg-paper p-4 text-sm leading-6 text-ink/68">
              {step}
            </div>
          ))}
        </div>
      </div>

      {canSeeAdminPanels(role) ? (
        <div className="rounded-[1.5rem] border border-harbor/20 bg-harbor/10 p-5">
          <h3 className="font-display text-xl font-semibold text-harbor">Admin readiness panel</h3>
          <p className="mt-2 text-sm leading-6 text-ink/62">
            Admin users can use this page as a proposal appendix. Terraform starter files are included under the terraform folder, with comments for each future Azure resource.
          </p>
        </div>
      ) : null}
    </div>
  </PageShell>
);
