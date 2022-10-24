import styled from 'styled-components'
import { Divider, Typography } from '@equinor/eds-core-react'
import { Header } from '../components/common/Header'
import { useEffect, useState } from 'react'
import { MoleTable } from '../components/feature/MoleTable'
import { CalculationInput } from '../components/feature/CalculationInput'
import MercuryAPI from '../api/MercuryAPI'
import { AxiosResponse } from 'axios'
import { ComponentResponse, MultiflashResponse } from '../api/generated'
import { PhaseTable } from '../components/feature/PhaseTable'
import { MercuryWarning } from '../components/feature/MercuryWarning'
import { TComponentComposition } from '../types'

const Results = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 50px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 40px;
  align-items: flex-start;
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
  const [components, setComponents] = useState<ComponentResponse>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // feedFlow unit is Sm3/d
  const [cubicFeedFlow, setCubicFeedFlow] = useState<number>(1000)
  const [componentComposition, setComponentComposition] =
    useState<TComponentComposition>()
  const [result, setResult] = useState<MultiflashResponse>()

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
        <CalculationInput
          mercuryApi={mercuryApi}
          setResult={setResult}
          components={components}
          cubicFeedFlow={cubicFeedFlow}
          setCubicFeedFlow={setCubicFeedFlow}
          componentComposition={componentComposition}
          setComponentComposition={setComponentComposition}
        />
        <DividerWithLargeSpacings />
        {!result && (
          <Typography variant="body_short" color="primary">
            Run a calculation to get results
          </Typography>
        )}
        {result && componentComposition && (
          <>
            {'Mercury' in result.phaseValues && <MercuryWarning />}
            <Results>
              <PhaseTable
                multiFlashResponse={result}
                cubicFeedFlow={cubicFeedFlow}
              />
              <MoleTable
                multiFlashResponse={result}
                components={components}
                componentComposition={componentComposition}
              />
            </Results>
          </>
        )}
      </Container>
    </>
  )
}
