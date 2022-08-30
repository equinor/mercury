import { Header } from '../components/common/Header'
import { useContext } from 'react'
import { AuthContext } from 'react-oauth2-code-pkce'

export const MainPage = (): JSX.Element => {
  const { token } = useContext(AuthContext)
  return (
    <div>
      <Header />
      {token ? (
        <div>This is my app</div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <p>
            To use the calculator you need to be logged in with an Equinor
            account
          </p>
          <p>
            To login, refresh the page. Contact administrators for any issues
            related to the app.
          </p>
        </div>
      )}
    </div>
  )
}
