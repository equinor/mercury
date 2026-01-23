import { EdsProvider, Input, Table } from '@equinor/eds-core-react'
import type React from 'react'
import styled from 'styled-components'
import { usePackageDialogContext } from './context/PackageDialogContext'

const ComponentTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 550px;
  overflow: auto;
  margin-top: 15px;
`

export const ComponentTable = () => {
  const { state, dispatch } = usePackageDialogContext()
  function handleOnChange(
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    const ratio = event.target.value
    const newRatios = state.ratios.map((x) =>
      x.id === id ? { id: id, ratio: ratio } : x
    )
    dispatch({ type: 'setRatios', value: newRatios })
  }

  function createTableRows() {
    return state.selectedComponents.map((component, rowIndex) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: is okey
      <Table.Row key={rowIndex}>
        <Table.Cell
          data-testid={`Component-${rowIndex}`}
        >{`${component.altName} (${component.chemicalFormula})`}</Table.Cell>
        <Table.Cell data-testid={`Ratio (mol)-${rowIndex}`}>
          <Input
            id={`${component.chemicalFormula}-input`}
            value={state.ratios.find((x) => x.id === component.id)?.ratio ?? ''}
            variant={
              state.isRatioValid[component.id] === false ||
              (component.id === '5' &&
                !(Number(state.ratios.find((x) => x.id === '5')?.ratio) > 0))
                ? 'error'
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
              <Table.Cell key={'Component'}>{'Component'}</Table.Cell>
              <Table.Cell key={'Mole fractions'}>{'Mole fractions'}</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>{createTableRows()}</Table.Body>
        </Table>
      </EdsProvider>
    </ComponentTableContainer>
  )
}
