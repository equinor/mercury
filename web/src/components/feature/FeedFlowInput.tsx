import { Switch, TextField } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { Card } from '../common/Card'
import { TFeedFlow } from '../../pages/Main'

const FlexContainer = styled.div`
  display: flex;
  gap: 16px;
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
        label="Unit"
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
