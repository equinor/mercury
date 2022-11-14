import { TextField } from '@equinor/eds-core-react'
import { setName } from './context/actions'
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
        dispatch(setName(event.target.value))
      }
    />
  )
}
