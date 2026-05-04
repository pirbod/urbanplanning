# Terraform Starter Notes

This folder contains commented starter templates for a future Azure deployment of UrbanTwin Azure Planning PoC. Terraform is not required to run the local app.

Before using these files for a real environment:

- Confirm Azure subscription, tenant, and naming standards.
- Add a remote backend for Terraform state.
- Review identity, networking, logging, backup, and cost controls.
- Replace placeholders with approved production values.
- Add tags required by the organization.
- Run `terraform fmt`, `terraform validate`, and security checks in CI.

The intended starter resources are:

- Resource group
- Azure Static Web App
- Azure Function App
- Storage Account
- Azure Cosmos DB
- Azure Maps Account
- Azure SignalR
- Azure Key Vault
- Application Insights
