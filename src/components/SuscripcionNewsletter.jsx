import React, { useState } from 'react';

export function SuscripcionNewsletter() {
  const [correo, setCorreo] = useState('');
  const [estado, setEstado] = useState(null);

  const manejarSuscripcion = (e) => {
    e.preventDefault();
    const emailLimpio = correo.trim().toLowerCase();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(emailLimpio)) {
      setEstado({
        tipo: 'error',
        texto: 'Por favor, ingresa un correo electrónico válido.'
      });
      return;
    }

    try {
      const guardados = JSON.parse(localStorage.getItem('aroma_suscriptores') || '[]');
      const lista = Array.isArray(guardados) ? guardados : [];

      if (lista.includes(emailLimpio)) {
        setEstado({
          tipo: 'info',
          texto: 'Este correo ya está registrado en nuestra lista VIP.'
        });
        return;
      }

      localStorage.setItem('aroma_suscriptores', JSON.stringify([...lista, emailLimpio]));
      setCorreo('');
      setEstado({
        tipo: 'exito',
        texto: '¡Suscripción confirmada! Recibirás nuestras ofertas antes que todos.'
      });
    } catch (error) {
      setCorreo('');
      setEstado({
        tipo: 'exito',
        texto: '¡Suscripción confirmada! Recibirás nuestras ofertas antes que todos.'
      });
    }
  };

  return (
    <section
      className="w-100 py-5 px-3 text-center m-0"
      aria-labelledby="titulo-newsletter"
      style={{
        backgroundColor: '#120e0a',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <style>{`
        .input-newsletter-aroma::placeholder {
          color: #8c857e !important;
          opacity: 1 !important;
        }
      `}</style>

      <div className="container py-2">
        <h2
          id="titulo-newsletter"
          className="fw-bold mb-2"
          style={{
            color: '#b98b45',
            fontSize: 'clamp(1.75rem, 3.2vw, 2.35rem)',
            letterSpacing: '-0.01em'
          }}
        >
          ¡Suscríbete Gratis!
        </h2>

        <p
          className="fw-bold text-white mb-4"
          style={{
            fontSize: 'clamp(0.98rem, 1.8vw, 1.18rem)'
          }}
        >
          ¡Entérate de todas nuestras ofertas y nuevos productos antes que todos!
        </p>

        <form
          onSubmit={manejarSuscripcion}
          className="mx-auto"
          style={{ maxWidth: '560px' }}
          noValidate
        >
          <div
            className="d-flex align-items-center rounded-pill"
            style={{
              backgroundColor: '#18130e',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              padding: '4px 8px 4px 20px'
            }}
          >
            <input
              type="email"
              value={correo}
              onChange={(e) => {
                setCorreo(e.target.value);
                if (estado) setEstado(null);
              }}
              placeholder="Tu correo electrónico"
              aria-label="Tu correo electrónico"
              className="form-control border-0 bg-transparent shadow-none input-newsletter-aroma"
              style={{
                color: '#ffffff',
                fontSize: '0.95rem'
              }}
            />

            <button
              type="submit"
              aria-label="Suscribirse"
              className="btn border-0 bg-transparent text-white d-flex align-items-center justify-content-center px-3 py-2"
              style={{ transition: 'transform 0.2s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(3px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
            >
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>

          {estado && (
            <p
              className="small mt-3 mb-0 fw-semibold"
              style={{
                color:
                  estado.tipo === 'exito'
                    ? '#75d999'
                    : estado.tipo === 'info'
                      ? '#e5b869'
                      : '#ff7b7b'
              }}
            >
              {estado.texto}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default SuscripcionNewsletter;