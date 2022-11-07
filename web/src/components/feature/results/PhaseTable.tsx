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
  const mercury =
    results.componentFractions['5'] ??
    Array(Object.keys(results.phaseValues).length).fill(0)
  return [
    [
      'Fractions',
      ...Object.values(results.phaseValues).map((x) =>
        formatNumber(x['percentage'])
      ),
    ],
    [
      'Concentration (μg)',
      ...Object.entries(results.phaseValues).map(
        ([phase, x]) => formatNumber(x['mercury']) + getCorrectUnit(phase)
      ),
    ],
    [
      'Concentration (mol)',
      ...mercury.map((x) => formatNumber(x) + ' mol/mol'),
    ],
    [
      'Mercury Flow',
      ...Object.values(results.phaseValues).map(
        (x, index) =>
          formatNumber(phPhaseFlowFactor * x['percentage'] * mercury[index]) +
          ' g/d'
      ),
    ],
  ]
}

export const PhaseTable = (props: { results: TResults }) => {
  return (
    <DynamicTable
      headers={['', ...Object.keys(props.results.phaseValues)]}
      rows={getRows(props.results)}
      density={'comfortable'}
    />
  )
}
