import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BarraBeneficios } from '../components/BarraBeneficios';
import { PreguntasFrecuentes } from '../components/PreguntasFrecuentes';
import { BannerLanzamiento } from '../components/BannerLanzamiento';
import { SuscripcionNewsletter } from '../components/SuscripcionNewsletter';

function VideoPromocional() {
  return (
    <article className="card shadow-sm border-0 rounded-4 overflow-hidden p-3 bg-white h-100 d-flex flex-column justify-content-center">
      <h5 className="fw-bold text-dark text-center mb-1">Conoce Nuestra Perfumería</h5>
      <p className="text-muted small text-center mb-3">
        Descubre Le Beau Le Parfum de Jean Paul Gaultier, un Eau de Parfum masculino que encarna
        la seducción y el magnetismo.
      </p>

      <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm bg-dark">
        <video
          src="/images/promo.mp4"
          autoPlay
          muted
          loop
          playsInline
          controls
          className="w-100 h-100"
          style={{ objectFit: 'cover' }}
        >
          Tu navegador no soporta la reproducción de videos.
        </video>
      </div>
    </article>
  );
}

export function Catalogo({ productos = [], agregarAlCarrito }) {
  const slides = [
    {
      id: 1,
      titulo: 'Bienvenido a Aroma & Esencia',
      subtitulo: 'Descubre nuestra exclusiva colección de perfumería boutique de alta gama.',
      imagen: '/images/jimmi.jpg'
    },
    {
      id: 2,
      titulo: 'Fragancias Exclusivas',
      subtitulo:
        'Explora nuestras familias olfativas: Florales, Amaderados, Cítricos, Orientales y más.',
      imagen: '/images/karmra.webp'
    },
    {
      id: 3,
      titulo: 'Esencias de Autor & Nicho',
      subtitulo: 'Aromas seleccionados con fijación duradera para cada ocasión especial.',
      imagen: '/images/ultramale.jpg'
    },
    {
      id: 4,
      titulo: 'Perfumes Virales y Tendencia',
      subtitulo: 'Encuentra las fragancias más buscadas del momento con garantía 100% original.',
      imagen: '/images/jimmi.jpg'
    },
    {
      id: 5,
      titulo: 'Envíos a Todo Chile',
      subtitulo: 'Elige la esencia que define tu estilo y recíbela directo en tu hogar.',
      imagen: '/images/qaed.webp'
    }
  ];

  const marcasDestacadas = [
    { id: 1, nombre: 'Jean Paul Gaultier', origen: 'Francia', lema: 'Alta Costura' },
    { id: 2, nombre: 'Lattafa', origen: 'Emiratos Árabes', lema: 'Perfumería Árabe' },
    { id: 3, nombre: 'Chanel', origen: 'Francia', lema: 'Clásicos Eternos' },
    { id: 4, nombre: 'Maison Francis Kurkdjian', origen: 'Francia', lema: 'Nicho & Autor' },
    { id: 5, nombre: 'Dior', origen: 'Francia', lema: 'Elegancia Pura' },
    { id: 6, nombre: 'Jimmy Choo', origen: 'Reino Unido', lema: 'Moderno & Chic' }
  ];

  const carruselRef = useRef(null);
  const bannerMatchRef = useRef(null);
  const ultimoCambioWheelRef = useRef(0);
  const [slideActual, setSlideActual] = useState(0);

  useEffect(() => {
    const banner = bannerMatchRef.current;
    if (!banner) return;

    banner.querySelectorAll('.texto-blanco-forzado').forEach((el) => {
      el.style.setProperty('color', '#ffffff', 'important');
      el.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
    });
  }, []);

  useEffect(() => {
    const contenedor = carruselRef.current;
    if (!contenedor) return;

    const manejarRueda = (e) => {
      if (Math.abs(e.deltaY) < 10) return;

      const ahora = Date.now();
      const enPausa = ahora - ultimoCambioWheelRef.current < 450;

      if (e.deltaY > 0 && slideActual < slides.length - 1) {
        e.preventDefault();
        if (!enPausa) {
          ultimoCambioWheelRef.current = ahora;
          setSlideActual((prev) => Math.min(slides.length - 1, prev + 1));
        }
      } else if (e.deltaY < 0 && slideActual > 0) {
        e.preventDefault();
        if (!enPausa) {
          ultimoCambioWheelRef.current = ahora;
          setSlideActual((prev) => Math.max(0, prev - 1));
        }
      }
    };

    contenedor.addEventListener('wheel', manejarRueda, { passive: false });
    return () => contenedor.removeEventListener('wheel', manejarRueda);
  }, [slideActual, slides.length]);

  const anteriorSlide = () => {
    setSlideActual((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const siguienteSlide = () => {
    setSlideActual((prev) => (prev + 1) % slides.length);
  };

  const productosOferta = productos.slice(0, 3);
  const productosDestacadosInicio = productos.slice(0, 3);

  const fotosVirales = [
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600'
  ];

  const productosVirales = productos.slice(0, 5).map((prod, index) => ({
    ...prod,
    imagenFondo: fotosVirales[index % fotosVirales.length]
  }));

  const testimonios = [
    {
      id: 1,
      nombre: 'Camila Valenzuela',
      ciudad: 'Santiago',
      comentario:
        'Excelente servicio. La fragancia es 100% original y el empaque llegó impecable en menos de 24 horas.',
      calificacion: '5.0 / 5.0',
      producto: 'Le Beau Le Parfum'
    },
    {
      id: 2,
      nombre: 'Matías Silva',
      ciudad: 'Viña del Mar',
      comentario:
        'Muy satisfecho con mi compra. La fijación del perfume es increíble y la atención al cliente de primer nivel.',
      calificacion: '5.0 / 5.0',
      producto: 'Bleu de Chanel'
    },
    {
      id: 3,
      nombre: 'Valentina Reyes',
      ciudad: 'Concepción',
      comentario:
        'Buscaba una fragancia exclusiva y me asesoraron perfectamente. Sin duda volveré a comprar en Aroma & Esencia.',
      calificacion: '5.0 / 5.0',
      producto: 'Baccarat Rouge 540'
    }
  ];

  const obtenerStockProducto = (prod) => {
    if (Array.isArray(prod.tamanos) && prod.tamanos.length > 0) {
      return Number(prod.tamanos[0].stock ?? 0);
    }
    return Number(prod.stock ?? 0);
  };

  return (
    <>
      <BarraBeneficios />

      <main className="container mt-4">
        <section aria-label="Destacados principales" className="row g-4 mb-5 align-items-stretch">
          <div className="col-12 col-lg-5">
            <VideoPromocional />
          </div>

          <div className="col-12 col-lg-7">
            <div
              ref={carruselRef}
              className="position-relative overflow-hidden rounded-4 shadow-lg h-100"
              style={{
                minHeight: '340px',
                backgroundColor: '#162018'
              }}
            >
              {slides.map((slide, index) => {
                const esActivo = index === slideActual;
                return (
                  <div
                    key={slide.id}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: esActivo ? 1 : 0,
                      visibility: esActivo ? 'visible' : 'hidden',
                      transition: 'opacity 0.6s ease-in-out',
                      backgroundColor: '#162018'
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        width: '58%',
                        overflow: 'hidden'
                      }}
                    >
                      <img
                        src={slide.imagen}
                        alt={slide.titulo}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          transform: esActivo ? 'scale(1)' : 'scale(1.05)',
                          transition: 'transform 0.6s ease-out'
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background:
                            'linear-gradient(90deg, #162018 0%, rgba(22, 32, 24, 0.82) 22%, rgba(22, 32, 24, 0.12) 55%, rgba(22, 32, 24, 0.25) 100%)'
                        }}
                      />
                    </div>

                    <div
                      style={{
                        position: 'relative',
                        zIndex: 2,
                        height: '100%',
                        maxWidth: '60%',
                        paddingLeft: '54px',
                        paddingRight: '12px'
                      }}
                      className="d-flex flex-column justify-content-center align-items-start text-start text-white py-4"
                    >
                      <h2
                        className="fw-bold fs-2 mb-2"
                        style={{
                          lineHeight: 1.2,
                          textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)'
                        }}
                      >
                        {slide.titulo}
                      </h2>
                      <p
                        className="mb-4 text-light"
                        style={{
                          fontSize: '0.92rem',
                          opacity: 0.9,
                          textShadow: '0 1px 6px rgba(0, 0, 0, 0.75)'
                        }}
                      >
                        {slide.subtitulo}
                      </p>
                      <Link
                        to="/categorias"
                        className="btn btn-warning text-dark fw-bold rounded-pill px-4 py-2 shadow-sm"
                      >
                        Ver Familias Olfativas
                      </Link>
                    </div>
                  </div>
                );
              })}

              <button
                type="button"
                aria-label="Diapositiva anterior"
                className="btn btn-dark btn-sm rounded-circle position-absolute top-50 start-0 translate-middle-y ms-2 opacity-75"
                onClick={anteriorSlide}
                style={{ width: '36px', height: '36px', zIndex: 10 }}
              >
                <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
              </button>

              <button
                type="button"
                aria-label="Diapositiva siguiente"
                className="btn btn-dark btn-sm rounded-circle position-absolute top-50 end-0 translate-middle-y me-2 opacity-75"
                onClick={siguienteSlide}
                style={{ width: '36px', height: '36px', zIndex: 10 }}
              >
                <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
              </button>

              <div
                className="position-absolute bottom-0 mb-3 d-flex gap-2"
                style={{ zIndex: 10, left: '54px' }}
              >
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Ir a diapositiva ${index + 1}`}
                    className={`btn p-0 rounded-pill ${
                      index === slideActual ? 'bg-warning' : 'bg-white opacity-50'
                    }`}
                    style={{
                      width: index === slideActual ? '22px' : '10px',
                      height: '10px',
                      border: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => setSlideActual(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Descubre tu Perfume Match" className="mb-5">
          <style>{`
            html body main section .banner-match-inicio .texto-blanco-forzado {
              color: #ffffff !important;
              -webkit-text-fill-color: #ffffff !important;
              opacity: 1 !important;
            }
          `}</style>

          <div
            ref={bannerMatchRef}
            className="banner-match-inicio rounded-4 p-4 p-md-5 shadow-lg position-relative overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(16, 24, 18, 0.95) 0%, rgba(22, 32, 24, 0.80) 55%, rgba(22, 32, 24, 0.40) 100%), url('/images/match.avif')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '1px solid rgba(255, 193, 7, 0.35)'
            }}
          >
            <div className="row align-items-center g-4 position-relative" style={{ zIndex: 2 }}>
              <div className="col-12 col-lg-8 text-center text-lg-start">
                <span
                  className="badge rounded-pill px-3 py-2 mb-3 text-uppercase"
                  style={{
                    backgroundColor: 'rgba(22, 32, 24, 0.75)',
                    border: '1px solid rgba(255, 193, 7, 0.5)',
                    letterSpacing: '0.08em',
                    color: '#f5d08a'
                  }}
                >
                  <i className="fa-solid fa-wand-magic-sparkles me-2" aria-hidden="true"></i>
                  Test de Personalidad Olfativa
                </span>

                <div
                  role="heading"
                  aria-level="2"
                  className="fw-bold fs-2 mb-2 texto-blanco-forzado"
                  style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.75)' }}
                >
                  ¿No sabes qué fragancia elegir? Descubre tu{' '}
                  <span className="texto-blanco-forzado">Perfume Match</span>
                </div>

                <p
                  className="mb-3 texto-blanco-forzado"
                  style={{
                    maxWidth: '640px',
                    textShadow: '0 1px 6px rgba(0, 0, 0, 0.8)'
                  }}
                >
                  Responde 10 preguntas rápidas sobre tu estilo, tus planes y tu vibra, y
                  nuestro algoritmo encontrará el perfume de nuestro catálogo que mejor conecta
                  contigo.
                </p>

                <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3 small">
                  <span className="fw-semibold texto-blanco-forzado">
                    <i className="fa-solid fa-clock me-1 texto-blanco-forzado" aria-hidden="true"></i>
                    Toma menos de 1 minuto
                  </span>
                  <span className="fw-semibold texto-blanco-forzado">
                    <i
                      className="fa-solid fa-sparkles me-1 texto-blanco-forzado"
                      aria-hidden="true"
                    ></i>
                    Descubre tu arquetipo olfativo
                  </span>
                  <span className="fw-semibold texto-blanco-forzado">
                    <i
                      className="fa-solid fa-percent me-1 texto-blanco-forzado"
                      aria-hidden="true"
                    ></i>
                    Porcentaje de compatibilidad real
                  </span>
                </div>
              </div>

              <div className="col-12 col-lg-4 text-center text-lg-end">
                <Link
                  to="/match"
                  className="btn btn-warning btn-lg rounded-pill fw-bold px-4 py-3 shadow"
                  style={{ color: '#162018' }}
                >
                  <i className="fa-solid fa-wand-magic-sparkles me-2" aria-hidden="true"></i>
                  Hacer el Test Ahora
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="titulo-marcas" className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h3 id="titulo-marcas" className="fw-bold text-white m-0">
                Nuestras Marcas
              </h3>
              <p className="text-light opacity-75 small m-0">
                Casas de diseñador, nicho y perfumería árabe 100% original
              </p>
            </div>
            <Link to="/productos" className="text-warning text-decoration-none small fw-semibold">
              Ver todas &rarr;
            </Link>
          </div>

          <div className="row g-3 row-cols-2 row-cols-md-3 row-cols-lg-6">
            {marcasDestacadas.map((marca) => (
              <div key={marca.id} className="col">
                <Link
                  to={`/productos?marca=${encodeURIComponent(marca.nombre)}`}
                  className="card h-100 border-0 rounded-4 shadow-sm text-decoration-none text-center p-3 bg-white d-flex flex-column justify-content-center align-items-center"
                  style={{ transition: 'transform 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <span
                    className="badge rounded-pill mb-2 px-2 py-1"
                    style={{ backgroundColor: '#eaf4ed', color: '#162018', fontSize: '0.68rem' }}
                  >
                    {marca.lema}
                  </span>
                  <div className="fw-bold text-dark" style={{ fontSize: '0.95rem', lineHeight: 1.2 }}>
                    {marca.nombre}
                  </div>
                  <small className="text-muted mt-1" style={{ fontSize: '0.72rem' }}>
                    {marca.origen}
                  </small>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="titulo-ofertas-destacadas"
          className="p-4 rounded-4 border mb-5"
          style={{ backgroundColor: '#eaf4ed', borderColor: '#a3d9b1' }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h3 id="titulo-ofertas-destacadas" className="fw-bold text-dark m-0">
                Ofertas Destacadas
              </h3>
              <p className="text-muted small m-0">Descuentos exclusivos por tiempo limitado</p>
            </div>
            <Link to="/ofertas" className="btn btn-outline-success btn-sm rounded-pill fw-bold">
              Ver todas las ofertas
            </Link>
          </div>

          <div className="row g-4">
            {productosOferta.map((prod) => {
              const varianteBase =
                Array.isArray(prod.tamanos) && prod.tamanos.length > 0 ? prod.tamanos[0] : null;
              const precioBase = varianteBase ? Number(varianteBase.precio) : Number(prod.precio);
              const stockDisponible = obtenerStockProducto(prod);
              const precioConDescuento = Math.floor((precioBase * 0.8) / 100) * 100 + 90;

              const handleAgregarOfertaDestacada = () => {
                if (stockDisponible <= 0) return;
                agregarAlCarrito({
                  ...prod,
                  id: prod.id,
                  ml: varianteBase ? varianteBase.ml : null,
                  tamano: varianteBase ? varianteBase.ml : null,
                  stock: stockDisponible,
                  nombre: varianteBase
                    ? `${prod.nombre} (${varianteBase.ml}) - 20% OFF`
                    : `${prod.nombre} - 20% OFF`,
                  precio: precioConDescuento,
                  precioOriginal: precioBase
                });
              };

              return (
                <div key={`oferta-${prod.id}`} className="col-12 col-md-4">
                  <article className="card h-100 shadow-sm border-0 product-card position-relative bg-white rounded-4 overflow-hidden">
                    <span
                      className="position-absolute top-0 start-0 bg-danger text-white fw-bold px-3 py-1 rounded-end mt-2 shadow-sm"
                      style={{ zIndex: 5 }}
                    >
                      20% OFF
                    </span>
                    <Link
                      to={`/producto/${prod.id}`}
                      className="text-decoration-none"
                      aria-label={`Ver detalles de ${prod.nombre}`}
                    >
                      <img
                        src={prod.imagen}
                        className="card-img-top p-3"
                        alt={prod.nombre}
                        style={{ height: '200px', objectFit: 'contain' }}
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600';
                        }}
                      />
                    </Link>
                    <div className="card-body d-flex flex-column p-3">
                      <span className="badge bg-secondary mb-2 align-self-start">
                        {prod.categoria || 'Perfumes'}
                      </span>
                      <h6 className="fw-bold mb-1">
                        <Link
                          to={`/producto/${prod.id}`}
                          className="text-dark text-decoration-none"
                        >
                          {prod.nombre}
                        </Link>
                      </h6>
                      <p className="text-muted small flex-grow-1 mb-2 text-truncate">
                        {prod.descripcion}
                      </p>

                      <div className="mb-3 pt-2 border-top">
                        <span className="text-muted text-decoration-line-through small me-2">
                          ${precioBase.toLocaleString('es-CL')}
                        </span>
                        <span className="fw-bold text-danger fs-5">
                          ${precioConDescuento.toLocaleString('es-CL')}
                        </span>
                      </div>

                      <div className="d-grid gap-2">
                        <Link
                          to={`/producto/${prod.id}`}
                          className="btn btn-outline-dark btn-sm rounded-pill fw-semibold"
                        >
                          <i className="fa-solid fa-eye me-1" aria-hidden="true"></i>
                          Ver detalles
                        </Link>
                        <button
                          type="button"
                          className="btn btn-success btn-sm fw-bold rounded-pill"
                          onClick={handleAgregarOfertaDestacada}
                          disabled={stockDisponible <= 0}
                        >
                          <i className="fa-solid fa-cart-plus me-1" aria-hidden="true"></i>
                          {stockDisponible <= 0 ? 'Agotado' : 'Agregar al carrito'}
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="titulo-perfumes-virales" className="mb-5">
          <h3 id="titulo-perfumes-virales" className="fw-bold text-white mb-3">
            Perfumes virales
          </h3>
          <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5">
            {productosVirales.map((prod) => {
              const stockDisponible = obtenerStockProducto(prod);

              return (
                <div key={`viral-${prod.id}`} className="col">
                  <article
                    className="card border-0 shadow-sm rounded-4 overflow-hidden text-white position-relative d-flex flex-column justify-content-end"
                    style={{ height: '360px' }}
                  >
                    <img
                      src={prod.imagenFondo}
                      alt={prod.nombre}
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />

                    <div
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0) 100%)'
                      }}
                    ></div>

                    <div className="position-relative p-2 z-1">
                      <Link
                        to={`/producto/${prod.id}`}
                        className="d-flex align-items-center gap-2 mb-2 text-decoration-none text-white"
                        aria-label={`Ver detalles de ${prod.nombre}`}
                      >
                        <div
                          className="bg-white p-1 rounded-3 shadow-sm flex-shrink-0"
                          style={{ width: '42px', height: '42px' }}
                        >
                          <img
                            src={prod.imagen}
                            alt={prod.nombre}
                            className="w-100 h-100"
                            style={{ objectFit: 'contain' }}
                            onError={(e) => {
                              e.target.src =
                                'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600';
                            }}
                          />
                        </div>
                        <div className="overflow-hidden">
                          <div
                            className="fw-semibold text-white text-truncate"
                            style={{ fontSize: '0.8rem' }}
                          >
                            {prod.nombre}
                          </div>
                          <div className="fw-bold text-warning" style={{ fontSize: '0.85rem' }}>
                            ${Number(prod.precio).toLocaleString('es-CL')}
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="d-flex flex-column z-1">
                      <Link
                        to={`/producto/${prod.id}`}
                        className="btn btn-light w-100 rounded-0 py-1 px-2 fw-semibold d-flex justify-content-center align-items-center gap-1"
                        style={{ fontSize: '0.78rem' }}
                      >
                        <i className="fa-solid fa-eye" aria-hidden="true"></i>
                        <span>Ver detalles</span>
                      </Link>

                      <button
                        type="button"
                        className="btn btn-dark w-100 rounded-0 py-2 px-2 d-flex justify-content-center align-items-center gap-2 border-top border-secondary"
                        style={{ backgroundColor: '#000', fontSize: '0.8rem', fontWeight: '600' }}
                        onClick={() => agregarAlCarrito(prod)}
                        disabled={stockDisponible <= 0}
                      >
                        <i className="fa-solid fa-cart-plus text-warning" aria-hidden="true"></i>
                        <span>{stockDisponible <= 0 ? 'Agotado' : 'Agregar al carrito'}</span>
                      </button>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </section>

        <section
          aria-labelledby="titulo-testimonios"
          className="p-4 rounded-4 border mb-5"
          style={{ backgroundColor: '#eaf4ed', borderColor: '#a3d9b1' }}
        >
          <div className="mb-4 text-center">
            <h3 id="titulo-testimonios" className="fw-bold text-dark mb-1">
              Clientes Satisfechos
            </h3>
            <p className="text-muted small m-0">
              La confianza y satisfacción de nuestra comunidad nos avala
            </p>
          </div>

          <div className="row g-4">
            {testimonios.map((item) => (
              <div key={item.id} className="col-12 col-md-4">
                <article className="card h-100 border rounded-4 p-3 bg-white text-dark shadow-sm d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-success text-white px-2 py-1 rounded-pill small">
                        <i className="fa-solid fa-circle-check me-1" aria-hidden="true"></i>
                        Compra Verificada
                      </span>
                      <span className="fw-bold text-dark small">
                        <i className="fa-solid fa-star text-warning me-1" aria-hidden="true"></i>
                        {item.calificacion}
                      </span>
                    </div>
                    <p className="fst-italic text-muted small mb-3">"{item.comentario}"</p>
                  </div>
                  <div className="pt-2 border-top">
                    <div className="fw-bold text-dark fs-6">{item.nombre}</div>
                    <div className="text-muted small">
                      {item.ciudad} &bull;{' '}
                      <span className="fw-semibold text-success">{item.producto}</span>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="titulo-seleccion-catalogo">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
            <div>
              <h2 id="titulo-seleccion-catalogo" className="fw-bold text-white m-0">
                Nuestros Perfumes
              </h2>
              <p className="text-light opacity-75 small m-0">
                Una selección de nuestro catálogo exclusivo
              </p>
            </div>
            <Link to="/productos" className="btn btn-warning text-dark rounded-pill fw-bold px-4">
              Ver catálogo completo
            </Link>
          </div>

          <div className="row g-4">
            {productosDestacadosInicio.map((prod) => {
              const stockDisponible = obtenerStockProducto(prod);

              return (
                <div key={prod.id} className="col-12 col-md-6 col-lg-4">
                  <article className="card h-100 shadow-sm border-0 product-card rounded-4 bg-white text-dark overflow-hidden">
                    <Link
                      to={`/producto/${prod.id}`}
                      className="text-decoration-none"
                      aria-label={`Ver detalles de ${prod.nombre}`}
                    >
                      <img
                        src={prod.imagen}
                        className="card-img-top p-3"
                        alt={prod.nombre}
                        style={{ height: '220px', objectFit: 'contain' }}
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600';
                        }}
                      />
                    </Link>
                    <div className="card-body d-flex flex-column p-4">
                      <span className="badge bg-secondary mb-2 align-self-start">
                        {prod.categoria || 'Perfumes'}
                      </span>
                      <h5 className="fw-bold mb-2">
                        <Link
                          to={`/producto/${prod.id}`}
                          className="text-dark text-decoration-none"
                        >
                          {prod.nombre}
                        </Link>
                      </h5>
                      <p className="text-muted small flex-grow-1">{prod.descripcion}</p>
                      <div className="mt-3 pt-3 border-top">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="fw-bold fs-5 text-dark">
                            ${Number(prod.precio).toLocaleString('es-CL')}
                          </span>
                          <small className="text-muted">
                            {stockDisponible > 0 ? `Stock: ${stockDisponible}` : 'Sin stock'}
                          </small>
                        </div>
                        <div className="d-grid gap-2">
                          <Link
                            to={`/producto/${prod.id}`}
                            className="btn btn-outline-dark btn-sm rounded-pill fw-semibold"
                          >
                            <i className="fa-solid fa-eye me-1" aria-hidden="true"></i>
                            Ver detalles
                          </Link>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm rounded-pill fw-bold"
                            onClick={() => agregarAlCarrito(prod)}
                            disabled={stockDisponible <= 0}
                          >
                            <i className="fa-solid fa-cart-plus me-1" aria-hidden="true"></i>
                            {stockDisponible <= 0 ? 'Agotado' : 'Agregar al carrito'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-4">
            <Link
              to="/productos"
              className="btn btn-outline-warning rounded-pill fw-bold px-4 py-2"
            >
              Explorar todo el catálogo ({productos.length} perfumes)
            </Link>
          </div>
        </section>
      </main>

      <BannerLanzamiento productos={productos} />

      <SuscripcionNewsletter />

      <div className="sin-margen-superior">
        <PreguntasFrecuentes />
      </div>
    </>
  );
}

export default Catalogo;