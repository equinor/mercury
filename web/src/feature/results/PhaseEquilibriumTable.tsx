import { DynamicTable } from '../../common/DynamicTable'
import { formatNumber } from '../../tableUtils'
import { TComponentProperty, TResults } from '../../types'
import { useState } from 'react'
import { Switch } from '@equinor/eds-core-react'
import styled from 'styled-components'

const Wrapper = styled.div`
  text-align: right;
`

function getRows(
  results: TResults,
  componentProperties: TComponentProperty[],
  fullPrecision: boolean
): string[][] {
  return results.componentFractions.map(
    ({ id, phaseFractions, feedFraction }) => {
      return [
        componentProperties.find((x) => x.id === id)?.altName ?? '',
        fullPrecision ? feedFraction.toString() : formatNumber(feedFraction),
        ...phaseFractions.map((x) =>
          fullPrecision ? x.toString() : formatNumber(x, 2, 3)
        ),
      ]
    }
  )
}

// TODO: Get type from generated API
export const PhaseEquilibriumTable = (props: {
  results: TResults
  componentProperties: TComponentProperty[]
}) => {
  const [fullPrecision, setFullPrecision] = useState<boolean>(false)
  return (
    <Wrapper>
      <DynamicTable
        subtables={[
          {
            headers: ['', '', ...props.results.phaseValues.map((x) => x.phase)],
            rows: [
              [
                'Fractions',
                '',
                ...props.results.phaseValues.map((x) =>
                  fullPrecision
                    ? x.percentage.toString()
                    : formatNumber(x.percentage)
                ),
              ],
            ],
          },
          {
            headers: [
              'Components',
              'Feed ratio',
              ...props.results.phaseValues.map((x) => `${x.phase} (mol)`),
            ],
            rows: getRows(
              props.results,
              props.componentProperties,
              fullPrecision
            ),
          },
        ]}
        density={'compact'}
        caption="Phase Equilibrium results"
      />
      <Switch
        label="full precision"
        checked={fullPrecision}
        onChange={(event) => setFullPrecision(event.target.checked)}
      />
    </Wrapper>
  )
}
