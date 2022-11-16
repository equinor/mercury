import { Button } from '@equinor/eds-core-react'
import { demoFeedComponentRatios } from '../../constants'
import { usePackageDialogContext } from './context/PackageDialogContext'

export const DemoButton = () => {
  const { dispatch } = usePackageDialogContext()
  return (
    <Button
      onClick={() => {
        dispatch({ type: 'setName', value: 'Demo data' })
        dispatch({ type: 'setDescription', value: '' })
        dispatch({ type: 'setRatios', value: demoFeedComponentRatios })
      }}
    >
      Demo data
    </Button>
  )
}
