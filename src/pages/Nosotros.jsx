import React from 'react';
import { Link } from 'react-router-dom';

export function Nosotros() {
  const pilares = [
    {
      id: 1,
      icono: 'fa-solid fa-certificate',
      titulo: '100% Originalidad',
      descripcion:
        'Cada fragancia de nuestro catálogo proviene de distribuidores oficiales y cuenta con garantía total de autenticidad.'
    },
    {
      id: 2,
      icono: 'fa-solid fa-spray-can-sparkles',
      titulo: 'Curaduría Exclusiva',
      descripcion:
        'Seleccionamos desde clásicos de diseñador francés hasta las joyas más buscadas de la perfumería árabe y de autor.'
    },
    {
      id: 3,
      icono: 'fa-solid fa-truck-fast',
      titulo: 'Envíos a Todo Chile',
      descripcion:
        'Preparamos cada pedido con embalaje protector de alta seguridad para que tu perfume llegue impecable a tu puerta.'
    }
  ];

  return (
    <main className="container my-5">
      <section className="text-center mb-5">
        <span className="badge bg-warning text-dark rounded-pill px-3 py-2 fw-bold mb-2">
          Aroma &amp; Esencia
        </span>
        <h1 className="fw-bold text-white display-5 mb-3">Nuestra Historia</h1>
        <p className="text-light opacity-75 mx-auto" style={{ maxWidth: '640px' }}>
          Creemos que un buen perfume no solo complementa tu estilo, sino que guarda recuerdos y
          define tu presencia antes de decir una sola palabra.
        </p>
      </section>

      <section className="card border-0 rounded-4 shadow-lg overflow-hidden mb-5 bg-white text-dark">
        <div className="row g-0 align-items-stretch">
          <div className="col-12 col-lg-5">
            <img
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800"
              alt="Colección de perfumería Aroma & Esencia"
              className="w-100 h-100"
              style={{ objectFit: 'cover', minHeight: '300px' }}
            />
          </div>

          <div className="col-12 col-lg-7 p-4 p-md-5 d-flex flex-column justify-content-center">
            <h2 className="fw-bold mb-3" style={{ color: '#162018' }}>
              De una pasión personal a tu perfumería boutique
            </h2>
            <p className="text-muted mb-3" style={{ lineHeight: 1.7 }}>
              <strong>Aroma &amp; Esencia</strong> nació con una idea clara: acercar la alta
              perfumería original a quienes buscan aromas con carácter, buena fijación y precios
              justos en Chile, sin tener que conformarse siempre con las mismas fragancias
              comerciales de siempre.
            </p>
            <p className="text-muted mb-4" style={{ lineHeight: 1.7 }}>
              Lo que comenzó como una colección personal y recomendaciones entre amigos y
              conocidos, hoy es un espacio dedicado a asesorarte para encontrar tu sello
              olfativo—ya sea una esencia fresca para el día a día, un perfume árabe intenso o
              una fragancia de autor para ocasiones inolvidables.
            </p>

            <div className="d-flex flex-wrap gap-3">
              <Link
                to="/productos"
                className="btn btn-warning text-dark fw-bold rounded-pill px-4 py-2 shadow-sm"
              >
                Explorar Catálogo
              </Link>
              <Link
                to="/categorias"
                className="btn btn-outline-dark fw-semibold rounded-pill px-4 py-2"
              >
                Ver Familias Olfativas
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="titulo-pilares"
        className="p-4 p-md-5 rounded-4 border"
        style={{ backgroundColor: '#eaf4ed', borderColor: '#a3d9b1' }}
      >
        <div className="text-center mb-4">
          <h3 id="titulo-pilares" className="fw-bold text-dark mb-1">
            ¿Por qué elegirnos?
          </h3>
          <p className="text-muted small m-0">
            El compromiso detrás de cada frasco que entregamos
          </p>
        </div>

        <div className="row g-4">
          {pilares.map((pilar) => (
            <div key={pilar.id} className="col-12 col-md-4">
              <article className="card h-100 border-0 rounded-4 p-4 bg-white text-dark shadow-sm text-center">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: '56px',
                    height: '56px',
                    backgroundColor: '#162018',
                    color: '#ffc107',
                    fontSize: '1.35rem'
                  }}
                >
                  <i className={pilar.icono} aria-hidden="true"></i>
                </div>
                <h5 className="fw-bold mb-2">{pilar.titulo}</h5>
                <p className="text-muted small m-0">{pilar.descripcion}</p>
              </article>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Nosotros;