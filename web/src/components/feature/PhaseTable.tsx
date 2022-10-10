import { DynamicTable } from '../common/DynamicTable'
import { MultiflashResponse } from '../../api/generated'
import styled from 'styled-components'
import { FeedFlowInput } from './FeedFlowInput'
import { useState } from 'react'

export type TFeedUnit = 'kg/d' | 'Sm3/d'

const PhaseTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  max-width: 500px;
`

function getRows(
  multiFlashResponse: MultiflashResponse,
  feedFlow: number
): string[][] {
  // TODO: Assumes feed flow unit is Sm3/d
  const phPhaseFlowFactor = feedFlow * 42.29256 * 200.59
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
}) => {
  const [feedFlow, setFeedFlow] = useState(1000)
  const [feedUnit, setFeedUnit] = useState('Sm3/d' as TFeedUnit)

  return (
    <PhaseTableContainer>
      <FeedFlowInput
        feedFlow={feedFlow}
        feedUnit={feedUnit}
        setFeedFlow={setFeedFlow}
        setFeedUnit={setFeedUnit}
      />
      <DynamicTable
        headers={[
          'Phases',
          'Ratio',
          'Mass Concentration',
          'Mole Concentration',
          'Mercury Flow (g/d)',
        ]}
        rows={getRows(props.multiFlashResponse, feedFlow)}
        density={'comfortable'}
      />
    </PhaseTableContainer>
  )
}
