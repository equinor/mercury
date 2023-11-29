import {
  TComponentProperty,
  TComponentRatio,
  TPackageDialog,
} from '../../../types'
import { Action } from './PackageDialogContext'

const areValids = (ratios: TComponentRatio[]) => {
  const regex = /^\d+(\.\d+)?([eE][-+]?\d+)?$/
  return Object.fromEntries(
    ratios.map((x) => [
      x.id,
      (x.ratio.length === 0 || regex.test(x.ratio)) &&
        !Number.isNaN(Number(x.ratio)),
    ])
  )
}

export function packageDialogReducer(state: TPackageDialog, action: Action) {
  switch (action.type) {
    case 'setName': {
      return {
        ...state,
        name: action.value,
      }
    }
    case 'setDescription': {
      return {
        ...state,
        description: action.value,
      }
    }
    case 'setRatios': {
      return {
        ...state,
        ratios: action.value,
        isRatioValid: areValids(action.value),
        selectedComponents: action.value
          .map((x) =>
            state.componentProperties.find((prop) => prop.id === x.id)
          )
          .filter((x): x is TComponentProperty => !!x),
      }
    }
    case 'setSelectedComponents': {
      const ratios = action.value.map(
        (selected) =>
          state.ratios.find((ratio) => ratio.id === selected.id) ?? {
            id: selected.id,
            ratio: '',
          }
      )
      return {
        ...state,
        selectedComponents: action.value,
        ratios: ratios,
        isRatioValid: areValids(ratios),
      }
    }
    default: {
      throw Error(`Unhandled action: ${action}`)
    }
  }
}
