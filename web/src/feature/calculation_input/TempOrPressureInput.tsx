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
  function getHelperText() {
    if (!props.isValid) return undefined
    if (props.value > maxValue)
      return 'The ' + props.name.toLowerCase() + ' is very high'
    if (props.value < minValue)
      return 'The ' + props.name.toLowerCase() + ' is very low'
  }
  function getVariant() {
    if (!props.isValid) return 'error'
    if (props.value > maxValue || props.value < minValue) return 'warning'
    return undefined
  }
  return (
    <TextField
      id={props.name.toLowerCase() + '-input'}
      min={min}
      defaultValue={props.value.toString()}
      label={props.name}
      unit={unit}
      variant={getVariant()}
      helperText={getHelperText()}
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
