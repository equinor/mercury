import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { vi } from 'vitest'
import { mockComponentProperties } from '../../setupTests'
import { MainPage } from './MainPage'

// Mock the AppInsights context
vi.mock('@microsoft/applicationinsights-react-js', () => ({
  useAppInsightsContext: () => ({
    trackEvent: vi.fn(),
  }),
  AppInsightsContext: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock the API
vi.mock('../../api/generated', () => ({
  ComponentService: {
    getComponents: vi.fn().mockResolvedValue({ components: mockComponentProperties }),
  },
}))

// Mock AuthContext for Header
vi.mock('react-oauth2-code-pkce', () => ({
  AuthContext: React.createContext({
    token: 'mock-token',
    tokenData: { name: 'Mock User' },
    logOut: vi.fn(),
    logIn: vi.fn(),
  }),
}))

test('renders without crashing', () => {
  const { container } = render(<MainPage />)

  expect(container).toBeInTheDocument()
})

test('shows error with retry button when fetch fails', async () => {
  const { ComponentService } = await import('../../api/generated')
  vi.mocked(ComponentService.getComponents).mockRejectedValueOnce(new Error('Network error'))

  render(<MainPage />)

  await waitFor(() => {
    expect(screen.getByText('Failed to fetch list of components')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument()
})

test('shows login button when receiving 401 unauthorized', async () => {
  const { ComponentService } = await import('../../api/generated')
  const error = new Error('Unauthorized')
  Object.assign(error, { status: 401 })
  vi.mocked(ComponentService.getComponents).mockRejectedValueOnce(error)

  render(<MainPage />)

  await waitFor(() => {
    expect(screen.getByText('Your session has expired.')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: 'Log in again' })).toBeInTheDocument()
})

test('clicking Log in again triggers login flow', async () => {
  const user = userEvent.setup()
  const mockLogIn = vi.fn()
  const { AuthContext } = await import('react-oauth2-code-pkce')

  const { ComponentService } = await import('../../api/generated')
  const error = new Error('Unauthorized')
  Object.assign(error, { status: 401 })
  vi.mocked(ComponentService.getComponents).mockRejectedValueOnce(error)

  render(
    <AuthContext.Provider
      value={
        {
          token: 'mock-token',
          tokenData: { name: 'Mock User' },
          logOut: vi.fn(),
          logIn: mockLogIn,
        } as unknown as React.ContextType<typeof AuthContext>
      }
    >
      <MainPage />
    </AuthContext.Provider>
  )

  await waitFor(() => {
    expect(screen.getByRole('button', { name: 'Log in again' })).toBeInTheDocument()
  })

  await user.click(screen.getByRole('button', { name: 'Log in again' }))

  expect(mockLogIn).toHaveBeenCalledTimes(1)
})
