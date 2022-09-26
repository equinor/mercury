import { DynamicTable, TDynamicTableInput } from '../common/DynamicTable'
import { ComponentResponse, MultiflashResponse } from '../../api/generated'

function transformRawResponse(
  multiFlashResponse: MultiflashResponse,
  componentResponse: ComponentResponse
): TDynamicTableInput {
  const tableInput: TDynamicTableInput = { Components: [] }
  const phasesInResult: string[] = Object.keys(multiFlashResponse.phaseValues)

  // Add phases "headers" to the tableInput
  phasesInResult.forEach((phase) => {
    tableInput[phase] = []
  })

  // Push data to each phase column
  phasesInResult.forEach((phase, index) => {
    Object.values(multiFlashResponse.componentFractions).forEach(
      (fractions: number[]) => {
        tableInput[phase].push(fractions[index].toString())
      }
    )
  })

  // Create the components column
  Object.keys(multiFlashResponse.componentFractions).forEach((compId) => {
    tableInput.Components.push(componentResponse.components[compId].altName)
  })

  return tableInput
}

// TODO: Get type from generated API
export const MoleTable = (props: {
  multiFlashResponse: MultiflashResponse
  components: ComponentResponse
}) => {
  const { multiFlashResponse, components } = props

  return (
    <DynamicTable
      input={transformRawResponse(multiFlashResponse, components)}
    />
  )
}
