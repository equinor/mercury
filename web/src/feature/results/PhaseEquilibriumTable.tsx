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
  return componentProperties
    .filter((prop) => results.componentFractions.find((x) => x.id === prop.id))
    .map((prop) => [
      prop.altName,
      fullPrecision
        ? results.componentFractions
            .find((fractions) => fractions.id === prop.id)
            ?.feedFraction.toString()
        : formatNumber(
            results.componentFractions.find(
              (fractions) => fractions.id === prop.id
            )?.feedFraction ?? 0
          ),
      ...(
        results.componentFractions.find((fractions) => fractions.id === prop.id)
          ?.phaseFractions ?? Array(results.phaseValues.length).fill(0)
      ).map((x) => {
        if (fullPrecision) return x.toString()
        return formatNumber(x, 2, 3)
      }),
    ])
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
