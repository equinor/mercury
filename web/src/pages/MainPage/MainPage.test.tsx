import { render } from '@testing-library/react'
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
    getComponents: vi
      .fn()
      .mockResolvedValue({ components: mockComponentProperties }),
  },
  OpenAPI: {},
}))

// Mock AuthContext for Header
vi.mock('react-oauth2-code-pkce', () => ({
  AuthContext: React.createContext({
    token: 'mock-token',
    tokenData: { name: 'Mock User' },
    logOut: vi.fn(),
  }),
}))

test('renders without crashing', () => {
  const { container } = render(<MainPage />)

  expect(container).toBeInTheDocument()
})
