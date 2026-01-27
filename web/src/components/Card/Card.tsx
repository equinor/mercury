import { StyledCard, Title } from './styles'

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
