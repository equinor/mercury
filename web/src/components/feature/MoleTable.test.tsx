import { render, screen } from '@testing-library/react'
import { MoleTable } from './MoleTable'
import '@testing-library/jest-dom/extend-expect'
import { ComponentResponse, MultiflashResponse } from '../../api/generated'

const testComponents: ComponentResponse = {
  components: {
    '1': { chemicalFormula: 'CO2', altName: 'Carbondioxide' },
    '2': { chemicalFormula: 'N2', altName: 'Nitrogen' },
    '3': { chemicalFormula: 'H2O', altName: 'Water' },
    '4': { chemicalFormula: 'H2S', altName: 'Hydrogensulfide' },
    '5': { chemicalFormula: 'Hg', altName: 'Mercury' },
    '101': { chemicalFormula: 'CH4', altName: 'Methane' },
    '201': { chemicalFormula: 'C2H6', altName: 'Ethane' },
    '301': { chemicalFormula: 'nC3', altName: 'Propane' },
    '401': { chemicalFormula: 'iC4', altName: 'i-Butane' },
    '402': { chemicalFormula: 'nC4', altName: 'n-Butane' },
    '501': { chemicalFormula: '22-dm-C3', altName: '2-2-dimethyl-propane' },
    '503': { chemicalFormula: 'iC5', altName: 'i-Pentane' },
    '504': { chemicalFormula: 'nC5', altName: 'n-Pentane' },
    '502': { chemicalFormula: 'cy-C5', altName: 'Cy-C5' },
    '601': {
      chemicalFormula: '22-dm-C4',
      altName: '2-2-dimethyl-butane(neohexane)',
    },
    '602': { chemicalFormula: '23-dm-C4', altName: '2-3-dimethyl-butane' },
    '603': { chemicalFormula: '2-m-C5', altName: '2-methyl-pentane' },
    '604': { chemicalFormula: '3-m-C5', altName: '3-methyl-pentane' },
    '605': { chemicalFormula: 'nC6', altName: 'n-Hexane' },
    '606': { chemicalFormula: 'cy-C6', altName: 'Cy-hexane' },
    '608': { chemicalFormula: 'benzene', altName: 'Benzene' },
    '701': { chemicalFormula: 'nC7', altName: 'n-heptane' },
    '707': { chemicalFormula: 'cy-C7', altName: 'Cy-heptane' },
    '710': { chemicalFormula: 'toluene', altName: 'Toluene' },
    '801': { chemicalFormula: 'nC8', altName: 'n-octane' },
    '806': { chemicalFormula: 'cy-C8', altName: 'Cy-octane' },
    '809': { chemicalFormula: 'm-xylene', altName: 'M-xylene' },
    '901': { chemicalFormula: 'nC9', altName: 'n-nonane' },
    '1016': { chemicalFormula: 'nC10', altName: 'n-decane' },
  },
}

const testMultiflashResult: MultiflashResponse = {
  phaseValues: {
    Vapor: { percentage: 0.9989992588, mercury: 104.82781237 },
    Mercury: { percentage: 0.0010007412, mercury: 1000000000.0 },
  },
  componentFractions: {
    2: [0.01693, 0.000000000000000000000003431],
    1: [0.05399, 0.000000000000000000000006807],
    101: [0.8563, 0.0000000000000000000001379],
    201: [0.04577, 0.00000000000000000000000481],
    301: [0.01763, 0.000000000000000000000001301],
    401: [0.002424, 0.0000000000000000000000001389],
    402: [0.004378, 0.0000000000000000000000002324],
    503: [0.001212, 0.00000000000000000000000005006],
    504: [0.001102, 0.00000000000000000000000004238],
    608: [0.0001473, 0.000000000000000000000000005109],
    710: [0.00008415, 0.000000000000000000000000002175],
    809: [0.00002304, 0.000000000000000000000000000433],
    5: [0.00000001236, 1.0],
  },
  feedMolecularWeight: 5,
}

test('renders without crashing and displaying correct values in table', async () => {
  render(
    <MoleTable
      components={testComponents}
      multiFlashResponse={testMultiflashResult}
    />
  )
  // @ts-ignore because not able to get eslint to discover these types
  expect(screen.getByTestId('Vapor-0')).toHaveTextContent('0.05399')
  // @ts-ignore because not able to get eslint to discover these types
  expect(screen.getByTestId('Mercury-7')).toHaveTextContent('2.324e-25')
})
