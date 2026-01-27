import { Divider } from '@equinor/eds-core-react'
import { useAppInsightsContext } from '@microsoft/applicationinsights-react-js'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { type ComponentProperties, ComponentService } from '../api/generated'
import { orderedComponents } from '../common/constants'
import ErrorBoundary from '../common/ErrorBoundary'
import { Header } from '../common/Header'
import type { TCalcStatus, TComponentProperty, TResults } from '../common/types'
import { CalculationInput } from '../feature/calculation_input/CalculationInput'
import { HgDistributionTable } from '../feature/results/HgDistributionTable'
import { PhaseEquilibriumTable } from '../feature/results/PhaseEquilibriumTable'
import { Status } from '../feature/Status'
import { LastInputProvider } from './context/LastInputContext'

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

const toSortedArray = (components: { [key: string]: ComponentProperties }) => {
  const remainingComponents = Object.keys(components).filter(
    (id) => !orderedComponents.includes(id)
  )
  return [...orderedComponents, ...remainingComponents]
    .filter((id) => components[id])
    .map((id) => ({ id: id, ...components[id] }))
}

export const MainPage = () => {
  const [componentProperties, setComponentProperties] =
    useState<TComponentProperty[]>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [calcStatus, setCalcStatus] = useState<TCalcStatus>()
  const [result, setResult] = useState<TResults>()

  const appInsights = useAppInsightsContext()

  useEffect(() => {
    appInsights.trackEvent({ name: 'MainPageLoaded' }, {})
  }, [appInsights])

  // Fetch list of components name once on page load
  useEffect(() => {
    ComponentService.getComponents()
      .then((response) => {
        setComponentProperties(toSortedArray(response.components))
      })
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) return

  // TODO: Better error handling and message
  if (!componentProperties) return <div>Failed to fetch list of components</div>

  return (
    <>
      <Header />
      <Container>
        <ErrorBoundary>
          <LastInputProvider>
            <CalculationInput
              setResult={setResult}
              setCalcStatus={setCalcStatus}
              componentProperties={componentProperties}
            />
            <DividerWithLargeSpacings />
            <Status calcStatus={calcStatus} result={result} />
            {result && (
              <Results>
                {/*TODO: Make use of cubicFeedFlow in LastInputContext here: */}
                <HgDistributionTable results={result} />
                <PhaseEquilibriumTable
                  results={result}
                  componentProperties={componentProperties}
                />
              </Results>
            )}
          </LastInputProvider>
        </ErrorBoundary>
      </Container>
    </>
  )
}
