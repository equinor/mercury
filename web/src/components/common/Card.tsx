import { Card as CardWrapper, Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'

const StyledCard = styled(CardWrapper)`
  min-width: 250px;
  background-color: #f7f7f7;

  .Typography__StyledTypography-sc-179guof-0 {
    color: #007079;
  }
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
          <Typography variant="h4">{title}</Typography>
        </StyledCard.HeaderTitle>
      </StyledCard.Header>
      <StyledCard.Content>{children}</StyledCard.Content>
      <StyledCard.Actions alignRight>{actions}</StyledCard.Actions>
    </StyledCard>
  )
}
