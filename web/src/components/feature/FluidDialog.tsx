import { Button, Dialog, TextField } from '@equinor/eds-core-react'
import { ComponentSelector } from './ComponentSelector'
import { ComponentResponse } from '../../api/generated'

export const FluidDialog = ({
  open,
  onClose,
  components,
}: {
  open: boolean
  onClose: () => void
  components: ComponentResponse
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Dialog.Header>
        <Dialog.Title>Fluid package</Dialog.Title>
      </Dialog.Header>
      <Dialog.CustomContent>
        <TextField
          id="fluid-package-name"
          placeholder="Fluid package"
          label="Name"
        />
        <TextField
          id="fluid-package-description"
          placeholder="Description"
          label="Description"
        />
        <ComponentSelector components={components} />
      </Dialog.CustomContent>
      <Dialog.Actions>
        <Button color="danger" variant="outlined">
          Delete
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </Dialog.Actions>
    </Dialog>
  )
}
