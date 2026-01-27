import type { ComponentProperties, Multiflash } from '../api/generated'

export type TComponentProperty = ComponentProperties & {
  id: string
}

export type TResults = {
  phaseValues: { phase: string; percentage: number; mercury: number }[]
  componentFractions: {
    id: string
    phaseFractions: number[]
    feedFraction: number
  }[]
  cubicFeedFlow: number
}

export type TComponentRatio = {
  id: string
  ratio: string
}

/**
 * Note: Fluids are stored in local storage using type TPackage[]. Updating this type definition may therefore cause the application to break in unexpected ways. To avoid that, remember to increment the version number given to useLocalStorage.
 */
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

export type TLastInput = Multiflash & { cubicFeedFlow: number }
