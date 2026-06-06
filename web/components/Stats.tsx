const STATS = [
  { value: '$2.4B', label: 'En contratos analizados' },
  { value: '+1.200', label: 'Propietarios activos' },
  { value: '24hs', label: 'Tiempo de respuesta' },
  { value: '90%', label: 'Adelanto sobre contrato' },
]

export default function Stats() {
  return (
    <div id="stats" className="stats-section">
      <div className="stats-grid">
        {STATS.map((s) => (
          <div key={s.label} className="stat-item">
            <div className="stat-value"><span>{s.value}</span></div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
