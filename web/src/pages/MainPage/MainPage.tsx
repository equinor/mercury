import { error_outlined, lock } from '@equinor/eds-icons'
import { useAppInsightsContext } from '@microsoft/applicationinsights-react-js'
import { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from 'react-oauth2-code-pkce'
import { type ComponentProperties, ComponentService } from '../../api/generated'
import { orderedComponents } from '../../common/constants'
import type { TCalcStatus, TComponentProperty, TResults } from '../../common/types'
import { ErrorState } from '../../components'
import { LastInputProvider } from '../../contexts/LastInputContext/LastInputContext'
import { AppBar } from '../../feature/AppBar/AppBar'
import { CalculationInput } from '../../feature/calculation_input/CalculationInput'
import { ErrorBoundary } from '../../feature/ErrorBoundary/ErrorBoundary'
import { HgDistributionTable } from '../../feature/results/HgDistributionTable'
import { PhaseEquilibriumTable } from '../../feature/results/PhaseEquilibriumTable'
import { Status } from '../../feature/Status'
import { Container, DividerWithLargeSpacings, Results } from './styles'

const toSortedArray = (components: { [key: string]: ComponentProperties }) => {
  const remainingComponents = Object.keys(components).filter((id) => !orderedComponents.includes(id))
  return [...orderedComponents, ...remainingComponents]
    .filter((id) => components[id])
    .map((id) => ({ id: id, ...components[id] }))
}

const isUnauthorizedError = (error: unknown): boolean => {
  return error instanceof Error && 'status' in error && (error as Error & { status: number }).status === 401
}

export const MainPage = () => {
  const [componentProperties, setComponentProperties] = useState<TComponentProperty[]>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<unknown>()
  const [calcStatus, setCalcStatus] = useState<TCalcStatus>()
  const [result, setResult] = useState<TResults>()

  const appInsights = useAppInsightsContext()
  const { logIn } = useContext(AuthContext)

  useEffect(() => {
    appInsights.trackEvent({ name: 'MainPageLoaded' }, {})
  }, [appInsights])

  const fetchComponents = useCallback(() => {
    setIsLoading(true)
    setFetchError(undefined)
    ComponentService.getComponents()
      .then((response) => {
        setComponentProperties(toSortedArray(response.components))
      })
      .catch((error: unknown) => {
        setFetchError(error)
      })
      .finally(() => setIsLoading(false))
  }, [])

  // Fetch list of components on page load
  useEffect(() => {
    fetchComponents()
  }, [fetchComponents])

  if (isLoading) return

  if (fetchError) {
    return (
      <Container>
        {isUnauthorizedError(fetchError) ? (
          <ErrorState
            icon={lock}
            title="Your session has expired."
            message="You need to log in again."
            buttonLabel="Log in again"
            onAction={() => logIn()}
          />
        ) : (
          <ErrorState
            icon={error_outlined}
            title="Failed to fetch list of components."
            message="Please try to reload the page."
            buttonLabel="Reload"
            onAction={() => fetchComponents()}
          />
        )}
      </Container>
    )
  }

  if (!componentProperties) return

  return (
    <>
      <AppBar />
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
                <PhaseEquilibriumTable results={result} componentProperties={componentProperties} />
              </Results>
            )}
          </LastInputProvider>
        </ErrorBoundary>
      </Container>
    </>
  )
}
