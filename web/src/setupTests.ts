// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { TComponentProperty, TResults } from './types'
import { TextEncoder } from 'util'

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

export const mockResults: TResults = {
  phaseValues: [
    {
      phase: 'Vapor',
      percentage: 0.9530398821754837,
      mercury: 9576.977265669584,
    },
    {
      phase: 'Aqueous',
      percentage: 0.04596219288894959,
      mercury: 42.95333958603203,
    },
    {
      phase: 'Mercury',
      percentage: 0.0009979249355665074,
      mercury: 1000000000,
    },
  ],
  componentFractions: [
    {
      id: '1',
      phaseFractions: [
        0.0487818478493959, 0.00003178625137356113, 9.357933137511921e-24,
      ],
      feedFraction: 0.046539,
    },
    {
      id: '2',
      phaseFractions: [
        0.004926658586182084, 5.606370638941071e-8, 9.521979777029961e-25,
      ],
      feedFraction: 0.0047,
    },
    {
      id: '3',
      phaseFractions: [
        0.016978518176734285, 0.999923029961448, 3.2368004598608978e-24,
      ],
      feedFraction: 0.062202,
    },
    {
      id: '5',
      phaseFractions: [
        0.0000011288993580273517, 3.858025869444538e-9, 1.0000000000000002,
      ],
      feedFraction: 0.001,
    },
    {
      id: '101',
      phaseFractions: [
        0.6851613143677305, 0.00002077078423705684, 1.319319561831917e-22,
      ],
      feedFraction: 0.65364,
    },
    {
      id: '201',
      phaseFractions: [
        0.09046902819956745, 0.000004073890325362129, 1.7297094356248018e-23,
      ],
      feedFraction: 0.086307,
    },
    {
      id: '301',
      phaseFractions: [
        0.047759949263746916, 0.000007530068352386529, 9.075924729973352e-24,
      ],
      feedFraction: 0.045563,
    },
    {
      id: '401',
      phaseFractions: [
        0.007944465811905398, 7.791208565250264e-7, 1.5028484039426094e-24,
      ],
      feedFraction: 0.007579,
    },
    {
      id: '402',
      phaseFractions: [
        0.016227467901725096, 0.0000024012881239653258, 3.0664046159226887e-24,
      ],
      feedFraction: 0.015481,
    },
    {
      id: '503',
      phaseFractions: [
        0.005438171625943571, 4.946930604181399e-7, 1.0230429071522505e-24,
      ],
      feedFraction: 0.005188,
    },
    {
      id: '504',
      phaseFractions: [
        0.006415100362966198, 8.620089341914816e-7, 1.2054916829998997e-24,
      ],
      feedFraction: 0.00612,
    },
    {
      id: '605',
      phaseFractions: [
        0.06989634895474478, 0.000008212011556262026, 1.3063098591813244e-23,
      ],
      feedFraction: 0.066681,
    },
  ],
  cubicFeedFlow: 1000,
}

export const mockComponentProperties: TComponentProperty[] = [
  {
    id: '1',
    chemicalFormula: 'CO2',
    altName: 'Carbon Dioxide',
    molecularWeight: 44.01,
  },
  {
    id: '2',
    chemicalFormula: 'N2',
    altName: 'Nitrogen',
    molecularWeight: 28.014,
  },
  {
    id: '3',
    chemicalFormula: 'H2O',
    altName: 'Water',
    molecularWeight: 18.015,
  },
  {
    id: '4',
    chemicalFormula: 'H2S',
    altName: 'Hydrogensulfide',
    molecularWeight: 34.082,
  },
  {
    id: '5',
    chemicalFormula: 'Hg',
    altName: 'Mercury',
    molecularWeight: 200.59,
  },
  {
    id: '101',
    chemicalFormula: 'CH4',
    altName: 'Methane',
    molecularWeight: 16.043,
  },
  {
    id: '201',
    chemicalFormula: 'C2H6',
    altName: 'Ethane',
    molecularWeight: 30.07,
  },
  {
    id: '301',
    chemicalFormula: 'nC3',
    altName: 'Propane',
    molecularWeight: 44.096,
  },
  {
    id: '401',
    chemicalFormula: 'iC4',
    altName: 'i-Butane',
    molecularWeight: 58.123,
  },
  {
    id: '402',
    chemicalFormula: 'nC4',
    altName: 'n-Butane',
    molecularWeight: 58.123,
  },
  {
    id: '501',
    chemicalFormula: '22-dm-C3',
    altName: '2-2-dimethyl-propane',
    molecularWeight: 72.15,
  },
  {
    id: '503',
    chemicalFormula: 'iC5',
    altName: 'i-Pentane',
    molecularWeight: 70.134,
  },
  {
    id: '504',
    chemicalFormula: 'nC5',
    altName: 'n-Pentane',
    molecularWeight: 72.15,
  },
  {
    id: '502',
    chemicalFormula: 'cy-C5',
    altName: 'Cy-C5',
    molecularWeight: 72.15,
  },
  {
    id: '601',
    chemicalFormula: '22-dm-C4',
    altName: '2-2-dimethyl-butane(neohexane)',
    molecularWeight: 86.177,
  },
  {
    id: '602',
    chemicalFormula: '23-dm-C4',
    altName: '2-3-dimethyl-butane',
    molecularWeight: 86.177,
  },
  {
    id: '603',
    chemicalFormula: '2-m-C5',
    altName: '2-methyl-pentane',
    molecularWeight: 86.177,
  },
  {
    id: '604',
    chemicalFormula: '3-m-C5',
    altName: '3-methyl-pentane',
    molecularWeight: 86.177,
  },
  {
    id: '605',
    chemicalFormula: 'nC6',
    altName: 'n-Hexane',
    molecularWeight: 86.177,
  },
  {
    id: '606',
    chemicalFormula: 'cy-C6',
    altName: 'Cy-hexane',
    molecularWeight: 84.161,
  },
  {
    id: '608',
    chemicalFormula: 'benzene',
    altName: 'Benzene',
    molecularWeight: 78.114,
  },
  {
    id: '701',
    chemicalFormula: 'nC7',
    altName: 'n-heptane',
    molecularWeight: 100.204,
  },
  {
    id: '707',
    chemicalFormula: 'cy-C7',
    altName: 'Cy-heptane',
    molecularWeight: 98.188,
  },
  {
    id: '710',
    chemicalFormula: 'toluene',
    altName: 'Toluene',
    molecularWeight: 92.141,
  },
  {
    id: '801',
    chemicalFormula: 'nC8',
    altName: 'n-octane',
    molecularWeight: 114.231,
  },
  {
    id: '806',
    chemicalFormula: 'cy-C8',
    altName: 'Cy-octane',
    molecularWeight: 112.215,
  },
  {
    id: '809',
    chemicalFormula: 'm-xylene',
    altName: 'M-xylene',
    molecularWeight: 106.167,
  },
  {
    id: '901',
    chemicalFormula: 'nC9',
    altName: 'n-nonane',
    molecularWeight: 128.258,
  },
  {
    id: '1016',
    chemicalFormula: 'nC10',
    altName: 'n-decane',
    molecularWeight: 142.285,
  },
]

global.TextEncoder = TextEncoder
