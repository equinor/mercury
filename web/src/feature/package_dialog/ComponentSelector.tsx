import { Autocomplete } from '@equinor/eds-core-react'
import { TComponentProperty } from '../../types'
import { usePackageDialogContext } from './context/PackageDialogContext'

export const ComponentSelector = ({
  componentProperties,
}: {
  componentProperties: TComponentProperty[]
}) => {
  const { state, dispatch } = usePackageDialogContext()
  return (
    <Autocomplete
      onOptionsChange={({ selectedItems }) => {
        dispatch({
          type: 'setRatios',
          value: Object.fromEntries(
            Object.entries(state.ratios).filter(([compId]) =>
              selectedItems.find((x) => x.id === compId)
            )
          ),
        })
        dispatch({
          type: 'setIsRatioValid',
          value: Object.fromEntries(
            Object.entries(state.isRatioValid).filter(([compId]) =>
              selectedItems.find((x) => x.id === compId)
            )
          ),
        })
        dispatch({ type: 'setSelectedComponents', value: selectedItems })
      }}
      label="Add components"
      multiple
      options={componentProperties}
      selectedOptions={state.selectedComponents}
      optionLabel={(option) => `${option.altName} (${option.chemicalFormula})`}
    />
  )
}
