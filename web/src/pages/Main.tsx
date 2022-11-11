import styled from 'styled-components'
import { Divider, Typography } from '@equinor/eds-core-react'
import { Header } from '../common/Header'
import { useEffect, useState } from 'react'
import { MoleTable } from '../feature/results/MoleTable'
import { CalculationInput } from '../feature/calculation_input/CalculationInput'
import MercuryAPI from '../api/MercuryAPI'
import { AxiosResponse } from 'axios'
import { ComponentProperties, ComponentResponse } from '../api/generated'
import { PhaseTable } from '../feature/results/PhaseTable'
import { MercuryWarning } from '../feature/results/MercuryWarning'
import { TComponentProperty, TResults } from '../types'
import { orderedComponents } from '../constants'

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

export const MainPage = (props: { mercuryApi: MercuryAPI }): JSX.Element => {
  const { mercuryApi } = props
  const [componentProperties, setComponentProperties] =
    useState<TComponentProperty[]>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [result, setResult] = useState<TResults>()

  // Fetch list of components name once on page load
  useEffect(() => {
    mercuryApi
      .getComponents()
      .then((response: AxiosResponse<ComponentResponse>) =>
        setComponentProperties(toSortedArray(response.data.components))
      )
      .finally(() => setIsLoading(false))
  }, [mercuryApi])

  if (isLoading) return <></>

  // TODO: Better error handling and message
  if (!componentProperties) return <div>Failed to fetch list of components</div>

  return (
    <>
      <Header />
      <Container>
        <CalculationInput
          mercuryApi={mercuryApi}
          setResult={setResult}
          componentProperties={componentProperties}
        />
        <DividerWithLargeSpacings />
        {!result && (
          <Typography variant="body_short" color="primary">
            Run a calculation to get results
          </Typography>
        )}
        {result && (
          <>
            {'Mercury' in result.phaseValues && <MercuryWarning />}
            <Results>
              <PhaseTable results={result} />
              <MoleTable
                results={result}
                componentProperties={componentProperties}
              />
            </Results>
          </>
        )}
      </Container>
    </>
  )
}
