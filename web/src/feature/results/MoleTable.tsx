import { DynamicTable } from '../../common/DynamicTable'
import { formatNumber } from '../../tableUtils'
import { TComponentProperty, TResults } from '../../types'
import { useState } from 'react'
import { Switch } from '@equinor/eds-core-react'
import styled from 'styled-components'

const MoleTableWrapper = styled.div`
  text-align: right;
`

function getRows(
  results: TResults,
  componentProperties: TComponentProperty[],
  fullPrecision: boolean
): string[][] {
  return componentProperties
    .filter((x) => x.id in results.componentFractions)
    .map((x) => [
      x.altName,
      fullPrecision
        ? results.feedFractions[x.id].toString()
        : formatNumber(results.feedFractions[x.id]),
      ...results.componentFractions[x.id].map((x) => {
        if (fullPrecision) return x.toString()
        return formatNumber(x, 2, 3)
      }),
    ])
}

// TODO: Get type from generated API
export const MoleTable = (props: {
  results: TResults
  componentProperties: TComponentProperty[]
}) => {
  const [fullPrecision, setFullPrecision] = useState<boolean>(false)
  return (
    <MoleTableWrapper>
      <DynamicTable
        headers={[
          'Components',
          'Feed ratio',
          ...Object.keys(props.results.phaseValues).map(
            (phase) => `${phase} (mol)`
          ),
        ]}
        rows={getRows(props.results, props.componentProperties, fullPrecision)}
        density={'compact'}
        caption="Phase Equilibrium results"
      />
      <Switch
        label="full precision"
        checked={fullPrecision}
        onChange={(event) => setFullPrecision(event.target.checked)}
      />
    </MoleTableWrapper>
  )
}
