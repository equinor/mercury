import { Switch, TextField } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { molePerStandardCubicMeter } from '../../constants'
import { useState } from 'react'

const FlexContainer = styled.div`
  display: flex;
  gap: 16px;
`

function convertCubicFeedFlowValue(
  cubicFeedFlow: number,
  feedMolecularWeight: number
): number {
  return (
    (cubicFeedFlow * feedMolecularWeight * molePerStandardCubicMeter) / 1000
  )
}

function convertMassFeedFlowValue(
  massFeedFlow: number,
  feedMolecularWeight: number
): number {
  return (
    (massFeedFlow * 1000) / (feedMolecularWeight * molePerStandardCubicMeter)
  )
}

export const FeedFlowInput = (props: {
  cubicFeedFlow: number
  setCubicFeedFlow: (value: number) => void
  feedMolecularWeight: number | undefined
}) => {
  const [displayMassFeedFlow, setDisplayMassFeedFlow] = useState<boolean>(false)
  const selectedUnit = displayMassFeedFlow ? 'kg/d' : 'Sm3/d'

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (displayMassFeedFlow)
      props.setCubicFeedFlow(
        convertMassFeedFlowValue(
          Number(event.target.value),
          props.feedMolecularWeight ?? 1
        )
      )
    else props.setCubicFeedFlow(Number(event.target.value))
  }

  const displayValue = displayMassFeedFlow
    ? convertCubicFeedFlowValue(
        props.cubicFeedFlow,
        props.feedMolecularWeight ?? 1
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
        disabled={!props.feedMolecularWeight}
        onChange={(event) => setDisplayMassFeedFlow(event.target.checked)}
      />
    </FlexContainer>
  )
}
