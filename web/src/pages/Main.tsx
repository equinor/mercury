import { Header } from '../components/common/Header'
import { useContext, useState } from 'react'
import { AuthContext } from 'react-oauth2-code-pkce'
import { CalculateFluid } from '../components/feature/CalculateFluid'
import { FluidDialog } from '../components/feature/FluidDialog'
import { AUTH_DISABLED } from '../App'

export const MainPage = (): JSX.Element => {
  const { token, loginInProgress } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleFluidDialog = () => setIsOpen(!isOpen)

  if (loginInProgress) return <></>

  return (
    <>
      <Header />
      <CalculateFluid edit={toggleFluidDialog} />
      <FluidDialog open={isOpen} onClose={toggleFluidDialog} />
      {!AUTH_DISABLED && token ? (
                <>
          <p>You are not logged in.</p>
          <p>
            To use the calculator you need to be logged in with an Equinor
            account
          </p>
          <p>
            To login, refresh the page. Contact administrators for any issues
            related to the app.
          </p>
        </>

      ) : (
<>This is my app</>
      )}
    </>
  )
}
