import { AppInsightsContext } from '@microsoft/applicationinsights-react-js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from 'react-oauth2-code-pkce'
import App from './App'
import { OpenAPI } from './api/generated'
import { authConfig } from './auth'
import { reactPlugin } from './common/applicationInsight'

const hasAuthConfig = import.meta.env.VITE_AUTH === '1'

OpenAPI.BASE = `${window.location.origin}/api`

const container = document.getElementById('root')
const root = createRoot(container as HTMLElement)

root.render(
  <React.StrictMode>
    <AppInsightsContext value={reactPlugin}>
      {hasAuthConfig ? (
        <AuthProvider authConfig={authConfig}>
          <App />
        </AuthProvider>
      ) : (
        <App />
      )}
    </AppInsightsContext>
  </React.StrictMode>
)
