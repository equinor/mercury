import { Autocomplete } from '@equinor/eds-core-react'
import { useState } from 'react'
import styled from 'styled-components'
import { ComponentTable } from './ComponentTable'
import { preSelectedComponents } from '../../constants'
import { TComponentInput } from './FluidDialog'

const ComponentSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  max-width: 500px;
`

const ComponentTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 420px;
  overflow: auto;
`

export type TComponentEntry = {
  componentId: string
  altName: string
  chemicalFormula: string
}

function createOptions(
  componentInput: TComponentInput
): Array<TComponentEntry> {
  return Object.entries(componentInput).map(([componentId, entry]) => ({
    componentId: componentId,
    altName: entry.altName,
    chemicalFormula: entry.chemicalFormula,
  }))
}

function getInitialSelectedOptions(
  componentOptions: Array<TComponentEntry>
): Array<TComponentEntry> {
  return componentOptions.filter((component) =>
    preSelectedComponents.includes(component.componentId)
  )
}

export const ComponentSelector = ({
  componentInput,
  setComponentInput,
}: {
  componentInput: TComponentInput
  setComponentInput: (componentInput: TComponentInput) => void
}) => {
  const componentOptions = createOptions(componentInput)
  const initialComponents = getInitialSelectedOptions(componentOptions)
  const [selectedEntries, setSelectedEntries] =
    useState<Array<TComponentEntry>>(initialComponents)

  return (
    <ComponentSelectorContainer>
      <Autocomplete
        onOptionsChange={({ selectedItems }) => {
          setSelectedEntries(selectedItems)
        }}
        label="Add components"
        multiple
        options={componentOptions}
        initialSelectedOptions={initialComponents}
        optionLabel={(option) =>
          `${option.altName} (${option.chemicalFormula})`
        }
      />
      <ComponentTableContainer>
        <ComponentTable
          input={selectedEntries}
          componentInput={componentInput}
          setComponentInput={setComponentInput}
        />
      </ComponentTableContainer>
    </ComponentSelectorContainer>
  )
}
