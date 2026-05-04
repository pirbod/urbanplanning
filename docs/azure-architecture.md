# Azure Target Architecture

UrbanTwin Azure Planning PoC is local today, but the code is shaped so the same user journeys can later connect to Azure services.

## Frontend: Azure Static Web Apps

The React and Vite frontend can be deployed to Azure Static Web Apps with managed SSL, preview environments, and simple CI. The current app uses local state and TypeScript mock data.

## API: Azure Functions

Azure Functions would provide endpoints for projects, zoning, environmental areas, public comments, documents, workflow actions, AI requests, and GeoJSON export. Functions keep the PoC cost-conscious by using consumption-based execution.

## Database: Azure Cosmos DB

Cosmos DB would store planning records, public comments, document metadata, and GeoJSON objects. A future implementation should model geospatial fields carefully and use partition keys around district, project, or tenant.

## Documents: Azure Blob Storage

Blob Storage would store zoning reports, environmental impact assessments, consultation summaries, traffic studies, council memos, and QGIS export packages. Azure Functions can issue signed download links when needed.

## Maps: Azure Maps

Azure Maps would replace the local Leaflet tile source for production-grade mapping, geocoding, spatial overlays, routing, and enterprise map service controls.

## Real-Time Collaboration: Azure SignalR

Azure SignalR would support live status changes, stakeholder update streams, shared review sessions, and public engagement notifications.

## Search: Azure AI Search

Azure AI Search would index planning documents, regulations, public comments, decisions, and environmental evidence. This enables document discovery and retrieval-augmented planning workflows.

## AI: Azure Machine Learning or Azure OpenAI-Ready Endpoint

The mock AI utility in this PoC is deterministic and local. A production version should use reviewed prompts, traceable sources, confidence levels, human review gates, and model monitoring. Azure Machine Learning or an Azure OpenAI-ready endpoint can provide the hosted AI layer.

## Identity: Microsoft Entra ID

The local role selector demonstrates Admin, Planner, Reviewer, and Public User behavior. Entra ID would replace it with real authentication, role assignments, conditional access, and audit support.

## Infrastructure as Code: Terraform

Terraform should manage resource groups, hosting, APIs, storage, data services, observability, secrets, and environment-specific settings. Starter templates are included in the `terraform` folder.

## Mocked Locally vs Real in Azure

| Concern | Local PoC | Azure version |
| --- | --- | --- |
| Data persistence | localStorage and TypeScript data | Cosmos DB and Blob Storage |
| APIs | In-browser utilities | Azure Functions |
| Mapping | Leaflet and OpenStreetMap tiles | Azure Maps |
| AI | Deterministic mock output | Reviewed AI endpoint |
| Identity | Role selector | Entra ID |
| Notifications | Local toast | Azure SignalR and Application Insights |
| Infrastructure | Documentation and placeholders | Terraform deployment |
