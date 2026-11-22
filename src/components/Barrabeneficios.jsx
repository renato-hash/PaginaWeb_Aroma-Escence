import React from 'react';

export function BarraBeneficios() {
  const beneficios = [
    {
      id: 1,
      titulo: 'Autenticidad Garantizada',
      subtitulo: '100% Productos Originales',
      icono: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    },
    {
      id: 2,
      titulo: 'Retiro en Puntos Blue Express',
      subtitulo: '+3.000 puntos en todo Chile',
      icono: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10Z" />
          <circle cx="12" cy="11" r="2.2" />
        </svg>
      )
    },
    {
      id: 3,
      titulo: 'Cuotas Sin Interés',
      subtitulo: 'Pago Flexible',
      icono: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      )
    },
    {
      id: 4,
      titulo: 'Satisfacción Garantizada',
      subtitulo: 'Cambios y Devoluciones Gratis',
      icono: (
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 14 5 18l4 4" />
          <path d="M5 18h9a5 5 0 0 0 0-10h-2" />
        </svg>
      )
    }
  ];

  return (
    <section
      aria-label="Beneficios de compra"
      className="w-100 border-bottom py-3"
      style={{ backgroundColor: '#f7f7f7', color: '#162018' }}
    >
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3 align-items-center">
          {beneficios.map((item) => (
            <div key={item.id} className="col">
              <div className="d-flex align-items-center justify-content-start justify-content-lg-center gap-3">
                <div className="flex-shrink-0 text-dark">{item.icono}</div>
                <div>
                  <div
                    className="fw-bold text-dark"
                    style={{ fontSize: '0.9rem', lineHeight: 1.25 }}
                  >
                    {item.titulo}
                  </div>
                  <div
                    className="text-muted"
                    style={{ fontSize: '0.78rem', lineHeight: 1.3 }}
                  >
                    {item.subtitulo}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BarraBeneficios;