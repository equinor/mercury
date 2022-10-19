import { DynamicTable } from '../common/DynamicTable'
import { MultiflashResponse } from '../../api/generated'
import { formatNumber } from '../../tableUtils'
import { TComponentNames, TComponentRatios } from '../../types'

function getRows(
  multiFlashResponse: MultiflashResponse,
  componentNames: TComponentNames,
  componentRatios: TComponentRatios
): string[][] {
  return Object.entries(multiFlashResponse.componentFractions).map(
    ([compId, fractions]) => [
      componentNames[compId].name,
      formatNumber(componentRatios[compId]),
      ...fractions.map((x) => formatNumber(x, 2, 3)),
    ]
  )
}

// TODO: Get type from generated API
export const MoleTable = (props: {
  multiFlashResponse: MultiflashResponse
  componentNames: TComponentNames
  componentRatios: TComponentRatios
}) => {
  return (
    <DynamicTable
      headers={[
        'Components',
        'Feed Value (mol)',
        ...Object.keys(props.multiFlashResponse.phaseValues),
      ]}
      rows={getRows(
        props.multiFlashResponse,
        props.componentNames,
        props.componentRatios
      )}
      density={'compact'}
    />
  )
}
