import { render, screen } from '@testing-library/react'
import { Footer } from '.'

describe('Footer component', () => {
  it('fooder renders correctly', () => {
    render(<Footer />)

    expect(screen.getByText('the pragmatic')).toBeInTheDocument()
    expect(screen.getByText('2022 the pragmatic')).toBeInTheDocument()
  })
})