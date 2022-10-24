import { EdsProvider, Table, TextField } from '@equinor/eds-core-react'
import { TComponent, TComponentInput } from '../../types'
import styled from 'styled-components'

const ComponentTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 550px;
  overflow: auto;
  margin-top: 15px;
`

export const ComponentTable = ({
  input,
  componentInput,
  setComponentInput,
}: {
  input: TComponent[]
  componentInput: TComponentInput
  setComponentInput: (componentInput: TComponentInput) => void
}): JSX.Element => {
  function createTableRows() {
    return input.map((entry, index) => (
      <Table.Row key={index}>
        <Table.Cell
          data-testid={`Component-${index}`}
        >{`${entry.altName} (${entry.chemicalFormula})`}</Table.Cell>
        <Table.Cell data-testid={`Ratio (mol)-${index}`}>
          <TextField
            id={`${entry.chemicalFormula}-input`}
            defaultValue={componentInput[entry.componentId].value}
            min={0}
            type="number"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              componentInput[entry.componentId].value = Number(
                event.target.value
              )
              setComponentInput(componentInput)
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
              <Table.Cell
                key={`Feed value (mol)`}
              >{`Feed value (mol)`}</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>{createTableRows()}</Table.Body>
        </Table>
      </EdsProvider>
    </ComponentTableContainer>
  )
}
