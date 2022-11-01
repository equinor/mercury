import { Autocomplete } from '@equinor/eds-core-react'
import { useState } from 'react'
import styled from 'styled-components'
import { ComponentTable } from './ComponentTable'
import { preSelectedComponents } from '../../../constants'
import { TComponentProperties, TComponentRatios } from '../../../types'
import { ComponentTableSum } from './ComponentTableSum'

const ComponentSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  max-width: 500px;
`

type TComponentProperty = {
  name: string
  formula: string
  weight: number
  id: string
}

export const ComponentSelector = ({
  componentProperties,
  componentRatios,
  setComponentRatios,
  ratiosAreValid,
  setRatiosAreValid,
}: {
  componentProperties: TComponentProperties
  componentRatios: TComponentRatios
  setComponentRatios: (componentInput: TComponentRatios) => void
  ratiosAreValid: { [id: string]: boolean }
  setRatiosAreValid: (x: { [id: string]: boolean }) => void
}) => {
  const options: TComponentProperty[] = Object.entries(componentProperties).map(
    ([key, entry]) => ({
      name: entry.altName,
      formula: entry.chemicalFormula,
      weight: entry.molecularWeight,
      id: key,
    })
  )
  const initials = Object.keys(componentRatios).length
    ? options.filter((option) => componentRatios[option.id])
    : options.filter((option) => preSelectedComponents.includes(option.id))
  const [selectedComponents, setSelectedComponents] =
    useState<TComponentProperty[]>(initials)
  return (
    <ComponentSelectorContainer>
      <Autocomplete
        onOptionsChange={({ selectedItems }) => {
          setComponentRatios(
            Object.fromEntries(
              Object.entries(componentRatios).filter(([compId]) =>
                selectedItems.find((x) => x.id === compId)
              )
            )
          )
          setRatiosAreValid(
            Object.fromEntries(
              Object.entries(ratiosAreValid).filter(([compId]) =>
                selectedItems.find((x) => x.id === compId)
              )
            )
          )
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
            {
              altName: x.name,
              chemicalFormula: x.formula,
              molecularWeight: x.weight,
            },
          ])
        )}
        componentRatios={componentRatios}
        setComponentRatios={setComponentRatios}
        ratiosAreValid={ratiosAreValid}
        setRatiosAreValid={setRatiosAreValid}
      />
      <ComponentTableSum componentRatios={componentRatios} />
    </ComponentSelectorContainer>
  )
}
