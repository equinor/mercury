import { Autocomplete, Button, Progress } from '@equinor/eds-core-react'
import { Card } from '../../common/Card'
import styled from 'styled-components'
import { FluidDialog } from '../package_dialog/FluidDialog'
import { useState } from 'react'
import { MultiflashResponse } from '../../api/generated'
import { AxiosResponse } from 'axios'
import MercuryAPI from '../../api/MercuryAPI'
import { FeedFlowInput } from './FeedFlowInput'
import {
  TCalcStatus,
  TComponentProperty,
  TPackage,
  TResults,
} from '../../types'
import useLocalStorage from '../../hooks/useLocalStorage'
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
  const [temperature, setTemperature] = useState<number>(15)
  const [pressure, setPressure] = useState<number>(1)
  const [calculating, setCalculating] = useState<boolean>(false)
  const [packages, setPackages] = useLocalStorage<TPackage[]>('packages', [], 1)
  const [selectedPackage, setSelectedPackage] = useState<TPackage | undefined>()
  const [cubicFeedFlow, setCubicFeedFlow] = useState<number>(1000)
  const [isTemperatureValid, setIsTemperatureValid] = useState<boolean>(true)
  const [isPressureValid, setIsPressureValid] = useState<boolean>(true)

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
        setResult(undefined)
        setCalcStatus('calculating')
        mercuryApi
          .computeMultiflash({
            multiflash: {
              componentComposition: Object.fromEntries(
                selectedPackage.components.map((x) => [x.id, Number(x.ratio)])
              ),
              temperature: temperature,
              pressure: pressure,
            },
          })
          .then((result: AxiosResponse<MultiflashResponse>) => {
            setResult({
              phaseValues: Object.entries(result.data.phaseValues).map(
                ([phase, data]) => ({
                  phase: phase,
                  percentage: data['percentage'],
                  mercury: data['mercury'],
                })
              ),
              cubicFeedFlow: cubicFeedFlow,
              componentFractions: Object.entries(
                result.data.componentFractions
              ).map(([id, fractions]) => ({
                id: id,
                phaseFractions: fractions,
                feedFraction: result.data.feedFractions[id],
              })),
            })
            setCalcStatus('done')
          })
          .catch(() => setCalcStatus('failure'))
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
