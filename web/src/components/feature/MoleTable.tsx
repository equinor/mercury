import { DynamicTable } from '../common/DynamicTable'
import {
  Components,
  MultiflashResponse,
  PhaseProperties,
} from '../../api/generated'
import { formatNumber } from '../../tableUtils'

function getRows(
  multiFlashResponse: MultiflashResponse,
  components: Components
): string[][] {
  const rows: string[][] = [
    multiFlashResponse.componentIds.map((id) => components[id].altName),
    ...Object.values(multiFlashResponse.phaseValues).map(
      (properties: PhaseProperties) =>
        properties.moleFractions.map((value) => formatNumber(value, 2, 3))
    ),
  ]
  return rows[0].map((col, i) => rows.map((row) => row[i]))
}

export const MoleTable = (props: {
  multiFlashResponse: MultiflashResponse
  components: Components
}) => {
  const { multiFlashResponse, components } = props

  return (
    <DynamicTable
      headers={['Components', ...Object.keys(multiFlashResponse.phaseValues)]}
      rows={getRows(multiFlashResponse, components)}
      density={'compact'}
    />
  )
}
