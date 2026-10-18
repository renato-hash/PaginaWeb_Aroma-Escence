import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Navbar({ 
  cantidadCarrito, 
  usuario, 
  cerrarSesion, 
  usuarioAdmin, 
  cerrarSesionAdmin,
  busqueda,
  setBusqueda 
}) {
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    if (valor.trim() !== '') {
      navigate('/busqueda');
    }
  };

  const irANosotros = (e) => {
    e.preventDefault();
    const piePagina = document.getElementById('pie-pagina');
    if (piePagina) {
      piePagina.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

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
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categorias">Categorías</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ofertas">Ofertas</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#pie-pagina" onClick={irANosotros}>
                Nosotros
              </a>
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
            <div className="me-2">
              <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Buscar perfume..."
                value={busqueda}
                onChange={manejarCambio}
              />
            </div>

            <Link to="/carrito" className="btn btn-outline-light position-relative me-2">
               Carrito
              {cantidadCarrito > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cantidadCarrito}
                </span>
              )}
            </Link>

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