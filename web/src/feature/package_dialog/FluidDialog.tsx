import styled from 'styled-components'
import { Button, Dialog, Typography } from '@equinor/eds-core-react'
import { tokens } from '@equinor/eds-tokens'
import { ComponentSelector } from './ComponentSelector'
import { useEffect } from 'react'
import { TComponentProperty, TPackage } from '../../types'
import { demoFeedComponentRatios } from '../../constants'
import { SaveButton } from './SaveButton'
import { usePackageDialogContext } from './context/PackageDialogContext'
import {
  setDescription,
  setName,
  setRatios,
  setSelected,
} from './context/actions'
import { preSelectedComponents } from '../../constants'
import { ComponentTable } from './ComponentTable'
import { ComponentTableSum } from './ComponentTableSum'
import { NameField } from './NameField'
import { DescriptionField } from './DescriptionField'
import { TemplateSelector } from './TemplateSelector'

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

const SecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  max-width: 420px;
`

export const FluidDialog = ({
  close,
  componentProperties,
  editablePackage,
  savePackage,
  packages,
}: {
  close: () => void
  componentProperties: TComponentProperty[]
  editablePackage?: TPackage
  savePackage: (x?: TPackage) => void
  packages: TPackage[]
}) => {
  const { dispatch } = usePackageDialogContext()

  const initials = editablePackage
    ? componentProperties.filter(
        (option) => editablePackage.components[option.id]
      )
    : componentProperties.filter((option) =>
        preSelectedComponents.includes(option.id)
      )

  useEffect(() => {
    if (editablePackage !== undefined) {
      dispatch(setName(editablePackage.name))
      dispatch(setDescription(editablePackage.description))
      dispatch(setRatios(editablePackage.components))
    }
    dispatch(setSelected(initials))
    console.log('useEffect')
  }, [])

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
            <NameField />
            <DescriptionField />
            <TemplateSelector
              packages={packages}
              componentProperties={componentProperties}
            />
          </FirstColumn>
          <SecondColumn>
            <ComponentSelector componentProperties={componentProperties} />
            <ComponentTable />
            <ComponentTableSum />
          </SecondColumn>
        </FluidPackageForm>
        <ButtonRow>
          <ButtonGroup>
            <Button variant="outlined" onClick={close}>
              Cancel
            </Button>
            <SaveButton
              componentProperties={componentProperties}
              editablePackage={editablePackage}
              savePackage={savePackage}
            />
            <Button
              // TODO: Demo button to remove when done testing
              onClick={() => {
                dispatch(setName('Demo data'))
                dispatch(setDescription(''))
                dispatch(setRatios(demoFeedComponentRatios))
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
