import { ComponentName, ComponentResponse } from '../../api/generated'
import { Autocomplete } from '@equinor/eds-core-react'
import { useState } from 'react'
import styled from 'styled-components'
import { ComponentTable, TComponentEntry } from './ComponentTable'

const ComponentSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  max-width: 500px;
`

const ComponentTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
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

export const ComponentSelector = ({
  components,
}: {
  components: ComponentResponse
}) => {
  const [selectedEntries, setSelectedEntries] = useState(Array<TComponentEntry>)

  return (
    <ComponentSelectorContainer>
      <Autocomplete
        onOptionsChange={({ selectedItems }) => {
          setSelectedEntries(selectedItems)
        }}
        label="Select components"
        multiple
        options={createOptions(components)}
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
