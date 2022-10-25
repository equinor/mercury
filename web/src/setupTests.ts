// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { MultiflashResponse } from './api/generated'
import { TComponentProperties } from './types'

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
  feedFractions: {
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
}

export const mockComponentProperties: TComponentProperties = {
  '1': {
    chemicalFormula: 'CO2',
    altName: 'Carbondioxide',
    molecularWeight: 44.01,
  },
  '2': { chemicalFormula: 'N2', altName: 'Nitrogen', molecularWeight: 28.014 },
  '3': { chemicalFormula: 'H2O', altName: 'Water', molecularWeight: 18.015 },
  '4': {
    chemicalFormula: 'H2S',
    altName: 'Hydrogensulfide',
    molecularWeight: 34.082,
  },
  '5': { chemicalFormula: 'Hg', altName: 'Mercury', molecularWeight: 200.59 },
  '101': {
    chemicalFormula: 'CH4',
    altName: 'Methane',
    molecularWeight: 16.043,
  },
  '201': { chemicalFormula: 'C2H6', altName: 'Ethane', molecularWeight: 30.07 },
  '301': {
    chemicalFormula: 'nC3',
    altName: 'Propane',
    molecularWeight: 44.096,
  },
  '401': {
    chemicalFormula: 'iC4',
    altName: 'i-Butane',
    molecularWeight: 58.123,
  },
  '402': {
    chemicalFormula: 'nC4',
    altName: 'n-Butane',
    molecularWeight: 58.123,
  },
  '501': {
    chemicalFormula: '22-dm-C3',
    altName: '2-2-dimethyl-propane',
    molecularWeight: 72.15,
  },
  '503': {
    chemicalFormula: 'iC5',
    altName: 'i-Pentane',
    molecularWeight: 70.134,
  },
  '504': {
    chemicalFormula: 'nC5',
    altName: 'n-Pentane',
    molecularWeight: 72.15,
  },
  '502': { chemicalFormula: 'cy-C5', altName: 'Cy-C5', molecularWeight: 72.15 },
  '601': {
    chemicalFormula: '22-dm-C4',
    altName: '2-2-dimethyl-butane(neohexane)',
    molecularWeight: 86.177,
  },
  '602': {
    chemicalFormula: '23-dm-C4',
    altName: '2-3-dimethyl-butane',
    molecularWeight: 86.177,
  },
  '603': {
    chemicalFormula: '2-m-C5',
    altName: '2-methyl-pentane',
    molecularWeight: 86.177,
  },
  '604': {
    chemicalFormula: '3-m-C5',
    altName: '3-methyl-pentane',
    molecularWeight: 86.177,
  },
  '605': {
    chemicalFormula: 'nC6',
    altName: 'n-Hexane',
    molecularWeight: 86.177,
  },
  '606': {
    chemicalFormula: 'cy-C6',
    altName: 'Cy-hexane',
    molecularWeight: 84.161,
  },
  '608': {
    chemicalFormula: 'benzene',
    altName: 'Benzene',
    molecularWeight: 78.114,
  },
  '701': {
    chemicalFormula: 'nC7',
    altName: 'n-heptane',
    molecularWeight: 100.204,
  },
  '707': {
    chemicalFormula: 'cy-C7',
    altName: 'Cy-heptane',
    molecularWeight: 98.188,
  },
  '710': {
    chemicalFormula: 'toluene',
    altName: 'Toluene',
    molecularWeight: 92.141,
  },
  '801': {
    chemicalFormula: 'nC8',
    altName: 'n-octane',
    molecularWeight: 114.231,
  },
  '806': {
    chemicalFormula: 'cy-C8',
    altName: 'Cy-octane',
    molecularWeight: 112.215,
  },
  '809': {
    chemicalFormula: 'm-xylene',
    altName: 'M-xylene',
    molecularWeight: 106.167,
  },
  '901': {
    chemicalFormula: 'nC9',
    altName: 'n-nonane',
    molecularWeight: 128.258,
  },
  '1016': {
    chemicalFormula: 'nC10',
    altName: 'n-decane',
    molecularWeight: 142.285,
  },
}
