import { EdsProvider, Table, Typography } from '@equinor/eds-core-react'
import React from 'react'

type TDynamicTableInput = {
  subtables: {
    headers: string[]
    rows: string[][]
  }[]
  density: 'comfortable' | 'compact'
  caption: string
}
function createTableRows(
  subtable: { headers: string[]; rows: string[][] },
  subtableIndex: number
) {
  return subtable.rows.map((row, rowIndex) => (
    <Table.Row key={rowIndex}>
      {row.map((cell, cellIndex) => {
        const id = `${subtableIndex}-${subtable.headers[cellIndex]}-${rowIndex}`
        return (
          <Table.Cell data-testid={id} key={cellIndex}>
            {cell}
          </Table.Cell>
        )
      })}
    </Table.Row>
  ))
}
export const DynamicTable = (props: TDynamicTableInput): JSX.Element => {
  return (
    <EdsProvider density={props.density}>
      <Table>
        <Table.Caption>
          <Typography variant="h3">{props.caption}</Typography>
        </Table.Caption>
        {props.subtables.map((subtable, subtableIndex) => (
          <React.Fragment key={subtableIndex}>
            <Table.Head>
              <Table.Row>
                {subtable.headers.map((header, headerIndex) => (
                  <Table.Cell key={headerIndex}>{header}</Table.Cell>
                ))}
              </Table.Row>
            </Table.Head>
            <Table.Body>{createTableRows(subtable, subtableIndex)}</Table.Body>
          </React.Fragment>
        ))}
      </Table>
    </EdsProvider>
  )
}
