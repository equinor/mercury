import React, { createContext, useContext, useReducer } from 'react'
import { TPackageDialog } from '../../../types'
import { packageDialogReducer } from './reducer'
import { Action } from './actions'

const PackageDialogContext = createContext({} as TPackageDialog)
const PackageDialogDispatchContext = createContext(
  (() => ({})) as React.Dispatch<Action>
)

export function PackageDialogProvider(props: { children: React.ReactNode }) {
  const [packageDialog, dispatch] = useReducer(
    packageDialogReducer,
    initialPackageDialog
  )

  return (
    <PackageDialogContext.Provider value={packageDialog}>
      <PackageDialogDispatchContext.Provider value={dispatch}>
        {props.children}
      </PackageDialogDispatchContext.Provider>
    </PackageDialogContext.Provider>
  )
}

export function usePackageDialog() {
  return useContext(PackageDialogContext)
}

export function usePackageDialogDispatch() {
  return useContext(PackageDialogDispatchContext)
}

const initialPackageDialog: TPackageDialog = {
  name: '',
  description: '',
  ratios: {},
  areValid: {},
  selected: [],
}
