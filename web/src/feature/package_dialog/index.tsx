import { Button } from '@equinor/eds-core-react'
import { ComponentSelector } from './ComponentSelector'
import { TComponentProperty, TPackage, TPackageDialog } from '../../types'
import { SaveButton } from './SaveButton'
import { ComponentTable } from './ComponentTable'
import { ComponentTableSum } from './ComponentTableSum'
import { NameField } from './NameField'
import { DescriptionField } from './DescriptionField'
import { TemplateSelector } from './TemplateSelector'
import { Dialog } from '../../common/Dialog'
import { DemoButton } from './DemoButton'
import { PackageDialogProvider } from './context/PackageDialogContext'
import { preSelectedComponents } from '../../constants'

export const PackageDialog = ({
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
  const initial: TPackageDialog =
    editablePackage === undefined
      ? {
          name: '',
          description: '',
          ratios: {},
          areValid: {},
          selected: componentProperties.filter((option) =>
            preSelectedComponents.includes(option.id)
          ),
        }
      : {
          name: editablePackage.name,
          description: editablePackage.description,
          ratios: editablePackage.components,
          areValid: {},
          selected: componentProperties.filter(
            (option) => editablePackage.components[option.id]
          ),
        }

  return (
    <PackageDialogProvider initial={initial}>
      <Dialog
        close={close}
        header={`${
          editablePackage === undefined ? 'Create' : 'Edit'
        } fluid package`}
        columns={[
          [
            <NameField key={'nameField'} />,
            <DescriptionField key={'descriptionField'} />,
            <TemplateSelector
              key={'templateSelector'}
              packages={packages}
              componentProperties={componentProperties}
            />,
          ],
          [
            <ComponentSelector
              key={'compSelector'}
              componentProperties={componentProperties}
            />,
            <ComponentTable key={'compTable'} />,
            <ComponentTableSum key={'compSum'} />,
          ],
        ]}
        leftButtons={
          editablePackage === undefined
            ? []
            : [
                <Button
                  key={'delete'}
                  color="danger"
                  variant="outlined"
                  onClick={() => {
                    savePackage()
                  }}
                >
                  Delete
                </Button>,
              ]
        }
        rightButtons={[
          <Button key={'cancel'} variant="outlined" onClick={close}>
            Cancel
          </Button>,
          <SaveButton
            key={'save'}
            componentProperties={componentProperties}
            editablePackage={editablePackage}
            savePackage={savePackage}
          />,
          // TODO: Demo button to remove when done testing
          <DemoButton key={'demo'} />,
        ]}
      />
    </PackageDialogProvider>
  )
}
