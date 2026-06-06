export default function Footer() {
  return (
    <footer className="rco-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-brand-name">
              <div className="nav-logo-mark">RCO</div>
              Rental Cashflow Obligation
            </div>
            <p className="footer-desc">
              Plataforma de financiamiento alternativo que permite a propietarios convertir sus contratos de alquiler en liquidez inmediata.
            </p>
          </div>
          <div>
            <div className="footer-col-title">Producto</div>
            <ul className="footer-links">
              <li><a href="#como-funciona">Cómo funciona</a></li>
              <li><a href="#beneficios">Beneficios</a></li>
              <li><a href="#simulador">Simulador</a></li>
              <li><a href="#formulario">Solicitar evaluación</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Legal</div>
            <ul className="footer-links">
              <li><a href="#">Aviso legal</a></li>
              <li><a href="#">Política de privacidad</a></li>
              <li><a href="#">Términos y condiciones</a></li>
              <li><a href="#">Información regulatoria</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Contacto</div>
            <ul className="footer-links">
              <li><a href="mailto:hola@rco.com.ar">hola@rco.com.ar</a></li>
              <li><a href="#">Buenos Aires, Argentina</a></li>
              <li><a href="#">Soporte en línea</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2025 RCO – Rental Cashflow Obligation. Todos los derechos reservados.</p>
          <div className="footer-legal">
            <a href="#">Aviso legal</a>
            <a href="#">Privacidad</a>
            <a href="#">Términos</a>
            <a href="#">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
