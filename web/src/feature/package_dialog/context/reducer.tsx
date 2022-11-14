import { TPackageDialog } from '../../../types'
import { Action, ActionType } from './actions'

export function packageDialogReducer(state: TPackageDialog, action: Action) {
  switch (action.type) {
    case ActionType.SetName: {
      return {
        ...state,
        name: action.payload.value,
      }
    }
    case ActionType.SetDescription: {
      return {
        ...state,
        description: action.payload.value,
      }
    }
    case ActionType.SetRatios: {
      return {
        ...state,
        ratios: action.payload.value,
      }
    }
    case ActionType.SetAreValid: {
      return {
        ...state,
        areValid: action.payload.value,
      }
    }
    case ActionType.SetSelected: {
      return {
        ...state,
        selected: action.payload.value,
      }
    }
    default: {
      throw Error('Unhandled action: ' + action)
    }
  }
}