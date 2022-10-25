import { DynamicTable } from '../../common/DynamicTable'
import { MultiflashResponse } from '../../../api/generated'
import { formatNumber } from '../../../tableUtils'
import {
  mercuryMolecularWeight,
  molePerStandardCubicMeter,
} from '../../../constants'

function getRows(
  multiFlashResponse: MultiflashResponse,
  cubicFeedFlow: number
): string[][] {
  const phPhaseFlowFactor =
    cubicFeedFlow * molePerStandardCubicMeter * mercuryMolecularWeight
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
  cubicFeedFlow: number
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
      rows={getRows(props.multiFlashResponse, props.cubicFeedFlow)}
      density={'comfortable'}
    />
  )
}
