import { TextField } from '@equinor/eds-core-react'
import { usePackageDialogContext } from './context/PackageDialogContext'

export const NameField = () => {
  const { state, dispatch } = usePackageDialogContext()
  return (
    <TextField
      id="fluid-package-name"
      placeholder="Fluid package"
      label="Name"
      value={state.name}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: 'setName', value: event.target.value })
      }
    />
  )
}
