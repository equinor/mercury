import { render, screen } from '@testing-library/react'
import { PhaseTable } from './PhaseTable'
import '@testing-library/jest-dom/extend-expect'
import { MultiflashResponse } from '../../api/generated'

const multiflashResult: MultiflashResponse = {
  phaseValues: {
    Vapor: { percentage: 0.9989992588, mercury: 104.82781237 },
    Mercury: { percentage: 0.0010007412, mercury: 1000000000.0 },
  },
  componentFractions: {
    2: [0.01693, 0.000000000000000000000003431],
    1: [0.05399, 0.000000000000000000000006807],
    101: [0.8563, 0.0000000000000000000001379],
    201: [0.04577, 0.00000000000000000000000481],
    301: [0.01763, 0.000000000000000000000001301],
    401: [0.002424, 0.0000000000000000000000001389],
    402: [0.004378, 0.0000000000000000000000002324],
    503: [0.001212, 0.00000000000000000000000005006],
    504: [0.001102, 0.00000000000000000000000004238],
    608: [0.0001473, 0.000000000000000000000000005109],
    710: [0.00008415, 0.000000000000000000000000002175],
    809: [0.00002304, 0.000000000000000000000000000433],
    5: [0.00000001236, 1.0],
  },
  feedMolecularWeight: 5,
}

const cubicFeedFlow = 1000

test('renders without crashing and displaying correct values in table', async () => {
  render(
    <PhaseTable
      multiFlashResponse={multiflashResult}
      cubicFeedFlow={cubicFeedFlow}
    />
  )
  // @ts-ignore because not able to get eslint to discover these types
  expect(screen.getByTestId('Mass Concentration-0')).toHaveTextContent(
    '104.82781237'
  )
  // @ts-ignore because not able to get eslint to discover these types
  expect(screen.getByTestId('Mole Concentration-1')).toHaveTextContent('1')
  // @ts-ignore because not able to get eslint to discover these types
  expect(screen.getByTestId('Phases-0')).toHaveTextContent('Vapor')
})
