import { AuthProvider } from 'react-oauth2-code-pkce'
import { authConfig } from './authConfig'
import { MainPage } from './pages/Main'
import { AUTH_DISABLED } from './constants'

function App() {
  return AUTH_DISABLED ? (
    <MainPage />
  ) : (
    <AuthProvider authConfig={authConfig}>
      <MainPage />
    </AuthProvider>
  )
}

export default App
