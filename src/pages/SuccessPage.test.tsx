import { describe, it, expect } from 'bun:test'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { SuccessPage } from './SuccessPage'

describe('SuccessPage', () => {
  it('should display the success message from state', () => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/success',
            state: { message: 'El proceso de eliminación para usuario@test.com ha sido iniciado.' },
          },
        ]}
      >
        <SuccessPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Solicitud procesada')).toBeTruthy()
    expect(
      screen.getByText('El proceso de eliminación para usuario@test.com ha sido iniciado.')
    ).toBeTruthy()
  })

  it('should show support contact message', () => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/success',
            state: { message: 'Test message' },
          },
        ]}
      >
        <SuccessPage />
      </MemoryRouter>
    )

    expect(screen.getByText(/contactar a nuestro equipo de soporte/i)).toBeTruthy()
  })

  it('should have a link to go back to home', () => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/success',
            state: { message: 'Test message' },
          },
        ]}
      >
        <SuccessPage />
      </MemoryRouter>
    )

    const backLink = screen.getByRole('link', { name: /volver al inicio/i })
    expect(backLink).toBeTruthy()
    expect(backLink.getAttribute('href')).toBe('/')
  })

  it('should redirect to home when message is missing', () => {
    render(
      <MemoryRouter initialEntries={['/success']}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </MemoryRouter>
    )

    // Should redirect to home
    expect(screen.getByText('Home Page')).toBeTruthy()
  })
})
