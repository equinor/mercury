import { Autocomplete, Button, Progress } from '@equinor/eds-core-react'
import { Card } from '../../common/Card'
import styled from 'styled-components'
import { FluidDialog } from '../package_dialog/FluidDialog'
import { useState } from 'react'
import { MultiflashResponse } from '../../../api/generated'
import { AxiosError, AxiosResponse } from 'axios'
import MercuryAPI from '../../../api/MercuryAPI'
import { FeedFlowInput } from './FeedFlowInput'
import { TComponentProperties, TPackage } from '../../../types'
import useLocalStorage from '../../../hooks/useLocalStorage'
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
  componentProperties,
  setUsedCubicFeedFlow,
}: {
  mercuryApi: MercuryAPI
  setResult: (result: MultiflashResponse) => void
  componentProperties: TComponentProperties
  setUsedCubicFeedFlow: (cubicFeedFlow: number) => void
}) => {
  const [isNewOpen, setIsNewOpen] = useState<boolean>(false)
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
  const [temperature, setTemperature] = useState<number>(15)
  const [pressure, setPressure] = useState<number>(1)
  const [calculating, setCalculating] = useState<boolean>(false)
  const [packages, setPackages] = useLocalStorage<TPackage[]>('packages', [])
  const [selectedPackage, setSelectedPackage] = useState<TPackage | undefined>()
  const [cubicFeedFlow, setCubicFeedFlow] = useState<number>(1000)

  const calculate = (
    <Button
      data-testid="computeMf"
      disabled={calculating || !selectedPackage}
      onClick={() => {
        if (selectedPackage === undefined) return
        setCalculating(true)
        mercuryApi
          .computeMultiflash({
            multiflash: {
              componentComposition: selectedPackage.components,
              temperature: temperature,
              pressure: pressure,
            },
          })
          .then((result: AxiosResponse<MultiflashResponse>) => {
            setResult(result.data)
            setUsedCubicFeedFlow(cubicFeedFlow)
          })
          .catch((error: AxiosError) =>
            // TODO: Notify user of failed calculation
            console.error(
              `Could not run computation: (${
                error.response?.data || error.message
              })`
            )
          )
          .finally(() => {
            setCalculating(false)
          })
      }}
    >
      {calculating ? <Progress.Circular size={16} color="neutral" /> : <>Run</>}
    </Button>
  )

  const savePackage = (newPackage: TPackage, mode: 'new' | 'edit') => {
    let oldPackages = [...packages]
    if (mode === 'edit' && selectedPackage !== undefined) {
      oldPackages = oldPackages.filter((x) => x.name !== selectedPackage.name)
    }
    if (oldPackages.find((x) => x.name === newPackage.name)) {
      oldPackages = oldPackages.filter((x) => x.name !== newPackage.name)
    }
    setSelectedPackage(newPackage)
    setPackages([...oldPackages, newPackage])
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
            />
            <TempOrPressureInput
              value={pressure}
              setValue={setPressure}
              name="Pressure"
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
          savePackage={(x) => savePackage(x, 'new')}
        />
      )}
      {isEditOpen && (
        <FluidDialog
          close={() => setIsEditOpen(false)}
          componentProperties={componentProperties}
          editablePackage={selectedPackage}
          savePackage={(x) => savePackage(x, 'edit')}
        />
      )}
    </>
  )
}
