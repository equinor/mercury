# Mercury Runbook

This document covers operational information about the Mercury Calculator.


// TODO: Diagram of app architecture

## Omnia Radix

Mercury is deployed to Equinor's Omnia Radix PaaS platform.
This has its own documentation available at [https://www.radix.equinor.com](https://www.radix.equinor.com).
The configuration for our Radix app is in [radixconfig.yaml](./radixconfig.yaml).
In Omnia Radix there are two environments for Mercury: development (`dev`) and production (`prod`).

## Deployment

The development environment is automatically deployed from every commit to the master branch on GitHub. This is done by a
[Github Actions workflow](https://github.com/equinor/Mercury/blob/main/.github/workflows/on-push-main-branch.yaml).
Deployment to production is manually triggered by pushing a tag on format `v[0-9]+.[0-9]+.[0-9]+`

## REST API

The REST API is a basic Python FastAPI web server.
All configuration parameters are expected to be environment variables, and are defined in this file [config.py](https://github.com/equinor/Mercury/blob/main/src/config.py).

Note that the API Dockerfile needs clone access to the private repository `github.com/equinor/gpa-libhg` during build. This repository keeps the Fortran library that is compiled and created Python bindings for.

Logs and detailed request information are exported to _Azure Application Insight_

A container image is available at `ghcr.io/equinor/mercury-api`.

## Azure Resources

All resources for Mercury in Azure are under the _"S538-NeqSim API"_ subscription.
These resources are defined in the [bicep](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/) _Infrastructure-as-Code_-language for Azure. All bicep-files can be found at `./IaC`.

### Authentication

Authentication are handled by Azure Active Directory (AAD), which issues access tokens used to access the protected API endpoints.
The App Registration created for this project is `Mercury`.

### Logging

The Application Insight resource has been placed in environment separated Resource Groups; `mercury-test`, and `mercury-prod`.
These resources can be recreated by running the [IaC script](https://github.com/equinor/Mercury/tree/main/IaC)

#### Log queries

- Number of calculations
>
 ```
customEvents
| where name == "CalculationStarted"
```

- Unique visitors
>
 ```
customEvents
| where name == "MainPageLoaded"
| distinct user_Id
```
## Knowledge base (encountered problems)
