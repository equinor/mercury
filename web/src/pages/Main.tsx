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
import { TComponentNames, TComponentRatios, TFeedFlow } from '../types'

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
  const [componentNames, setComponentNames] = useState<TComponentNames>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [feedFlow, setFeedFlow] = useState<TFeedFlow>({
    unit: 'Sm3/d',
    value: 1000,
  })
  const [usedComponentRatios, setUsedComponentRatios] = useState<
    TComponentRatios | undefined
  >()
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
        setComponentNames(
          Object.fromEntries(
            Object.entries(response.data.components).map(([id, names]) => [
              id,
              { name: names.altName, formula: names.chemicalFormula },
            ])
          )
        )
      )
      .finally(() => setIsLoading(false))
  }, [mercuryApi])

  if (isLoading) return <></>

  // TODO: Better error handling and message
  if (!componentNames) return <div>Failed to fetch list of components</div>

  return (
    <>
      <Header />
      <Container>
        <CalculationInput
          mercuryApi={mercuryApi}
          setResult={setResult}
          componentNames={componentNames}
          feedFlow={feedFlow}
          setFeedFlow={setFeedFlow}
          setUsedComponentRatios={setUsedComponentRatios}
        />
        <DividerWithLargeSpacings />
        {!result && (
          <Typography variant="body_short" color="primary">
            Run a calculation to get results
          </Typography>
        )}
        {result && usedComponentRatios && (
          <>
            {'Mercury' in result.phaseValues && <MercuryWarning />}
            <Results>
              <PhaseTable multiFlashResponse={result} feedFlow={feedFlow} />
              <MoleTable
                multiFlashResponse={result}
                componentNames={componentNames}
                componentRatios={usedComponentRatios}
              />
            </Results>
          </>
        )}
      </Container>
    </>
  )
}
