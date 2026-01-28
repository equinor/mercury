# Mercury - Infrastructure as Code

We use __Bicep__ to define our _Infrastructure as Code_
<https://docs.microsoft.com/en-us/azure/azure-resource-manager/bicep/overview?tabs=bicep>

## How to develop

<https://docs.microsoft.com/en-us/azure/templates/>

## How to test

`az bicep build --file ./IaC/main.bicep --stdout`
`az deployment group create --resource-group mercury-dev --template-file ./IaC/main.bicep --what-if`

## How to deploy

Note: azure-cli version 2.2.0 or higher is required.

Set active subscription for operations
`az account set --subscription "S538-NeqSim API"`

Create a resource group for the environment
`az group create --name mercury-dev --location norwayeast --output table`

Deploy the template
`az deployment group create --resource-group mercury-dev --template-file ./IaC/main.bicep --output table`

Teardown  (this deletes everything in the resource group)
`az group delete --name mercury-dev`
