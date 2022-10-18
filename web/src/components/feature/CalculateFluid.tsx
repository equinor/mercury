import {
  Autocomplete,
  Button,
  Progress,
  TextField,
} from '@equinor/eds-core-react'
import { Card } from '../common/Card'
import styled from 'styled-components'
import { FluidDialog } from './FluidDialog'
import { useState } from 'react'
import { ComponentResponse, MultiflashResponse } from '../../api/generated'
import { AxiosError, AxiosResponse } from 'axios'
import MercuryAPI from '../../api/MercuryAPI'
import { FeedFlowInput } from './FeedFlowInput'
import { TComponentComposition, TFeedFlow } from '../../pages/Main'

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

export const CalculateFluid = ({
  mercuryApi,
  setResult,
  components,
  feedFlow,
  setFeedFlow,
  componentComposition,
  setComponentComposition,
}: {
  mercuryApi: MercuryAPI
  setResult: (result: MultiflashResponse) => void
  components: ComponentResponse
  feedFlow: TFeedFlow
  setFeedFlow: (feedFlow: TFeedFlow) => void
  componentComposition: TComponentComposition
  setComponentComposition: (feedComponentRatios: TComponentComposition) => void
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [temperature, setTemperature] = useState<number>(15)
  const [pressure, setPressure] = useState<number>(1)
  const [calculating, setCalculating] = useState<boolean>(false)
  const fluidPackages = ['Krafla']

  const calculate = (
    <Button
      data-testid="computeMf"
      disabled={calculating}
      onClick={() => {
        setCalculating(true)
        mercuryApi
          .computeMultiflash({
            multiflash: {
              componentComposition: componentComposition,
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
      {calculating && (
        <>
          <Progress.Circular size={16} color="neutral" />
          Calculating...
        </>
      )}
      {!calculating && <>Run</>}
    </Button>
  )

  return (
    <>
      <Card title={'Calculate Fluid'} actions={calculate}>
        <Form as="form">
          <FluidPackage>
            <Autocomplete
              label="Fluid package"
              options={fluidPackages}
              autoWidth
            />
            <Button variant="outlined" onClick={() => setIsOpen(true)}>
              Edit
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
          <FeedFlowInput feedFlow={feedFlow} setFeedFlow={setFeedFlow} />
        </Form>
      </Card>
      <FluidDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        components={components}
        setComponentComposition={setComponentComposition}
      />
    </>
  )
}
