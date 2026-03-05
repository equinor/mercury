import styled from 'styled-components'

import type { StyledFlexboxProps } from './types'

export const StyledFlexbox = styled.div<StyledFlexboxProps>`
  display: ${({ $inline }) => ($inline ? 'inline-flex' : 'flex')};
  flex-direction: ${({ $flexDirection }) => $flexDirection};
  flex-shrink: ${({ $flexShrink }) => $flexShrink};
  flex-grow: ${({ $flexGrow }) => $flexGrow};
  flex-wrap: ${({ $flexWrap }) => $flexWrap};
  align-self: ${({ $alignSelf }) => $alignSelf};
  align-items: ${({ $alignItems }) => $alignItems};
  align-content: ${({ $alignContent }) => $alignContent};
  justify-content: ${({ $justifyContent }) => $justifyContent};
  padding: ${({ $padding }) => $padding}rem;
  gap: ${({ $gap }) => $gap}rem;
`
