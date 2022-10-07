import { AuthProvider } from 'react-oauth2-code-pkce'

import { AUTH_DISABLED, authConfig } from './constants'
import { LoginPage } from './pages/Login'
import MercuryAPI from './api/MercuryAPI'
import { MainPage } from './pages/Main'

function App() {
  return AUTH_DISABLED ? (
    <MainPage mercuryApi={new MercuryAPI()} />
  ) : (
    <AuthProvider authConfig={authConfig}>
      <LoginPage />
    </AuthProvider>
  )
}

export default App
