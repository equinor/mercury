import styled from 'styled-components'
import { Button, Dialog, TextField } from '@equinor/eds-core-react'
import { ComponentSelector } from './ComponentSelector'
import { ComponentResponse } from '../../api/generated'

const WideDialog = styled(Dialog)`
  width: auto;
  @media (min-width: 900px) {
    min-width: 800px;
  }
`

const FluidPackageForm = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 30px;
`

const FirstColumn = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 30px;
`

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
    <WideDialog open={open} onClose={onClose}>
      <Dialog.Header>
        <Dialog.Title>Create fluid package</Dialog.Title>
      </Dialog.Header>
      <Dialog.CustomContent>
        <FluidPackageForm>
          <FirstColumn>
            <TextField
              id="fluid-package-name"
              placeholder="Fluid package"
              label="Name"
            />
            <TextField
              id="fluid-package-description"
              placeholder="Description"
              label="Description"
              multiline
            />
          </FirstColumn>
          <ComponentSelector components={components} />
        </FluidPackageForm>
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
    </WideDialog>
  )
}
