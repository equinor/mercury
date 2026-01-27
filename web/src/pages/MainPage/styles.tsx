import { Divider } from '@equinor/eds-core-react'
import styled from 'styled-components'

export const Results = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 50px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 40px;
  align-items: flex-start;
`

export const Container = styled.div`
  margin: 60px 20px;
  @media (min-width: 1200px) {
    margin: 60px 150px;
  }
`

export const DividerWithLargeSpacings = styled(Divider)`
  margin-top: 40px;
`
