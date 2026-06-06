'use client'

import { useState, useCallback } from 'react'

const ADVANCE_RATE = 0.90

function fmt(n: number, prefix: string): string {
  return prefix + Math.round(n).toLocaleString('es-AR')
}

export default function Simulator() {
  const [alquiler, setAlquiler] = useState(150000)
  const [meses, setMeses] = useState(18)
  const [moneda, setMoneda] = useState<'ARS' | 'USD'>('ARS')

  const prefix = moneda === 'USD' ? 'U$S ' : '$'
  const flujoTotal = alquiler * meses
  const adelanto = flujoTotal * ADVANCE_RATE
  const cuotasLabel = meses === 1 ? '1 cuota' : `${meses} cuotas`

  return (
    <section id="simulador" className="rco-section simulator-section">
      <div className="section-inner">
        <div className="simulator-wrapper">
          <div className="section-eyebrow">Simulador</div>
          <h2 className="section-title">Calculá tu adelanto estimado</h2>
          <p className="section-subtitle">
            Ingresá los datos de tu contrato y obtené una estimación inmediata de lo que podrías recibir.
          </p>
          <div className="simulator-card">
            <div className="sim-grid">
              <div className="sim-field">
                <label htmlFor="sim-alquiler">Alquiler mensual</label>
                <div className="sim-input-wrap">
                  <span className="sim-prefix">$</span>
                  <input
                    id="sim-alquiler"
                    type="number"
                    className="sim-input"
                    placeholder="150.000"
                    value={alquiler}
                    onChange={(e) => setAlquiler(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
              <div className="sim-field">
                <label htmlFor="sim-moneda">Moneda</label>
                <select
                  id="sim-moneda"
                  className="sim-input sim-input-no-prefix"
                  value={moneda}
                  onChange={(e) => setMoneda(e.target.value as 'ARS' | 'USD')}
                >
                  <option value="ARS">ARS – Pesos ajustados por IPC</option>
                  <option value="USD">USD – Dólares</option>
                </select>
              </div>
              <div className="sim-field" style={{ gridColumn: '1 / -1' }}>
                <label>
                  Meses restantes del contrato: <strong>{meses}</strong>
                </label>
                <div className="sim-slider-wrap">
                  <input
                    type="range"
                    className="sim-slider"
                    min={1}
                    max={48}
                    step={1}
                    value={meses}
                    onChange={(e) => setMeses(parseInt(e.target.value))}
                  />
                  <div className="sim-slider-labels">
                    <span>1 mes</span>
                    <span>12 meses</span>
                    <span>24 meses</span>
                    <span>36 meses</span>
                    <span>48 meses</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="sim-results">
              <div className="sim-result-item">
                <div className="sim-result-label">Flujo total esperado</div>
                <div className="sim-result-value secondary">{fmt(flujoTotal, prefix)}</div>
                <div className="sim-result-note">{cuotasLabel} × {fmt(alquiler, prefix)}</div>
              </div>
              <div className="sim-results-divider" />
              <div className="sim-result-item">
                <div className="sim-result-label">Adelanto estimado (90%)</div>
                <div className="sim-result-value">{fmt(adelanto, prefix)}</div>
                <div className="sim-result-note">Sujeto a evaluación del contrato</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
