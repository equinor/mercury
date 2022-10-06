import { AuthContext } from 'react-oauth2-code-pkce'
import { useContext } from 'react'
import { MainPage } from './Main'
import MercuryAPI from '../api/MercuryAPI'
import { Button } from '@equinor/eds-core-react'

export const LoginPage = (): JSX.Element => {
  const { token, loginInProgress, login } = useContext(AuthContext)

  if (loginInProgress) return <></>

  if (!token)
    return (
      <>
        <p>You are not logged in.</p>
        <p>
          To use the Mercury calculator you need to be logged in with an Equinor
          account.
        </p>
        <Button onClick={() => login()}>Login</Button>
      </>
    )

  return <MainPage mercuryApi={new MercuryAPI(token)} />
}
