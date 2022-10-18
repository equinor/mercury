export type TComponent = {
  componentId: string
  altName: string
  chemicalFormula: string
  value: number
}

export type TComponentInput = {
  [componentId: string]: {
    altName: string
    chemicalFormula: string
    value: number
  }
}
export type TComponentComposition = { [componentId: string]: number }
export type TFeedUnit = 'kg/d' | 'Sm3/d'
export type TFeedFlow = { unit: TFeedUnit; value: number }
