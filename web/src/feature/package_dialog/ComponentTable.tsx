import React from 'react'
import styled from 'styled-components'
import { EdsProvider, Input, Table } from '@equinor/eds-core-react'
import { usePackageDialogContext } from './context/PackageDialogContext'

const ComponentTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 550px;
  overflow: auto;
  margin-top: 15px;
`

export const ComponentTable = (): JSX.Element => {
  const { state, dispatch } = usePackageDialogContext()
  function handleOnChange(
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    const ratio = event.target.value
    const newIsRatioValid = { ...state.isRatioValid }
    newIsRatioValid[id] = event.target.checkValidity() && !isNaN(Number(ratio))
    dispatch({ type: 'setIsRatioValid', value: newIsRatioValid })
    const newRatios = { ...state.ratios }
    if (ratio === '') {
      delete newRatios[id]
    } else {
      newRatios[id] = ratio
    }
    dispatch({ type: 'setRatios', value: newRatios })
  }

  function createTableRows() {
    return state.selectedComponents.map((component, rowIndex) => (
      <Table.Row key={rowIndex}>
        <Table.Cell
          data-testid={`Component-${rowIndex}`}
        >{`${component.altName} (${component.chemicalFormula})`}</Table.Cell>
        <Table.Cell data-testid={`Ratio (mol)-${rowIndex}`}>
          <Input
            id={`${component.chemicalFormula}-input`}
            value={state.ratios[component.id] ?? ''}
            pattern="^\d+(\.\d+)?([eE][-+]?\d+)?$"
            variant={
              state.isRatioValid[component.id] === false ||
              (component.id === '5' && !(Number(state.ratios['5']) > 0))
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
