import { DynamicTable, TDynamicTableInput } from '../common/DynamicTable'
import { MultiflashResponse } from '../../api/generated'

function transformRawResponse(
  multiFlashResponse: MultiflashResponse,
  cubicFeedFlow: number
): TDynamicTableInput {
  const tableInput: TDynamicTableInput = {
    Phases: [],
    [`Mass Concentration`]: [],
    [`Mole Concentration`]: [],
    [`Mercury Flow (g/d)`]: [],
  }
  const phasesInResult: string[] = Object.keys(multiFlashResponse.phaseValues)
  phasesInResult.forEach((phase, index) => {
    tableInput['Phases'].push(phase)
    tableInput['Mass Concentration'].push(
      multiFlashResponse.phaseValues[phase]['mercury'].toString()
    )
    tableInput['Mole Concentration'].push(
      // mercury has component id 5
      multiFlashResponse.componentFractions['5'][index].toString()
    )
    // TODO: add support for feed in kg/d
    const hgPhaseFlow =
      cubicFeedFlow *
      42.29256 *
      multiFlashResponse.phaseValues[phase]['percentage'] *
      multiFlashResponse.componentFractions['5'][index] *
      200.59
    tableInput['Mercury Flow (g/d)'].push(hgPhaseFlow.toString())
  })
  return tableInput
}

export const PhaseTable = (props: {
  multiFlashResponse: MultiflashResponse
  cubicFeedFlow: number
}) => {
  const { multiFlashResponse, cubicFeedFlow } = props
  return (
    <DynamicTable
      input={transformRawResponse(multiFlashResponse, cubicFeedFlow)}
    />
  )
}
