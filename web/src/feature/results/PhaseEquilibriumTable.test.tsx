import { render, screen } from '@testing-library/react'
import { PhaseEquilibriumTable } from './PhaseEquilibriumTable'
import '@testing-library/jest-dom/extend-expect'
import { mockComponentProperties, mockResults } from '../../setupTests'

test('renders without crashing and displaying correct values in table', async () => {
  render(
    <PhaseEquilibriumTable
      componentProperties={mockComponentProperties}
      results={mockResults}
    />
  )
  // @ts-ignore because not able to get eslint to discover these types
  expect(screen.getByTestId('1-Vapor (mol)-0')).toHaveTextContent('0.049')
  // @ts-ignore because not able to get eslint to discover these types
  expect(screen.getByTestId('1-Mercury (mol)-7')).toHaveTextContent('1.50E-24')
})
