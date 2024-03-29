import { Autocomplete, Button, Progress } from '@equinor/eds-core-react'
import { useAppInsightsContext } from '@microsoft/applicationinsights-react-js'
import { AxiosResponse } from 'axios'
import { useState } from 'react'
import styled from 'styled-components'
import MercuryAPI from '../../api/MercuryAPI'
import { MultiflashResponse } from '../../api/generated'
import { Card } from '../../common/Card'
import useLocalStorage from '../../hooks/useLocalStorage'
import { useLastInputContext } from '../../pages/context/LastInputContext'
import {
  TCalcStatus,
  TComponentProperty,
  TPackage,
  TResults,
} from '../../types'
import { FluidDialog } from '../package_dialog/FluidDialog'
import { FeedFlowInput } from './FeedFlowInput'
import { TempOrPressureInput } from './TempOrPressureInput'

const FlexContainer = styled.div`
  display: flex;
  gap: 16px;
`

const Form = styled(FlexContainer)`
  flex-direction: column;
`

const FluidPackage = styled(FlexContainer)`
  button {
    align-self: flex-end;
  }
  > :first-child {
    flex-grow: 1;
  }
`

export const CalculationInput = ({
  mercuryApi,
  setResult,
  setCalcStatus,
  componentProperties,
}: {
  mercuryApi: MercuryAPI
  setResult: (result: TResults | undefined) => void
  setCalcStatus: (x: TCalcStatus) => void
  componentProperties: TComponentProperty[]
}) => {
  const [isNewOpen, setIsNewOpen] = useState<boolean>(false)
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
  const { setLastInput } = useLastInputContext()
  const [temperature, setTemperature] = useState<number>(15)
  const [pressure, setPressure] = useState<number>(1)
  const [calculating, setCalculating] = useState<boolean>(false)
  const [packages, setPackages] = useLocalStorage<TPackage[]>('packages', [], 1)
  const [selectedPackage, setSelectedPackage] = useState<TPackage | undefined>()
  const [cubicFeedFlow, setCubicFeedFlow] = useState<number>(1000)
  const [isTemperatureValid, setIsTemperatureValid] = useState<boolean>(true)
  const [isPressureValid, setIsPressureValid] = useState<boolean>(true)
  const appInsights = useAppInsightsContext()

  const calculate = (
    <Button
      data-testid="computeMf"
      disabled={
        calculating ||
        !selectedPackage ||
        !isTemperatureValid ||
        !isPressureValid
      }
      onClick={() => {
        if (selectedPackage === undefined) return
        setCalculating(true)
        appInsights.trackEvent({ name: 'CalculationStarted' })
        setResult(undefined)
        setCalcStatus('calculating')
        const input = {
          componentComposition: Object.fromEntries(
            selectedPackage.components.map((x) => [x.id, Number(x.ratio)])
          ),
          temperature: temperature,
          pressure: pressure,
          cubicFeedFlow: cubicFeedFlow,
        }
        setLastInput(input)
        mercuryApi
          .computeMultiflash({
            multiflash: input,
          })
          .then((result: AxiosResponse<MultiflashResponse>) => {
            setResult({
              phaseValues: Object.entries(result.data.phaseValues).map(
                ([phase, data]) => ({
                  phase: phase,
                  percentage: data.percentage,
                  mercury: data.mercury,
                })
              ),
              cubicFeedFlow: cubicFeedFlow,
              componentFractions: selectedPackage.components
                .filter(
                  (x) =>
                    x.id in result.data.componentFractions &&
                    x.id in result.data.feedFractions
                )
                .map((x) => ({
                  id: x.id,
                  phaseFractions: result.data.componentFractions[x.id],
                  feedFraction: result.data.feedFractions[x.id],
                })),
            })
            setCalcStatus('done')
          })
          .catch(() => {
            appInsights.trackEvent({ name: 'CalculationFailed' }, input)
            setCalcStatus('failure')
          })
          .finally(() => setCalculating(false))
      }}
    >
      {calculating ? <Progress.Circular size={16} color="neutral" /> : <>Run</>}
    </Button>
  )

  const savePackage = (mode: 'new' | 'edit', newPackage?: TPackage) => {
    let oldPackages = [...packages]
    if (mode === 'edit' && selectedPackage !== undefined) {
      oldPackages = oldPackages.filter((x) => x.name !== selectedPackage.name)
    }

    const packageNameConflict = oldPackages.find(
      (x) => x.name === newPackage?.name
    )
    if (packageNameConflict) {
      const overwrite: boolean = window.confirm(
        `A package named '${newPackage?.name}' already exists.\nOk to overwrite?`
      )
      if (!overwrite) return
    }
    oldPackages = oldPackages.filter((x) => x.name !== newPackage?.name)
    setSelectedPackage(newPackage)
    setPackages(newPackage ? [...oldPackages, newPackage] : oldPackages)
    setIsEditOpen(false)
    setIsNewOpen(false)
  }

  return (
    <>
      <Card title={'Calculate Fluid'} actions={calculate}>
        <Form as="form">
          <FluidPackage>
            <Autocomplete
              label="Fluid package"
              options={packages}
              optionLabel={(option) => option.name}
              onOptionsChange={(changes) =>
                setSelectedPackage(changes.selectedItems[0])
              }
              selectedOptions={selectedPackage ? [selectedPackage] : []}
              autoWidth
            />
            <Button
              variant="outlined"
              onClick={() => setIsEditOpen(true)}
              disabled={selectedPackage === undefined}
            >
              Edit
            </Button>
            <Button variant="outlined" onClick={() => setIsNewOpen(true)}>
              New
            </Button>
          </FluidPackage>
          <FlexContainer>
            <TempOrPressureInput
              value={temperature}
              setValue={setTemperature}
              name="Temperature"
              isValid={isTemperatureValid}
              setIsValid={setIsTemperatureValid}
            />
            <TempOrPressureInput
              value={pressure}
              setValue={setPressure}
              name="Pressure"
              isValid={isPressureValid}
              setIsValid={setIsPressureValid}
            />
          </FlexContainer>
          <FeedFlowInput
            cubicFeedFlow={cubicFeedFlow}
            setCubicFeedFlow={setCubicFeedFlow}
            molecularWeightSum={selectedPackage?.molecularWeightSum}
          />
        </Form>
      </Card>
      {isNewOpen && (
        <FluidDialog
          close={() => setIsNewOpen(false)}
          componentProperties={componentProperties}
          savePackage={(x) => savePackage('new', x)}
          packages={packages}
        />
      )}
      {isEditOpen && (
        <FluidDialog
          close={() => setIsEditOpen(false)}
          componentProperties={componentProperties}
          editablePackage={selectedPackage}
          savePackage={(x) => savePackage('edit', x)}
          packages={packages}
        />
      )}
    </>
  )
}
