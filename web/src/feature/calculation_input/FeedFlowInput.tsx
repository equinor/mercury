import { Switch, TextField } from '@equinor/eds-core-react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { molePerStandardCubicMeter } from '../../common/constants'

const FlexContainer = styled.div`
  display: flex;
  gap: 16px;
  max-width: 400px;
`

function convertFlowFromCubicToMass(cubicFeedFlow: number, molecularWeightSum: number): number {
  return (cubicFeedFlow * molecularWeightSum * molePerStandardCubicMeter) / 1000
}

function convertFlowFromMassToCubic(massFeedFlow: number, molecularWeightSum: number): number {
  return (massFeedFlow * 1000) / (molecularWeightSum * molePerStandardCubicMeter)
}

function formatDisplayValue(value: number): string {
  return (+value.toFixed(2)).toString()
}

export const FeedFlowInput = (props: {
  cubicFeedFlow: number
  setCubicFeedFlow: (value: number) => void
  molecularWeightSum: number | undefined
}) => {
  const [displayMassFeedFlow, setDisplayMassFeedFlow] = useState<boolean>(false)
  const [inputText, setInputText] = useState<string>(formatDisplayValue(props.cubicFeedFlow))
  const selectedUnit = displayMassFeedFlow ? 'kg/d' : 'Sm3/d'

  useEffect(() => {
    if (props.molecularWeightSum === undefined && displayMassFeedFlow) {
      setDisplayMassFeedFlow(false)
      setInputText(formatDisplayValue(props.cubicFeedFlow))
    }
  }, [props.molecularWeightSum, props.cubicFeedFlow, displayMassFeedFlow])

  const handleUnitToggle = (checked: boolean) => {
    setDisplayMassFeedFlow(checked)
    const displayValue = checked
      ? convertFlowFromCubicToMass(props.cubicFeedFlow, props.molecularWeightSum ?? 1)
      : props.cubicFeedFlow
    setInputText(formatDisplayValue(displayValue))
  }

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value
    setInputText(raw)

    const trimmed = raw.trim()
    if (trimmed === '') return

    const parsed = Number(trimmed)
    if (Number.isFinite(parsed)) {
      if (displayMassFeedFlow) {
        props.setCubicFeedFlow(convertFlowFromMassToCubic(parsed, props.molecularWeightSum ?? 1))
      } else {
        props.setCubicFeedFlow(parsed)
      }
    }
  }

  const handleBlur = () => {
    const trimmed = inputText.trim()
    const parsed = Number(trimmed)
    if (trimmed === '' || !Number.isFinite(parsed)) {
      // Revert to the last valid value on blur
      const displayValue = displayMassFeedFlow
        ? convertFlowFromCubicToMass(props.cubicFeedFlow, props.molecularWeightSum ?? 1)
        : props.cubicFeedFlow
      setInputText(formatDisplayValue(displayValue))
    } else {
      setInputText(formatDisplayValue(parsed))
    }
  }

  return (
    <FlexContainer>
      <TextField
        id="feed-flow-input"
        unit={selectedUnit}
        value={inputText}
        onChange={handleChangeInput}
        onBlur={handleBlur}
      />
      <Switch
        label="unit"
        checked={displayMassFeedFlow}
        disabled={!props.molecularWeightSum}
        onChange={(event) => handleUnitToggle(event.target.checked)}
      />
    </FlexContainer>
  )
}
