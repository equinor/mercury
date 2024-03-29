import { Button, Dialog, Typography } from '@equinor/eds-core-react'
import { tokens } from '@equinor/eds-tokens'
import styled from 'styled-components'
import { preSelectedComponents } from '../../constants'
import { TComponentProperty, TPackage, TPackageDialog } from '../../types'
import { ComponentSelector } from './ComponentSelector'
import { ComponentTable } from './ComponentTable'
import { ComponentTableSum } from './ComponentTableSum'
import { DescriptionField } from './DescriptionField'
import { NameField } from './NameField'
import { SaveButton } from './SaveButton'
import { TemplateSelector } from './TemplateSelector'
import { PackageDialogProvider } from './context/PackageDialogContext'

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

const SecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  max-width: 420px;
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
  componentProperties: TComponentProperty[]
  editablePackage?: TPackage
  savePackage: (x?: TPackage) => void
  packages: TPackage[]
}) => {
  const initial: TPackageDialog = {
    name: editablePackage?.name ?? '',
    description: editablePackage?.description ?? '',
    ratios:
      editablePackage?.components ??
      preSelectedComponents.map((x) => ({ id: x, ratio: '' })),
    isRatioValid: {},
    selectedComponents: (
      editablePackage?.components.map((x) => x.id) ?? preSelectedComponents
    )
      .map((x) => componentProperties.find((prop) => prop.id === x))
      .filter((x): x is TComponentProperty => !!x),
    componentProperties: componentProperties,
  }

  return (
    <PackageDialogProvider initial={initial}>
      <WideDialog open onClose={close} isDismissable>
        <Dialog.Header>
          <Typography
            variant="h3"
            color={tokens.colors.infographic.primary__moss_green_100.hex}
          >
            {editablePackage === undefined ? 'Create' : 'Edit'} fluid package
          </Typography>
        </Dialog.Header>
        <Dialog.CustomContent>
          <FluidPackageForm>
            <FirstColumn>
              <NameField />
              <DescriptionField />
              {editablePackage === undefined && (
                <TemplateSelector packages={packages} />
              )}
            </FirstColumn>
            <SecondColumn>
              <ComponentSelector />
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
                editablePackage={editablePackage}
                savePackage={savePackage}
              />
            </ButtonGroup>
            <ButtonGroup>
              {editablePackage !== undefined && (
                <Button
                  color="danger"
                  variant="outlined"
                  onClick={() => {
                    const overwrite: boolean = window.confirm(
                      'Are you sure you want to delete the package?'
                    )
                    if (!overwrite) return
                    savePackage()
                  }}
                >
                  Delete
                </Button>
              )}
            </ButtonGroup>
          </ButtonRow>
        </Dialog.CustomContent>
      </WideDialog>
    </PackageDialogProvider>
  )
}
