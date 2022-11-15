import React, { createContext, useContext, useReducer } from 'react'
import {
  TComponentProperty,
  TComponentRatios,
  TPackageDialog,
} from '../../../types'
import { packageDialogReducer } from './reducer'

export type Action =
  | { type: 'setName'; value: string }
  | { type: 'setDescription'; value: string }
  | { type: 'setRatios'; value: TComponentRatios }
  | { type: 'setAreRatioValid'; value: { [id: string]: boolean } }
  | { type: 'setSelected'; value: TComponentProperty[] }

type Dispatch = (action: Action) => void
const PackageDialogContext = createContext<{
  state: TPackageDialog
  dispatch: Dispatch
}>({ state: {} as TPackageDialog, dispatch: () => ({}) })

export function PackageDialogProvider(props: {
  children: React.ReactNode
  initial: TPackageDialog
}) {
  const [state, dispatch] = useReducer(packageDialogReducer, props.initial)

  return (
    <PackageDialogContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PackageDialogContext.Provider>
  )
}

export function usePackageDialogContext() {
  return useContext(PackageDialogContext)
}
