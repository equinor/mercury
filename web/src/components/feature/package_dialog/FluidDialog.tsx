import styled from 'styled-components'
import { Button, Dialog, TextField } from '@equinor/eds-core-react'
import { ComponentSelector } from './ComponentSelector'
import { useEffect, useState } from 'react'
import {
  TPackage,
  TComponentProperties,
  TComponentRatios,
} from '../../../types'
import { demoFeedComponentRatios } from '../../../constants'

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

function computeFeedMolecularWeight(
  componentProperties: TComponentProperties,
  componentRatios: TComponentRatios
): number {
  return componentRatios !== {}
    ? Object.entries(componentRatios)
        .map(([id, ratio]) => componentProperties[id].molecularWeight * ratio)
        .reduce((a, b) => a + b)
    : 1
}

export const FluidDialog = ({
  isOpen,
  close,
  componentProperties,
  selectedPackage,
  packages,
  setPackages,
}: {
  isOpen: boolean
  close: () => void
  componentProperties: TComponentProperties
  selectedPackage: TPackage | undefined
  packages: { [name: string]: TPackage }
  setPackages: (v: { [name: string]: TPackage }) => void
}) => {
  // Array of components containing input from user
  const [componentRatios, setComponentRatios] = useState<TComponentRatios>({})
  const [packageName, setPackageName] = useState<string>('')
  const [packageDescription, setPackageDescription] = useState<string>('')

  useEffect(() => {
    if (selectedPackage === undefined) {
      setPackageName('')
      setPackageDescription('')
      setComponentRatios({})
    } else {
      setPackageName(selectedPackage.name)
      setPackageDescription(selectedPackage.description)
      setComponentRatios(selectedPackage.components)
    }
  }, [selectedPackage])

  const savePackage = () => {
    setPackages({
      ...packages,
      [packageName]: {
        name: packageName,
        description: packageDescription,
        components: componentRatios,
        molecularWeightSum: computeFeedMolecularWeight(
          componentProperties,
          componentRatios
        ),
      },
    })
    close()
  }

  return (
    <WideDialog open={isOpen} onClose={close} isDismissable={true}>
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
            />
          </FirstColumn>
          <ComponentSelector
            componentProperties={componentProperties}
            componentRatios={componentRatios}
            setComponentRatios={setComponentRatios}
          />
        </FluidPackageForm>
      </Dialog.CustomContent>
      <Dialog.Actions>
        <Button color="danger" variant="outlined">
          Delete
        </Button>
        <Button variant="outlined" onClick={close}>
          Cancel
        </Button>
        <Button onClick={savePackage} disabled={!packageName}>
          Save
        </Button>
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
      </Dialog.Actions>
    </WideDialog>
  )
}