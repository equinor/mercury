import styled from 'styled-components'
import { Divider } from '@equinor/eds-core-react'
import { Header } from '../components/common/Header'
import { useEffect, useState } from 'react'
import { MoleTable } from '../components/feature/MoleTable'
import { CalculateFluid } from '../components/feature/CalculateFluid'
import MercuryAPI from '../api/MercuryAPI'
import { AxiosResponse } from 'axios'
import { ComponentResponse, MultiflashResponse } from '../api/generated'
import { ComponentSelector } from '../components/feature/ComponentSelector'
import { PhaseTable } from '../components/feature/PhaseTable'

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

  if (isLoading) return <></>

  // TODO: Better error handling and message
  if (!components) return <div>Failed to fetch list of components</div>

  return (
    <>
      <Header />
      <Container>
        <CalculateFluid mercuryApi={mercuryApi} setResult={setResult} />
        <ComponentSelector components={components} />
        <DividerWithLargeSpacings />
        <Results>
          <PhaseTable multiFlashResponse={result} />
          <MoleTable multiFlashResponse={result} components={components} />
        </Results>
      </Container>
    </>
  )
}
