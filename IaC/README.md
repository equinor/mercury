# Mercury - Infrastructure as Code

We use __Bicep__ to define our _Infrastructure as Code_.

- [Bicep overview](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/overview?tabs=bicep)
- [Azure resource reference](https://learn.microsoft.com/en-us/azure/templates/)


## Prerequisites

- Azure CLI with Bicep support installed (`az bicep version`). The latest Azure CLI is recommended; see [Install Bicep](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/install#azure-cli)
- Active Azure subscription set:

```bash
az account set --subscription "S538-NeqSim API"
```

You also need to have the necessary permissions to create and manage resources in the subscription (e.g., Owner or Contributor role).

## How to validate

Build the Bicep file (checks for syntax errors):

```bash
az bicep build --file ./IaC/main.bicep --stdout
```

Preview changes with what-if:

```bash
# Dev
az deployment group create --resource-group mercury-dev --template-file ./IaC/main.bicep --parameters environment=dev --what-if

# Prod
az deployment group create --resource-group mercury-prod --template-file ./IaC/main.bicep --parameters environment=prod --what-if
```

## How to deploy

Create a resource group (if it doesn't exist):

```bash
az group create --name mercury-dev --location norwayeast --output table
az group create --name mercury-prod --location norwayeast --output table
```

Deploy the template:

```bash
# Dev
az deployment group create --resource-group mercury-dev --template-file ./IaC/main.bicep --parameters environment=dev --output table

# Prod
az deployment group create --resource-group mercury-prod --template-file ./IaC/main.bicep --parameters environment=prod --output table
```

## Teardown

> **Warning:** This deletes everything in the resource group.

```bash
az group delete --name mercury-dev
az group delete --name mercury-prod
```
