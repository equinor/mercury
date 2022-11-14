import { Autocomplete } from '@equinor/eds-core-react'
import { TComponentProperty, TPackage } from '../../types'
import { setRatios, setSelected } from './context/actions'
import { usePackageDialogContext } from './context/PackageDialogContext'

export const TemplateSelector = (props: {
  packages: TPackage[]
  componentProperties: TComponentProperty[]
}) => {
  const { dispatch } = usePackageDialogContext()
  return (
    <Autocomplete
      label="Template"
      options={props.packages}
      optionLabel={(option) => option.name}
      onOptionsChange={(changes) => {
        dispatch(setRatios(changes.selectedItems[0].components))
        dispatch(
          setSelected(
            props.componentProperties.filter(
              (x) => changes.selectedItems[0].components[x.id]
            )
          )
        )
      }}
      autoWidth
    />
  )
}
