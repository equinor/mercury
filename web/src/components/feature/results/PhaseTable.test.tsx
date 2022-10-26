import { render, screen } from '@testing-library/react'
import { PhaseTable } from './PhaseTable'
import '@testing-library/jest-dom/extend-expect'
import { mockMultiflashResponse } from '../../../setupTests'

test('renders without crashing and displaying correct values in table', async () => {
  render(
    <PhaseTable
      multiFlashResponse={mockMultiflashResponse}
      cubicFeedFlow={1000}
    />
  )
  // @ts-ignore because not able to get eslint to discover these types
  expect(screen.getByTestId('Concentration (μg)-0')).toHaveTextContent('9577')
  // @ts-ignore because not able to get eslint to discover these types
  expect(screen.getByTestId('Concentration (mol)-2')).toHaveTextContent('1')
  // @ts-ignore because not able to get eslint to discover these types
  expect(screen.getByTestId('Phases-0')).toHaveTextContent('Vapor')
})
