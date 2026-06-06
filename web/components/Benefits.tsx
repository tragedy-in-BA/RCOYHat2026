const BENEFITS = [
  {
    icon: '⚡',
    title: 'Liquidez inmediata',
    desc: 'Accedé a tus fondos en horas, no en meses. Convertí los flujos futuros de tu contrato en efectivo disponible hoy.',
    delay: '',
  },
  {
    icon: '🏠',
    title: 'Sin vender la propiedad',
    desc: 'Mantenés la titularidad de tu inmueble. Solo cedés temporalmente los flujos de tu contrato de alquiler vigente.',
    delay: 'fade-up-delay-1',
  },
  {
    icon: '🏦',
    title: 'Sin trámites bancarios',
    desc: 'Sin scoring crediticio, sin garantías adicionales, sin burocracia bancaria. El contrato de alquiler es el respaldo suficiente.',
    delay: 'fade-up-delay-2',
  },
  {
    icon: '🤖',
    title: 'Evaluación rápida con IA',
    desc: 'Nuestro motor de análisis automático procesa tu contrato y valida la información en minutos, sin esperas ni intermediarios.',
    delay: 'fade-up-delay-1',
  },
  {
    icon: '📅',
    title: 'Cobro anticipado de rentas',
    desc: 'Recibís ahora el valor de los próximos meses de alquiler. Ideal para reinversión, refacciones o necesidades financieras urgentes.',
    delay: 'fade-up-delay-2',
  },
  {
    icon: '🔒',
    title: 'Seguro y transparente',
    desc: 'Operamos con contrato legal, condiciones claras y sin sorpresas. Toda la documentación queda firmada digitalmente.',
    delay: 'fade-up-delay-3',
  },
]

export default function Benefits() {
  return (
    <section id="beneficios" className="rco-section benefits-section">
      <div className="benefits-bg" />
      <div className="section-inner benefits-inner">
        <div className="section-eyebrow">Ventajas</div>
        <h2 className="section-title">Por qué elegir RCO</h2>
        <p className="section-subtitle">
          Una solución financiera diseñada específicamente para propietarios que necesitan liquidez sin comprometer su patrimonio.
        </p>
        <div className="benefits-grid">
          {BENEFITS.map((b) => (
            <div key={b.title} className={`benefit-card fade-up ${b.delay}`}>
              <div className="benefit-icon">{b.icon}</div>
              <div className="benefit-title">{b.title}</div>
              <p className="benefit-desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
