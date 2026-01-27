import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { mockResults } from '../../setupTests'
import { HgDistributionTable } from './HgDistributionTable'

test('renders without crashing and displaying correct values in table', async () => {
  render(<HgDistributionTable results={mockResults} />)
  expect(screen.getByTestId('0-Vapor-0')).toHaveTextContent('9577 μg/Sm3')
  expect(screen.getByTestId('0-Mercury-1')).toHaveTextContent('1')
  expect(screen.getByTestId('0-Aqueous-2')).toHaveTextContent('0.001504 g/d')
})
