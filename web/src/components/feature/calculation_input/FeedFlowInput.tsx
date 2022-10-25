import { Switch, TextField } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { TFeedFlow } from '../../../types'

const FlexContainer = styled.div`
  display: flex;
  gap: 16px;
  max-width: 250px;
`

export const FeedFlowInput = (props: {
  feedFlow: TFeedFlow
  setFeedFlow: (value: TFeedFlow) => void
}) => {
  return (
    <FlexContainer>
      <TextField
        id="feed-flow-input"
        value={props.feedFlow.value.toString()}
        unit={props.feedFlow.unit}
        type="number"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          props.setFeedFlow({
            unit: props.feedFlow.unit,
            value: Number(event.target.value),
          })
        }
      />
      <Switch
        label="unit"
        checked={props.feedFlow.unit === 'kg/d'}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          props.setFeedFlow({
            unit: event.target.checked ? 'kg/d' : 'Sm3/d',
            value: props.feedFlow.value,
          })
        }
      />
    </FlexContainer>
  )
}
