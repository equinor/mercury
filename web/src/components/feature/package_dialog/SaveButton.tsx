import { Button } from '@equinor/eds-core-react'
import { TComponentProperty, TComponentRatios, TPackage } from '../../../types'

function computeFeedMolecularWeight(
  componentProperties: TComponentProperty[],
  componentRatios: TComponentRatios
): number {
  return Object.keys(componentRatios).length !== 0
    ? Object.entries(componentRatios)
        .map(
          ([id, ratio]) =>
            Number(ratio) *
            (componentProperties.find((x) => x.id === id)?.molecularWeight ?? 0)
        )
        .reduce((a, b) => a + b)
    : 1
}

export const SaveButton = (props: {
  componentProperties: TComponentProperty[]
  packageName: string
  packageDescription: string
  componentRatios: TComponentRatios
  editablePackage?: TPackage
  close: () => void
  savePackage: (x?: TPackage) => void
  ratiosAreValid: { [id: string]: boolean }
}) => {
  const isSaveable = (): boolean => {
    const isValidPackage =
      props.packageName.length > 0 &&
      Object.values(props.ratiosAreValid).every((x) => x) &&
      Object.values(props.componentRatios).some((x) => Number(x) > 0) &&
      Number(props.componentRatios['5']) > 0
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
