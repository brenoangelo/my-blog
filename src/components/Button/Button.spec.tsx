import { render, screen } from '@testing-library/react'
import { Button } from '.'

describe('Button component', () => {
  it('renders correctly', () => {
    render(<Button text='Ler mais'/>)

    expect(screen.getByText('Ler mais'))
  })
})