import { DynamicTable } from '../../common/DynamicTable'
import { formatNumber, getCorrectUnit } from '../../../tableUtils'
import {
  mercuryMolecularWeight,
  molePerStandardCubicMeter,
} from '../../../constants'
import { TResults } from '../../../types'

function getRows(results: TResults): string[][] {
  const phPhaseFlowFactor =
    results.cubicFeedFlow * molePerStandardCubicMeter * mercuryMolecularWeight
  const mercury = results.componentFractions['5']
  return Object.entries(results.phaseValues).map(([phase, values], index) => [
    phase,
    formatNumber(values['percentage']),
    formatNumber(values['mercury']) + getCorrectUnit(phase),
    formatNumber(mercury[index]) + ' mol/mol',
    formatNumber(phPhaseFlowFactor * values['percentage'] * mercury[index]) +
      ' g/d',
  ])
}

export const PhaseTable = (props: { results: TResults }) => {
  return (
    <DynamicTable
      headers={[
        'Phases',
        'Fractions',
        'Concentration (μg)',
        'Concentration (mol)',
        'Mercury Flow',
      ]}
      rows={getRows(props.results)}
      density={'comfortable'}
    />
  )
}
