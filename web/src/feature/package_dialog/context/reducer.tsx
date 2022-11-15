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
      return {
        ...state,
        ratios: action.value,
      }
    }
    case 'setAreValid': {
      return {
        ...state,
        areValid: action.value,
      }
    }
    case 'setSelected': {
      return {
        ...state,
        selected: action.value,
      }
    }
    default: {
      throw Error('Unhandled action: ' + action)
    }
  }
}
