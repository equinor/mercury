import { EdsProvider, Table, TextField } from '@equinor/eds-core-react'
import { TComponentInput } from './FluidDialog'
import { TComponentEntry } from './ComponentSelector'

export const ComponentTable = ({
  input,
  componentInput,
  setComponentInput,
}: {
  input: Array<TComponentEntry>
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
    <EdsProvider density={'compact'}>
      <Table>
        <Table.Head>
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
  )
}
