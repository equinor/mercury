import { DynamicTable } from '../../common/DynamicTable'
import { MultiflashResponse } from '../../../api/generated'
import { formatNumber, getCorrectUnit } from '../../../tableUtils'
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
      formatNumber(values['mercury']) + getCorrectUnit(phase),
      formatNumber(mercury[index]) + ' mol/mol',
      formatNumber(phPhaseFlowFactor * values['percentage'] * mercury[index]) +
        ' g/d',
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
        'Fractions',
        'Concentration (μg)',
        'Concentration (mol)',
        'Mercury Flow',
      ]}
      rows={getRows(props.multiFlashResponse, props.cubicFeedFlow)}
      density={'comfortable'}
    />
  )
}
