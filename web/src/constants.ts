export const AUTH_DISABLED = process.env.REACT_APP_AUTH !== '1'

export const authConfig = {
  clientId: process.env.REACT_APP_AUTH_CLIENT_ID || '',
  authorizationEndpoint: process.env.REACT_APP_AUTH_ENDPOINT || '',
  tokenEndpoint: process.env.REACT_APP_TOKEN_ENDPOINT || '',
  scope: process.env.REACT_APP_AUTH_SCOPE || '',
  redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI || '',
  logoutEndpoint: process.env.REACT_APP_LOGOUT_ENDPOINT || '',
}

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
