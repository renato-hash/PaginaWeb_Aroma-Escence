import React from 'react';
import { Link } from 'react-router-dom';

export function Categorias({ productos = [], agregarAlCarrito }) {
  const categoriasDisponibles = [
    'Gourmand',
    'Orientales',
    'Amaderados',
    'Frescos',
    'Cítricos',
    'Florales'
  ];

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
      <section aria-labelledby="titulo-categorias">
        <h2 id="titulo-categorias" className="fw-bold text-center text-white mb-4">
          Categorías de Productos
        </h2>

        <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
          <Link
            to="/categorias"
            className="btn btn-success rounded-pill px-4 fw-semibold"
          >
            Todas
          </Link>

          {categoriasDisponibles.map((cat) => (
            <Link
              key={cat}
              to={`/categorias/${encodeURIComponent(cat)}`}
              className="btn btn-outline-light rounded-pill px-4"
            >
              {cat}
            </Link>
          ))}
        </div>

        <h4 className="fw-bold text-white mb-4">Todas</h4>

        <div className="row g-4">
          {productos.map((prod) => {
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
                      src={prod.imagen}
                      className="card-img-top p-3"
                      alt={prod.nombre}
                      style={{ height: '230px', objectFit: 'contain' }}
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600';
                      }}
                    />
                  </Link>

                  <div className="card-body d-flex flex-column p-4">
                    <div className="mb-2">
                      <Link
                        to={`/categorias/${encodeURIComponent(prod.categoria || 'Todas')}`}
                        className="badge bg-secondary text-decoration-none"
                      >
                        {prod.categoria || 'Perfumes'}
                      </Link>
                    </div>

                    <h5 className="fw-bold text-dark mb-2">
                      <Link
                        to={`/producto/${prod.id}`}
                        className="text-dark text-decoration-none"
                      >
                        {prod.nombre}
                      </Link>
                    </h5>

                    <p className="text-muted small flex-grow-1">{prod.descripcion}</p>

                    <div className="mt-3 pt-3 border-top d-flex justify-content-between align-items-center gap-2">
                      <span className="fw-bold fs-5 text-dark">
                        ${precioMostrar.toLocaleString('es-CL')}
                      </span>

                      <div className="d-flex gap-2">
                        <Link
                          to={`/producto/${prod.id}`}
                          className="btn btn-outline-dark btn-sm rounded-3 fw-semibold"
                        >
                          Ver detalle
                        </Link>
                        <button
                          type="button"
                          className="btn btn-success btn-sm rounded-3 fw-bold"
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
      </section>
    </main>
  );
}

export default Categorias;