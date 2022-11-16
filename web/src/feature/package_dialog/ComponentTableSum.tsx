import { EdsProvider, Table } from '@equinor/eds-core-react'
import { TComponentRatios } from '../../types'
import { formatNumber } from '../../tableUtils'
import { usePackageDialogContext } from './context/PackageDialogContext'

function computeComponentRatioSum(componentRatios: TComponentRatios) {
  const sum = Object.values(componentRatios).reduce((a, b) => a + Number(b), 0)
  if (isNaN(sum)) {
    return ''
  }
  return formatNumber(sum, 5)
}

export const ComponentTableSum = (): JSX.Element => {
  const { state } = usePackageDialogContext()
  return (
    <EdsProvider density={'compact'}>
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{`Component sum`}</Table.Cell>
            <Table.Cell>{computeComponentRatioSum(state.ratios)}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </EdsProvider>
  )
}
