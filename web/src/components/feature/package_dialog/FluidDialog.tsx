import styled from 'styled-components'
import {
  Button,
  Dialog,
  TextField,
  Typography,
  Autocomplete,
} from '@equinor/eds-core-react'
import { tokens } from '@equinor/eds-tokens'
import { ComponentSelector } from './ComponentSelector'
import { useState } from 'react'
import {
  TPackage,
  TComponentProperties,
  TComponentRatios,
} from '../../../types'
import { demoFeedComponentRatios } from '../../../constants'
import { SaveButton } from './SaveButton'

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
  justify-content: space-between;
`

const FirstColumn = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 30px;
  width: 40%;
`

const ButtonRow = styled.div`
  display: flex;
  flex-flow: row-reverse nowrap;
  justify-content: space-between;
  padding-top: 16px;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
`

export const FluidDialog = ({
  close,
  componentProperties,
  editablePackage,
  savePackage,
  packages,
}: {
  close: () => void
  componentProperties: TComponentProperties
  editablePackage?: TPackage
  savePackage: (x?: TPackage) => void
  packages: TPackage[]
}) => {
  // Array of components containing input from user
  const [componentRatios, setComponentRatios] = useState<TComponentRatios>(
    editablePackage?.components ?? {}
  )
  const [packageName, setPackageName] = useState<string>(
    editablePackage?.name ?? ''
  )
  const [packageDescription, setPackageDescription] = useState<string>(
    editablePackage?.description ?? ''
  )
  const [ratiosAreValid, setRatiosAreValid] = useState<{
    [id: string]: boolean
  }>({})

  return (
    <WideDialog open onClose={close} isDismissable>
      <Dialog.Header>
        <Typography
          variant="h6"
          color={tokens.colors.infographic.primary__moss_green_100.hex}
        >
          {`${editablePackage === undefined ? 'Create' : 'Edit'} fluid package`}
        </Typography>
      </Dialog.Header>
      <Dialog.CustomContent>
        <FluidPackageForm>
          <FirstColumn>
            <TextField
              id="fluid-package-name"
              placeholder="Fluid package"
              label="Name"
              value={packageName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPackageName(event.target.value)
              }
            />
            <TextField
              id="fluid-package-description"
              placeholder="Description"
              label="Description"
              value={packageDescription}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPackageDescription(event.target.value)
              }
              multiline
              rows={6}
            />
            <Autocomplete
              label="Template"
              options={packages}
              optionLabel={(option) => option.name}
              onOptionsChange={(changes) => {
                setComponentRatios(changes.selectedItems[0].components)
              }}
              autoWidth
            />
          </FirstColumn>
          <ComponentSelector
            componentProperties={componentProperties}
            componentRatios={componentRatios}
            setComponentRatios={setComponentRatios}
            ratiosAreValid={ratiosAreValid}
            setRatiosAreValid={setRatiosAreValid}
          />
        </FluidPackageForm>
        <ButtonRow>
          <ButtonGroup>
            <Button variant="outlined" onClick={close}>
              Cancel
            </Button>
            <SaveButton
              componentProperties={componentProperties}
              packageName={packageName}
              packageDescription={packageDescription}
              componentRatios={componentRatios}
              editablePackage={editablePackage}
              savePackage={savePackage}
              close={close}
              ratiosAreValid={ratiosAreValid}
            />
            <Button
              // TODO: Demo button to remove when done testing
              onClick={() => {
                setPackageName('Demo data')
                setPackageDescription('')
                setComponentRatios(demoFeedComponentRatios)
              }}
            >
              Demo data
            </Button>
          </ButtonGroup>
          {editablePackage !== undefined && (
            <Button
              color="danger"
              variant="outlined"
              onClick={() => {
                savePackage()
                close()
              }}
            >
              Delete
            </Button>
          )}
        </ButtonRow>
      </Dialog.CustomContent>
    </WideDialog>
  )
}
