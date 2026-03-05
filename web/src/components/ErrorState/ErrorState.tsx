import { Button, Typography } from '@equinor/eds-core-react'
import type { IconData } from '@equinor/eds-icons'
import { Flexbox } from '../Flexbox/Flexbox'
import { ErrorIcon, Wrapper } from './styles'

type ErrorStateProps = {
  icon: IconData
  title: string
  message: string
  buttonLabel: string
  onAction: () => void
}

export const ErrorState = ({ icon, title, message, buttonLabel, onAction }: ErrorStateProps) => {
  return (
    <Wrapper>
      <Flexbox direction="column" gap={2} alignItems="center">
        <Flexbox direction="column" alignItems="center">
          <ErrorIcon data={icon} size={48} />
          <Typography group="heading" variant="h3">
            An error has occurred
          </Typography>
        </Flexbox>
        <Flexbox direction="column" gap={1} alignItems="center">
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body_short">{message}</Typography>
          <Button onClick={onAction}>{buttonLabel}</Button>
        </Flexbox>
      </Flexbox>
    </Wrapper>
  )
}
