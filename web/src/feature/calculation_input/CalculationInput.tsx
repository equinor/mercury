import { Autocomplete, Button, Progress } from '@equinor/eds-core-react'
import { Card } from '../../common/Card'
import styled from 'styled-components'
import { FluidDialog } from '../package_dialog/FluidDialog'
import { useState } from 'react'
import { MultiflashResponse } from '../../api/generated'
import { AxiosError, AxiosResponse } from 'axios'
import MercuryAPI from '../../api/MercuryAPI'
import { FeedFlowInput } from './FeedFlowInput'
import { TComponentProperty, TPackage, TResults } from '../../types'
import useLocalStorage from '../../hooks/useLocalStorage'
import { TempOrPressureInput } from './TempOrPressureInput'
import { PackageDialogProvider } from '../package_dialog/context/PackageDialogContext'

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
}: {
  mercuryApi: MercuryAPI
  setResult: (result: TResults | undefined) => void
  componentProperties: TComponentProperty[]
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
        setResult(undefined)
        mercuryApi
          .computeMultiflash({
            multiflash: {
              componentComposition: Object.fromEntries(
                Object.entries(selectedPackage.components).map(
                  ([id, ratio]) => [id, Number(ratio)]
                )
              ),
              temperature: temperature,
              pressure: pressure,
            },
          })
          .then((result: AxiosResponse<MultiflashResponse>) => {
            setResult({ ...result.data, cubicFeedFlow: cubicFeedFlow })
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
        <PackageDialogProvider>
          <FluidDialog
            close={() => setIsNewOpen(false)}
            componentProperties={componentProperties}
            savePackage={(x) => savePackage('new', x)}
            packages={packages}
          />
        </PackageDialogProvider>
      )}
      {isEditOpen && (
        <PackageDialogProvider>
          <FluidDialog
            close={() => setIsEditOpen(false)}
            componentProperties={componentProperties}
            editablePackage={selectedPackage}
            savePackage={(x) => savePackage('edit', x)}
            packages={packages}
          />
        </PackageDialogProvider>
      )}
    </>
  )
}