variable "project_name" {
  description = "Short lowercase project name used for Azure resource names."
  type        = string
  default     = "urbantwin"
}

variable "environment" {
  description = "Deployment environment name, such as poc, test, or prod."
  type        = string
  default     = "poc"
}

variable "location" {
  description = "Azure region for the starter deployment."
  type        = string
  default     = "westeurope"
}

variable "tags" {
  description = "Common tags applied to future Azure resources."
  type        = map(string)
  default = {
    product = "UrbanTwin Azure Planning PoC"
    owner   = "urban-planning-demo"
  }
}
