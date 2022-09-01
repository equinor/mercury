import { Card as CardWrapper, Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'

const StyledCard = styled(CardWrapper)`
  min-width: 250px;
  background-color: #f7f7f7;
`

const Title = styled(Typography)`
  color: #007079;
`

export const Card = ({
  children,
  title,
  actions,
}: {
  children: React.ReactNode
  title: string
  actions?: React.ReactNode
}) => {
  return (
    <StyledCard>
      <StyledCard.Header>
        <StyledCard.HeaderTitle>
          <Title variant="h4">{title}</Title>
        </StyledCard.HeaderTitle>
      </StyledCard.Header>
      <StyledCard.Content>{children}</StyledCard.Content>
      <StyledCard.Actions alignRight>{actions}</StyledCard.Actions>
    </StyledCard>
  )
}
