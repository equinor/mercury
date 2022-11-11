import React from 'react'
import styled from 'styled-components'
import { EdsProvider, Input, Table } from '@equinor/eds-core-react'
import { TComponentRatios, TComponentProperty } from '../../types'

const ComponentTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 550px;
  overflow: auto;
  margin-top: 15px;
`

export const ComponentTable = ({
  selectedComponents,
  componentRatios,
  setComponentRatios,
  ratiosAreValid,
  setRatiosAreValid,
}: {
  selectedComponents: TComponentProperty[]
  componentRatios: TComponentRatios
  setComponentRatios: (componentInput: TComponentRatios) => void
  ratiosAreValid: { [id: string]: boolean }
  setRatiosAreValid: (x: { [id: string]: boolean }) => void
}): JSX.Element => {
  function handleOnChange(
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    const ratio = event.target.value
    const newRatiosAreValid = { ...ratiosAreValid }
    newRatiosAreValid[id] =
      event.target.checkValidity() && !isNaN(Number(ratio))
    setRatiosAreValid(newRatiosAreValid)
    const newRatios = { ...componentRatios }
    if (ratio === '') {
      delete newRatios[id]
    } else {
      newRatios[id] = ratio
    }
    setComponentRatios(newRatios)
  }

  function createTableRows() {
    return selectedComponents.map((component, rowIndex) => (
      <Table.Row key={rowIndex}>
        <Table.Cell
          data-testid={`Component-${rowIndex}`}
        >{`${component.altName} (${component.chemicalFormula})`}</Table.Cell>
        <Table.Cell data-testid={`Ratio (mol)-${rowIndex}`}>
          <Input
            id={`${component.chemicalFormula}-input`}
            value={componentRatios[component.id] ?? ''}
            pattern="^\d+(\.\d+)?([eE][-+]?\d+)?$"
            variant={
              ratiosAreValid[component.id] === false ||
              (component.id === '5' && !(Number(componentRatios['5']) > 0))
                ? 'warning'
                : undefined
            }
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange(event, component.id)
            }
          />
        </Table.Cell>
      </Table.Row>
    ))
  }

  return (
    <ComponentTableContainer>
      <EdsProvider density={'compact'}>
        <Table>
          <Table.Head sticky>
            <Table.Row>
              <Table.Cell key={`Component`}>{`Component`}</Table.Cell>
              <Table.Cell key={`Mole fractions`}>{`Mole fractions`}</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>{createTableRows()}</Table.Body>
        </Table>
      </EdsProvider>
    </ComponentTableContainer>
  )
}
