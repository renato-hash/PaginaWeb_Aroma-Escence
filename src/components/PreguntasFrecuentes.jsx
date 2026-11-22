import React, { useState } from 'react';

export function PreguntasFrecuentes() {
  const [abiertaId, setAbiertaId] = useState(null);

  const preguntas = [
    {
      id: 1,
      pregunta: '¿Los productos son originales?',
      respuesta:
        'Sí, todos nuestros perfumes son 100% originales, nuevos y sellados de fábrica. Trabajamos únicamente con distribuidores autorizados y casas oficiales de perfumería de diseñador, nicho y árabe.'
    },
    {
      id: 2,
      pregunta: '¿Cuándo llegaría mi compra?',
      respuesta:
        'En la Región Metropolitana los pedidos llegan entre 24 y 48 horas hábiles. Para regiones, el plazo de entrega es de 2 a 4 días hábiles mediante Blue Express o retiro en punto habilitado.'
    },
    {
      id: 3,
      pregunta: '¿Cuáles son los costos de envío?',
      respuesta:
        'El envío es gratis en compras sobre $60.000. Para montos inferiores, el valor se calcula automáticamente en el checkout según tu comuna o punto de retiro Blue Express seleccionado.'
    },
    {
      id: 4,
      pregunta: '¿Puedo devolver mi compra?',
      respuesta:
        'Sí, cuentas con garantía de satisfacción. Puedes solicitar cambios o devoluciones gratis dentro de los primeros 10 días desde la recepción, siempre que el perfume conserve su celofán y empaque original intactos.'
    }
  ];

  const togglePregunta = (id) => {
    setAbiertaId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      aria-labelledby="titulo-faq"
      className="w-100 py-5 mt-5"
      style={{ backgroundColor: '#f5f5f5', color: '#162018' }}
    >
      <div className="container">
        <h2
          id="titulo-faq"
          className="fw-bold text-center mb-5"
          style={{ color: '#111111', fontSize: '1.85rem' }}
        >
          Preguntas frecuentes
        </h2>

        <div className="mx-auto" style={{ maxWidth: '740px' }}>
          <div style={{ borderTop: '1px solid #d9d9d9' }}>
            {preguntas.map((item) => {
              const estaAbierta = abiertaId === item.id;

              return (
                <div
                  key={item.id}
                  style={{ borderBottom: '1px solid #d9d9d9' }}
                >
                  <button
                    type="button"
                    onClick={() => togglePregunta(item.id)}
                    aria-expanded={estaAbierta}
                    className="w-100 bg-transparent border-0 py-3 px-1 d-flex align-items-center justify-content-between text-start"
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="d-flex align-items-center gap-3">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#222222"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="flex-shrink-0"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="9.5" />
                        <path d="M9.5 9.2a2.6 2.6 0 0 1 5 .8c0 1.8-2.5 2.3-2.5 3.8" />
                        <circle cx="12" cy="17" r="0.6" fill="#222222" />
                      </svg>
                      <span
                        style={{
                          fontSize: '1.05rem',
                          color: '#1a1a1a',
                          fontWeight: 400
                        }}
                      >
                        {item.pregunta}
                      </span>
                    </span>

                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#222222"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="flex-shrink-0 ms-3"
                      style={{
                        transform: estaAbierta ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease'
                      }}
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {estaAbierta && (
                    <div
                      className="pb-3 pe-4"
                      style={{
                        paddingLeft: '36px',
                        color: '#555555',
                        fontSize: '0.94rem',
                        lineHeight: 1.6
                      }}
                    >
                      {item.respuesta}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PreguntasFrecuentes;