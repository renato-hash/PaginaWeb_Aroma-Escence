import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export function Productos({ productos = [], agregarAlCarrito }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const marcaUrl = searchParams.get('marca') || 'Todas';

  const [busqueda, setBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [marcaActiva, setMarcaActiva] = useState(marcaUrl);

  useEffect(() => {
    setMarcaActiva(searchParams.get('marca') || 'Todas');
  }, [searchParams]);

  const categorias = [
    'Todas',
    ...Array.from(new Set(productos.map((prod) => prod.categoria).filter(Boolean)))
  ];

  const marcasDisponibles = [
    'Todas',
    ...Array.from(
      new Set([
        'Jean Paul Gaultier',
        'Lattafa',
        'Chanel',
        'Maison Francis Kurkdjian',
        'Dior',
        'Jimmy Choo',
        ...productos.map((prod) => prod.marca).filter(Boolean)
      ])
    )
  ];

  const seleccionarMarca = (marca) => {
    setMarcaActiva(marca);
    if (marca === 'Todas') {
      searchParams.delete('marca');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ marca });
    }
  };

  const obtenerStockProducto = (prod) => {
    if (Array.isArray(prod.tamanos) && prod.tamanos.length > 0) {
      return Number(prod.tamanos[0].stock ?? 0);
    }
    return Number(prod.stock ?? 0);
  };

  const productosFiltrados = productos.filter((prod) => {
    const coincideCategoria =
      categoriaActiva === 'Todas' || prod.categoria === categoriaActiva;

    const marcaBuscada = marcaActiva.toLowerCase();
    const coincideMarca =
      marcaActiva === 'Todas' ||
      prod.marca?.toLowerCase().includes(marcaBuscada) ||
      prod.nombre?.toLowerCase().includes(marcaBuscada) ||
      prod.descripcion?.toLowerCase().includes(marcaBuscada);

    const texto = busqueda.toLowerCase();
    const coincideTexto =
      prod.nombre?.toLowerCase().includes(texto) ||
      prod.marca?.toLowerCase().includes(texto) ||
      prod.descripcion?.toLowerCase().includes(texto);

    return coincideCategoria && coincideMarca && coincideTexto;
  });

  return (
    <main className="container my-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h1 className="fw-bold text-white mb-1">
            {marcaActiva !== 'Todas' ? `Perfumes ${marcaActiva}` : 'Catálogo Completo'}
          </h1>
          <p className="text-light opacity-75 small m-0">
            Mostrando {productosFiltrados.length} de {productos.length} fragancias disponibles
          </p>
        </div>

        <div style={{ minWidth: '260px' }}>
          <input
            type="search"
            className="form-control bg-dark text-white border-secondary rounded-pill px-3"
            placeholder="Buscar perfume o marca..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            aria-label="Buscar perfume"
          />
        </div>
      </div>

      {/* Filtro rápido por Marcas */}
      <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
        <span className="text-warning small fw-bold me-1">Marcas:</span>
        {marcasDisponibles.map((marca) => (
          <button
            key={marca}
            type="button"
            className={`btn btn-sm rounded-pill fw-semibold px-3 ${
              marcaActiva.toLowerCase() === marca.toLowerCase()
                ? 'btn-warning text-dark'
                : 'btn-outline-light'
            }`}
            onClick={() => seleccionarMarca(marca)}
          >
            {marca}
          </button>
        ))}
      </div>

      {/* Filtro por Categorías */}
      {categorias.length > 1 && (
        <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
          <span className="text-light opacity-75 small fw-bold me-1">Categorías:</span>
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`btn btn-sm rounded-pill fw-semibold px-3 ${
                categoriaActiva === cat ? 'btn-success text-white' : 'btn-outline-secondary text-light'
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
              seleccionarMarca('Todas');
            }}
          >
            Ver todas las marcas y productos
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
                    <div className="d-flex flex-wrap gap-1 mb-2">
                      <span className="badge bg-secondary">
                        {prod.categoria || 'Perfumes'}
                      </span>
                      {prod.marca && (
                        <span className="badge bg-dark text-warning">{prod.marca}</span>
                      )}
                    </div>
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