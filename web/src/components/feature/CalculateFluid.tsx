import { Autocomplete, Button, TextField } from '@equinor/eds-core-react'
import { Card } from '../common/Card'
import styled from 'styled-components'

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

export const CalculateFluid = ({ edit }: { edit: () => void }) => {
  const fluidPackages = ['Krafla']

  const InputParameters = () => (
    <Form as="form">
      <FluidPackage>
        <Autocomplete label="Fluid package" options={fluidPackages} autoWidth />
        <Button variant="outlined" onClick={edit}>
          Edit
        </Button>
      </FluidPackage>
      <FlexContainer>
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
      </FlexContainer>
    </Form>
  )

  const calculate = <Button>Run</Button>

  return (
    <Card title={'Calculate Fluid'} actions={calculate}>
      <InputParameters />
    </Card>
  )
}
