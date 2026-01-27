import { Button, Divider, Progress, Typography } from '@equinor/eds-core-react'
import { useContext } from 'react'
import { AuthContext } from 'react-oauth2-code-pkce'
import { RouterProvider } from 'react-router-dom'
import styled from 'styled-components'
import { OpenAPI } from './api/generated'
import { router } from './router'

const hasAuthConfig = import.meta.env.VITE_AUTH === '1'

function App() {
  const { token, error, loginInProgress } = useContext(AuthContext)

  OpenAPI.TOKEN = token

  if (hasAuthConfig && error) {
    return <AuthErrorScreen error={error} />
  }
  if ((hasAuthConfig && !token) || loginInProgress) {
    return <LoginScreen />
  }

  return <RouterProvider router={router} />
}

const LoginScreen = () => {
  const { logIn, loginInProgress } = useContext(AuthContext)

  return (
    <CenterContainer>
      <Typography>Mercury</Typography>
      {loginInProgress ? (
        <>
          <Typography>Login in progress.</Typography>
          <Progress.Dots color="primary" />
        </>
      ) : (
        <Button variant="contained" onClick={() => logIn()}>
          Log in
        </Button>
      )}
    </CenterContainer>
  )
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
