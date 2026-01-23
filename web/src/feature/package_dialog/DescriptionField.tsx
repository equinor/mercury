import { Textarea } from '@equinor/eds-core-react'
import { usePackageDialogContext } from './context/PackageDialogContext'

export const DescriptionField = () => {
  const { state, dispatch } = usePackageDialogContext()
  return (
    <Textarea
      id="fluid-package-description"
      placeholder="Description"
      label="Description"
      value={state.description}
      onChange={(event) =>
        dispatch({ type: 'setDescription', value: event.target.value })
      }
      rows={6}
    />
  )
}
