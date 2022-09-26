import { AuthProvider } from 'react-oauth2-code-pkce'
import { authConfig } from './authConfig'
import { MainPage } from './pages/Main'

export const AUTH_DISABLED = process.env.REACT_APP_AUTH !== '1'

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
