import { Button } from '@equinor/eds-core-react'
import { TComponentProperty, TComponentRatios, TPackage } from '../../types'
import { usePackageDialogContext } from './context/PackageDialogContext'

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
  editablePackage?: TPackage
  savePackage: (x?: TPackage) => void
}) => {
  const { state } = usePackageDialogContext()
  const isSaveable = (): boolean => {
    const isValidPackage =
      state.name.length > 0 &&
      Object.values(state.areRatioValid).every((x) => x) &&
      Object.values(state.ratios).some((x) => Number(x) > 0) &&
      Number(state.ratios['5']) > 0
    if (props.editablePackage) {
      const ratioHasChanged =
        Object.keys(props.editablePackage.components).length !==
          Object.keys(state.ratios).length ||
        !Object.entries(props.editablePackage.components).every(
          ([compId, ratio]) => ratio === state.ratios[compId]
        )
      const hasChanged =
        state.name !== props.editablePackage.name ||
        state.description !== props.editablePackage.description ||
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
          name: state.name,
          description: state.description,
          components: state.ratios,
          molecularWeightSum: computeFeedMolecularWeight(
            props.componentProperties,
            state.ratios
          ),
        })
      }}
      disabled={!isSaveable()}
    >
      Save
    </Button>
  )
}
