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
    default: {
      throw Error('Unhandled action: ' + action)
    }
  }
}
