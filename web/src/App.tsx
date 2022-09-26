import { AuthProvider } from 'react-oauth2-code-pkce'
import { authConfig } from './authConfig'
import { MainPage } from './pages/Main'
import MercuryAPI from './api/MercuryAPI'

import { AUTH_DISABLED } from './constants'

function App() {
  const mercuryApi = new MercuryAPI('')

  return AUTH_DISABLED ? (
    <MainPage mercuryApi={mercuryApi} />
  ) : (
    <AuthProvider authConfig={authConfig}>
      <MainPage mercuryApi={mercuryApi} />
    </AuthProvider>
  )
}

export default App
