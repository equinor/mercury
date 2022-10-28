import { Button } from '@equinor/eds-core-react'
import {
  TComponentProperties,
  TComponentRatios,
  TPackage,
} from '../../../types'

function computeFeedMolecularWeight(
  componentProperties: TComponentProperties,
  componentRatios: TComponentRatios
): number {
  return componentRatios !== {}
    ? Object.entries(componentRatios)
        .map(([id, ratio]) => componentProperties[id].molecularWeight * ratio)
        .reduce((a, b) => a + b)
    : 1
}

export const SaveButton = (props: {
  componentProperties: TComponentProperties
  packageName: string
  packageDescription: string
  componentRatios: TComponentRatios
  editablePackage?: TPackage
  close: () => void
  savePackage: (x?: TPackage) => void
}) => {
  const isSaveable = (): boolean => {
    const isValidPackage =
      props.packageName.length > 0 &&
      Math.max(...Object.values(props.componentRatios)) > 0
    if (props.editablePackage) {
      const ratioHasChanged =
        Object.keys(props.editablePackage.components).length !==
          Object.keys(props.componentRatios).length ||
        !Object.entries(props.editablePackage.components).every(
          ([compId, ratio]) => ratio === props.componentRatios[compId]
        )
      const hasChanged =
        props.packageName !== props.editablePackage.name ||
        props.packageDescription !== props.editablePackage.description ||
        ratioHasChanged
      return isValidPackage && hasChanged
    } else {
      return isValidPackage
    }
  }
  return (
    <Button
      onClick={() => {
        props.savePackage({
          name: props.packageName,
          description: props.packageDescription,
          components: props.componentRatios,
          molecularWeightSum: computeFeedMolecularWeight(
            props.componentProperties,
            props.componentRatios
          ),
        })
        props.close()
      }}
      disabled={!isSaveable()}
    >
      Save
    </Button>
  )
}
