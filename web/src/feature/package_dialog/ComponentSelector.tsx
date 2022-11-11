import { Autocomplete } from '@equinor/eds-core-react'
import { useState } from 'react'
import styled from 'styled-components'
import { ComponentTable } from './ComponentTable'
import { preSelectedComponents } from '../../constants'
import { TComponentProperty, TComponentRatios } from '../../types'
import { ComponentTableSum } from './ComponentTableSum'

const ComponentSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  max-width: 420px;
`

export const ComponentSelector = ({
  componentProperties,
  componentRatios,
  setComponentRatios,
  ratiosAreValid,
  setRatiosAreValid,
}: {
  componentProperties: TComponentProperty[]
  componentRatios: TComponentRatios
  setComponentRatios: (componentInput: TComponentRatios) => void
  ratiosAreValid: { [id: string]: boolean }
  setRatiosAreValid: (x: { [id: string]: boolean }) => void
}) => {
  const initials = Object.keys(componentRatios).length
    ? componentProperties.filter((option) => componentRatios[option.id])
    : componentProperties.filter((option) =>
        preSelectedComponents.includes(option.id)
      )
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
        options={componentProperties}
        initialSelectedOptions={initials}
        optionLabel={(option) =>
          `${option.altName} (${option.chemicalFormula})`
        }
      />
      <ComponentTable
        selectedComponents={selectedComponents}
        componentRatios={componentRatios}
        setComponentRatios={setComponentRatios}
        ratiosAreValid={ratiosAreValid}
        setRatiosAreValid={setRatiosAreValid}
      />
      <ComponentTableSum componentRatios={componentRatios} />
    </ComponentSelectorContainer>
  )
}
