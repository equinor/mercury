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
  '3',
  '1',
  '2',
  '101',
  '201',
  '301',
  '401',
  '402',
  '503',
  '504',
  '605',
]

export const orderedComponents: Array<string> = [
  '5', // Mercury
  '4', // H2S
  '3', // Water
  '6', // MEG
  '31', // TEG
]

export const absoluteZero = -273
export const minTemperature = -60
export const maxTemperature = 70
export const minPressure = 0
export const maxPressure = 300
