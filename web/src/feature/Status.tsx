import { Banner as EdsBanner, Icon, Progress } from '@equinor/eds-core-react'
import {
  error_outlined,
  info_circle,
  warning_outlined,
} from '@equinor/eds-icons'
import { useLastInputContext } from '../pages/context/LastInputContext'
import { TCalcStatus, TResults } from '../types'

export const Status = (props: {
  calcStatus: TCalcStatus
  result: TResults | undefined
}) => {
  const { lastInput } = useLastInputContext()

  switch (props.calcStatus) {
    case 'calculating':
      return <Progress.Linear />
    case 'done':
      if (props.result?.phaseValues.find((x) => x.phase === 'Mercury')) {
        const state = lastInput.temperature < -38.83 ? 'Solid' : 'Liquid'
        return (
          <EdsBanner>
            <EdsBanner.Icon variant="warning">
              <Icon data={warning_outlined} />
            </EdsBanner.Icon>
            <EdsBanner.Message>{`${state} mercury has been formed`}</EdsBanner.Message>
          </EdsBanner>
        )
      }
      return <></>
    case 'failure':
      return (
        <EdsBanner>
          <EdsBanner.Icon variant="warning">
            <Icon data={error_outlined} />
          </EdsBanner.Icon>
          <EdsBanner.Message>
            An unexpected error has occurred. Please inform us if it persists
          </EdsBanner.Message>
        </EdsBanner>
      )
    default:
      return (
        <EdsBanner>
          <EdsBanner.Icon variant="info">
            <Icon data={info_circle} />
          </EdsBanner.Icon>
          <EdsBanner.Message>
            Run a calculation to get results
          </EdsBanner.Message>
        </EdsBanner>
      )
  }
}
