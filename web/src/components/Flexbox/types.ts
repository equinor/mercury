import type React from 'react'

type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse'
type Wrap = 'initial' | 'no-wrap' | 'wrap' | 'wrap-reverse'
type Alignment = 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'initial' | 'inherit'
type AlignSelf = Alignment | 'baseline' | 'auto'
type AlignItems = Alignment | 'baseline' | 'space-between'
type AlignContent = Alignment | 'space-between' | 'space-around'
type JustifyContent = Alignment | 'space-between' | 'space-around'

export type FlexboxProps = React.ComponentPropsWithoutRef<'div'> & {
  as?: keyof React.JSX.IntrinsicElements
  children?: React.ReactNode
  direction?: Direction
  inline?: boolean
  grow?: number
  shrink?: number
  wrap?: Wrap
  alignSelf?: AlignSelf
  alignItems?: AlignItems
  alignContent?: AlignContent
  justifyContent?: JustifyContent
  gap?: number
  padding?: number
}

export type StyledFlexboxProps = {
  $flexDirection?: Direction
  $inline?: boolean
  $flexGrow?: number
  $flexShrink?: number
  $flexWrap?: Wrap
  $alignSelf?: AlignSelf
  $alignItems?: AlignItems
  $alignContent?: AlignContent
  $justifyContent?: JustifyContent
  $padding?: number
  $gap?: number
}
