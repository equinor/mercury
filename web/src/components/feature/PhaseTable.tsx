import { DynamicTable } from '../common/DynamicTable'
import { MultiflashResponse } from '../../api/generated'
import { TFeedFlow } from '../../pages/Main'
import { formatNumber } from '../../tableUtils'

export type TFeedUnit = 'kg/d' | 'Sm3/d'

function getRows(
  multiFlashResponse: MultiflashResponse,
  feedFlow: number
): string[][] {
  // TODO: Assumes feed flow unit is Sm3/d
  const phPhaseFlowFactor = feedFlow * 42.29256 * 200.59
  const mercury = multiFlashResponse.componentFractions['5']
  return Object.entries(multiFlashResponse.phaseValues).map(
    ([phase, values], index) => [
      phase,
      formatNumber(values['percentage']),
      formatNumber(values['mercury']),
      formatNumber(mercury[index]),
      formatNumber(phPhaseFlowFactor * values['percentage'] * mercury[index]),
    ]
  )
}

export const PhaseTable = (props: {
  multiFlashResponse: MultiflashResponse
  feedFlow: TFeedFlow
}) => {
  return (
    <DynamicTable
      headers={[
        'Phases',
        'Ratio',
        'Mass Concentration',
        'Mole Concentration',
        'Mercury Flow (g/d)',
      ]}
      rows={getRows(props.multiFlashResponse, props.feedFlow.value)}
      density={'comfortable'}
    />
  )
}
