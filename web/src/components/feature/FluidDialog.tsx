import styled from 'styled-components'
import { Button, Dialog, TextField } from '@equinor/eds-core-react'
import { ComponentSelector } from './ComponentSelector'
import { ComponentName, ComponentResponse } from '../../api/generated'
import { TFeedComponentRatios } from '../../pages/Main'
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
  // convert from ComponentResponse type to ComponentInput type
  const componentInput: TComponentInput = {}
  Object.entries(components.components).forEach(
    ([key, name]: [string, ComponentName]) =>
      (componentInput[key] = {
        altName: name.altName,
        chemicalFormula: name.chemicalFormula,
        value: 0,
      })
  )
  return componentInput
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

function normalizeFeedComponentRatios(
  feedComponentRatios: TFeedComponentRatios
): TFeedComponentRatios {
  // Normalize feedComponentRatios if necessary, else return
  const normalizedValues: Array<number> = normalizeArray(
    Object.values(feedComponentRatios)
  )
  if (normalizedValues !== Object.values(feedComponentRatios)) {
    Object.entries(feedComponentRatios).forEach(
      ([componentId, value], index) => {
        feedComponentRatios[componentId] = normalizedValues[index]
      }
    )
  }
  return feedComponentRatios
}

export const FluidDialog = ({
  open,
  onClose,
  components,
  setFeedComponentRatios,
}: {
  open: boolean
  onClose: () => void
  components: ComponentResponse
  setFeedComponentRatios: (feedComponentRatios: TFeedComponentRatios) => void
}) => {
  const [componentInput, setComponentInput] = useState<TComponentInput>(() => {
    return convertComponentResponseToComponentInput(components)
  })

  const handleSubmit = () => {
    const editedComponentRatios: TFeedComponentRatios = {}
    Object.entries(componentInput).forEach(([componentId, componentEntry]) => {
      if (componentEntry.value !== 0) {
        editedComponentRatios[componentId] = componentEntry.value
      }
    })
    setFeedComponentRatios(normalizeFeedComponentRatios(editedComponentRatios))
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
            setFeedComponentRatios(demoFeedComponentRatios)
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
