import { Header } from '../components/common/Header'
import { useContext, useState } from 'react'
import { AuthContext } from 'react-oauth2-code-pkce'
import { CalculateFluid } from '../components/feature/CalculateFluid'
import { FluidDialog } from '../components/feature/FluidDialog'

export const MainPage = (): JSX.Element => {
  const { token } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleFluidDialog = () => setIsOpen(!isOpen)

  return (
    <>
      <Header />
      <CalculateFluid edit={toggleFluidDialog} />
      <FluidDialog open={isOpen} onClose={toggleFluidDialog} />
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
    </>
  )
}
