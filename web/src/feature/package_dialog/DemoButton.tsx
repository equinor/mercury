import { Button } from '@equinor/eds-core-react'
import { demoFeedComponentRatios } from '../../constants'
import { usePackageDialogContext } from './context/PackageDialogContext'
import { setDescription, setName, setRatios } from './context/actions'

export const DemoButton = () => {
  const { dispatch } = usePackageDialogContext()
  return (
    <Button
      onClick={() => {
        dispatch(setName('Demo data'))
        dispatch(setDescription(''))
        dispatch(setRatios(demoFeedComponentRatios))
      }}
    >
      Demo data
    </Button>
  )
}
