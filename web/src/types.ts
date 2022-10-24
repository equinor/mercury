export type TComponent = {
  componentId: string
  altName: string
  chemicalFormula: string
  feedValue: number
}

export type TComponentInput = {
  [componentId: string]: {
    altName: string
    chemicalFormula: string
    molecularWeight: number
    feedValue: number
  }
}
export type TComponentComposition = { [componentId: string]: number }
export type TFeedUnit = 'kg/d' | 'Sm3/d'
export type TPackage = {
  name: string
  description: string
  components: TComponentComposition
}
