import { AuthProvider } from 'react-oauth2-code-pkce'
import { AppInsightsContext } from '@microsoft/applicationinsights-react-js'

import { AUTH_DISABLED, authConfig } from './constants'
import { LoginPage } from './pages/Login'
import MercuryAPI from './api/MercuryAPI'
import { MainPage } from './pages/Main'
import { reactPlugin } from './applicationInsight'

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
