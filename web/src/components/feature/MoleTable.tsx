import { DynamicTable } from '../common/DynamicTable'
import { ComponentResponse, MultiflashResponse } from '../../api/generated'
import { formatNumber } from '../../tableUtils'
import { TComponentComposition } from '../../types'

function getRows(
  multiFlashResponse: MultiflashResponse,
  componentResponse: ComponentResponse,
  componentComposition: TComponentComposition
): string[][] {
  return Object.entries(multiFlashResponse.componentFractions).map(
    ([componentId, fractions]) => [
      componentResponse.components[componentId].altName,
      formatNumber(componentComposition[componentId]),
      ...fractions.map((x) => formatNumber(x, 2, 3)),
    ]
  )
}

// TODO: Get type from generated API
export const MoleTable = (props: {
  multiFlashResponse: MultiflashResponse
  components: ComponentResponse
  componentComposition: TComponentComposition
}) => {
  const { multiFlashResponse, components } = props

  return (
    <DynamicTable
      headers={[
        'Components',
        'Feed Value (mol)',
        ...Object.keys(multiFlashResponse.phaseValues),
      ]}
      rows={getRows(multiFlashResponse, components, props.componentComposition)}
      density={'compact'}
    />
  )
}
