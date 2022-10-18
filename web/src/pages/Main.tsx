import styled from 'styled-components'
import { Divider } from '@equinor/eds-core-react'
import { Header } from '../components/common/Header'
import { useEffect, useState } from 'react'
import { MoleTable } from '../components/feature/MoleTable'
import { CalculateFluid } from '../components/feature/CalculateFluid'
import MercuryAPI from '../api/MercuryAPI'
import { AxiosResponse } from 'axios'
import { ComponentResponse, MultiflashResponse } from '../api/generated'
import { PhaseTable, TFeedUnit } from '../components/feature/PhaseTable'

const Results = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 50px;
  align-items: center;
  flex-wrap: wrap;
`

const Container = styled.div`
  margin: 60px 20px;
  @media (min-width: 1200px) {
    margin: 60px 150px;
  }
`

const DividerWithLargeSpacings = styled(Divider)`
  margin-top: 40px;
  margin-bottom: 55px;
`

export type TFeedFlow = { unit: TFeedUnit; value: number }
export type TComponentComposition = { [componentId: string]: number }

export const MainPage = (props: { mercuryApi: MercuryAPI }): JSX.Element => {
  const { mercuryApi } = props
  const [components, setComponents] = useState<ComponentResponse>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [feedFlow, setFeedFlow] = useState<TFeedFlow>({
    unit: 'Sm3/d',
    value: 1000,
  })
  const [componentComposition, setComponentComposition] =
    useState<TComponentComposition>({})
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

  if (isLoading) return <></>

  // TODO: Better error handling and message
  if (!components) return <div>Failed to fetch list of components</div>

  return (
    <>
      <Header />
      <Container>
        <CalculateFluid
          mercuryApi={mercuryApi}
          setResult={setResult}
          components={components}
          feedFlow={feedFlow}
          setFeedFlow={setFeedFlow}
          componentComposition={componentComposition}
          setComponentComposition={setComponentComposition}
        />
        <DividerWithLargeSpacings />
        <Results>
          <PhaseTable multiFlashResponse={result} feedFlow={feedFlow} />
          <MoleTable multiFlashResponse={result} components={components} />
        </Results>
      </Container>
    </>
  )
}
