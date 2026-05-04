const architectureItems = [
  {
    title: "Frontend",
    service: "Azure Static Web Apps",
    detail: "Hosts the React command center with managed SSL, preview environments, and low operational overhead.",
  },
  {
    title: "API",
    service: "Azure Functions",
    detail: "Provides planning APIs, document workflow actions, and GeoJSON export endpoints.",
  },
  {
    title: "Database",
    service: "Azure Cosmos DB",
    detail: "Stores projects, zoning records, feedback, and GeoJSON-friendly planning objects.",
  },
  {
    title: "Documents",
    service: "Azure Blob Storage",
    detail: "Stores reports, consultation packs, QGIS exports, and evidence attachments.",
  },
  {
    title: "Maps",
    service: "Azure Maps",
    detail: "Production map tiles, geocoding, routing, and spatial overlays without local tile dependencies.",
  },
  {
    title: "Real-time",
    service: "Azure SignalR",
    detail: "Supports live stakeholder updates, collaborative review sessions, and status notifications.",
  },
  {
    title: "Search",
    service: "Azure AI Search",
    detail: "Indexes documents, regulations, comments, and planning decisions for retrieval workflows.",
  },
  {
    title: "AI",
    service: "Azure Machine Learning or Azure OpenAI-ready design",
    detail: "Hosts reviewed AI workflows with explicit evidence, confidence, and expert approval gates.",
  },
  {
    title: "Identity",
    service: "Microsoft Entra ID",
    detail: "Adds enterprise authentication, role-based access control, and audit-friendly access policy.",
  },
  {
    title: "IaC",
    service: "Terraform",
    detail: "Keeps the Azure deployment repeatable, reviewable, and cost controlled.",
  },
];

export const ArchitectureCards = () => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {architectureItems.map((item) => (
      <article key={item.service} className="rounded-[1.5rem] border border-ink/10 bg-white/84 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-harbor">{item.title}</p>
        <h3 className="mt-2 font-display text-xl font-semibold text-ink">{item.service}</h3>
        <p className="mt-3 text-sm leading-6 text-ink/62">{item.detail}</p>
      </article>
    ))}
  </div>
);
