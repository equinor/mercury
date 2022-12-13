import { TRefreshTokenExpiredEvent } from 'react-oauth2-code-pkce'
export const AUTH_DISABLED = process.env.REACT_APP_AUTH !== '1'

export const authConfig = {
  clientId: '0cd10735-a40c-4ff6-84c8-74e3b54ed93f',
  authorizationEndpoint:
    'https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0/oauth2/v2.0/authorize',
  tokenEndpoint:
    'https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0/oauth2/v2.0/token',
  scope: 'api://0cd10735-a40c-4ff6-84c8-74e3b54ed93f/All',
  redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI || '',
  onRefreshTokenExpire: (event: TRefreshTokenExpiredEvent) =>
    window.confirm(
      'Session expired. Refresh page to continue using the site?'
    ) && event.login(),
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
