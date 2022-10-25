import {
  Autocomplete,
  Button,
  Progress,
  TextField,
} from '@equinor/eds-core-react'
import { Card } from '../../common/Card'
import styled from 'styled-components'
import { FluidDialog } from '../package_dialog/FluidDialog'
import { useState } from 'react'
import { MultiflashResponse } from '../../../api/generated'
import { AxiosError, AxiosResponse } from 'axios'
import MercuryAPI from '../../../api/MercuryAPI'
import { FeedFlowInput } from './FeedFlowInput'
import {
  TComponentProperties,
  TComponentRatios,
  TPackage,
} from '../../../types'
import useLocalStorage from '../../../hooks/useLocalStorage'

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
  cubicFeedFlow,
  setCubicFeedFlow,
  setUsedComponentRatios,
}: {
  mercuryApi: MercuryAPI
  setResult: (result: MultiflashResponse) => void
  componentProperties: TComponentProperties
  cubicFeedFlow: number
  setCubicFeedFlow: (cubicFeedFlow: number) => void
  setUsedComponentRatios: (ratios: TComponentRatios) => void
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [temperature, setTemperature] = useState<number>(15)
  const [pressure, setPressure] = useState<number>(1)
  const [calculating, setCalculating] = useState<boolean>(false)
  const [packages, setPackages] = useLocalStorage<TPackage[]>('packages', [])
  const [selectedPackage, setSelectedPackage] = useState<TPackage | undefined>()

  const calculate = (
    <Button
      data-testid="computeMf"
      disabled={calculating || !selectedPackage}
      onClick={() => {
        if (selectedPackage === undefined) return
        setCalculating(true)
        setUsedComponentRatios(selectedPackage.components)
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
              autoWidth
            />
            <Button variant="outlined" onClick={() => setIsOpen(true)}>
              New
            </Button>
          </FluidPackage>
          <FlexContainer>
            <TextField
              id="temperature-input"
              min={-273.15}
              defaultValue={temperature.toString()}
              label="Temperature"
              unit="ºC"
              type="number"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setTemperature(Number(event.target.value))
              }
            />
            <TextField
              id="pressure-input"
              defaultValue={pressure.toString()}
              label="Pressure"
              unit="bar"
              type="number"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPressure(Number(event.target.value))
              }
            />
          </FlexContainer>
          <FeedFlowInput
            cubicFeedFlow={cubicFeedFlow}
            setCubicFeedFlow={setCubicFeedFlow}
            molecularWeightSum={selectedPackage?.molecularWeightSum}
          />
        </Form>
      </Card>
      <FluidDialog
        isOpen={isOpen}
        close={() => setIsOpen(false)}
        componentProperties={componentProperties}
        selectedPackage={selectedPackage}
        packages={Object.fromEntries(packages.map((x) => [x.name, x]))}
        setPackages={(x: { [name: string]: TPackage }) =>
          setPackages(Object.values(x))
        }
      />
    </>
  )
}
