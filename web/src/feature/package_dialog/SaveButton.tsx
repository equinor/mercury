import { Button } from '@equinor/eds-core-react'
import { TComponentProperty, TComponentRatio, TPackage } from '../../types'
import { usePackageDialogContext } from './context/PackageDialogContext'

function computeFeedMolecularWeight(
  componentProperties: TComponentProperty[],
  componentRatios: TComponentRatio[]
): number {
  return componentRatios.length !== 0
    ? componentRatios
        .map(
          (ratio) =>
            Number(ratio.ratio) *
            (componentProperties.find((prop) => prop.id === ratio.id)
              ?.molecularWeight ?? 0)
        )
        .reduce((a, b) => a + b)
    : 1
}

export const SaveButton = (props: {
  editablePackage?: TPackage
  savePackage: (x?: TPackage) => void
}) => {
  const { state } = usePackageDialogContext()
  const isSaveable = (): boolean => {
    const isValidPackage =
      state.name.length > 0 &&
      Object.values(state.isRatioValid).every((x) => x) &&
      Number(state.ratios.find((x) => x.id === '5')?.ratio) > 0
    if (props.editablePackage) {
      const ratioHasChanged =
        props.editablePackage.components.length !== state.ratios.length ||
        !props.editablePackage.components.every(
          (old) =>
            old.ratio === state.ratios.find((x) => x.id === old.id)?.ratio
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
            state.componentProperties,
            state.ratios
          ),
        })
      }}
      disabled={!isSaveable()}
    >
      {props.editablePackage ? 'Update' : 'Create'}
    </Button>
  )
}
