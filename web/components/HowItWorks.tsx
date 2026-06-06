const STEPS = [
  {
    num: '01',
    title: 'Subí tu contrato de alquiler',
    desc: 'Cargá el PDF de tu contrato vigente y completá el formulario con los datos del inmueble en pocos minutos.',
    delay: '',
  },
  {
    num: '02',
    title: 'Análisis automático',
    desc: 'Nuestro motor de análisis basado en IA procesa automáticamente la información del contrato y valida los datos ingresados.',
    delay: 'fade-up-delay-1',
  },
  {
    num: '03',
    title: 'Recibís una oferta',
    desc: 'En menos de 24 horas, te presentamos una propuesta personalizada con el adelanto estimado y las condiciones de la operación.',
    delay: 'fade-up-delay-2',
  },
  {
    num: '04',
    title: 'Aceptás y recibís el dinero',
    desc: 'Confirmás la propuesta, firmás digitalmente y el dinero se acredita directamente en tu cuenta bancaria.',
    delay: 'fade-up-delay-3',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="rco-section how-section">
      <div className="section-inner">
        <div className="section-eyebrow">Proceso</div>
        <h2 className="section-title">Cómo funciona</h2>
        <p className="section-subtitle">
          Un proceso simple y digital, diseñado para que obtengas tu adelanto de fondos con el mínimo esfuerzo.
        </p>
        <div className="steps-grid">
          {STEPS.map((s) => (
            <div key={s.num} className={`step-card fade-up ${s.delay}`}>
              <div className="step-num">{s.num}</div>
              <div className="step-title">{s.title}</div>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
