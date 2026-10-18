import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar({ cantidadCarrito, usuario, cerrarSesion, usuarioAdmin, cerrarSesionAdmin }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-warning" to="/">
           Aroma & Esencia
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Catálogo</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categorias">Categorías</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ofertas">Ofertas</Link>
            </li>
            {usuarioAdmin && (
              <li className="nav-item">
                <Link className="nav-link text-warning fw-bold" to="/admin">
                   Panel Admin
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            <Link to="/carrito" className="btn btn-outline-light position-relative me-2">
               Carrito
              {cantidadCarrito > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cantidadCarrito}
                </span>
              )}
            </Link>

            {/* Menú Trabajador / Admin */}
            {usuarioAdmin ? (
              <div className="dropdown">
                <button
                  className="btn btn-dark border-warning text-warning dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                   {usuarioAdmin.nombre}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/admin">Panel Gestión</Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={cerrarSesionAdmin}>
                      Cerrar Sesión Admin
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/admin-login" className="btn btn-outline-warning btn-sm me-1">
                Portal Personal
              </Link>
            )}

            {/* Menú Cliente */}
            {usuario ? (
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                   {usuario.nombre}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item text-danger" onClick={cerrarSesion}>
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-warning text-dark fw-bold btn-sm">
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}