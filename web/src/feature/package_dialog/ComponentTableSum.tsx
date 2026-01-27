import { EdsProvider, Table } from '@equinor/eds-core-react'
import { formatNumber } from '../../common/tableUtils'
import type { TComponentRatio } from '../../common/types'
import { usePackageDialogContext } from './context/PackageDialogContext'

function computeComponentRatioSum(componentRatios: TComponentRatio[]) {
  const sum = componentRatios.reduce((a, b) => a + Number(b.ratio), 0)
  if (Number.isNaN(sum)) {
    return ''
  }
  return formatNumber(sum, 5)
}

export const ComponentTableSum = () => {
  const { state } = usePackageDialogContext()
  return (
    <EdsProvider density={'compact'}>
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{'Component sum'}</Table.Cell>
            <Table.Cell>{computeComponentRatioSum(state.ratios)}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </EdsProvider>
  )
}
