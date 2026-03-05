import { render, screen, waitFor } from '@testing-library/react'
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
    expect(screen.getByText('Your session may have expired.')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', { name: 'Log in again' })).toBeInTheDocument()
})
