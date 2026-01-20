import { describe, it, expect } from 'bun:test'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CheckEmailPage } from './CheckEmailPage'

describe('CheckEmailPage', () => {
  it('should render the check email message', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/check-email', state: { email: 'test@example.com' } }]}>
        <CheckEmailPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Revisa tu correo electrónico')).toBeTruthy()
    expect(screen.getByText('Hemos enviado un enlace de verificación a:')).toBeTruthy()
  })

  it('should display the email address from state', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/check-email', state: { email: 'user@pistis.com' } }]}>
        <CheckEmailPage />
      </MemoryRouter>
    )

    expect(screen.getByText('user@pistis.com')).toBeTruthy()
  })

  it('should show spam folder reminder', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/check-email', state: { email: 'test@example.com' } }]}>
        <CheckEmailPage />
      </MemoryRouter>
    )

    expect(screen.getByText(/revisa tu carpeta de spam/i)).toBeTruthy()
  })

  it('should have a link to go back to home', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/check-email', state: { email: 'test@example.com' } }]}>
        <CheckEmailPage />
      </MemoryRouter>
    )

    const backLink = screen.getByRole('link', { name: /volver al inicio/i })
    expect(backLink).toBeTruthy()
    expect(backLink.getAttribute('href')).toBe('/')
  })
})
