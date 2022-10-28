import { DynamicTable } from '../../common/DynamicTable'
import { formatNumber } from '../../../tableUtils'
import { TComponentProperties, TResults } from '../../../types'

function getRows(
  results: TResults,
  componentProperties: TComponentProperties
): string[][] {
  return Object.entries(results.componentFractions).map(
    ([compId, fractions]) => [
      componentProperties[compId].altName,
      formatNumber(results.feedFractions[compId]),
      ...fractions.map((x) => formatNumber(x, 2, 3)),
    ]
  )
}

// TODO: Get type from generated API
export const MoleTable = (props: {
  results: TResults
  componentProperties: TComponentProperties
}) => {
  return (
    <DynamicTable
      headers={[
        'Components',
        'Feed ratio',
        ...Object.keys(props.results.phaseValues).map(
          (phase) => `${phase} (mol)`
        ),
      ]}
      rows={getRows(props.results, props.componentProperties)}
      density={'compact'}
    />
  )
}
