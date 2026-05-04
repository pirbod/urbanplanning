# UrbanTwin Azure Planning PoC

UrbanTwin Azure Planning PoC is a clickable proof-of-concept web application for an Azure-native Smart Urban Planning Platform. It is designed for an urban planning company similar to Freie Planungsgruppe Berlin and demonstrates how planning, zoning, environmental review, public engagement, scheduling, document workflows, and AI-assisted analysis can come together in one lightweight command center.

The app runs locally with mock data. It does not require an Azure subscription, paid map keys, authentication, or external secrets.

## Business Problem

Urban planning teams often coordinate maps, zoning rules, environmental constraints, public comments, project schedules, documents, and stakeholder briefings across disconnected tools. That creates duplicated effort, weak auditability, and slower decision cycles.

This PoC shows a focused platform direction: practical map-first planning workflows today, with a clear path to Azure Static Web Apps, Azure Functions, Cosmos DB, Blob Storage, Azure Maps, Azure SignalR, Azure AI Search, Microsoft Entra ID, and reviewed AI services later.

## PoC Features

- Executive overview dashboard with KPIs, portfolio charts, recent activity, and business narrative.
- Interactive Leaflet planning map with zoning, projects, environmental risk areas, public comments, and mobility corridors.
- Clickable map objects with contextual details and actions.
- GeoJSON export concept for QGIS-friendly workflows.
- Zoning and land-use module with mock compliance checks.
- Environmental impact tracker with risk cards, mitigation actions, linked projects, and risk matrix.
- Infrastructure scheduling dashboard with a Gantt-style timeline, project cards, filters, dependencies, and milestones.
- Public engagement portal with citizen feedback form, moderation states, category statistics, and public portal mode.
- AI planning assistant with deterministic mock outputs and expert-review disclaimer.
- Document and workflow center with submit, approve, request changes, and audit trail actions.
- Azure readiness page with target architecture, cost table, mocked vs real services, and production upgrade path.
- Terraform starter folder with commented placeholders for future Azure deployment.

## Local Setup

```bash
npm install
npm run dev
```

Open the local Vite URL, usually `http://localhost:5173`.

## Build

```bash
npm run build
```

Optional type check:

```bash
npm run lint
```

## Demo Walkthrough

1. Start on the Executive Overview dashboard and introduce the planning portfolio.
2. Open the Interactive Planning Map.
3. Toggle zoning, environmental, public feedback, project, and mobility layers.
4. Select the Spree Riverside Mixed-Use Quarter project.
5. Run the mock AI impact analysis from the detail panel or AI Assistant page.
6. Show the Environmental Impact Tracker and explain flood, habitat, noise, air quality, and heat risks.
7. Open Project Scheduling and review phases, dependencies, budgets, and risk.
8. Switch to Public User role and submit a public comment.
9. Switch to Reviewer role and approve a document in the Workflow Center.
10. Open Azure Readiness and explain the target architecture and cost-conscious deployment path.

## Mock vs Real Azure Services

| Capability | Local PoC | Azure target |
| --- | --- | --- |
| Frontend hosting | Vite dev server | Azure Static Web Apps |
| API layer | Local React state and utilities | Azure Functions |
| Planning data | TypeScript mock data | Azure Cosmos DB with GeoJSON |
| Documents | TypeScript mock records | Azure Blob Storage |
| Mapping | Leaflet with OpenStreetMap tiles | Azure Maps |
| Public feedback | Browser state and localStorage | Functions plus Cosmos DB |
| Real-time updates | Local toast notifications | Azure SignalR |
| Search | Static lists | Azure AI Search |
| AI insights | Deterministic mock TypeScript functions | Azure Machine Learning or Azure OpenAI-ready endpoint |
| Identity | Role selector | Microsoft Entra ID |
| Infrastructure | Starter templates | Terraform-managed Azure resources |

## Suggested Azure Resources

- Azure Static Web Apps for the React frontend.
- Azure Functions for planning APIs, GeoJSON export, document workflow, and feedback submission.
- Azure Cosmos DB for projects, zones, environmental areas, comments, documents, and GeoJSON objects.
- Azure Blob Storage for reports, consultation packs, exports, and evidence files.
- Azure Maps for production-grade map tiles, geocoding, spatial overlays, and routing.
- Azure SignalR for collaborative review and stakeholder update streams.
- Azure AI Search for document, regulation, and public comment retrieval.
- Azure Machine Learning or Azure OpenAI-ready design for reviewed AI workflows.
- Microsoft Entra ID for authentication and role-based access control.
- Application Insights for operational monitoring.
- Key Vault for secrets when real integrations are added.

## Terraform Notes

The `terraform` folder contains starter files with comments and safe naming conventions. They are intentionally not required for local development. Before using them for a real Azure environment, add a backend, confirm naming standards, choose regions, define budgets, and review security controls.

## Future Roadmap

- Replace local mock state with Azure Functions and Cosmos DB.
- Add Entra ID sign-in with real role-based authorization.
- Add upload, preview, and versioning for documents in Blob Storage.
- Replace local map tiles with Azure Maps and production geospatial services.
- Add QGIS import and export workflows backed by Blob Storage.
- Add AI Search indexing for planning documents and regulations.
- Add reviewed AI endpoints with traceable prompts, sources, and approval gates.
- Add CI, preview environments, automated tests, and Terraform validation.
