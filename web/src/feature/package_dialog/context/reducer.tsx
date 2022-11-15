import { TPackageDialog } from '../../../types'
import { Action } from './PackageDialogContext'

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
      const regex = /^\d+(\.\d+)?([eE][-+]?\d+)?$/
      const valids = Object.fromEntries(
        Object.entries(action.value).map(([key, ratio]) => [
          key,
          regex.test(ratio) && !isNaN(Number(ratio)),
        ])
      )
      return {
        ...state,
        ratios: action.value,
        isRatioValid: valids,
      }
    }
    case 'setSelectedComponents': {
      return {
        ...state,
        selectedComponents: action.value,
      }
    }
    default: {
      throw Error('Unhandled action: ' + action)
    }
  }
}
