import { AppInsightsContext } from '@microsoft/applicationinsights-react-js'
import { AuthProvider } from 'react-oauth2-code-pkce'

import MercuryAPI from './api/MercuryAPI'
import { reactPlugin } from './applicationInsight'
import { AUTH_DISABLED, authConfig } from './constants'
import { LoginPage } from './pages/Login'
import { MainPage } from './pages/Main'

function App() {
  return AUTH_DISABLED ? (
    <AppInsightsContext.Provider value={reactPlugin}>
      <MainPage mercuryApi={new MercuryAPI()} />
    </AppInsightsContext.Provider>
  ) : (
    <AuthProvider authConfig={authConfig}>
      <AppInsightsContext.Provider value={reactPlugin}>
        <LoginPage />
      </AppInsightsContext.Provider>
    </AuthProvider>
  )
}

export default App
