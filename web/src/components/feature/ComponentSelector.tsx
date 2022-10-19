import { Autocomplete } from '@equinor/eds-core-react'
import { useState } from 'react'
import styled from 'styled-components'
import { ComponentTable } from './ComponentTable'
import { preSelectedComponents } from '../../constants'
import { TComponentNames, TComponentRatios } from '../../types'

const ComponentSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  max-width: 500px;
`

type TComponentName = {
  name: string
  formula: string
  id: string
}

export const ComponentSelector = ({
  componentNames,
  componentRatios,
  setComponentRatios,
}: {
  componentNames: TComponentNames
  componentRatios: TComponentRatios
  setComponentRatios: (componentInput: TComponentRatios) => void
}) => {
  const options: TComponentName[] = Object.entries(componentNames).map(
    ([key, entry]) => ({
      name: entry.name,
      formula: entry.formula,
      id: key,
    })
  )
  const initials = options.filter((option) =>
    preSelectedComponents.includes(option.id)
  )
  const [selectedComponents, setSelectedComponents] =
    useState<TComponentName[]>(initials)
  return (
    <ComponentSelectorContainer>
      <Autocomplete
        onOptionsChange={({ selectedItems }) => {
          setSelectedComponents(selectedItems)
        }}
        label="Add components"
        multiple
        options={options}
        initialSelectedOptions={initials}
        optionLabel={(option) => `${option.name} (${option.formula})`}
      />
      <ComponentTable
        selectedComponents={Object.fromEntries(
          selectedComponents.map((x) => [
            x.id,
            { name: x.name, formula: x.formula },
          ])
        )}
        componentRatios={componentRatios}
        setComponentRatios={setComponentRatios}
      />
    </ComponentSelectorContainer>
  )
}
