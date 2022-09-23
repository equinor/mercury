import { EdsProvider, Table } from '@equinor/eds-core-react'

export type TDynamicTableInput = {
  // Keys will be used as headers. The array for each key will be the data in the column
  [key: string]: Array<string>
}
export const DynamicTable = (props: {
  input: TDynamicTableInput
}): JSX.Element => {
  const { input } = props

  function createTableBody() {
    const rows: Array<JSX.Element> = []

    input[Object.keys(input)[0]].forEach((value, index) => {
      const cells: Array<JSX.Element> = []
      Object.keys(input).forEach((key) => {
        cells.push(
          <Table.Cell data-testid={`${key}-${index}`} key={`${key}-${index}`}>
            {input[key][index]}
          </Table.Cell>
        )
      })
      rows.push(<Table.Row key={index}>{cells}</Table.Row>)
    })
    return rows
  }

  return (
    <EdsProvider density={'compact'}>
      <Table>
        <Table.Head>
          <Table.Row>
            {Object.keys(input).map((header) => (
              <Table.Cell key={header}>{header}</Table.Cell>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>{createTableBody()}</Table.Body>
      </Table>
    </EdsProvider>
  )
}
