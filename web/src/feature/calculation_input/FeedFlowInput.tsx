import { Switch, TextField } from '@equinor/eds-core-react'
import { useState } from 'react'
import styled from 'styled-components'
import { molePerStandardCubicMeter } from '../../common/constants'

const FlexContainer = styled.div`
  display: flex;
  gap: 16px;
  max-width: 400px;
`

function convertFlowFromCubicToMass(
  cubicFeedFlow: number,
  molecularWeightSum: number
): number {
  return (cubicFeedFlow * molecularWeightSum * molePerStandardCubicMeter) / 1000
}

function convertFlowFromMassToCubic(
  massFeedFlow: number,
  molecularWeightSum: number
): number {
  return (
    (massFeedFlow * 1000) / (molecularWeightSum * molePerStandardCubicMeter)
  )
}

export const FeedFlowInput = (props: {
  cubicFeedFlow: number
  setCubicFeedFlow: (value: number) => void
  molecularWeightSum: number | undefined
}) => {
  const [displayMassFeedFlow, setDisplayMassFeedFlow] = useState<boolean>(false)
  const selectedUnit = displayMassFeedFlow ? 'kg/d' : 'Sm3/d'

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (displayMassFeedFlow)
      props.setCubicFeedFlow(
        convertFlowFromMassToCubic(
          Number(event.target.value),
          props.molecularWeightSum ?? 1
        )
      )
    else props.setCubicFeedFlow(Number(event.target.value))
  }

  const displayValue = displayMassFeedFlow
    ? convertFlowFromCubicToMass(
        props.cubicFeedFlow,
        props.molecularWeightSum ?? 1
      )
    : props.cubicFeedFlow

  return (
    <FlexContainer>
      <TextField
        id="feed-flow-input"
        unit={selectedUnit}
        type="number"
        value={(+displayValue.toFixed(2)).toString()}
        onChange={handleChangeInput}
      />
      <Switch
        label="unit"
        checked={displayMassFeedFlow}
        disabled={!props.molecularWeightSum}
        onChange={(event) => setDisplayMassFeedFlow(event.target.checked)}
      />
    </FlexContainer>
  )
}
