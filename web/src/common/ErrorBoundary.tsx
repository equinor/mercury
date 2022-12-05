import { Component, ErrorInfo, ReactNode } from 'react'
import { Typography, Icon } from '@equinor/eds-core-react'
import { account_circle } from '@equinor/eds-icons'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: true,
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <Typography variant={'h3'}>Ops... Something went wrong 😞</Typography>
          <Typography varant={'body_short'}>
            You could try resetting the application by clicking the{' '}
            <Icon data={account_circle} /> icon, and then &quot;reset
            application data&quot;.
          </Typography>
          <Typography varant={'body_short'}>
            This will cause you to lose application data. If that is not a good
            option you should contact support (team-hermes@equinor.com).
          </Typography>
        </>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
