import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function VideoPromocional() {
  const youtubeVideoId = 'https://www.youtube.com/watch?v=SY-6WZ8fgVg';

  return (
    <div className="card shadow-sm border-0 rounded-4 overflow-hidden p-3 bg-white h-100 d-flex flex-column justify-content-center">
      <h5 className="fw-bold text-dark text-center mb-1">Conoce Nuestra Perfumería</h5>
      <p className="text-muted small text-center mb-3">Descubre Le Beau Le Parfum de Jean Paul Gaultier, un Eau de Parfum masculino que encarna la seducción y el magnetismo.</p>

      <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeVideoId}`}
          title="Video promocional Aroma & Esencia"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export function Catalogo({ productos, agregarAlCarrito }) {
  const slides = [
    {
      id: 1,
      titulo: "Bienvenido a Aroma & Esencia",
      subtitulo: "Descubre nuestra exclusiva colección de perfumería boutique de alta gama.",
      imagen: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: 2,
      titulo: "Fragancias Exclusivas",
      subtitulo: "Explora nuestras familias olfativas: Florales, Amaderados, Cítricos, Orientales y más.",
      imagen: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: 3,
      titulo: "Envíos a Todo Chile",
      subtitulo: "Elige la esencia que define tu estilo y recíbela directo en tu hogar.",
      imagen: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  const [slideActual, setSlideActual] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideActual((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const anteriorSlide = () => {
    setSlideActual((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const siguienteSlide = () => {
    setSlideActual((prev) => (prev + 1) % slides.length);
  };

  const productosOferta = productos.slice(0, 3);

  const fotosVirales = [
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600"
  ];

  const productosVirales = productos.slice(0, 5).map((prod, index) => ({
    ...prod,
    imagenFondo: fotosVirales[index % fotosVirales.length]
  }));

  const testimonios = [
    {
      id: 1,
      nombre: "Camila Valenzuela",
      ciudad: "Santiago",
      comentario: "Excelente servicio. La fragancia es 100% original y el empaque llegó impecable en menos de 24 horas.",
      calificacion: "5.0 / 5.0",
      producto: "Le Beau Le Parfum"
    },
    {
      id: 2,
      nombre: "Matías Silva",
      ciudad: "Viña del Mar",
      comentario: "Muy satisfecho con mi compra. La fijación del perfume es increíble y la atención al cliente de primer nivel.",
      calificacion: "5.0 / 5.0",
      producto: "Bleu de Chanel"
    },
    {
      id: 3,
      nombre: "Valentina Reyes",
      ciudad: "Concepción",
      comentario: "Buscaba una fragancia exclusiva y me asesoraron perfectamente. Sin duda volveré a comprar en Aroma & Esencia.",
      calificacion: "5.0 / 5.0",
      producto: "Baccarat Rouge 540"
    }
  ];

  return (
    <div className="container my-4">
      <div className="row g-4 mb-5 align-items-stretch">
        <div className="col-12 col-lg-5">
          <VideoPromocional />
        </div>

        <div className="col-12 col-lg-7">
          <div 
            className="position-relative overflow-hidden rounded-4 shadow-lg h-100"
            style={{ minHeight: '320px' }}
          >
            <div 
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${slides[slideActual].imagen})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%',
                transition: 'background-image 0.8s ease-in-out'
              }}
              className="d-flex flex-column justify-content-center align-items-center text-center text-white px-4 py-5"
            >
              <h1 className="fw-bold display-6 mb-2">{slides[slideActual].titulo}</h1>
              <p className="lead fs-6 mb-3">{slides[slideActual].subtitulo}</p>
              <Link to="/categorias" className="btn btn-warning text-dark fw-bold rounded-pill px-4 py-2">
                Ver Familias Olfativas
              </Link>
            </div>

            <button
              className="btn btn-dark btn-sm rounded-circle position-absolute top-50 start-0 translate-middle-y ms-2 opacity-75"
              onClick={anteriorSlide}
              style={{ width: '38px', height: '38px', zIndex: 10 }}
            >
              ❮
            </button>

            <button
              className="btn btn-dark btn-sm rounded-circle position-absolute top-50 end-0 translate-middle-y me-2 opacity-75"
              onClick={siguienteSlide}
              style={{ width: '38px', height: '38px', zIndex: 10 }}
            >
              ❯
            </button>

            <div className="position-absolute bottom-0 start-50 translate-middle-x mb-2 d-flex gap-2" style={{ zIndex: 10 }}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`btn p-0 rounded-circle ${index === slideActual ? 'bg-warning' : 'bg-white opacity-50'}`}
                  style={{ width: '10px', height: '10px', border: 'none' }}
                  onClick={() => setSlideActual(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div 
        className="p-4 rounded-4 border mb-5"
        style={{ backgroundColor: '#eaf4ed', borderColor: '#a3d9b1' }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h3 className="fw-bold text-dark m-0"> Ofertas Destacadas</h3>
            <p className="text-muted small m-0">Descuentos exclusivos por tiempo limitado</p>
          </div>
          <Link to="/ofertas" className="btn btn-outline-success btn-sm rounded-pill fw-bold">
            Ver todas las ofertas
          </Link>
        </div>

        <div className="row g-4">
          {productosOferta.map((prod) => {
            const precioOriginal = Math.round(prod.precio * 1.25);
            return (
              <div key={`oferta-${prod.id}`} className="col-12 col-md-4">
                <div className="card h-100 shadow-sm border-0 product-card position-relative bg-white">
                  <span className="position-absolute top-0 start-0 bg-danger text-white fw-bold px-3 py-1 rounded-end mt-2 shadow-sm" style={{ zIndex: 5 }}>
                    20% OFF
                  </span>
                  <img
                    src={prod.imagen}
                    className="card-img-top"
                    alt={prod.nombre}
                    style={{ height: '200px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600';
                    }}
                  />
                  <div className="card-body d-flex flex-column p-3">
                    <span className="badge bg-secondary mb-2 align-self-start">{prod.categoria}</span>
                    <h6 className="fw-bold mb-1">{prod.nombre}</h6>
                    <p className="text-muted small flex-grow-1 mb-2 text-truncate">{prod.descripcion}</p>
                    <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                      <div>
                        <span className="text-muted text-decoration-line-through small me-2">
                          ${precioOriginal.toLocaleString('es-CL')}
                        </span>
                        <span className="fw-bold text-danger fs-5">
                          ${prod.precio.toLocaleString('es-CL')}
                        </span>
                      </div>
                      <button className="btn btn-success btn-sm fw-bold" onClick={() => agregarAlCarrito(prod)}>
                        + Agregar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-5">
        <h3 className="fw-bold text-dark mb-3">Perfumes virales</h3>
        <div className="row g-3 row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5">
          {productosVirales.map((prod) => (
            <div key={`viral-${prod.id}`} className="col">
              <div 
                className="card border-0 shadow-sm rounded-4 overflow-hidden text-white position-relative d-flex flex-column justify-content-end"
                style={{ height: '340px' }}
              >
                <img 
                  src={prod.imagenFondo} 
                  alt={prod.nombre} 
                  className="position-absolute top-0 start-0 w-100 h-100" 
                  style={{ objectFit: 'cover' }}
                />
                
                <div 
                  className="position-absolute top-0 start-0 w-100 h-100" 
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 65%, rgba(0,0,0,0) 100%)' }}
                ></div>

                <div className="position-relative p-2 z-1">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <div className="bg-white p-1 rounded-3 shadow-sm flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                      <img 
                        src={prod.imagen} 
                        alt={prod.nombre} 
                        className="w-100 h-100" 
                        style={{ objectFit: 'contain' }}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600';
                        }}
                      />
                    </div>
                    <div className="overflow-hidden">
                      <div className="fw-semibold text-white text-truncate" style={{ fontSize: '0.75rem' }}>
                        {prod.nombre}
                      </div>
                      <div className="fw-bold text-white" style={{ fontSize: '0.85rem' }}>
                        ${prod.precio.toLocaleString('es-CL')}
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  className="btn btn-dark w-100 rounded-0 py-2 px-3 d-flex justify-content-between align-items-center border-top border-secondary z-1"
                  style={{ backgroundColor: '#000', fontSize: '0.8rem', fontWeight: '500' }}
                  onClick={() => agregarAlCarrito(prod)}
                >
                  <span>Agregar al Carrito</span>
                  <span style={{ fontSize: '0.65rem' }}>▼</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div 
        className="p-4 rounded-4 border mb-5"
        style={{ backgroundColor: '#eaf4ed', borderColor: '#a3d9b1' }}
      >
        <div className="mb-4 text-center">
          <h3 className="fw-bold text-dark mb-1">Clientes Felices</h3>
          <p className="text-muted small m-0">La confianza y satisfacción de nuestra comunidad nos avala</p>
        </div>

        <div className="row g-4">
          {testimonios.map((item) => (
            <div key={item.id} className="col-12 col-md-4">
              <div className="card h-100 border rounded-4 p-3 bg-white text-dark shadow-sm d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-success text-white px-2 py-1 rounded-pill small">Compra Verificada</span>
                    <span className="fw-bold text-dark small">{item.calificacion}</span>
                  </div>
                  <p className="fst-italic text-muted small mb-3">"{item.comentario}"</p>
                </div>
                <div className="pt-2 border-top">
                  <div className="fw-bold text-dark fs-6">{item.nombre}</div>
                  <div className="text-muted small">{item.ciudad} &bull; <span className="fw-semibold text-success">{item.producto}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="fw-bold mb-4">Catálogo Completo</h2>
      <div className="row g-4">
        {productos.map((prod) => (
          <div key={prod.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0 product-card">
              <img
                src={prod.imagen}
                className="card-img-top"
                alt={prod.nombre}
                style={{ height: '220px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600';
                }}
              />
              <div className="card-body d-flex flex-column p-4">
                <span className="badge bg-secondary mb-2 align-self-start">{prod.categoria}</span>
                <h5 className="fw-bold mb-2">{prod.nombre}</h5>
                <p className="text-muted small flex-grow-1">{prod.descripcion}</p>
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                  <span className="fw-bold fs-5">${prod.precio.toLocaleString('es-CL')}</span>
                  <div>
                    <Link to={`/producto/${prod.id}`} className="btn btn-outline-dark btn-sm me-2">
                      Ver detalle
                    </Link>
                    <button className="btn btn-primary btn-sm" onClick={() => agregarAlCarrito(prod)}>
                      + Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}