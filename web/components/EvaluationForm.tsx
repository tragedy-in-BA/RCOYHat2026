'use client'

import { useState, useRef, DragEvent, ChangeEvent } from 'react'

type TipoInmueble = 'departamento' | 'casa' | 'local' | 'oficina'
type Moneda = 'ARS' | 'USD'
type Garantia = 'propietario' | 'caucion' | 'recibo' | 'aval' | 'deposito'

interface FormState {
  nombre: string
  email: string
  telefono: string
  direccion: string
  ciudad: string
  tipo_inmueble: TipoInmueble
  valor_mensual: string
  moneda: Moneda
  fecha_inicio: string
  fecha_fin: string
  meses_restantes: string
  garantia: Garantia | ''
  caucion: boolean
}

interface FileState {
  contrato: File | null
  dni: File | null
}

interface Errors {
  [key: string]: string
}

function UploadZone({
  id,
  file,
  accept,
  hint,
  icon,
  label,
  onChange,
}: {
  id: string
  file: File | null
  accept: string
  hint: string
  icon: string
  label: string
  onChange: (f: File) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) onChange(f)
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) onChange(f)
  }

  return (
    <div
      className={`upload-zone ${dragging ? 'dragover' : ''}`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      style={file ? { borderColor: 'var(--green)', background: 'rgba(16,185,129,0.03)' } : {}}
    >
      <input ref={inputRef} type="file" accept={accept} onChange={handleChange} />
      <div className="upload-icon">{icon}</div>
      <div className="upload-text"><strong>Seleccioná el archivo</strong> o arrastrá aquí</div>
      <div className="upload-hint">{hint}</div>
      {file && <div className="upload-name">✓ {file.name}</div>}
    </div>
  )
}


export default function EvaluationForm() {
  const [form, setForm] = useState<FormState>({
    nombre: '', email: '', telefono: '', direccion: '', ciudad: '',
    tipo_inmueble: 'departamento', valor_mensual: '', moneda: 'ARS',
    fecha_inicio: '', fecha_fin: '', meses_restantes: '', garantia: '',
    caucion: false,
  })
  const [files, setFiles] = useState<FileState>({ contrato: null, dni: null })
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  function set(field: keyof FormState, value: string | boolean | TipoInmueble | Moneda | Garantia) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => { const e = { ...prev }; delete e[field]; return e })
  }

  function validate(): boolean {
    const e: Errors = {}
    if (!form.nombre.trim()) e.nombre = 'Campo requerido'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido'
    if (!form.telefono.trim()) e.telefono = 'Campo requerido'
    if (!form.direccion.trim()) e.direccion = 'Campo requerido'
    if (!form.ciudad.trim()) e.ciudad = 'Campo requerido'
    if (!form.valor_mensual || parseFloat(form.valor_mensual) <= 0) e.valor_mensual = 'Debe ser mayor a 0'
    if (!form.fecha_inicio) e.fecha_inicio = 'Campo requerido'
    if (!form.fecha_fin) e.fecha_fin = 'Campo requerido'
    if (!form.garantia) e.garantia = 'Campo requerido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)

    const payload = {
      nombre: form.nombre,
      email: form.email,
      telefono: form.telefono,
      direccion: form.direccion,
      ciudad: form.ciudad,
      tipo_inmueble: form.tipo_inmueble,
      valor_mensual: parseFloat(form.valor_mensual),
      moneda: form.moneda,
      fecha_inicio: form.fecha_inicio,
      fecha_fin: form.fecha_fin,
      meses_restantes: form.meses_restantes ? parseInt(form.meses_restantes) : undefined,
      garantia: form.garantia,
      caucion: form.caucion ? 'si' : 'no',
    }

    try {
      await fetch('/api/evaluations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch {}

    setSubmitting(false)
    setSuccess(true)
  }

  if (success) {
    return (
      <section id="formulario" className="rco-section form-section-wrapper">
        <div className="section-inner">
          <div className="form-wrapper">
            <div className="form-card">
              <div className="success-screen">
                <div className="success-icon">✓</div>
                <h3 className="success-title">¡Solicitud recibida con éxito!</h3>
                <p className="success-msg">
                  Hemos recibido tu contrato. Nuestro motor de análisis comenzará la validación automáticamente.
                  Te contactaremos con una propuesta preliminar dentro de las próximas <strong>24 horas</strong>.
                </p>
                <div className="success-steps">
                  {['Validación del contrato', 'Análisis de riesgo', 'Oferta personalizada'].map((s, i) => (
                    <div key={s} className="success-step">
                      <div className="success-step-num">{i + 1}</div>
                      {s}
                    </div>
                  ))}
                </div>
                <a href="#hero" className="btn-primary" style={{ display: 'inline-flex', margin: '0 auto', background: 'var(--navy)' }}>
                  Volver al inicio
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="formulario" className="rco-section form-section-wrapper">
      <div className="section-inner">
        <div className="form-wrapper">
          <div className="section-eyebrow">Solicitud</div>
          <h2 className="section-title">Solicitá una evaluación gratuita</h2>
          <p className="section-subtitle">
            Completá el formulario y nuestro equipo te contactará con una propuesta preliminar en menos de 24 horas.
          </p>

          <div className="form-card">
            <form onSubmit={handleSubmit} noValidate>

              {/* PROPIETARIO */}
              <div className="form-section">
                <div className="form-section-title">01 / Datos del propietario</div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Nombre completo <span className="req">*</span></label>
                    <input className={`form-input ${errors.nombre ? 'error' : ''}`} placeholder="Juan García" value={form.nombre} onChange={(e) => set('nombre', e.target.value)} />
                    {errors.nombre && <span className="form-error">{errors.nombre}</span>}
                  </div>
                  <div className="form-group">
                    <label>Email <span className="req">*</span></label>
                    <input type="email" className={`form-input ${errors.email ? 'error' : ''}`} placeholder="juan@email.com" value={form.email} onChange={(e) => set('email', e.target.value)} />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>
                <div className="form-row single">
                  <div className="form-group">
                    <label>Teléfono <span className="req">*</span></label>
                    <input className={`form-input ${errors.telefono ? 'error' : ''}`} placeholder="+54 9 11 XXXX XXXX" value={form.telefono} onChange={(e) => set('telefono', e.target.value)} />
                    {errors.telefono && <span className="form-error">{errors.telefono}</span>}
                  </div>
                </div>
              </div>

              {/* INMUEBLE */}
              <div className="form-section">
                <div className="form-section-title">02 / Datos del inmueble</div>
                <div className="form-row single">
                  <div className="form-group">
                    <label>Dirección del inmueble <span className="req">*</span></label>
                    <input className={`form-input ${errors.direccion ? 'error' : ''}`} placeholder="Av. Corrientes 1234, CABA" value={form.direccion} onChange={(e) => set('direccion', e.target.value)} />
                    {errors.direccion && <span className="form-error">{errors.direccion}</span>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Barrio <span className="req">*</span></label>
                    <input className={`form-input ${errors.ciudad ? 'error' : ''}`} placeholder="Palermo, Recoleta…" value={form.ciudad} onChange={(e) => set('ciudad', e.target.value)} />
                    {errors.ciudad && <span className="form-error">{errors.ciudad}</span>}
                  </div>
                  <div className="form-group">
                    <label>Tipo de inmueble <span className="req">*</span></label>
                    <div className="radio-group">
                      {(['departamento', 'casa', 'local', 'oficina'] as TipoInmueble[]).map((t) => (
                        <button key={t} type="button" className={`radio-btn ${form.tipo_inmueble === t ? 'active' : ''}`} onClick={() => set('tipo_inmueble', t)}>
                          {t === 'local' ? 'Local comercial' : t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Valor mensual del alquiler <span className="req">*</span></label>
                    <input type="number" className={`form-input ${errors.valor_mensual ? 'error' : ''}`} placeholder="150.000" value={form.valor_mensual} onChange={(e) => set('valor_mensual', e.target.value)} />
                    {errors.valor_mensual && <span className="form-error">{errors.valor_mensual}</span>}
                  </div>
                  <div className="form-group">
                    <label>Moneda <span className="req">*</span></label>
                    <div className="radio-group">
                      {(['ARS', 'USD'] as Moneda[]).map((m) => (
                        <button key={m} type="button" className={`radio-btn ${form.moneda === m ? 'active' : ''}`} onClick={() => set('moneda', m)}>{m}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CONTRATO */}
              <div className="form-section">
                <div className="form-section-title">03 / Datos del contrato</div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Fecha de inicio <span className="req">*</span></label>
                    <input type="date" className={`form-input ${errors.fecha_inicio ? 'error' : ''}`} value={form.fecha_inicio} onChange={(e) => set('fecha_inicio', e.target.value)} />
                    {errors.fecha_inicio && <span className="form-error">{errors.fecha_inicio}</span>}
                  </div>
                  <div className="form-group">
                    <label>Fecha de finalización <span className="req">*</span></label>
                    <input type="date" className={`form-input ${errors.fecha_fin ? 'error' : ''}`} value={form.fecha_fin} onChange={(e) => set('fecha_fin', e.target.value)} />
                    {errors.fecha_fin && <span className="form-error">{errors.fecha_fin}</span>}
                  </div>
                </div>
                <div className="form-row triple">
                  <div className="form-group">
                    <label>Meses restantes</label>
                    <input type="number" className="form-input" placeholder="18" min={1} max={120} value={form.meses_restantes} onChange={(e) => set('meses_restantes', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Tipo de garantía <span className="req">*</span></label>
                    <select className={`form-select ${errors.garantia ? 'error' : ''}`} value={form.garantia} onChange={(e) => set('garantia', e.target.value as Garantia)}>
                      <option value="">Seleccionar…</option>
                      <option value="propietario">Propietario garante</option>
                      <option value="caucion">Seguro de caución</option>
                      <option value="recibo">Recibo de sueldo</option>
                      <option value="aval">Aval bancario</option>
                      <option value="deposito">Depósito en garantía</option>
                    </select>
                    {errors.garantia && <span className="form-error">{errors.garantia}</span>}
                  </div>
                  <div className="form-group">
                    <label>Seguro de caución</label>
                    <div className="toggle-wrap" style={{ marginTop: 8 }}>
                      <div className={`toggle ${form.caucion ? 'on' : ''}`} onClick={() => set('caucion', !form.caucion)}>
                        <div className="toggle-thumb" />
                      </div>
                      <span className="toggle-label">{form.caucion ? 'Sí' : 'No'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ARCHIVOS */}
              <div className="form-section">
                <div className="form-section-title">04 / Documentación</div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Contrato de alquiler (PDF) <span className="req">*</span></label>
                    <UploadZone id="contrato" file={files.contrato} accept=".pdf" hint="PDF · Máximo 10 MB" icon="📄" label="contrato" onChange={(f) => setFiles((p) => ({ ...p, contrato: f }))} />
                  </div>
                  <div className="form-group">
                    <label>DNI del propietario <span className="req">*</span></label>
                    <UploadZone id="dni" file={files.dni} accept=".pdf,.jpg,.jpeg,.png" hint="PDF o imagen · Máximo 5 MB" icon="🪪" label="dni" onChange={(f) => setFiles((p) => ({ ...p, dni: f }))} />
                  </div>
                </div>
              </div>

              <button type="submit" className="form-submit-btn" disabled={submitting}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 2 11 13M22 2 15 22 11 13 2 9l20-7z" />
                </svg>
                {submitting ? '⏳ Enviando…' : 'Enviar para evaluación'}
              </button>
              <p className="form-disclaimer">
                Al enviar este formulario aceptás que RCO procese tus datos personales según nuestra{' '}
                <a href="#" style={{ color: 'var(--blue)' }}>Política de Privacidad</a>.
                La evaluación es gratuita y no genera ningún compromiso.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
