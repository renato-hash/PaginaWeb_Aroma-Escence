import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Productos({ productos = [], agregarAlCarrito }) {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');

  const categorias = [
    'Todas',
    ...Array.from(new Set(productos.map((prod) => prod.categoria).filter(Boolean)))
  ];

  const obtenerStockProducto = (prod) => {
    if (Array.isArray(prod.tamanos) && prod.tamanos.length > 0) {
      return Number(prod.tamanos[0].stock ?? 0);
    }
    return Number(prod.stock ?? 0);
  };

  const productosFiltrados = productos.filter((prod) => {
    const coincideCategoria =
      categoriaActiva === 'Todas' || prod.categoria === categoriaActiva;
    const texto = busqueda.toLowerCase();
    const coincideTexto =
      prod.nombre?.toLowerCase().includes(texto) ||
      prod.descripcion?.toLowerCase().includes(texto);
    return coincideCategoria && coincideTexto;
  });

  return (
    <main className="container my-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h1 className="fw-bold text-white mb-1">Catálogo Completo</h1>
          <p className="text-light opacity-75 small m-0">
            Mostrando {productosFiltrados.length} de {productos.length} fragancias disponibles
          </p>
        </div>

        <div style={{ minWidth: '260px' }}>
          <input
            type="search"
            className="form-control bg-dark text-white border-secondary rounded-pill px-3"
            placeholder="Buscar perfume..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            aria-label="Buscar perfume"
          />
        </div>
      </div>

      {categorias.length > 1 && (
        <div className="d-flex flex-wrap gap-2 mb-4">
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`btn btn-sm rounded-pill fw-semibold px-3 ${
                categoriaActiva === cat ? 'btn-warning text-dark' : 'btn-outline-light'
              }`}
              onClick={() => setCategoriaActiva(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {productosFiltrados.length === 0 ? (
        <div className="text-center py-5 bg-white text-dark rounded-4 shadow-sm">
          <p className="text-muted mb-3">No se encontraron perfumes con ese criterio.</p>
          <button
            type="button"
            className="btn btn-dark btn-sm rounded-pill px-4"
            onClick={() => {
              setBusqueda('');
              setCategoriaActiva('Todas');
            }}
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {productosFiltrados.map((prod) => {
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
      )}
    </main>
  );
}

export default Productos;