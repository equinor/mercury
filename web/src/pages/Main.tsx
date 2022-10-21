import styled from 'styled-components'
import { Divider } from '@equinor/eds-core-react'
import { Header } from '../components/common/Header'
import { useEffect, useState } from 'react'
import { MoleTable } from '../components/feature/MoleTable'
import { CalculateFluid } from '../components/feature/CalculateFluid'
import MercuryAPI from '../api/MercuryAPI'
import { AxiosResponse } from 'axios'
import {
  ComponentResponse,
  Components,
  MultiflashResponse,
  PhaseLabels,
} from '../api/generated'
import { PhaseTable } from '../components/feature/PhaseTable'
import { MercuryWarning } from '../components/feature/MercuryWarning'
import { TComponentComposition, TFeedFlow } from '../types'

const Results = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 50px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 40px;
`

const Container = styled.div`
  margin: 60px 20px;
  @media (min-width: 1200px) {
    margin: 60px 150px;
  }
`

const DividerWithLargeSpacings = styled(Divider)`
  margin-top: 40px;
`

export const MainPage = (props: { mercuryApi: MercuryAPI }): JSX.Element => {
  const { mercuryApi } = props
  const [components, setComponents] = useState<Components>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [feedFlow, setFeedFlow] = useState<TFeedFlow>({
    unit: 'Sm3/d',
    value: 1000,
  })
  const [componentComposition, setComponentComposition] =
    useState<TComponentComposition>({})
  const [result, setResult] = useState<MultiflashResponse>({
    componentIds: [],
    phases: [],
    phaseValues: {},
  })

  // Fetch list of components name once on page load
  useEffect(() => {
    mercuryApi
      .getComponents()
      .then((response: AxiosResponse<ComponentResponse>) =>
        setComponents(response.data.components)
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
        {PhaseLabels.Mercury in result.phases && <MercuryWarning />}
        <Results>
          <PhaseTable multiFlashResponse={result} feedFlow={feedFlow} />
          <MoleTable multiFlashResponse={result} components={components} />
        </Results>
      </Container>
    </>
  )
}
