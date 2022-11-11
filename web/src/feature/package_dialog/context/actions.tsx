export enum ActionType {
  SetName,
  SetDescription,
}

export type Action = SetName | SetDescription

export interface SetName {
  type: ActionType.SetName
  payload: {
    value: string
  }
}

export const setName = (value: string): SetName => {
  return {
    type: ActionType.SetName,
    payload: {
      value: value,
    },
  }
}

export interface SetDescription {
  type: ActionType.SetDescription
  payload: {
    value: string
  }
}

export const setDescription = (value: string): SetDescription => {
  return {
    type: ActionType.SetDescription,
    payload: {
      value: value,
    },
  }
}
