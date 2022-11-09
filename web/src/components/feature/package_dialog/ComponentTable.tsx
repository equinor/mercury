import React from 'react'
import styled from 'styled-components'
import { EdsProvider, Input, Table } from '@equinor/eds-core-react'
import { TComponentRatios, TComponentProperty } from '../../../types'

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
              ratiosAreValid[component.id] === false ? 'warning' : undefined
            }
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const newRatiosAreValid = { ...ratiosAreValid }
              newRatiosAreValid[component.id] =
                event.target.checkValidity() &&
                !isNaN(Number(event.target.value))
              setRatiosAreValid(newRatiosAreValid)

              const newRatios = { ...componentRatios }
              if (event.target.value === '') {
                delete newRatios[component.id]
              } else {
                newRatios[component.id] = event.target.value
              }
              setComponentRatios(newRatios)
            }}
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
