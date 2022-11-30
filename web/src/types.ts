import { ComponentProperties, MultiflashResponse } from './api/generated'

export type TComponentProperty = ComponentProperties & {
  id: string
}
export type TResults = MultiflashResponse & {
  cubicFeedFlow: number
}
export type TComponentRatio = {
  id: string
  ratio: string
}
export type TFeedUnit = 'kg/d' | 'Sm3/d'
export type TFeedFlow = { unit: TFeedUnit; value: number }
export type TPackage = {
  name: string
  description: string
  components: TComponentRatio[]
  molecularWeightSum: number
}

export type TPackageDialog = {
  name: string
  description: string
  ratios: TComponentRatio[]
  isRatioValid: {
    [id: string]: boolean
  }
  selectedComponents: TComponentProperty[]
  componentProperties: TComponentProperty[]
}

export type TCalcStatus = 'calculating' | 'done' | 'failure' | undefined
