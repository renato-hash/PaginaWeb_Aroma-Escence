import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="container text-center my-5 py-5">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="mb-3">Página no encontrada</h2>
      <p className="lead text-muted">
        La ruta a la que intentas acceder no existe o fue movida.
      </p>
      <Link to="/" className="btn btn-primary mt-3 px-4">
        Volver al Inicio
      </Link>
    </div>
  );
}