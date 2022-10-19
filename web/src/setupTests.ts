// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { MultiflashResponse } from './api/generated'
import { TComponentNames } from './types'

export const mockComponentRatios = {
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
}

export const mockMultiflashResponse: MultiflashResponse = {
  phaseValues: {
    Vapor: {
      percentage: 0.9530398821754837,
      mercury: 9576.977265669584,
    },
    Aqueous: {
      percentage: 0.04596219288894959,
      mercury: 42.95333958603203,
    },
    Mercury: {
      percentage: 0.0009979249355665074,
      mercury: 1000000000,
    },
  },
  componentFractions: {
    '1': [0.0487818478493959, 0.00003178625137356113, 9.357933137511921e-24],
    '2': [0.004926658586182084, 5.606370638941071e-8, 9.521979777029961e-25],
    '3': [0.016978518176734285, 0.999923029961448, 3.2368004598608978e-24],
    '5': [0.0000011288993580273517, 3.858025869444538e-9, 1.0000000000000002],
    '101': [0.6851613143677305, 0.00002077078423705684, 1.319319561831917e-22],
    '201': [
      0.09046902819956745, 0.000004073890325362129, 1.7297094356248018e-23,
    ],
    '301': [
      0.047759949263746916, 0.000007530068352386529, 9.075924729973352e-24,
    ],
    '401': [0.007944465811905398, 7.791208565250264e-7, 1.5028484039426094e-24],
    '402': [
      0.016227467901725096, 0.0000024012881239653258, 3.0664046159226887e-24,
    ],
    '503': [0.005438171625943571, 4.946930604181399e-7, 1.0230429071522505e-24],
    '504': [0.006415100362966198, 8.620089341914816e-7, 1.2054916829998997e-24],
    '605': [
      0.06989634895474478, 0.000008212011556262026, 1.3063098591813244e-23,
    ],
  },
  feedMolecularWeight: 26.494307395,
}

export const mockComponentNames: TComponentNames = {
  '1': { formula: 'CO2', name: 'Carbondioxide' },
  '2': { formula: 'N2', name: 'Nitrogen' },
  '3': { formula: 'H2O', name: 'Water' },
  '4': { formula: 'H2S', name: 'Hydrogensulfide' },
  '5': { formula: 'Hg', name: 'Mercury' },
  '101': { formula: 'CH4', name: 'Methane' },
  '201': { formula: 'C2H6', name: 'Ethane' },
  '301': { formula: 'nC3', name: 'Propane' },
  '401': { formula: 'iC4', name: 'i-Butane' },
  '402': { formula: 'nC4', name: 'n-Butane' },
  '501': { formula: '22-dm-C3', name: '2-2-dimethyl-propane' },
  '503': { formula: 'iC5', name: 'i-Pentane' },
  '504': { formula: 'nC5', name: 'n-Pentane' },
  '502': { formula: 'cy-C5', name: 'Cy-C5' },
  '601': {
    formula: '22-dm-C4',
    name: '2-2-dimethyl-butane(neohexane)',
  },
  '602': { formula: '23-dm-C4', name: '2-3-dimethyl-butane' },
  '603': { formula: '2-m-C5', name: '2-methyl-pentane' },
  '604': { formula: '3-m-C5', name: '3-methyl-pentane' },
  '605': { formula: 'nC6', name: 'n-Hexane' },
  '606': { formula: 'cy-C6', name: 'Cy-hexane' },
  '608': { formula: 'benzene', name: 'Benzene' },
  '701': { formula: 'nC7', name: 'n-heptane' },
  '707': { formula: 'cy-C7', name: 'Cy-heptane' },
  '710': { formula: 'toluene', name: 'Toluene' },
  '801': { formula: 'nC8', name: 'n-octane' },
  '806': { formula: 'cy-C8', name: 'Cy-octane' },
  '809': { formula: 'm-xylene', name: 'M-xylene' },
  '901': { formula: 'nC9', name: 'n-nonane' },
  '1016': { formula: 'nC10', name: 'n-decane' },
}
