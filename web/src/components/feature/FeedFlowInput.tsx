import { Switch, TextField } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { TFeedUnit } from './PhaseTable'

const FlexContainer = styled.div`
  display: flex;
  gap: 16px;
`

export const FeedFlowInput = (props: {
  feedFlow: number
  feedUnit: TFeedUnit
  setFeedFlow: (value: number) => void
  setFeedUnit: (unit: TFeedUnit) => void
}) => {
  return (
    <FlexContainer>
      <TextField
        id="feed-flow-input"
        value={props.feedFlow.toString()}
        label="Feed Flow"
        unit={props.feedUnit}
        type="number"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          props.setFeedFlow(Number(event.target.value))
        }
      />
      <Switch
        label="Feed unit"
        size="small"
        checked={props.feedUnit === 'kg/d'}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          props.setFeedUnit(event.target.checked ? 'kg/d' : 'Sm3/d')
        }
      />
    </FlexContainer>
  )
}
