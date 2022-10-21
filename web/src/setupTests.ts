// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import {
  ComponentIds,
  Components,
  MultiflashResponse,
  PhaseLabels,
  PhaseResults,
} from './api/generated'

export const mockMultiflashResponse: MultiflashResponse = {
  componentIds: [
    ComponentIds.Id1,
    ComponentIds.Id2,
    ComponentIds.Id3,
    ComponentIds.Id5,
    ComponentIds.Id101,
    ComponentIds.Id201,
    ComponentIds.Id301,
    ComponentIds.Id401,
    ComponentIds.Id402,
    ComponentIds.Id503,
    ComponentIds.Id504,
    ComponentIds.Id605,
  ],
  phases: [PhaseLabels.Vapor, PhaseLabels.Aqueous, PhaseLabels.Mercury],
  phaseValues: {
    Vapor: {
      ratio: 0.9530398821754837,
      mercuryConcentration: 9576.977265669584,
      moleFractions: [
        0.0487818478493959, 0.004926658586182084, 0.016978518176734285,
        0.0000011288993580273517, 0.6851613143677305, 0.09046902819956745,
        0.047759949263746916, 0.007944465811905398, 0.016227467901725096,
        0.005438171625943571, 0.006415100362966198, 0.06989634895474478,
      ],
    },
    Aqueous: {
      ratio: 0.04596219288894959,
      mercuryConcentration: 42.95333958603203,
      moleFractions: [
        0.00003178625137356113, 5.606370638941071e-8, 0.999923029961448,
        3.858025869444538e-9, 0.00002077078423705684, 0.000004073890325362129,
        0.000007530068352386529, 7.791208565250264e-7, 0.0000024012881239653258,
        4.946930604181399e-7, 8.620089341914816e-7, 0.000008212011556262026,
      ],
    },
    Mercury: {
      ratio: 0.0009979249355665074,
      mercuryConcentration: 1000000000,
      moleFractions: [
        9.357933137511921e-24, 9.521979777029961e-25, 3.2368004598608978e-24,
        1.0000000000000002, 1.319319561831917e-22, 1.7297094356248018e-23,
        9.075924729973352e-24, 1.5028484039426094e-24, 3.0664046159226887e-24,
        1.0230429071522505e-24, 1.2054916829998997e-24, 1.3063098591813244e-23,
      ],
    },
  } as PhaseResults,
}

export const mockComponentResponse: Components = {
  id1: {
    chemicalFormula: 'CO2',
    altName: 'Carbondioxide',
    molecularWeight: 44.01,
  },
  id2: { chemicalFormula: 'N2', altName: 'Nitrogen', molecularWeight: 28.014 },
  id3: { chemicalFormula: 'H2O', altName: 'Water', molecularWeight: 18.015 },
  id4: {
    chemicalFormula: 'H2S',
    altName: 'Hydrogensulfide',
    molecularWeight: 34.082,
  },
  id5: { chemicalFormula: 'Hg', altName: 'Mercury', molecularWeight: 200.59 },
  id101: {
    chemicalFormula: 'CH4',
    altName: 'Methane',
    molecularWeight: 16.043,
  },
  id201: { chemicalFormula: 'C2H6', altName: 'Ethane', molecularWeight: 30.07 },
  id301: {
    chemicalFormula: 'nC3',
    altName: 'Propane',
    molecularWeight: 44.096,
  },
  id401: {
    chemicalFormula: 'iC4',
    altName: 'i-Butane',
    molecularWeight: 58.123,
  },
  id402: {
    chemicalFormula: 'nC4',
    altName: 'n-Butane',
    molecularWeight: 58.123,
  },
  id501: {
    chemicalFormula: '22-dm-C3',
    altName: '2-2-dimethyl-propane',
    molecularWeight: 72.15,
  },
  id503: {
    chemicalFormula: 'iC5',
    altName: 'i-Pentane',
    molecularWeight: 70.134,
  },
  id504: {
    chemicalFormula: 'nC5',
    altName: 'n-Pentane',
    molecularWeight: 72.15,
  },
  id502: { chemicalFormula: 'cy-C5', altName: 'Cy-C5', molecularWeight: 72.15 },
  id601: {
    chemicalFormula: '22-dm-C4',
    altName: '2-2-dimethyl-butane(neohexane)',
    molecularWeight: 86.177,
  },
  id602: {
    chemicalFormula: '23-dm-C4',
    altName: '2-3-dimethyl-butane',
    molecularWeight: 86.177,
  },
  id603: {
    chemicalFormula: '2-m-C5',
    altName: '2-methyl-pentane',
    molecularWeight: 86.177,
  },
  id604: {
    chemicalFormula: '3-m-C5',
    altName: '3-methyl-pentane',
    molecularWeight: 86.177,
  },
  id605: {
    chemicalFormula: 'nC6',
    altName: 'n-Hexane',
    molecularWeight: 86.177,
  },
  id606: {
    chemicalFormula: 'cy-C6',
    altName: 'Cy-hexane',
    molecularWeight: 84.161,
  },
  id608: {
    chemicalFormula: 'benzene',
    altName: 'Benzene',
    molecularWeight: 78.114,
  },
  id701: {
    chemicalFormula: 'nC7',
    altName: 'n-heptane',
    molecularWeight: 100.204,
  },
  id707: {
    chemicalFormula: 'cy-C7',
    altName: 'Cy-heptane',
    molecularWeight: 98.188,
  },
  id710: {
    chemicalFormula: 'toluene',
    altName: 'Toluene',
    molecularWeight: 92.141,
  },
  id801: {
    chemicalFormula: 'nC8',
    altName: 'n-octane',
    molecularWeight: 114.231,
  },
  id806: {
    chemicalFormula: 'cy-C8',
    altName: 'Cy-octane',
    molecularWeight: 112.215,
  },
  id809: {
    chemicalFormula: 'm-xylene',
    altName: 'M-xylene',
    molecularWeight: 106.167,
  },
  id901: {
    chemicalFormula: 'nC9',
    altName: 'n-nonane',
    molecularWeight: 128.258,
  },
  id1016: {
    chemicalFormula: 'nC10',
    altName: 'n-decane',
    molecularWeight: 142.285,
  },
}
