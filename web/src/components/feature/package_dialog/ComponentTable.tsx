import styled from 'styled-components'
import { EdsProvider, Table, TextField } from '@equinor/eds-core-react'
import { TComponentRatios, TComponentProperties } from '../../../types'

const ComponentTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 550px;
  overflow: auto;
  margin-top: 15px;
`

export const ComponentTable = ({
  selectedComponents,
  componentRatios,
  setComponentRatios,
}: {
  selectedComponents: TComponentProperties
  componentRatios: TComponentRatios
  setComponentRatios: (componentInput: TComponentRatios) => void
}): JSX.Element => {
  function createTableRows() {
    return Object.entries(selectedComponents).map(([id, names], index) => (
      <Table.Row key={index}>
        <Table.Cell
          data-testid={`Component-${index}`}
        >{`${names.altName} (${names.chemicalFormula})`}</Table.Cell>
        <Table.Cell data-testid={`Ratio (mol)-${index}`}>
          <TextField
            id={`${names.chemicalFormula}-input`}
            value={(componentRatios[id] ?? 0).toString()}
            min={0}
            type="number"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const ratio = Number(event.target.value)
              const newRatios = { ...componentRatios }
              if (ratio === 0) {
                delete newRatios[id]
                setComponentRatios(newRatios)
              } else {
                newRatios[id] = ratio
                setComponentRatios(newRatios)
              }
            }}
          />
        </Table.Cell>
      </Table.Row>
    ))
  }

  return (
    <ComponentTableContainer>
      <EdsProvider density={'compact'}>
        <Table>
          <Table.Head sticky>
            <Table.Row>
              <Table.Cell key={`Component`}>{`Component`}</Table.Cell>
              <Table.Cell
                key={`Feed value (mol)`}
              >{`Feed value (mol)`}</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>{createTableRows()}</Table.Body>
        </Table>
      </EdsProvider>
    </ComponentTableContainer>
  )
}
