import { ComponentName, ComponentResponse } from '../../api/generated'
import { Autocomplete } from '@equinor/eds-core-react'
import { useState } from 'react'
import styled from 'styled-components'
import { ComponentTable, TComponentEntry } from './ComponentTable'
import { preSelectedComponents } from '../../constants'

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

function createOptions(components: ComponentResponse): Array<TComponentEntry> {
  return Object.entries(components.components).map(
    ([key, name]: [string, ComponentName]) => ({
      componentId: key,
      altName: name.altName,
      chemicalFormula: name.chemicalFormula,
    })
  )
}

function getInitialSelectedOptions(
  componentOptions: Array<TComponentEntry>
): Array<TComponentEntry> {
  return componentOptions.filter((component) =>
    preSelectedComponents.includes(component.componentId)
  )
}

export const ComponentSelector = ({
  components,
}: {
  components: ComponentResponse
}) => {
  const componentOptions = createOptions(components)
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
        <ComponentTable input={selectedEntries} />
      </ComponentTableContainer>
    </ComponentSelectorContainer>
  )
}
