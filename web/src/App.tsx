import { Button, Divider, Progress, Typography } from '@equinor/eds-core-react'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from 'react-oauth2-code-pkce'
import { RouterProvider } from 'react-router-dom'
import styled from 'styled-components'
import { tokenStore } from './api/tokenStore'
import { router } from './router'

const hasAuthConfig = import.meta.env.VITE_AUTH === '1'
const AUTO_RETRY_KEY = 'authAutoRetry'

function App() {
  const { token, error, loginInProgress, logIn } = useContext(AuthContext)
  tokenStore.current = token
  const loginStarted = useRef(false)
  const [hadToken, setHadToken] = useState(false)
  const [autoRetried] = useState(() => sessionStorage.getItem(AUTO_RETRY_KEY) !== null)

  useEffect(() => {
    if (!hasAuthConfig) return
    if (token) {
      setHadToken(true)
      loginStarted.current = false
      sessionStorage.removeItem(AUTO_RETRY_KEY)
      return
    }
    if (loginInProgress || loginStarted.current) return
    if (error) {
      if (autoRetried) return
      sessionStorage.setItem(AUTO_RETRY_KEY, '1')
    }
    loginStarted.current = true
    logIn()
  }, [token, error, loginInProgress, logIn, autoRetried])

  if (hasAuthConfig) {
    if (error && (token || autoRetried)) return <AuthErrorScreen error={error} />
    if (!token) return <SigningIn loggedOut={hadToken} />
  }

  return <RouterProvider router={router} />
}

const SigningIn = ({ loggedOut }: { loggedOut: boolean }) => (
  <CenterContainer role="status" aria-busy="true">
    <Typography>{loggedOut ? 'Logging you out...' : 'Signing you in...'}</Typography>
    <Progress.Dots color="primary" />
  </CenterContainer>
)

const AuthErrorScreen = ({ error }: { error: string }) => {
  const { logOut } = useContext(AuthContext)
  return (
    <CenterContainer>
      <Typography>An authorization error has occurred.</Typography>
      <Button variant="contained" onClick={() => logOut()}>
        Log out
      </Button>
      <Divider style={{ width: 300 }} />
      <Typography>{error}</Typography>
    </CenterContainer>
  )
}

const CenterContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`

export default App
