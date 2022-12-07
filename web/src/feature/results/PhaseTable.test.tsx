import { render, screen } from '@testing-library/react'
import { PhaseTable } from './PhaseTable'
import '@testing-library/jest-dom/extend-expect'
import { mockResults } from '../../setupTests'

test('renders without crashing and displaying correct values in table', async () => {
  render(<PhaseTable results={mockResults} />)
  // @ts-ignore because not able to get eslint to discover these types
  expect(screen.getByTestId('0-Vapor-0')).toHaveTextContent('9577 μg/Sm3')
  // @ts-ignore because not able to get eslint to discover these types
  expect(screen.getByTestId('0-Mercury-1')).toHaveTextContent('1')
  // @ts-ignore because not able to get eslint to discover these types
  expect(screen.getByTestId('0-Aqueous-2')).toHaveTextContent('0.001504 g/d')
})
