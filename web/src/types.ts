import { ComponentProperties, MultiflashResponse } from './api/generated'

export type TComponentProperty = ComponentProperties & {
  id: string
}
export type TResults = MultiflashResponse & {
  cubicFeedFlow: number
}
export type TComponentRatios = {
  [id: string]: string
}
export type TFeedUnit = 'kg/d' | 'Sm3/d'
export type TFeedFlow = { unit: TFeedUnit; value: number }
export type TPackage = {
  name: string
  description: string
  components: TComponentRatios
  molecularWeightSum: number
}
