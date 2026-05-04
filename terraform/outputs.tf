# Outputs are placeholders until real resources are uncommented.

output "planned_resource_prefix" {
  description = "Safe starter naming prefix for future Azure resources."
  value       = local.name_prefix
}

# output "static_web_app_url" {
#   description = "Default hostname for the Azure Static Web App."
#   value       = azurerm_static_web_app.frontend.default_host_name
# }

# output "function_app_name" {
#   description = "Name of the Azure Functions API app."
#   value       = azurerm_linux_function_app.api.name
# }
