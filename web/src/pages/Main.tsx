import { Header } from '../components/common/Header'
import { useEffect, useState } from 'react'
import { MoleTable } from '../components/feature/MoleTable'
import { CalculateFluid } from '../components/feature/CalculateFluid'
import MercuryAPI from '../api/MercuryAPI'
import { AxiosResponse } from 'axios'
import { ComponentResponse, MultiflashResponse } from '../api/generated'

export const MainPage = (props: { mercuryApi: MercuryAPI }): JSX.Element => {
  const { mercuryApi } = props
  const [components, setComponents] = useState<ComponentResponse>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [result, setResult] = useState<MultiflashResponse>({
    phaseValues: {},
    componentFractions: {},
    feedMolecularWeight: 0,
  })

  // Fetch list of components name once on page load
  useEffect(() => {
    mercuryApi
      .getComponents()
      .then((response: AxiosResponse<ComponentResponse>) =>
        setComponents(response.data)
      )
      .finally(() => setIsLoading(false))
  }, [mercuryApi])

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
    feedMolecularWeight: 5,
  }

  if (isLoading) return <></>

  // TODO: Better error handling and message
  if (!components) return <div>Failed to fetch list of components</div>

  return (
    <>
      <Header />
      <CalculateFluid mercuryApi={mercuryApi} setResult={setResult} />
      <MoleTable
        multiFlashResponse={multiflashResult}
        components={components}
      />
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </>
  )
}
