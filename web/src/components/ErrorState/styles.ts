import { Icon } from '@equinor/eds-core-react'
import { tokens } from '@equinor/eds-tokens'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
`

export const ErrorIcon = styled(Icon)`
  color: ${tokens.colors.interactive.danger__resting.hex};
` as typeof Icon
