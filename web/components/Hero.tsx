export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-grid-bg" />
      <div className="hero-glow" />
      <div className="hero-glow-green" />
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            Financiamiento alternativo para propietarios
          </div>
          <h1 className="hero-title">
            Convertí tus alquileres futuros en<br />
            <span>liquidez hoy.</span>
          </h1>
          <p className="hero-subtitle">
            Recibí hasta el 90% del valor de tu contrato de alquiler por adelantado sin vender tu propiedad.
          </p>
          <div className="hero-actions">
            <a href="#formulario" className="btn-primary">
              Evaluar mi contrato
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </a>
            <a href="#simulador" className="btn-secondary">Ver simulador</a>
          </div>
          <div className="hero-trust">
            {['Sin vender la propiedad', 'Evaluación en 24hs', 'Sin trámites bancarios'].map((text) => (
              <div key={text} className="trust-item">
                <div className="trust-check">
                  <svg fill="none" stroke="#10b981" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {text}
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="flow-diagram">
            <div className="flow-title">// flujo de fondos</div>
            <div className="flow-steps">
              <div className="flow-node">
                <div className="flow-node-icon blue">🏠</div>
                <div className="flow-node-info">
                  <div className="flow-node-label">Propietario</div>
                  <div className="flow-node-sub">Tiene contrato vigente</div>
                </div>
                <div className="flow-node-amount neutral">ARS</div>
              </div>
              <div className="flow-connector"><div className="flow-connector-line" /></div>
              <div className="flow-node">
                <div className="flow-node-icon purple">📄</div>
                <div className="flow-node-info">
                  <div className="flow-node-label">Contrato de Alquiler</div>
                  <div className="flow-node-sub">Flujos futuros cedidos</div>
                </div>
                <div className="flow-node-amount neutral">24 meses</div>
              </div>
              <div className="flow-connector"><div className="flow-connector-line" /></div>
              <div className="flow-node">
                <div className="flow-node-icon green">⚡</div>
                <div className="flow-node-info">
                  <div className="flow-node-label">Liquidez Inmediata</div>
                  <div className="flow-node-sub">Fondos en tu cuenta</div>
                </div>
                <div className="flow-node-amount positive">+90%</div>
              </div>
            </div>
            <div className="flow-metric-row">
              <div className="flow-metric">
                <div className="flow-metric-val">24hs</div>
                <div className="flow-metric-key">Tiempo de respuesta</div>
              </div>
              <div className="flow-metric">
                <div className="flow-metric-val">90%</div>
                <div className="flow-metric-key">Adelanto máximo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
