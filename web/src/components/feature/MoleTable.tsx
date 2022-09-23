import { DynamicTable, TDynamicTableInput } from '../common/DynamicTable'
import { TComponentResponse } from '../../pages/Main'

// TODO: Update with type from generated api
type TMultiFlashResponse = {
  component_fractions: { [key: number]: number[] }
  phase_values: { [key: string]: any }
}

function transformRawResponse(
  multiFlashResponse: TMultiFlashResponse,
  components: TComponentResponse
): TDynamicTableInput {
  const tableInput: TDynamicTableInput = { Components: [] }
  const phasesInResult: string[] = Object.keys(multiFlashResponse.phase_values)

  // Add phases "headers" to the tableInput
  phasesInResult.forEach((phase) => {
    tableInput[phase] = []
  })

  // Push data to each phase column
  phasesInResult.forEach((phase, index) => {
    Object.values(multiFlashResponse.component_fractions).forEach(
      (fractions: number[]) => {
        tableInput[phase].push(fractions[index].toString())
      }
    )
  })

  // Create the components column
  Object.keys(multiFlashResponse.component_fractions).forEach((compId) => {
    tableInput.Components.push(components[compId].alt_name)
  })

  return tableInput
}

// TODO: Get type from generated API
export const MoleTable = (props: {
  multiFlashResponse: any
  components: TComponentResponse
}) => {
  const { multiFlashResponse, components } = props

  return (
    <DynamicTable
      input={transformRawResponse(multiFlashResponse, components)}
    />
  )
}
