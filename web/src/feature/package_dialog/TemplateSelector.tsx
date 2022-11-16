import { Autocomplete } from '@equinor/eds-core-react'
import { preSelectedComponents } from '../../constants'
import { TComponentProperty, TPackage } from '../../types'
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
        const template = changes.selectedItems[0]
        dispatch({ type: 'setRatios', value: template?.components ?? {} })
        dispatch({
          type: 'setSelectedComponents',
          value: template
            ? props.componentProperties.filter((x) => template.components[x.id])
            : props.componentProperties.filter((option) =>
                preSelectedComponents.includes(option.id)
              ),
        })
      }}
      autoWidth
    />
  )
}
