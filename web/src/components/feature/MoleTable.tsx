import { DynamicTable } from '../common/DynamicTable'
import { MultiflashResponse } from '../../api/generated'
import { formatNumber } from '../../tableUtils'
import { TComponentProperties, TComponentRatios } from '../../types'

function getRows(
  multiFlashResponse: MultiflashResponse,
  componentProperties: TComponentProperties,
  componentRatios: TComponentRatios
): string[][] {
  return Object.entries(multiFlashResponse.componentFractions).map(
    ([compId, fractions]) => [
      componentProperties[compId].altName,
      formatNumber(componentRatios[compId]),
      ...fractions.map((x) => formatNumber(x, 2, 3)),
    ]
  )
}

// TODO: Get type from generated API
export const MoleTable = (props: {
  multiFlashResponse: MultiflashResponse
  componentProperties: TComponentProperties
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
        props.componentProperties,
        props.componentRatios
      )}
      density={'compact'}
    />
  )
}
