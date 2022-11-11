import React, { createContext, useContext, useReducer } from 'react'
import { TPackageDialog } from '../../../types'
import { packageDialogReducer } from './reducer'
import { Action } from './actions'

type Dispatch = (action: Action) => void
const PackageDialogContext = createContext<{
  state: TPackageDialog
  dispatch: Dispatch
}>({ state: {} as TPackageDialog, dispatch: () => ({}) })

export function PackageDialogProvider(props: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    packageDialogReducer,
    initialPackageDialog
  )

  return (
    <PackageDialogContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PackageDialogContext.Provider>
  )
}

export function usePackageDialogContext() {
  return useContext(PackageDialogContext)
}

const initialPackageDialog: TPackageDialog = {
  name: '',
  description: '',
  ratios: {},
  areValid: {},
  selected: [],
}
