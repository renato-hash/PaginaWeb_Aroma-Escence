import React from 'react';
import { Link } from 'react-router-dom';
import { productosIniciales } from '../data/productos';

export function BannerLanzamiento({ productos = [] }) {
  const lista = productos.length > 0 ? productos : productosIniciales;
  const perfumeNuevo = lista.find(
    (p) => p.nombre?.toLowerCase().includes('la bomba') || p.id === 37
  );

  const rutaDestino = perfumeNuevo ? `/producto/${perfumeNuevo.id}` : '/producto/37';

  const manejarErrorImagen = (e) => {
    const img = e.currentTarget;
    if (img.src.endsWith('.jpg')) {
      img.src = '/images/banner-la-bomba.png';
    } else if (img.src.endsWith('.png')) {
      img.src = '/images/banner-la-bomba.webp';
    } else {
      img.style.display = 'none';
    }
  };

  return (
    <section className="w-100 mt-5 mb-0" aria-label="Lanzamiento exclusivo La Bomba">
      <Link
        to={rutaDestino}
        className="d-flex align-items-center position-relative overflow-hidden w-100 text-decoration-none"
        style={{
          minHeight: '360px',
          background:
            'linear-gradient(90deg, #240408 0%, #4e0913 52%, #3a060d 100%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.18)',
          cursor: 'pointer'
        }}
      >
        <div className="container position-relative py-4 py-lg-5" style={{ zIndex: 2 }}>
          <div
            className="d-flex flex-column align-items-start justify-content-center"
            style={{ maxWidth: '58%' }}
          >
            <span
              className="text-uppercase fw-semibold mb-2 px-3 py-1 rounded-pill"
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                backgroundColor: 'rgba(255, 255, 255, 0.14)',
                color: '#ffd6dc'
              }}
            >
              Nuevo Lanzamiento
            </span>

            <h2
              className="fw-bold mb-3"
              style={{
                fontSize: 'clamp(2.1rem, 4vw, 3.2rem)',
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                lineHeight: 1.05,
                color: '#ffffff',
                textShadow: '0 4px 18px rgba(0, 0, 0, 0.45)'
              }}
            >
              La Bomba
            </h2>

            <div
              className="px-4 py-2 rounded-pill fw-semibold mb-4"
              style={{
                background: 'linear-gradient(90deg, #5e0b18 0%, #a3182d 100%)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                fontSize: '1rem'
              }}
            >
              <span style={{ color: '#ffffff' }}>Dulcemente Irresistible</span>
            </div>

            <span
              className="btn btn-light fw-bold rounded-pill px-4 py-2 shadow-sm"
              style={{ color: '#240509', fontSize: '0.9rem' }}
            >
              ¡Lo Quiero!
            </span>
          </div>
        </div>

        <div
          className="position-absolute top-0 end-0 bottom-0"
          style={{
            width: '48%',
            minWidth: '300px',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, #000 32%)',
            maskImage:
              'linear-gradient(to right, transparent 0%, #000 32%)'
          }}
        >
          <img
            src="/images/carolina-herrera.jpeg"
            alt="La Bomba - Dulcemente Irresistible"
            className="w-100 h-100 d-block"
            onError={manejarErrorImagen}
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </div>
      </Link>
    </section>
  );
}

export default BannerLanzamiento;