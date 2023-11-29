import { ReactPlugin } from '@microsoft/applicationinsights-react-js'
import { ApplicationInsights } from '@microsoft/applicationinsights-web'

const connectionString = process.env.REACT_APP_APP_INSIGHT_CON_STRING || ''
export const reactPlugin = new ReactPlugin()
export const appInsights = new ApplicationInsights({
  config: {
    connectionString: connectionString,
    enableAutoRouteTracking: false,
    maxBatchInterval: 0,
    extensions: [reactPlugin],
  },
})

if (connectionString) {
  appInsights.loadAppInsights()
}
