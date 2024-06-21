import { Card as CardWrapper, Typography } from '@equinor/eds-core-react'
import { tokens } from '@equinor/eds-tokens'
import styled from 'styled-components'

const StyledCard = styled(CardWrapper)`
  min-width: 300px;
  max-width: 450px;
  background-color: ${tokens.colors.ui.background__light.hex};
` as typeof CardWrapper

const Title = styled(Typography)`
  color: ${tokens.colors.infographic.primary__moss_green_100.hex};
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
