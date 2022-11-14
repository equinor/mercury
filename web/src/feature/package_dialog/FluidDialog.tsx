import { Button } from '@equinor/eds-core-react'
import { ComponentSelector } from './ComponentSelector'
import { TComponentProperty, TPackage } from '../../types'
import { demoFeedComponentRatios } from '../../constants'
import { SaveButton } from './SaveButton'
import { usePackageDialogContext } from './context/PackageDialogContext'
import { setDescription, setName, setRatios } from './context/actions'
import { ComponentTable } from './ComponentTable'
import { ComponentTableSum } from './ComponentTableSum'
import { NameField } from './NameField'
import { DescriptionField } from './DescriptionField'
import { TemplateSelector } from './TemplateSelector'
import { Dialog } from '../../common/Dialog'

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

  return (
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
        <Button
          key={'demo'}
          // TODO: Demo button to remove when done testing
          onClick={() => {
            dispatch(setName('Demo data'))
            dispatch(setDescription(''))
            dispatch(setRatios(demoFeedComponentRatios))
          }}
        >
          Demo data
        </Button>,
      ]}
    />
  )
}
