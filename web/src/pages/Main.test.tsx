import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MainPage } from './Main'
import MercuryAPI from '../api/MercuryAPI'
import { AxiosResponse } from 'axios'
import { mockComponentResponse, mockMultiflashResponse } from '../setupTests'

test('renders without crashing and calculate run populates tables', async () => {
  const mockMercuryApi = new MercuryAPI()

  mockMercuryApi.getComponents = jest.fn(() => {
    return Promise.resolve({ data: mockComponentResponse } as AxiosResponse)
  })

  mockMercuryApi.computeMultiflash = jest.fn(() => {
    return Promise.resolve({ data: mockMultiflashResponse } as AxiosResponse)
  })

  render(<MainPage mercuryApi={mockMercuryApi} />)
  fireEvent.click(await screen.findByTestId('computeMf'))

  // @ts-ignore because not able to get eslint to discover these types
  expect(await screen.findByTestId('Phases-0')).toHaveTextContent('Vapor')
  // @ts-ignore because not able to get eslint to discover these types
  expect(await screen.findByTestId('Mole Concentration-2')).toHaveTextContent(
    '1.000'
  )
  // @ts-ignore because not able to get eslint to discover these types
  expect(await screen.findByTestId('Components-3')).toHaveTextContent('Mercury')
  // @ts-ignore because not able to get eslint to discover these types
  expect(await screen.findByTestId('Vapor-3')).toHaveTextContent('1.13E-6')
})
