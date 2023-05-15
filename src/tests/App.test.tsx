import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from 'react'
import App from '../renderer/main'

describe('App', () => {
  it('should render', () => {
    const { getByText } = render(<App />)
    expect(getByText('Welcome to My App')).toBeInTheDocument()
  })
})
