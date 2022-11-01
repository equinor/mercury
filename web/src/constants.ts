export const AUTH_DISABLED = process.env.REACT_APP_AUTH !== '1'

export const authConfig = {
  clientId: process.env.REACT_APP_AUTH_CLIENT_ID || '',
  authorizationEndpoint: process.env.REACT_APP_AUTH_ENDPOINT || '',
  tokenEndpoint: process.env.REACT_APP_TOKEN_ENDPOINT || '',
  scope: process.env.REACT_APP_AUTH_SCOPE || '',
  redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI || '',
  logoutEndpoint: process.env.REACT_APP_LOGOUT_ENDPOINT || '',
}

// Molecular weight of mercury
export const mercuryMolecularWeight = 200.59

// Approximate mole in 1 Sm3 (from ideal gas law with K = 288.15, P=1.01325)
export const molePerStandardCubicMeter = 42.29256

export const preSelectedComponents: Array<string> = [
  '5',
  '1',
  '2',
  '3',
  '101',
  '201',
  '301',
  '401',
  '402',
  '503',
  '504',
  '605',
]

export const demoFeedComponentRatios = {
  '3': '0.062202',
  '2': '0.0047',
  '1': '0.046539',
  '101': '0.65364',
  '201': '0.086307',
  '301': '0.045563',
  '401': '0.007579',
  '402': '0.015481',
  '503': '0.005188',
  '504': '0.00612',
  '605': '0.066681',
  '5': '0.001',
}

export const demoComponentInput = {
  '3': {
    altName: 'Water',
    chemicalFormula: 'H2O',
    value: 0.062202,
  },
  '2': {
    altName: 'Nitrogen',
    chemicalFormula: 'N2',
    value: 0.0047,
  },
  '1': {
    altName: 'Carbondioxide',
    chemicalFormula: 'CO2',
    value: 0.046539,
  },
  '101': {
    altName: 'Methane',
    chemicalFormula: 'CH4',
    value: 0.65364,
  },
  '201': {
    altName: 'Ethane',
    chemicalFormula: 'C2H6',
    value: 0.086307,
  },
  '301': {
    altName: 'Propane',
    chemicalFormula: 'nC3',
    value: 0.045563,
  },
  '401': {
    altName: 'i-Butane',
    chemicalFormula: 'iC4',
    value: 0.007579,
  },
  '402': {
    altName: 'n-Butane',
    chemicalFormula: 'nC4',
    value: 0.015481,
  },
  '503': {
    altName: 'i-Pentane',
    chemicalFormula: 'iC5',
    value: 0.005188,
  },
  '504': {
    altName: 'n-Pentane',
    chemicalFormula: 'nC5',
    value: 0.00612,
  },
  '605': {
    altName: 'n-Hexane',
    chemicalFormula: 'nC6',
    value: 0.066681,
  },
  '5': {
    altName: 'Mercury',
    chemicalFormula: 'Hg',
    value: 0.001,
  },
}

export const absoluteZero = -273
export const minTemperature = -60
export const maxTemperature = 70
export const minPressure = 0
export const maxPressure = 300
