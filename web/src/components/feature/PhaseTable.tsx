import { DynamicTable } from '../common/DynamicTable'
import { MultiflashResponse } from '../../api/generated'

function getRows(
  multiFlashResponse: MultiflashResponse,
  cubicFeedFlow: number
): string[][] {
  const phPhaseFlowFactor = cubicFeedFlow * 42.29256 * 200.59
  const mercury = multiFlashResponse.componentFractions['5']
  return Object.entries(multiFlashResponse.phaseValues).map(
    ([phase, values], index) => [
      phase,
      values['percentage'].toString(),
      values['mercury'].toString(),
      mercury[index].toString(),
      (phPhaseFlowFactor * values['percentage'] * mercury[index]).toString(),
    ]
  )
}

export const PhaseTable = (props: {
  multiFlashResponse: MultiflashResponse
  cubicFeedFlow: number
}) => {
  const { multiFlashResponse, cubicFeedFlow } = props
  return (
    <DynamicTable
      headers={[
        'Phases',
        'Ratio',
        'Mass Concentration',
        'Mole Concentration',
        'Mercury Flow (g/d)',
      ]}
      rows={getRows(multiFlashResponse, cubicFeedFlow)}
    />
  )
}
