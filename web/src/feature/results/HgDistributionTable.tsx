import {
  mercuryMolecularWeight,
  molePerStandardCubicMeter,
} from '../../common/constants'
import { formatNumber, getCorrectUnit } from '../../common/tableUtils'
import type { TResults } from '../../common/types'
import { DynamicTable } from '../../components'

function getRows(results: TResults): string[][] {
  const phPhaseFlowFactor =
    results.cubicFeedFlow * molePerStandardCubicMeter * mercuryMolecularWeight
  const mercury =
    results.componentFractions.find((x) => x.id === '5')?.phaseFractions ??
    Array(results.phaseValues.length).fill(0)
  return [
    [
      'Concentration (μg)',
      ...results.phaseValues.map(
        (x) => formatNumber(x.mercury) + getCorrectUnit(x.phase)
      ),
    ],
    [
      'Concentration (mol)',
      ...mercury.map((x) => `${formatNumber(x)} mol/mol`),
    ],
    [
      'Mercury Flow',
      ...results.phaseValues.map(
        (x, index) =>
          `${formatNumber(
            phPhaseFlowFactor * x.percentage * mercury[index]
          )} g/d`
      ),
    ],
  ]
}

export const HgDistributionTable = (props: { results: TResults }) => {
  return (
    <DynamicTable
      subtables={[
        {
          headers: ['', ...props.results.phaseValues.map((x) => x.phase)],
          rows: getRows(props.results),
        },
      ]}
      density={'comfortable'}
      caption="Mercury distribution results"
    />
  )
}
