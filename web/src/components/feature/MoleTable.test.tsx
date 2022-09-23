import { render, screen } from '@testing-library/react'
import { MoleTable } from './MoleTable'
import '@testing-library/jest-dom/extend-expect'

const testComponents = {
  '1': { chemical_formula: 'CO2', alt_name: 'Carbondioxide' },
  '2': { chemical_formula: 'N2', alt_name: 'Nitrogen' },
  '3': { chemical_formula: 'H2O', alt_name: 'Water' },
  '4': { chemical_formula: 'H2S', alt_name: 'Hydrogensulfide' },
  '5': { chemical_formula: 'Hg', alt_name: 'Mercury' },
  '101': { chemical_formula: 'CH4', alt_name: 'Methane' },
  '201': { chemical_formula: 'C2H6', alt_name: 'Ethane' },
  '301': { chemical_formula: 'nC3', alt_name: 'Propane' },
  '401': { chemical_formula: 'iC4', alt_name: 'i-Butane' },
  '402': { chemical_formula: 'nC4', alt_name: 'n-Butane' },
  '501': { chemical_formula: '22-dm-C3', alt_name: '2-2-dimethyl-propane' },
  '503': { chemical_formula: 'iC5', alt_name: 'i-Pentane' },
  '504': { chemical_formula: 'nC5', alt_name: 'n-Pentane' },
  '502': { chemical_formula: 'cy-C5', alt_name: 'Cy-C5' },
  '601': {
    chemical_formula: '22-dm-C4',
    alt_name: '2-2-dimethyl-butane(neohexane)',
  },
  '602': { chemical_formula: '23-dm-C4', alt_name: '2-3-dimethyl-butane' },
  '603': { chemical_formula: '2-m-C5', alt_name: '2-methyl-pentane' },
  '604': { chemical_formula: '3-m-C5', alt_name: '3-methyl-pentane' },
  '605': { chemical_formula: 'nC6', alt_name: 'n-Hexane' },
  '606': { chemical_formula: 'cy-C6', alt_name: 'Cy-hexane' },
  '608': { chemical_formula: 'benzene', alt_name: 'Benzene' },
  '701': { chemical_formula: 'nC7', alt_name: 'n-heptane' },
  '707': { chemical_formula: 'cy-C7', alt_name: 'Cy-heptane' },
  '710': { chemical_formula: 'toluene', alt_name: 'Toluene' },
  '801': { chemical_formula: 'nC8', alt_name: 'n-octane' },
  '806': { chemical_formula: 'cy-C8', alt_name: 'Cy-octane' },
  '809': { chemical_formula: 'm-xylene', alt_name: 'M-xylene' },
  '901': { chemical_formula: 'nC9', alt_name: 'n-nonane' },
  '1016': { chemical_formula: 'nC10', alt_name: 'n-decane' },
}

const testMultiflashResult = {
  phase_values: {
    Vapor: { percentage: 0.9989992588, mercury: 104.82781237 },
    Mercury: { percentage: 0.0010007412, mercury: 1000000000.0 },
  },
  component_fractions: {
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
}

test('renders without crashing and displaying correct values in table', async () => {
  render(
    <MoleTable
      components={testComponents}
      multiFlashResponse={testMultiflashResult}
    />
  )
  expect(screen.getByTestId('Vapor-0')).toHaveTextContent('0.05399')
  expect(screen.getByTestId('Mercury-7')).toHaveTextContent('2.324e-25')
})
