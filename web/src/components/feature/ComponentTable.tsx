import { EdsProvider, Table, TextField } from '@equinor/eds-core-react'

export type TComponentEntry = {
  componentId: string
  altName: string
  chemicalFormula: string
}

export const ComponentTable = ({
  input,
}: {
  input: Array<TComponentEntry>
}): JSX.Element => {
  function createTableRows() {
    return input.map((entry, index) => (
      <Table.Row key={index}>
        <Table.Cell
          data-testid={`Component-${index}`}
        >{`${entry.altName} (${entry.chemicalFormula})`}</Table.Cell>
        <Table.Cell data-testid={`Feed Value (mol)-${index}`}>
          <TextField
            id={`Feed Value (mol)-${index}-input`}
            placeholder={'0'}
            type="number"
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
