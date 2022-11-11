import { Autocomplete } from '@equinor/eds-core-react'
import { useState } from 'react'
import styled from 'styled-components'
import { ComponentTable } from './ComponentTable'
import { preSelectedComponents } from '../../constants'
import { TComponentProperty } from '../../types'
import { ComponentTableSum } from './ComponentTableSum'
import {
  usePackageDialog,
  usePackageDialogDispatch,
} from './context/PackageDialogContext'
import { setAreValid, setRatios } from './context/actions'

const ComponentSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  max-width: 420px;
`

export const ComponentSelector = ({
  componentProperties,
}: {
  componentProperties: TComponentProperty[]
}) => {
  const dispatch = usePackageDialogDispatch()
  const state = usePackageDialog()
  const initials = Object.keys(state.ratios).length
    ? componentProperties.filter((option) => state.ratios[option.id])
    : componentProperties.filter((option) =>
        preSelectedComponents.includes(option.id)
      )
  const [selectedComponents, setSelectedComponents] =
    useState<TComponentProperty[]>(initials)
  return (
    <ComponentSelectorContainer>
      <Autocomplete
        onOptionsChange={({ selectedItems }) => {
          dispatch(
            setRatios(
              Object.fromEntries(
                Object.entries(state.ratios).filter(([compId]) =>
                  selectedItems.find((x) => x.id === compId)
                )
              )
            )
          )
          dispatch(
            setAreValid(
              Object.fromEntries(
                Object.entries(state.areValid).filter(([compId]) =>
                  selectedItems.find((x) => x.id === compId)
                )
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
      <ComponentTable selectedComponents={selectedComponents} />
      <ComponentTableSum />
    </ComponentSelectorContainer>
  )
}
