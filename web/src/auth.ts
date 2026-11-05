import type { TAuthConfig } from 'react-oauth2-code-pkce'

export const authConfig: TAuthConfig = {
  clientId: import.meta.env.VITE_AUTH_CLIENT_ID || '',
  authorizationEndpoint: import.meta.env.VITE_AUTH_ENDPOINT || '',
  tokenEndpoint: import.meta.env.VITE_TOKEN_ENDPOINT || '',
  scope: import.meta.env.VITE_AUTH_SCOPE || '',
  redirectUri: window.origin,
  autoLogin: false,
  onRefreshTokenExpire: (event) => {
    const agreeToLogin = window.confirm(
      'Session expired. Press OK to log in again, or Cancel to manually log in. ' +
        'Note that the application will not function until you log in again.'
    )
    if (agreeToLogin) {
      event.logIn()
    }
  },
}
