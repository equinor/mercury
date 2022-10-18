import { DynamicTable } from '../common/DynamicTable'
import { ComponentResponse, MultiflashResponse } from '../../api/generated'
import { formatNumber } from '../../tableUtils'

function getRows(
  multiFlashResponse: MultiflashResponse,
  componentResponse: ComponentResponse
): string[][] {
  return Object.entries(multiFlashResponse.componentFractions).map(
    ([compId, fractions]) => [
      componentResponse.components[compId].altName,
      ...fractions.map((x) => formatNumber(x, 2, 3)),
    ]
  )
}

// TODO: Get type from generated API
export const MoleTable = (props: {
  multiFlashResponse: MultiflashResponse
  components: ComponentResponse
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
