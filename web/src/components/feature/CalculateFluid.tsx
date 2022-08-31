import { Autocomplete, Button, TextField } from '@equinor/eds-core-react'
import { Card } from '../common/Card'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const TextFieldContainer = styled.div`
  display: flex;
  gap: 16px;
`

const FluidPackage = styled.div`
  display: flex;
  gap: 16px;

  .Button__ButtonBase-sc-1hs0myn-1 {
    align-self: flex-end;
  }

  .Autocomplete__Container-sc-yvif0e-0 {
    flex-grow: 1;
  }
`

export const CalculateFluid = () => {
  const fluidPackages = ['Krafla']

  const InputParameters = () => (
    <Form>
      <FluidPackage>
        <Autocomplete label="Fluid package" options={fluidPackages} autoWidth />
        <Button variant="outlined">Edit</Button>
      </FluidPackage>
      <TextFieldContainer>
        <TextField
          id="temperature-input"
          placeholder="15"
          label="Temperature"
          unit="ºC"
          type="number"
        />
        <TextField
          id="pressure-input"
          placeholder="1"
          label="Pressure"
          unit="bar"
          type="number"
        />
      </TextFieldContainer>
    </Form>
  )

  const calculate = <Button>Run</Button>

  return (
    <Card title={'Calculate Fluid'} actions={calculate}>
      <InputParameters />
    </Card>
  )
}
