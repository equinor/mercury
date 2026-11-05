import { AppInsightsContext } from '@microsoft/applicationinsights-react-js'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from 'react-oauth2-code-pkce'
import App from './App'
import { client } from './api/generated'
import { tokenStore } from './api/tokenStore'
import { authConfig } from './auth'
import { reactPlugin } from './common/applicationInsight'

const hasAuthConfig = import.meta.env.VITE_AUTH === '1'

client.setConfig({ baseURL: `${window.location.origin}/api`, auth: () => tokenStore.current || undefined })

const container = document.getElementById('root')
const root = createRoot(container as HTMLElement)

root.render(
  <AppInsightsContext value={reactPlugin}>
    {hasAuthConfig ? (
      <AuthProvider authConfig={authConfig}>
        <App />
      </AuthProvider>
    ) : (
      <App />
    )}
  </AppInsightsContext>
)
