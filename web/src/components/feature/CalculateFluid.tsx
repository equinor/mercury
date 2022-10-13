import { Autocomplete, Button, TextField } from '@equinor/eds-core-react'
import { Card } from '../common/Card'
import styled from 'styled-components'
import { FluidDialog } from './FluidDialog'
import { useState } from 'react'
import { Multiflash, MultiflashResponse } from '../../api/generated'
import { AxiosError, AxiosResponse } from 'axios'
import MercuryAPI from '../../api/MercuryAPI'

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
}: {
  mercuryApi: MercuryAPI
  setResult: (result: MultiflashResponse) => void
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [temperature, setTemperature] = useState<number>(15)
  const [pressure, setPressure] = useState<number>(1)
  const fluidPackages = ['Krafla']
  const multiflashInput: Multiflash = {
    // TODO: get actual components
    componentComposition: {
      '3': 0.062202,
      '2': 0.0047,
      '1': 0.046539,
      '101': 0.65364,
      '201': 0.086307,
      '301': 0.045563,
      '401': 0.007579,
      '402': 0.015481,
      '503': 0.005188,
      '504': 0.00612,
      '605': 0.066681,
      '5': 0.001,
    },
    temperature: temperature,
    pressure: pressure,
  }

  const calculate = (
    <Button
      data-testid="computeMf"
      onClick={() => {
        mercuryApi
          .computeMultiflash({ multiflash: multiflashInput })
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
          .finally
          // TODO: loading
          ()
      }}
    >
      Run
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
        </Form>
      </Card>
      <FluidDialog open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
