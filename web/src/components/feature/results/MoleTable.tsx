import { DynamicTable } from '../../common/DynamicTable'
import { formatNumber } from '../../../tableUtils'
import { TComponentProperties, TResults } from '../../../types'
import { useState } from 'react'
import { Switch } from '@equinor/eds-core-react'
import styled from 'styled-components'

const MoleTableWrapper = styled.div`
  text-align: right;
`

function getRows(
  results: TResults,
  componentProperties: TComponentProperties,
  fullPrecision: boolean
): string[][] {
  return Object.entries(results.componentFractions).map(
    ([compId, fractions]) => [
      componentProperties[compId].altName,
      fullPrecision
        ? results.feedFractions[compId].toString()
        : formatNumber(results.feedFractions[compId]),
      ...fractions.map((x) => {
        if (fullPrecision) return x.toString()
        return formatNumber(x, 2, 3)
      }),
    ]
  )
}

// TODO: Get type from generated API
export const MoleTable = (props: {
  results: TResults
  componentProperties: TComponentProperties
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
      />
      <Switch
        label="full precision"
        checked={fullPrecision}
        onChange={(event) => setFullPrecision(event.target.checked)}
      />
    </MoleTableWrapper>
  )
}
