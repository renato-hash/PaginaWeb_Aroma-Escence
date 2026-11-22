import React from 'react';
import { Link, useParams } from 'react-router-dom';

const DESCRIPCIONES_CATEGORIA = {
  gourmand: 'Aromas dulces, envolventes y adictivos con notas de vainilla, caramelo, cacao y haba tonka.',
  orientales: 'Fragancias cálidas, especiadas y seductoras con ámbar, incienso, resinas y maderas exóticas.',
  amaderados: 'Esencias elegantes y con carácter basadas en sándalo, cedro, vetiver y oud.',
  frescos: 'Aromas limpios, acuáticos y revitalizantes ideales para el uso diario.',
  citricos: 'Notas vibrantes y energéticas de bergamota, limón, mandarina y pomelo.',
  florales: 'Composiciones sofisticadas y atemporales con rosa, jazmín, iris y flor de azahar.'
};

const normalizarTexto = (texto = '') =>
  texto
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

const obtenerRaizCategoria = (texto = '') => {
  const norm = normalizarTexto(texto);
  if (norm.endsWith('es') && norm.length > 4) return norm.slice(0, -2);
  if (norm.endsWith('s') && norm.length > 4) return norm.slice(0, -1);
  return norm;
};

const resolverImagenProducto = (prod) => {
  const raw =
    prod?.imagen ||
    prod?.img ||
    prod?.urlImagen ||
    prod?.image ||
    prod?.foto ||
    prod?.imagenUrl ||
    '';

  if (!raw || typeof raw !== 'string') return '';

  const limpia = raw.trim();
  if (
    limpia.startsWith('http://') ||
    limpia.startsWith('https://') ||
    limpia.startsWith('data:') ||
    limpia.startsWith('/')
  ) {
    return limpia;
  }

  return `/${limpia.replace(/^\.\//, '')}`;
};

export function CategoriaDetalle({ productos = [], agregarAlCarrito }) {
  const { categoria } = useParams();
  const nombreCategoria = decodeURIComponent(categoria || '');
  const claveNormalizada = normalizarTexto(nombreCategoria);
  const raizBuscada = obtenerRaizCategoria(nombreCategoria);

  const productosFiltrados = productos.filter((prod) => {
    if (!prod.categoria) return false;
    const raizProducto = obtenerRaizCategoria(prod.categoria);
    return (
      normalizarTexto(prod.categoria) === claveNormalizada ||
      raizProducto === raizBuscada
    );
  });

  const obtenerStockProducto = (prod) => {
    if (Array.isArray(prod.tamanos) && prod.tamanos.length > 0) {
      return Number(prod.tamanos[0].stock ?? 0);
    }
    return Number(prod.stock ?? 0);
  };

  const handleAgregar = (prod) => {
    const varianteBase =
      Array.isArray(prod.tamanos) && prod.tamanos.length > 0 ? prod.tamanos[0] : null;
    const stockDisponible = obtenerStockProducto(prod);
    if (stockDisponible <= 0) return;

    agregarAlCarrito({
      ...prod,
      ml: varianteBase ? varianteBase.ml : null,
      tamano: varianteBase ? varianteBase.ml : null,
      precio: varianteBase ? Number(varianteBase.precio) : Number(prod.precio),
      stock: stockDisponible
    });
  };

  return (
    <main className="container my-5">
      <section aria-labelledby="titulo-categoria-detalle">
        <div className="mb-4">
          <Link
            to="/categorias"
            className="btn btn-outline-light btn-sm rounded-pill px-3 mb-3"
          >
            <i className="fa-solid fa-arrow-left me-2" aria-hidden="true"></i>
            Volver a todas las categorías
          </Link>

          <div className="d-flex flex-wrap justify-content-between align-items-end gap-2">
            <div>
              <span className="badge bg-warning text-dark rounded-pill px-3 py-1 mb-2 fw-bold">
                Familia Olfativa
              </span>
              <h1 id="titulo-categoria-detalle" className="fw-bold text-white mb-1">
                {nombreCategoria}
              </h1>
              <p className="text-light opacity-75 mb-0">
                {DESCRIPCIONES_CATEGORIA[claveNormalizada] ||
                  `Explora nuestra selección exclusiva de fragancias en la categoría ${nombreCategoria}.`}
              </p>
            </div>

            <span className="badge bg-secondary fs-6">
              {productosFiltrados.length}{' '}
              {productosFiltrados.length === 1 ? 'perfume' : 'perfumes'}
            </span>
          </div>
        </div>

        <hr className="border-secondary mb-4" />

        {productosFiltrados.length === 0 ? (
          <div className="card border-0 rounded-4 p-5 text-center bg-white text-dark shadow-sm">
            <h4 className="fw-bold text-dark mb-2">
              No hay perfumes disponibles en "{nombreCategoria}"
            </h4>
            <p className="text-muted mb-4">
              Pronto incorporaremos nuevas fragancias de esta familia olfativa.
            </p>
            <div>
              <Link
                to="/categorias"
                className="btn btn-warning text-dark fw-bold rounded-pill px-4"
              >
                Explorar otras categorías
              </Link>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {productosFiltrados.map((prod) => {
              const varianteBase =
                Array.isArray(prod.tamanos) && prod.tamanos.length > 0 ? prod.tamanos[0] : null;
              const precioMostrar = varianteBase
                ? Number(varianteBase.precio)
                : Number(prod.precio);
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
                        src={resolverImagenProducto(prod)}
                        className="card-img-top p-3"
                        alt={prod.nombre}
                        style={{ height: '230px', objectFit: 'contain' }}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600';
                        }}
                      />
                    </Link>

                    <div className="card-body d-flex flex-column p-4">
                      <span className="badge bg-secondary mb-2 align-self-start">
                        {prod.categoria || nombreCategoria}
                      </span>

                      <h5 className="fw-bold text-dark mb-2">
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
                            ${precioMostrar.toLocaleString('es-CL')}
                          </span>
                          <small className="text-muted">
                            {stockDisponible > 0 ? `Stock: ${stockDisponible}` : 'Sin stock'}
                          </small>
                        </div>

                        <div className="d-flex gap-2">
                          <Link
                            to={`/producto/${prod.id}`}
                            className="btn btn-outline-dark btn-sm rounded-3 fw-semibold flex-grow-1"
                          >
                            Ver detalle
                          </Link>

                          <button
                            type="button"
                            className="btn btn-success btn-sm rounded-3 fw-bold flex-grow-1"
                            onClick={() => handleAgregar(prod)}
                            disabled={stockDisponible <= 0}
                          >
                            {stockDisponible <= 0 ? 'Agotado' : '+ Agregar'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default CategoriaDetalle;