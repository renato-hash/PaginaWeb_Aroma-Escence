import React, { useState, useEffect, useRef } from 'react';

const PREMIOS = [
  { texto: '15 % OFF', prefijo: 'AROMA15', tipo: 'porcentaje', valor: 15, color: '#f4c3b2', textoOscuro: true },
  { texto: '¡Casi!', prefijo: '', tipo: 'nada', valor: 0, color: '#b8a3ad', textoOscuro: false },
  { texto: '10 % OFF', prefijo: 'AROMA10', tipo: 'porcentaje', valor: 10, color: '#8f8589', textoOscuro: true },
  { texto: 'No hubo suerte hoy', prefijo: '', tipo: 'nada', valor: 0, color: '#f9e9d8', textoOscuro: true },
  { texto: 'Envío Gratis', prefijo: 'ENVIO', tipo: 'envio_gratis', valor: 0, color: '#f4c3b2', textoOscuro: true },
  { texto: '¡Casi!', prefijo: '', tipo: 'nada', valor: 0, color: '#b8a3ad', textoOscuro: false },
  { texto: '5 % de descuento', prefijo: 'AROMA5', tipo: 'porcentaje', valor: 5, color: '#8f8589', textoOscuro: true },
  { texto: 'Suerte la próxima vez', prefijo: '', tipo: 'nada', valor: 0, color: '#f9e9d8', textoOscuro: true }
];

const KEY_PREMIO_ACTIVO = 'aroma_premio_ruleta';
const KEY_CUPON_APLICADO = 'aroma_cupon_aplicado';

const obtenerIdentificadorUsuario = (usuario) => {
  if (!usuario) return 'invitado';
  return (usuario.email || usuario.correo || String(usuario.id) || 'invitado')
    .trim()
    .toLowerCase();
};

const generarCodigoCupon = (prefijo) => {
  const sufijo = Math.floor(100 + Math.random() * 900);
  return `${prefijo}-${sufijo}`;
};

const leerEstadoPorUsuario = (userKey) => {
  try {
    const giroKey = `aroma_ruleta_girada_${userKey}`;
    const premioKey = `aroma_premio_ruleta_${userKey}`;

    const premioGuardado = localStorage.getItem(premioKey);
    if (premioGuardado) {
      return JSON.parse(premioGuardado);
    }
    if (localStorage.getItem(giroKey) === 'true') {
      return { texto: 'Ya participaste con esta cuenta', tipo: 'nada', valor: 0 };
    }
    return null;
  } catch (e) {
    return null;
  }
};

export function RuletaDescuento({ usuario, onPremioGanado }) {
  const userKey = obtenerIdentificadorUsuario(usuario);

  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState(usuario?.email || '');
  const [errorEmail, setErrorEmail] = useState('');
  const [girando, setGirando] = useState(false);
  const [rotacion, setRotacion] = useState(0);
  const [resultado, setResultado] = useState(() => leerEstadoPorUsuario(userKey));
  const [copiado, setCopiado] = useState(false);
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const estadoCuenta = leerEstadoPorUsuario(userKey);
    setResultado(estadoCuenta);
    setEmail(usuario?.email || '');
    setErrorEmail('');
    setRotacion(0);
    setCopiado(false);

    if (estadoCuenta && estadoCuenta.tipo !== 'nada' && !estadoCuenta.usado) {
      localStorage.setItem(KEY_PREMIO_ACTIVO, JSON.stringify(estadoCuenta));
    } else {
      localStorage.removeItem(KEY_PREMIO_ACTIVO);
      localStorage.removeItem(KEY_CUPON_APLICADO);
    }
  }, [userKey, usuario]);

  useEffect(() => {
    const sincronizarUso = () => {
      try {
        const activoRaw = localStorage.getItem(KEY_PREMIO_ACTIVO);
        if (!activoRaw) return;
        const activo = JSON.parse(activoRaw);
        if (activo?.usado && activo?.userKey === userKey) {
          localStorage.setItem(`aroma_premio_ruleta_${userKey}`, JSON.stringify(activo));
          setResultado(activo);
        }
      } catch (e) {}
    };
    const intervalo = setInterval(sincronizarUso, 1000);
    return () => clearInterval(intervalo);
  }, [userKey]);

  useEffect(() => {
    const yaGiro = localStorage.getItem(`aroma_ruleta_girada_${userKey}`);
    const cerraronHoy = sessionStorage.getItem(`aroma_ruleta_cerrada_${userKey}`);
    if (!yaGiro && !cerraronHoy) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [userKey]);

  useEffect(() => {
    const el = inputRef.current;
    if (el) {
      el.style.setProperty('color', '#000000', 'important');
      el.style.setProperty('-webkit-text-fill-color', '#000000', 'important');
      el.style.setProperty('background-color', '#ffffff', 'important');
      el.style.setProperty('caret-color', '#000000', 'important');
    }

    const modal = modalRef.current;
    if (modal) {
      modal.querySelectorAll('.ruleta-texto-blanco').forEach((nodo) => {
        nodo.style.setProperty('color', '#ffffff', 'important');
        nodo.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
        nodo.style.setProperty('opacity', '1', 'important');
      });
    }
  }, [visible, email, resultado, copiado]);

  const cerrarModal = () => {
    sessionStorage.setItem(`aroma_ruleta_cerrada_${userKey}`, 'true');
    setVisible(false);
  };

  const handleCopiarCodigo = () => {
    if (!resultado?.codigo) return;
    navigator.clipboard?.writeText(resultado.codigo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  const handleGirar = (e) => {
    e.preventDefault();
    if (girando || resultado) return;

    const emailLimpio = email.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailLimpio || !regexEmail.test(emailLimpio)) {
      setErrorEmail('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    const correoKey = emailLimpio.toLowerCase();
    if (localStorage.getItem(`aroma_ruleta_girada_${correoKey}`) === 'true') {
      setErrorEmail('Este correo electrónico ya participó en la ruleta.');
      return;
    }

    setErrorEmail('');
    setGirando(true);

    const indiceGanador = Math.floor(Math.random() * PREMIOS.length);
    const premioSeleccionado = PREMIOS[indiceGanador];

    const gradosPorSegmento = 360 / PREMIOS.length;
    const centroSegmento = indiceGanador * gradosPorSegmento + gradosPorSegmento / 2;
    const vueltasExtra = 360 * 6;
    const anguloFinal = vueltasExtra + (360 - centroSegmento);

    setRotacion(anguloFinal);

    setTimeout(() => {
      setGirando(false);
      localStorage.setItem(`aroma_ruleta_girada_${userKey}`, 'true');
      localStorage.setItem(`aroma_ruleta_girada_${correoKey}`, 'true');

      if (premioSeleccionado.tipo !== 'nada') {
        const codigoGenerado = generarCodigoCupon(premioSeleccionado.prefijo);
        const datosPremio = {
          ...premioSeleccionado,
          codigo: codigoGenerado,
          email: emailLimpio,
          userKey,
          usado: false,
          fecha: new Date().toISOString()
        };
        setResultado(datosPremio);
        localStorage.setItem(`aroma_premio_ruleta_${userKey}`, JSON.stringify(datosPremio));
        localStorage.setItem(`aroma_premio_ruleta_${correoKey}`, JSON.stringify(datosPremio));
        localStorage.setItem(KEY_PREMIO_ACTIVO, JSON.stringify(datosPremio));

        if (onPremioGanado) {
          onPremioGanado(datosPremio);
        }
      } else {
        const sinPremio = {
          ...premioSeleccionado,
          email: emailLimpio,
          userKey
        };
        setResultado(sinPremio);
        localStorage.removeItem(KEY_PREMIO_ACTIVO);
      }
    }, 4200);
  };

  const gradosSeg = 360 / PREMIOS.length;
  const gradienteRuleta = PREMIOS.map(
    (p, i) => `${p.color} ${i * gradosSeg}deg ${(i + 1) * gradosSeg}deg`
  ).join(', ');

  if (!visible) {
    return (
      <button
        type="button"
        onClick={() => setVisible(true)}
        aria-label="Abrir ruleta de descuentos"
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 1055,
          backgroundColor: '#c99a4b',
          color: '#000000',
          border: '2px solid #ffffff',
          borderRadius: '50px',
          padding: '10px 18px',
          fontWeight: 'bold',
          fontSize: '0.95rem',
          boxShadow: '0 6px 20px rgba(0,0,0,0.55)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
      >
        <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>🎡</span>
        <span>{resultado?.codigo ? `Cupón: ${resultado.codigo}` : 'Gira y Gana'}</span>
      </button>
    );
  }

  return (
    <div
      id="modal-ruleta-aroma"
      ref={modalRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.78)',
        zIndex: 1060,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <style>{`
        html body #modal-ruleta-aroma input#ruleta-email-input,
        html body #modal-ruleta-aroma input#ruleta-email-input:focus,
        html body #modal-ruleta-aroma input#ruleta-email-input:active,
        html body #modal-ruleta-aroma input#ruleta-email-input:-webkit-autofill {
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          background-color: #ffffff !important;
          -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;
          caret-color: #000000 !important;
        }
        html body #modal-ruleta-aroma input#ruleta-email-input::placeholder {
          color: #555555 !important;
          -webkit-text-fill-color: #555555 !important;
          opacity: 1 !important;
        }
        html body #modal-ruleta-aroma .ruleta-texto-blanco,
        html body #modal-ruleta-aroma h2.ruleta-texto-blanco,
        html body #modal-ruleta-aroma h5.ruleta-texto-blanco,
        html body #modal-ruleta-aroma p.ruleta-texto-blanco,
        html body #modal-ruleta-aroma strong.ruleta-texto-blanco,
        html body #modal-ruleta-aroma div.ruleta-texto-blanco,
        html body #modal-ruleta-aroma button.ruleta-texto-blanco {
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          opacity: 1 !important;
        }
        html body #modal-ruleta-aroma .ruleta-titulo-premio {
          color: #ffc107 !important;
          -webkit-text-fill-color: #ffc107 !important;
          opacity: 1 !important;
        }
      `}</style>

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '880px',
          backgroundColor: '#050505',
          border: '1px solid #c99a4b',
          borderRadius: '18px',
          padding: '36px 28px',
          color: '#ffffff',
          boxShadow: '0 20px 50px rgba(0,0,0,0.85)'
        }}
      >
        <button
          type="button"
          onClick={cerrarModal}
          aria-label="Cerrar ruleta"
          className="ruleta-texto-blanco"
          style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            fontSize: '26px',
            fontWeight: 'bold',
            cursor: 'pointer',
            lineHeight: 1
          }}
        >
          ×
        </button>

        <div className="row align-items-center g-4">
          <div className="col-md-6 d-flex justify-content-center">
            <div
              style={{
                position: 'relative',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                border: '8px solid #ffffff',
                boxShadow: '0 0 25px rgba(255,255,255,0.2)',
                overflow: 'visible'
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: `conic-gradient(from 90deg, ${gradienteRuleta})`,
                  transform: `rotate(${rotacion}deg)`,
                  transition: girando
                    ? 'transform 4.2s cubic-bezier(0.17, 0.67, 0.12, 0.99)'
                    : 'none',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {PREMIOS.map((premio, idx) => {
                  const angulo = idx * gradosSeg + gradosSeg / 2;
                  return (
                    <div
                      key={idx}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '130px',
                        transformOrigin: '0% 50%',
                        transform: `translateY(-50%) rotate(${angulo}deg)`,
                        textAlign: 'right',
                        paddingRight: '14px',
                        fontSize: '11.5px',
                        fontWeight: '800',
                        color: premio.textoOscuro ? '#111111' : '#ffffff',
                        userSelect: 'none',
                        lineHeight: 1.15
                      }}
                    >
                      {premio.texto}
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: '4px solid #e0e0e0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
                  zIndex: 2
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '-14px',
                  transform: 'translateY(-50%)',
                  width: '40px',
                  height: '28px',
                  backgroundColor: '#1e823c',
                  borderRadius: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.5)',
                  zIndex: 3
                }}
              >
                <span
                  style={{
                    width: '11px',
                    height: '11px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    display: 'block'
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <h2
              className="fw-bold mb-2 ruleta-texto-blanco"
              style={{ color: '#ffffff', fontSize: '2rem' }}
            >
              🎡 Gira con Aroma y Gana
            </h2>
            <p
              className="mb-3 ruleta-texto-blanco"
              style={{ color: '#ffffff', fontSize: '0.95rem' }}
            >
              Tienes la oportunidad de ganar un cupón exclusivo para tu próxima fragancia.
              ¿Estás preparado? Solo puedes girar la ruleta una vez por cuenta.
            </p>

            {!resultado ? (
              <form onSubmit={handleGirar} noValidate>
                <div className="mb-3">
                  <input
                    ref={inputRef}
                    id="ruleta-email-input"
                    type="email"
                    className="form-control"
                    placeholder="Ingresa tu correo electrónico"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorEmail) setErrorEmail('');
                    }}
                    disabled={girando}
                    style={{
                      border: '2px solid #0d2c54',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      fontSize: '1rem',
                      fontWeight: '500'
                    }}
                  />
                  {errorEmail && (
                    <small className="text-warning d-block mt-1 fw-semibold">
                      {errorEmail}
                    </small>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={girando}
                  className="w-100 fw-bold mb-3 ruleta-texto-blanco"
                  style={{
                    backgroundColor: '#c99a4b',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '13px',
                    fontSize: '1rem',
                    letterSpacing: '0.5px',
                    cursor: girando ? 'not-allowed' : 'pointer'
                  }}
                >
                  {girando ? 'GIRANDO...' : 'PRUEBA TU SUERTE 🤞'}
                </button>
              </form>
            ) : (
              <div
                className="p-3 rounded-3 mb-3 text-center"
                style={{
                  backgroundColor:
                    resultado.tipo !== 'nada'
                      ? 'rgba(30, 130, 60, 0.25)'
                      : 'rgba(255, 255, 255, 0.1)',
                  border:
                    resultado.tipo !== 'nada'
                      ? '1px solid #28a745'
                      : '1px solid rgba(255,255,255,0.3)'
                }}
              >
                {resultado.tipo !== 'nada' ? (
                  <>
                    <h5 className="fw-bold mb-1 ruleta-titulo-premio">
                      🎉 ¡Ganaste: {resultado.texto}!
                    </h5>
                    <p className="small mb-2 ruleta-texto-blanco">
                      {resultado.usado
                        ? 'Este cupón ya fue canjeado en una compra anterior.'
                        : 'Copia tu código e ingrésalo en el Carrito o Checkout para hacerlo válido:'}
                    </p>

                    {resultado.codigo && !resultado.usado && (
                      <div className="d-flex justify-content-center align-items-center gap-2 my-2">
                        <span
                          className="px-3 py-2 rounded-2 fw-bold"
                          style={{
                            backgroundColor: '#ffffff',
                            color: '#000000',
                            letterSpacing: '1.5px',
                            fontSize: '1.05rem',
                            border: '2px dashed #c99a4b'
                          }}
                        >
                          {resultado.codigo}
                        </span>
                        <button
                          type="button"
                          onClick={handleCopiarCodigo}
                          className="btn btn-sm btn-outline-light fw-bold"
                        >
                          {copiado ? '¡Copiado!' : 'Copiar'}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <h5 className="fw-bold mb-1 ruleta-texto-blanco">
                      {resultado.texto}
                    </h5>
                    <p className="small mb-2 ruleta-texto-blanco">
                      ¡Gracias por participar! Sigue explorando nuestras fragancias.
                    </p>
                  </>
                )}
                <button
                  type="button"
                  onClick={cerrarModal}
                  className="btn btn-sm btn-warning text-dark fw-bold px-4 rounded-pill mt-1"
                >
                  Continuar comprando
                </button>
              </div>
            )}

            <div className="mb-3">
              <button
                type="button"
                onClick={cerrarModal}
                className="ruleta-texto-blanco"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  textDecoration: 'underline',
                  padding: 0,
                  fontSize: '0.95rem',
                  cursor: 'pointer'
                }}
              >
                Hoy no
              </button>
            </div>

            <div style={{ fontSize: '0.88rem' }}>
              <strong className="d-block mb-1 ruleta-texto-blanco">Reglas</strong>
              <div className="ruleta-texto-blanco">• Puedes girar la rueda solo una vez por cuenta.</div>
              <div className="ruleta-texto-blanco">
                • Ingresa el código obtenido en la sección de cupón de tu carrito o checkout para hacerlo válido.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}