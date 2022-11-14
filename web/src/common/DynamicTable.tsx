import { EdsProvider, Table } from '@equinor/eds-core-react'

type TDynamicTableInput = {
  headers: string[]
  rows: string[][]
  density: 'comfortable' | 'compact'
}
export const DynamicTable = (props: TDynamicTableInput): JSX.Element => {
  function createTableRows() {
    return props.rows.map((row, rowIndex) => (
      <Table.Row key={rowIndex}>
        {row.map((cell, cellIndex) => {
          const key = `${props.headers[cellIndex]}-${rowIndex}`
          return (
            <Table.Cell data-testid={key} key={key}>
              {cell}
            </Table.Cell>
          )
        })}
      </Table.Row>
    ))
  }

  return (
    <EdsProvider density={props.density}>
      <Table>
        <Table.Head>
          <Table.Row>
            {props.headers.map((header) => (
              <Table.Cell key={header}>{header}</Table.Cell>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>{createTableRows()}</Table.Body>
      </Table>
    </EdsProvider>
  )
}