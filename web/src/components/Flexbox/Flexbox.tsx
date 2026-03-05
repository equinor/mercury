import { StyledFlexbox } from './styles'
import type { FlexboxProps } from './types'

export const Flexbox = (
  props: FlexboxProps = {
    direction: 'row',
    alignContent: 'initial',
    alignItems: 'initial',
    alignSelf: 'initial',
    justifyContent: 'initial',
    wrap: 'initial',
    padding: 0,
    grow: 0,
    shrink: 1,
  }
) => {
  const {
    direction,
    inline,
    grow,
    shrink,
    wrap,
    alignContent,
    alignSelf,
    alignItems,
    justifyContent,
    padding,
    gap,
    ...restProps
  } = props
  return (
    <StyledFlexbox
      $inline={inline}
      $flexDirection={direction}
      $flexGrow={grow}
      $flexShrink={shrink}
      $flexWrap={wrap}
      $alignContent={alignContent}
      $alignItems={alignItems}
      $alignSelf={alignSelf}
      $justifyContent={justifyContent}
      $padding={padding}
      $gap={gap}
      {...restProps}
    />
  )
}
