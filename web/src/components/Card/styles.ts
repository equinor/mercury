import { Card as CardWrapper, Typography } from '@equinor/eds-core-react'
import { tokens } from '@equinor/eds-tokens'
import styled from 'styled-components'

export const StyledCard = styled(CardWrapper)`
  min-width: 300px;
  max-width: 450px;
  background-color: ${tokens.colors.ui.background__light.hex};
` as typeof CardWrapper

export const Title = styled(Typography)`
  color: ${tokens.colors.infographic.primary__moss_green_100.hex};
`
