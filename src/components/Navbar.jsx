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

  const handleCerrarSesionCliente = () => {
    cerrarSesion();
    navigate('/');
  };

  const handleCerrarSesionAdmin = () => {
    cerrarSesionAdmin();
    navigate('/');
  };

  const esOperadorActivo = Boolean(usuarioAdmin && !usuario);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-2">
        <div className="container-fluid px-3 px-xl-5">
          <Link className="navbar-brand fw-bold text-warning text-nowrap me-3" to="/">
            Aroma &amp; Esencia
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Abrir menú de navegación"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-1">
              <li className="nav-item">
                <Link className="nav-link text-nowrap px-2" to="/">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-nowrap px-2" to="/productos">
                  Catálogo
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-nowrap px-2" to="/categorias">
                  Categorías
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-nowrap px-2" to="/ofertas">
                  Ofertas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-nowrap px-2" to="/match">
                  Perfume Match
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-nowrap px-2" to="/nosotros">
                  Nosotros
                </Link>
              </li>
              {esOperadorActivo && (
                <li className="nav-item">
                  <Link className="nav-link text-warning fw-bold text-nowrap px-2" to="/admin">
                    <i className="fa-solid fa-screwdriver-wrench me-1" aria-hidden="true"></i>
                    Panel Admin
                  </Link>
                </li>
              )}
            </ul>

            <div className="d-flex flex-wrap flex-lg-nowrap align-items-center gap-2 mt-2 mt-lg-0">
              <div style={{ width: '175px' }}>
                <input
                  type="search"
                  className="form-control form-control-sm"
                  placeholder="Buscar perfume..."
                  aria-label="Buscar perfume"
                  value={busqueda}
                  onChange={manejarCambio}
                />
              </div>

              {!esOperadorActivo && (
                <Link
                  to="/carrito"
                  className="btn btn-outline-light btn-sm position-relative d-inline-flex align-items-center justify-content-center px-2"
                  aria-label="Ver carrito de compras"
                  title="Carrito de compras"
                >
                  <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i>
                  {cantidadCarrito > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cantidadCarrito}
                    </span>
                  )}
                </Link>
              )}

              {!usuario &&
                (esOperadorActivo ? (
                  <div className="dropdown">
                    <button
                      className="btn btn-dark border-warning text-warning btn-sm text-nowrap dropdown-toggle d-inline-flex align-items-center"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-user-shield me-1" aria-hidden="true"></i>
                      {usuarioAdmin.nombre}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <Link className="dropdown-item" to="/admin">
                          Panel Gestión
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item text-danger"
                          onClick={handleCerrarSesionAdmin}
                        >
                          Cerrar Sesión Admin
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link
                    to="/admin-login"
                    className="btn btn-outline-warning btn-sm text-nowrap d-inline-flex align-items-center"
                  >
                    <i className="fa-solid fa-user-shield me-1" aria-hidden="true"></i>
                    Portal Personal
                  </Link>
                ))}

              {!esOperadorActivo &&
                (usuario ? (
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary btn-sm text-nowrap dropdown-toggle d-inline-flex align-items-center"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-user me-1" aria-hidden="true"></i>
                      {usuario.nombre}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <button
                          type="button"
                          className="dropdown-item text-danger"
                          onClick={handleCerrarSesionCliente}
                        >
                          Cerrar Sesión
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="btn btn-warning text-dark fw-bold btn-sm text-nowrap d-inline-flex align-items-center"
                  >
                    <i className="fa-solid fa-right-to-bracket me-1" aria-hidden="true"></i>
                    Iniciar Sesión
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}