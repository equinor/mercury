import type React from 'react'
import { createContext, useContext, useReducer } from 'react'
import type {
  TComponentProperty,
  TComponentRatio,
  TPackageDialog,
} from '../../../common/types'
import { packageDialogReducer } from './reducer'

export type Action =
  | { type: 'setName'; value: string }
  | { type: 'setDescription'; value: string }
  | { type: 'setRatios'; value: TComponentRatio[] }
  | { type: 'setSelectedComponents'; value: TComponentProperty[] }

const PackageDialogContext = createContext<{
  state: TPackageDialog
  dispatch: (action: Action) => void
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
