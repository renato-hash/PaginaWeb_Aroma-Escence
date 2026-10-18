import React from 'react';
import { Link } from 'react-router-dom';

export function ResultadosBusqueda({ productos, agregarAlCarrito, busqueda }) {
  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">Resultados de búsqueda: "{busqueda}"</h2>
      {productos.length === 0 ? (
        <div className="alert alert-warning">
          No se encontraron productos que coincidan con tu búsqueda.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {productos.map((producto) => (
            <div key={producto.id} className="col">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={producto.imagen}
                  className="card-img-top"
                  alt={producto.nombre}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{producto.nombre}</h5>
                  <p className="card-text text-muted flex-grow-1">{producto.descripcion}</p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="fw-bold fs-5">${producto.precio ? producto.precio.toLocaleString('es-CL') : 0}</span>
                    <div className="d-flex gap-2">
                      <Link to={`/producto/${producto.id}`} className="btn btn-outline-dark btn-sm">Ver</Link>
                      <button className="btn btn-warning btn-sm fw-bold" onClick={() => agregarAlCarrito(producto)}>Agregar</button>
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