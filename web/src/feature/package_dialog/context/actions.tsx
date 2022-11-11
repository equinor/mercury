import { TComponentProperty, TComponentRatios } from '../../../types'

export enum ActionType {
  SetName,
  SetDescription,
  SetRatios,
  SetAreValid,
  SetSelected,
}

export type Action =
  | SetName
  | SetDescription
  | SetRatios
  | SetAreValid
  | SetSelected

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

export interface SetRatios {
  type: ActionType.SetRatios
  payload: {
    value: TComponentRatios
  }
}

export const setRatios = (value: TComponentRatios): SetRatios => {
  return {
    type: ActionType.SetRatios,
    payload: {
      value: value,
    },
  }
}

export interface SetAreValid {
  type: ActionType.SetAreValid
  payload: {
    value: {
      [id: string]: boolean
    }
  }
}

export const setAreValid = (value: { [id: string]: boolean }): SetAreValid => {
  return {
    type: ActionType.SetAreValid,
    payload: {
      value: value,
    },
  }
}

export interface SetSelected {
  type: ActionType.SetSelected
  payload: {
    value: TComponentProperty[]
  }
}

export const setSelected = (value: TComponentProperty[]): SetSelected => {
  return {
    type: ActionType.SetSelected,
    payload: {
      value: value,
    },
  }
}
