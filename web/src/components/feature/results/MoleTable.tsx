import { DynamicTable } from '../../common/DynamicTable'
import { MultiflashResponse } from '../../../api/generated'
import { formatNumber } from '../../../tableUtils'
import { TComponentProperties } from '../../../types'

function getRows(
  multiFlashResponse: MultiflashResponse,
  componentProperties: TComponentProperties
): string[][] {
  return Object.entries(multiFlashResponse.componentFractions).map(
    ([compId, fractions]) => [
      componentProperties[compId].altName,
      formatNumber(multiFlashResponse.feedFractions[compId]),
      ...fractions.map((x) => formatNumber(x, 2, 3)),
    ]
  )
}

// TODO: Get type from generated API
export const MoleTable = (props: {
  multiFlashResponse: MultiflashResponse
  componentProperties: TComponentProperties
}) => {
  return (
    <DynamicTable
      headers={[
        'Components',
        'Feed Value (mol)',
        ...Object.keys(props.multiFlashResponse.phaseValues),
      ]}
      rows={getRows(props.multiFlashResponse, props.componentProperties)}
      density={'compact'}
    />
  )
}
