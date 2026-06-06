'use client'

import { useState } from 'react'

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="rco-nav">
      <a href="#" className="nav-logo">
        <div className="nav-logo-mark">RCO</div>
        <span className="nav-logo-text">Rental Cashflow</span>
      </a>

      <ul className="nav-links" style={mobileOpen ? {
        display: 'flex', flexDirection: 'column', position: 'fixed', top: '64px',
        left: 0, right: 0, background: 'rgba(10,22,40,0.98)', padding: '1.5rem 2rem',
        gap: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)',
      } : {}}>
        <li><a href="#como-funciona" onClick={() => setMobileOpen(false)}>Cómo funciona</a></li>
        <li><a href="#beneficios" onClick={() => setMobileOpen(false)}>Beneficios</a></li>
        <li><a href="#simulador" onClick={() => setMobileOpen(false)}>Simulador</a></li>
        <li>
          <a href="#formulario" className="nav-cta" onClick={() => setMobileOpen(false)}>
            Evaluar mi contrato
          </a>
        </li>
      </ul>

      <button
        className="hamburger"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Menú"
        style={{ background: 'none', border: 'none' }}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  )
}
