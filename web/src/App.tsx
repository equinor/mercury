import { Button, Divider, Typography } from '@equinor/eds-core-react'
import { useContext, useEffect, useRef } from 'react'
import { AuthContext } from 'react-oauth2-code-pkce'
import { RouterProvider } from 'react-router-dom'
import styled from 'styled-components'
import { tokenStore } from './api/tokenStore'
import { router } from './router'

const hasAuthConfig = import.meta.env.VITE_AUTH === '1'

function App() {
  const { token, error, loginInProgress, logIn } = useContext(AuthContext)
  tokenStore.current = token
  const loginStarted = useRef(false)

  useEffect(() => {
    if (!hasAuthConfig) return
    if (token) {
      loginStarted.current = true
      return
    }
    if (error) {
      loginStarted.current = false
      return
    }
    // The ref stops StrictMode's double effect from starting two PKCE flows
    if (!loginInProgress && !loginStarted.current) {
      loginStarted.current = true
      logIn()
    }
  }, [token, error, loginInProgress, logIn])

  if (hasAuthConfig && error) {
    return <AuthErrorScreen error={error} />
  }
  if (hasAuthConfig && !token) {
    return null
  }

  return <RouterProvider router={router} />
}

const AuthErrorScreen = (props: { error: string }) => {
  const { logOut } = useContext(AuthContext)
  return (
    <CenterContainer>
      <Typography>An authorization error has occurred.</Typography>
      <Button variant="contained" onClick={() => logOut()}>
        Log out
      </Button>
      <Divider style={{ width: 300 }} />
      <Typography>{props.error}</Typography>
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
