import { Header } from '../components/common/Header'
import { useEffect, useContext, useState } from 'react'
import { MoleTable } from '../components/feature/MoleTable'
import { AuthContext } from 'react-oauth2-code-pkce'
import { CalculateFluid } from '../components/feature/CalculateFluid'
import { FluidDialog } from '../components/feature/FluidDialog'
import { AUTH_DISABLED } from '../constants'
import MercuryAPI from '../api/MercuryAPI'
import { AxiosResponse } from 'axios'
import { ComponentResponse, MultiflashResponse } from '../api/generated'

export const MainPage = (props: { mercuryApi: MercuryAPI }): JSX.Element => {
  const { mercuryApi } = props
  const { token, loginInProgress } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [components, setComponents] = useState<ComponentResponse>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Fetch list of components name once on page load
  useEffect(() => {
    mercuryApi
      .getComponents()
      .then((response: AxiosResponse<ComponentResponse>) =>
        setComponents(response.data)
      )
      .finally(() => setIsLoading(false))
  }, [mercuryApi])

  const toggleFluidDialog = () => setIsOpen(!isOpen)

  if (loginInProgress) return <></>

  // TODO: Remove with actual calculation results
  const multiflashResult: MultiflashResponse = {
    phaseValues: {
      Vapor: { percentage: 0.9989992588, mercury: 104.82781237 },
      Mercury: { percentage: 0.0010007412, mercury: 1000000000.0 },
    },
    componentFractions: {
      2: [0.01693, 0.000000000000000000000003431],
      1: [0.05399, 0.000000000000000000000006807],
      101: [0.8563, 0.0000000000000000000001379],
      201: [0.04577, 0.00000000000000000000000481],
      301: [0.01763, 0.000000000000000000000001301],
      401: [0.002424, 0.0000000000000000000000001389],
      402: [0.004378, 0.0000000000000000000000002324],
      503: [0.001212, 0.00000000000000000000000005006],
      504: [0.001102, 0.00000000000000000000000004238],
      608: [0.0001473, 0.000000000000000000000000005109],
      710: [0.00008415, 0.000000000000000000000000002175],
      809: [0.00002304, 0.000000000000000000000000000433],
      5: [0.00000001236, 1.0],
    },
  }

  if (isLoading) return <>Loading...</>

  // TODO: Better error handling and message
  if (!components) return <div>Failed to fetch list of components</div>

  return (
    <>
      {!AUTH_DISABLED && !token ? (
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
        <>
          <Header />
          <CalculateFluid edit={toggleFluidDialog} />
          <FluidDialog open={isOpen} onClose={toggleFluidDialog} />
          <MoleTable
            multiFlashResponse={multiflashResult}
            components={components}
          />
        </>
      )}
    </>
  )
}
