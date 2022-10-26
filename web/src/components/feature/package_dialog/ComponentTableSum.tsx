import { EdsProvider, Table } from '@equinor/eds-core-react'
import { TComponentRatios } from '../../../types'
import { formatNumber } from '../../../tableUtils'

function computeComponentRatioSum(componentRatios: TComponentRatios) {
  if (Object.keys(componentRatios).length > 0) {
    return formatNumber(
      Object.values(componentRatios).reduce((a, b) => a + b),
      3
    )
  } else {
    return 0
  }
}

export const ComponentTableSum = ({
  componentRatios,
}: {
  componentRatios: TComponentRatios
}): JSX.Element => {
  return (
    <EdsProvider density={'compact'}>
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{`Component sum`}</Table.Cell>
            <Table.Cell>{computeComponentRatioSum(componentRatios)}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </EdsProvider>
  )
}
