import { TextField } from '@equinor/eds-core-react'
import { setDescription } from './context/actions'
import { usePackageDialogContext } from './context/PackageDialogContext'

export const DescriptionField = () => {
  const { state, dispatch } = usePackageDialogContext()
  return (
    <TextField
      id="fluid-package-description"
      placeholder="Description"
      label="Description"
      value={state.description}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setDescription(event.target.value))
      }
      multiline
      rows={6}
    />
  )
}
