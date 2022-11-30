import { Autocomplete } from '@equinor/eds-core-react'
import { usePackageDialogContext } from './context/PackageDialogContext'

export const ComponentSelector = () => {
  const { state, dispatch } = usePackageDialogContext()
  return (
    <Autocomplete
      onOptionsChange={({ selectedItems }) => {
        dispatch({ type: 'setSelectedComponents', value: selectedItems })
      }}
      label="Add components"
      multiple
      options={state.componentProperties}
      selectedOptions={state.selectedComponents}
      optionLabel={(option) => `${option.altName} (${option.chemicalFormula})`}
    />
  )
}
