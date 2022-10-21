import styled from 'styled-components'
import { Button, Dialog, TextField } from '@equinor/eds-core-react'
import { ComponentSelector } from './ComponentSelector'
import { ComponentProperties, Components } from '../../api/generated'
import { useState } from 'react'
import { demoComponentInput, demoFeedComponentRatios } from '../../constants'
import { TComponentComposition, TComponentInput, TPackage } from '../../types'

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

function convertComponentResponseToComponentInput(
  components: Components
): TComponentInput {
  // convert from ComponentResponse type to TComponentInput
  return Object.fromEntries(
    Object.entries(components).map(
      ([componentId, properties]: [string, ComponentProperties]) => [
        componentId,
        {
          altName: properties.altName,
          chemicalFormula: properties.chemicalFormula,
          value: 0,
        },
      ]
    )
  )
}

function getNormalizationFactor(array: Array<number>): number {
  const arraySum: number = array.reduce(
    (partialSum, value) => partialSum + value,
    0
  )
  return Math.abs(arraySum - 1) > 0.01 ? arraySum : 1
}

function normalizeComponentComposition(
  componentComposition: TComponentComposition
): TComponentComposition {
  const factor = getNormalizationFactor(Object.values(componentComposition))
  return Object.fromEntries(
    Object.entries(componentComposition).map(([componentId, value]) => [
      componentId,
      value / factor,
    ])
  )
}

export const FluidDialog = ({
  open,
  onClose,
  components,
  setComponentComposition,
  packages,
  setPackages,
}: {
  open: boolean
  onClose: () => void
  components: Components
  setComponentComposition: (feedComponentRatios: TComponentComposition) => void
  packages: TPackage[]
  setPackages: (v: TPackage[]) => void
}) => {
  // Array of components containing input from user
  const [componentInput, setComponentInput] = useState<TComponentInput>(() => {
    return convertComponentResponseToComponentInput(components)
  })
  const [packageName, setPackageName] = useState<string>('')
  const [packageDescription, setPackageDescription] = useState<string>('')

  const getComponentComposition = () => {
    const componentComposition: TComponentComposition = {}
    Object.entries(componentInput).forEach(([componentId, componentEntry]) => {
      if (componentEntry.value !== 0) {
        componentComposition[componentId] = componentEntry.value
      }
    })
    return componentComposition
  }

  const applyPackage = () => {
    setComponentComposition(
      normalizeComponentComposition(getComponentComposition())
    )
    onClose()
  }

  const savePackage = () => {
    const componentComposition = getComponentComposition()
    setComponentComposition(normalizeComponentComposition(componentComposition))
    setPackages([
      ...packages,
      {
        name: packageName,
        description: packageDescription,
        components: componentComposition,
      },
    ])
    onClose()
  }

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
            componentInput={componentInput}
            setComponentInput={setComponentInput}
          />
        </FluidPackageForm>
      </Dialog.CustomContent>
      <Dialog.Actions>
        <Button color="danger" variant="outlined">
          Delete
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={applyPackage}>Apply</Button>
        <Button onClick={savePackage}>Save</Button>
        <Button
          // TODO: Demo button to remove when done testing
          onClick={() => {
            setComponentComposition(demoFeedComponentRatios)
            setComponentInput(demoComponentInput)
            onClose()
          }}
        >
          Demo data
        </Button>
      </Dialog.Actions>
    </WideDialog>
  )
}
