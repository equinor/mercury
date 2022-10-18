import { Autocomplete } from '@equinor/eds-core-react'
import { useState } from 'react'
import styled from 'styled-components'
import { ComponentTable } from './ComponentTable'
import { preSelectedComponents } from '../../constants'
import { TComponent, TComponentInput } from './FluidDialog'

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

function createOptions(componentInput: TComponentInput): TComponent[] {
  // Convert TComponentInput to TComponent for table
  return Object.entries(componentInput).map(([componentId, entry]) => ({
    componentId: componentId,
    ...entry,
  }))
}

function getInitialSelectedComponents(
  componentOptions: TComponent[]
): TComponent[] {
  // Filter out components not in preSelectedComponents constant
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
  const allComponents = createOptions(componentInput)
  const initialSelectedComponents = getInitialSelectedComponents(allComponents)
  const [selectedComponents, setSelectedComponents] = useState<TComponent[]>(
    initialSelectedComponents
  )
  return (
    <ComponentSelectorContainer>
      <Autocomplete
        onOptionsChange={({ selectedItems }) => {
          setSelectedComponents(selectedItems)
        }}
        label="Add components"
        multiple
        options={allComponents}
        initialSelectedOptions={initialSelectedComponents}
        optionLabel={(option) =>
          `${option.altName} (${option.chemicalFormula})`
        }
      />
      <ComponentTableContainer>
        <ComponentTable
          input={selectedComponents}
          componentInput={componentInput}
          setComponentInput={setComponentInput}
        />
      </ComponentTableContainer>
    </ComponentSelectorContainer>
  )
}
