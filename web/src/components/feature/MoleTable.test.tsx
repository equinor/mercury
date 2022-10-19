import { render, screen } from '@testing-library/react'
import { MoleTable } from './MoleTable'
import '@testing-library/jest-dom/extend-expect'
import {
  mockComponentNames,
  mockComponentRatios,
  mockMultiflashResponse,
} from '../../setupTests'

test('renders without crashing and displaying correct values in table', async () => {
  render(
    <MoleTable
      componentNames={mockComponentNames}
      multiFlashResponse={mockMultiflashResponse}
      componentRatios={mockComponentRatios}
    />
  )
  // @ts-ignore because not able to get eslint to discover these types
  expect(screen.getByTestId('Vapor-0')).toHaveTextContent('0.049')
  // @ts-ignore because not able to get eslint to discover these types
  expect(screen.getByTestId('Mercury-7')).toHaveTextContent('1.50E-24')
})
