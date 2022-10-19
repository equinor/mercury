export type TComponentNames = {
  [id: string]: {
    name: string
    formula: string
  }
}
export type TComponentRatios = {
  [id: string]: number
}
export type TFeedUnit = 'kg/d' | 'Sm3/d'
export type TFeedFlow = { unit: TFeedUnit; value: number }
export type TPackage = {
  name: string
  description: string
  components: TComponentRatios
}
