import React from 'react';
import { Link } from 'react-router-dom';

export function ResultadosBusqueda({ productos = [], agregarAlCarrito, busqueda = '' }) {
  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4" style={{ color: '#ffffff' }}>
        Resultados de búsqueda: "{busqueda}"
      </h2>

      {productos.length === 0 ? (
        <div
          className="rounded-4 p-4 text-center"
          style={{
            backgroundColor: '#162018',
            border: '1px solid rgba(255, 193, 7, 0.4)',
            color: '#ffffff'
          }}
        >
          No se encontraron productos que coincidan con tu búsqueda.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {productos.map((producto) => (
            <div key={producto.id} className="col">
              <div
                className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden"
                style={{
                  backgroundColor: '#162018',
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}
              >
                <Link to={`/producto/${producto.id}`} className="text-decoration-none">
                  <img
                    src={producto.imagen}
                    className="card-img-top"
                    alt={producto.nombre}
                    style={{ height: '250px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600';
                    }}
                  />
                </Link>

                <div className="card-body d-flex flex-column p-4">
                  <h5
                    className="card-title fw-bold mb-2"
                    style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff' }}
                  >
                    {producto.nombre}
                  </h5>

                  <p
                    className="card-text small flex-grow-1"
                    style={{
                      color: '#ffffff',
                      WebkitTextFillColor: '#ffffff',
                      opacity: 0.9
                    }}
                  >
                    {producto.descripcion}
                  </p>

                  <div
                    className="d-flex justify-content-between align-items-center mt-3 pt-3"
                    style={{ borderTop: '1px solid rgba(255, 255, 255, 0.15)' }}
                  >
                    <span
                      className="fw-bold fs-5"
                      style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff' }}
                    >
                      ${producto.precio ? Number(producto.precio).toLocaleString('es-CL') : 0}
                    </span>

                    <div className="d-flex gap-2">
                      <Link
                        to={`/producto/${producto.id}`}
                        className="btn btn-outline-light btn-sm rounded-pill px-3 fw-semibold"
                        style={{ color: '#ffffff', borderColor: '#ffffff' }}
                      >
                        Ver
                      </Link>
                      <button
                        type="button"
                        className="btn btn-warning btn-sm rounded-pill px-3 fw-bold text-dark"
                        onClick={() => agregarAlCarrito(producto)}
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResultadosBusqueda;