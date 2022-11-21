import { TextField } from '@equinor/eds-core-react'
import {
  absoluteZero,
  maxPressure,
  maxTemperature,
  minPressure,
  minTemperature,
} from '../../constants'

export const TempOrPressureInput = (props: {
  value: number
  setValue: (newValue: number) => void
  name: 'Temperature' | 'Pressure'
  isValid: boolean
  setIsValid: (x: boolean) => void
}) => {
  const maxValue = props.name === 'Temperature' ? maxTemperature : maxPressure
  const minValue = props.name === 'Temperature' ? minTemperature : minPressure
  const unit = props.name === 'Temperature' ? 'ºC' : 'bar'
  const min = props.name === 'Temperature' ? absoluteZero : undefined
  return (
    <TextField
      id={props.name.toLowerCase() + '-input'}
      min={min}
      defaultValue={props.value.toString()}
      label={props.name}
      unit={unit}
      variant={
        !props.isValid
          ? 'error'
          : props.value > maxValue || props.value < minValue
          ? 'warning'
          : undefined
      }
      helperText={
        !props.isValid
          ? undefined
          : props.value > maxValue
          ? 'The ' + props.name.toLowerCase() + ' is very high'
          : props.value < minValue
          ? 'The ' + props.name.toLowerCase() + ' is very low'
          : undefined
      }
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        //This regex allows negative and positive decimal numbers
        const regex = /^[-+]?\d+(\.\d+)?$/
        props.setIsValid(
          regex.test(event.target.value) && !isNaN(Number(event.target.value))
        )

        props.setValue(Number(event.target.value))
      }}
    />
  )
}
