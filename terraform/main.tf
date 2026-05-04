terraform {
  required_version = ">= 1.6.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.110"
    }
  }
}

provider "azurerm" {
  features {}
}

locals {
  name_prefix = "${var.project_name}-${var.environment}"
  safe_suffix = replace(local.name_prefix, "-", "")
}

# Starter template only. Uncomment and complete resources after subscription,
# budget, security, and naming decisions are approved.

# resource "azurerm_resource_group" "main" {
#   name     = "rg-${local.name_prefix}"
#   location = var.location
#   tags     = var.tags
# }

# resource "azurerm_static_web_app" "frontend" {
#   name                = "stapp-${local.name_prefix}"
#   resource_group_name = azurerm_resource_group.main.name
#   location            = var.location
#   sku_tier            = "Free"
#   sku_size            = "Free"
#   tags                = var.tags
# }

# resource "azurerm_storage_account" "documents" {
#   name                     = "st${local.safe_suffix}"
#   resource_group_name      = azurerm_resource_group.main.name
#   location                 = var.location
#   account_tier             = "Standard"
#   account_replication_type = "LRS"
#   tags                     = var.tags
# }

# resource "azurerm_service_plan" "functions" {
#   name                = "plan-${local.name_prefix}"
#   resource_group_name = azurerm_resource_group.main.name
#   location            = var.location
#   os_type             = "Linux"
#   sku_name            = "Y1"
#   tags                = var.tags
# }

# resource "azurerm_linux_function_app" "api" {
#   name                = "func-${local.name_prefix}"
#   resource_group_name = azurerm_resource_group.main.name
#   location            = var.location
#   service_plan_id     = azurerm_service_plan.functions.id
#
#   storage_account_name       = azurerm_storage_account.documents.name
#   storage_account_access_key = azurerm_storage_account.documents.primary_access_key
#
#   site_config {}
#   tags = var.tags
# }

# resource "azurerm_cosmosdb_account" "planning" {
#   name                = "cosmos-${local.name_prefix}"
#   resource_group_name = azurerm_resource_group.main.name
#   location            = var.location
#   offer_type          = "Standard"
#   kind                = "GlobalDocumentDB"
#
#   consistency_policy {
#     consistency_level = "Session"
#   }
#
#   geo_location {
#     location          = var.location
#     failover_priority = 0
#   }
#
#   tags = var.tags
# }

# resource "azurerm_maps_account" "maps" {
#   name                = "maps-${local.name_prefix}"
#   resource_group_name = azurerm_resource_group.main.name
#   sku_name            = "S0"
#   tags                = var.tags
# }

# resource "azurerm_signalr_service" "collaboration" {
#   name                = "signalr-${local.name_prefix}"
#   resource_group_name = azurerm_resource_group.main.name
#   location            = var.location
#   sku {
#     name     = "Free_F1"
#     capacity = 1
#   }
#   tags = var.tags
# }

# resource "azurerm_key_vault" "main" {
#   name                = "kv-${local.safe_suffix}"
#   resource_group_name = azurerm_resource_group.main.name
#   location            = var.location
#   tenant_id           = data.azurerm_client_config.current.tenant_id
#   sku_name            = "standard"
#   tags                = var.tags
# }

# resource "azurerm_application_insights" "main" {
#   name                = "appi-${local.name_prefix}"
#   resource_group_name = azurerm_resource_group.main.name
#   location            = var.location
#   application_type    = "web"
#   tags                = var.tags
# }
