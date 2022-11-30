import { Autocomplete } from '@equinor/eds-core-react'
import { preSelectedComponents } from '../../constants'
import { TPackage } from '../../types'
import { usePackageDialogContext } from './context/PackageDialogContext'

export const TemplateSelector = (props: { packages: TPackage[] }) => {
  const { dispatch } = usePackageDialogContext()
  return (
    <Autocomplete
      label="Template"
      options={props.packages}
      optionLabel={(option) => option.name}
      onOptionsChange={(changes) => {
        const template = changes.selectedItems[0]
        dispatch({
          type: 'setRatios',
          value:
            template?.components ??
            preSelectedComponents.map((x) => ({ id: x, ratio: '' })),
        })
      }}
      autoWidth
    />
  )
}
