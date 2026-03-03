import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { FeedFlowInput } from './FeedFlowInput'

function renderFeedFlowInput(overrides?: { cubicFeedFlow?: number; molecularWeightSum?: number }) {
  const props = {
    cubicFeedFlow: overrides?.cubicFeedFlow ?? 1000,
    setCubicFeedFlow: vi.fn(),
    molecularWeightSum: overrides?.molecularWeightSum,
  }
  render(<FeedFlowInput {...props} />)
  const input = screen.getByRole('textbox')
  return { input, ...props }
}

function typeInto(input: HTMLElement, value: string) {
  fireEvent.change(input, { target: { value } })
}

describe('FeedFlowInput', () => {
  test('renders with default value', () => {
    const { input } = renderFeedFlowInput()
    expect(input).toHaveValue('1000')
  })

  test('accepts decimal input', () => {
    const { input, setCubicFeedFlow } = renderFeedFlowInput()
    typeInto(input, '1.5')
    expect(input).toHaveValue('1.5')
    expect(setCubicFeedFlow).toHaveBeenCalledWith(1.5)
  })

  test('preserves trailing decimal point while typing', () => {
    const { input } = renderFeedFlowInput()
    typeInto(input, '1.')
    expect(input).toHaveValue('1.')
  })

  test('accepts exponential notation', () => {
    const { input, setCubicFeedFlow } = renderFeedFlowInput()
    typeInto(input, '1e3')
    expect(input).toHaveValue('1e3')
    expect(setCubicFeedFlow).toHaveBeenCalledWith(1000)
  })

  test('preserves intermediate exponential input', () => {
    const { input, setCubicFeedFlow } = renderFeedFlowInput()
    typeInto(input, '1e')
    expect(input).toHaveValue('1e')
    // Should not call setCubicFeedFlow with NaN
    expect(setCubicFeedFlow).not.toHaveBeenCalled()
  })

  test('reverts to last valid value on blur when input is invalid', () => {
    const { input } = renderFeedFlowInput({ cubicFeedFlow: 500 })
    typeInto(input, '1e')
    fireEvent.blur(input)
    expect(input).toHaveValue('500')
  })

  test('formats value on blur for valid input', () => {
    const { input } = renderFeedFlowInput()
    typeInto(input, '1.50')
    fireEvent.blur(input)
    expect(input).toHaveValue('1.5')
  })

  test('does not call setCubicFeedFlow for empty input', () => {
    const { input, setCubicFeedFlow } = renderFeedFlowInput()
    typeInto(input, '')
    expect(setCubicFeedFlow).not.toHaveBeenCalled()
  })

  test('reverts to last valid value on blur when input is empty', () => {
    const { input } = renderFeedFlowInput({ cubicFeedFlow: 1000 })
    typeInto(input, '')
    fireEvent.blur(input)
    expect(input).toHaveValue('1000')
  })
})
