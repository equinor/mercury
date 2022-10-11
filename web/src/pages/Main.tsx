import { Header } from '../components/common/Header'
import { useEffect, useState } from 'react'
import { MoleTable } from '../components/feature/MoleTable'
import { CalculateFluid } from '../components/feature/CalculateFluid'
import MercuryAPI from '../api/MercuryAPI'
import { AxiosResponse } from 'axios'
import { ComponentResponse, MultiflashResponse } from '../api/generated'
import { ComponentSelector } from '../components/feature/ComponentSelector'
import { PhaseTable } from '../components/feature/PhaseTable'

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

  // TODO: get value from input
  const cubicFeedFlow = 1000

  if (isLoading) return <></>

  // TODO: Better error handling and message
  if (!components) return <div>Failed to fetch list of components</div>

  return (
    <>
      <Header />
      <CalculateFluid mercuryApi={mercuryApi} setResult={setResult} />
      <ComponentSelector components={components} />
      <PhaseTable multiFlashResponse={result} cubicFeedFlow={cubicFeedFlow} />
      <MoleTable multiFlashResponse={result} components={components} />
    </>
  )
}
