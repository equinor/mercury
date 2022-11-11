import { Autocomplete } from '@equinor/eds-core-react'
import { TComponentProperty } from '../../types'
import { usePackageDialogContext } from './context/PackageDialogContext'
import { setAreValid, setRatios, setSelected } from './context/actions'

export const ComponentSelector = ({
  componentProperties,
}: {
  componentProperties: TComponentProperty[]
}) => {
  const { state, dispatch } = usePackageDialogContext()
  return (
    <Autocomplete
      onOptionsChange={({ selectedItems }) => {
        dispatch(
          setRatios(
            Object.fromEntries(
              Object.entries(state.ratios).filter(([compId]) =>
                selectedItems.find((x) => x.id === compId)
              )
            )
          )
        )
        dispatch(
          setAreValid(
            Object.fromEntries(
              Object.entries(state.areValid).filter(([compId]) =>
                selectedItems.find((x) => x.id === compId)
              )
            )
          )
        )
        dispatch(setSelected(selectedItems))
      }}
      label="Add components"
      multiple
      options={componentProperties}
      selectedOptions={state.selected}
      optionLabel={(option) => `${option.altName} (${option.chemicalFormula})`}
    />
  )
}
