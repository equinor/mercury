import styled from 'styled-components'
import { Button, Dialog, TextField } from '@equinor/eds-core-react'
import { ComponentSelector } from './ComponentSelector'
import { ComponentResponse } from '../../api/generated'
import { TComponentComposition } from '../../pages/Main'
import { useState } from 'react'
import { demoComponentInput, demoFeedComponentRatios } from '../../constants'

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

export type TComponent = {
  componentId: string
  altName: string
  chemicalFormula: string
  value: number
}

export type TComponentInput = {
  [componentId: string]: {
    altName: string
    chemicalFormula: string
    value: number
  }
}

function convertComponentResponseToComponentInput(
  components: ComponentResponse
): TComponentInput {
  // convert from ComponentResponse type to TComponentInput
  return Object.fromEntries(
    Object.entries(components.components).map(([componentId, names]) => [
      componentId,
      { ...names, value: 0 },
    ])
  )
}

function normalizeArray(array: Array<number>): Array<number> {
  // Normalize array if not "close enough" (|sum - 1| > 0.01) to 1
  const arraySum: number = array.reduce(
    (partialSum, value) => partialSum + value,
    0
  )
  return Math.abs(arraySum - 1) > 0.01
    ? array.map((value) => value / arraySum)
    : array
}

function normalizeComponentComposition(
  componentComposition: TComponentComposition
): TComponentComposition {
  // Normalize feedComponentRatios if necessary, else return
  const normalizedValues: Array<number> = normalizeArray(
    Object.values(componentComposition)
  )
  if (
    JSON.stringify(normalizedValues) !==
    JSON.stringify(Object.values(componentComposition))
  ) {
    Object.entries(componentComposition).forEach(
      ([componentId, value], index) => {
        componentComposition[componentId] = normalizedValues[index]
      }
    )
  }
  return componentComposition
}

export const FluidDialog = ({
  open,
  onClose,
  components,
  setComponentComposition,
}: {
  open: boolean
  onClose: () => void
  components: ComponentResponse
  setComponentComposition: (feedComponentRatios: TComponentComposition) => void
}) => {
  // Array of components containing input from user
  const [componentInput, setComponentInput] = useState<TComponentInput>(() => {
    return convertComponentResponseToComponentInput(components)
  })

  const handleSubmit = () => {
    const editedComponentComposition: TComponentComposition = {}
    Object.entries(componentInput).forEach(([componentId, componentEntry]) => {
      if (componentEntry.value !== 0) {
        editedComponentComposition[componentId] = componentEntry.value
      }
    })
    setComponentComposition(
      normalizeComponentComposition(editedComponentComposition)
    )
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
            />
            <TextField
              id="fluid-package-description"
              placeholder="Description"
              label="Description"
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
        <Button onClick={handleSubmit}>Save</Button>
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
