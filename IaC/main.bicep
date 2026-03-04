@description('Specifies the location for resources.')
param location string = 'norwayeast'

@allowed(['dev', 'prod'])
param environment string

var tags = {
  application: 'mercury'
  environment: environment
}

var appInsightsRetentionDays = environment == 'prod' ? 365 : 90
var workspaceRetentionDays = environment == 'prod' ? 730 : 30

resource logAnalyticsWorkspace 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: 'mercury-${environment}-logWorkspace'
  location: location
  tags: tags
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: workspaceRetentionDays
  }
}

resource appInsight 'Microsoft.Insights/components@2020-02-02' = {
  name: 'mercury-${environment}-logs'
  location: location
  tags: tags
  kind: 'web'
  properties: {
    Application_Type: 'web'
    Flow_Type: 'Bluefield'
    IngestionMode: 'LogAnalytics'
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
    Request_Source: 'rest'
    RetentionInDays: appInsightsRetentionDays
    WorkspaceResourceId: logAnalyticsWorkspace.id
  }
}

output appInsightsConnectionString string = appInsight.properties.ConnectionString
output appInsightsInstrumentationKey string = appInsight.properties.InstrumentationKey
