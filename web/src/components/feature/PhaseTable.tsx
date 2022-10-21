import { DynamicTable } from '../common/DynamicTable'
import {
  ComponentIds,
  MultiflashResponse,
  PhaseProperties,
} from '../../api/generated'
import { TFeedFlow } from '../../types'
import { formatNumber } from '../../tableUtils'
import {
  mercuryMolecularWeight,
  molePerStandardCubicMeter,
} from '../../constants'

function getRows(
  multiFlashResponse: MultiflashResponse,
  feedFlow: number
): string[][] {
  // TODO: Assumes feed flow unit is Sm3/d
  const phPhaseFlowFactor =
    feedFlow * molePerStandardCubicMeter * mercuryMolecularWeight
  const mercuryIndex = multiFlashResponse.componentIds.indexOf(ComponentIds.Id5)
  return Object.entries(multiFlashResponse.phaseValues).map(
    ([phase, properties]: [string, PhaseProperties]) => [
      phase,
      formatNumber(properties.ratio),
      formatNumber(properties.mercuryConcentration),
      formatNumber(properties.moleFractions[mercuryIndex]),
      formatNumber(
        phPhaseFlowFactor *
          properties.ratio *
          properties.moleFractions[mercuryIndex]
      ),
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
