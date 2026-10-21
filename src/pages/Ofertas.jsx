// src/pages/Ofertas.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function TarjetaOferta({ prod, agregarAlCarrito }) {
  const [tamanoSeleccionado, setTamanoSeleccionado] = useState(() => {
    if (prod.tamanos && prod.tamanos.length > 0) {
      return prod.tamanos.find((t) => t.ml === '100 ml') || prod.tamanos[0];
    }
    return null;
  });

  const precioBase = tamanoSeleccionado ? tamanoSeleccionado.precio : prod.precio;
  
  // 🎯 Redondeo a número terminado en 90
  const precioConDescuento = Math.floor((precioBase * 0.80) / 100) * 100 + 90;

  const handleAprovechar = () => {
    const productoParaCarrito = {
      ...prod,
      id: tamanoSeleccionado ? `${prod.id}-${tamanoSeleccionado.ml}-oferta` : `${prod.id}-oferta`,
      nombre: tamanoSeleccionado 
        ? `${prod.nombre} (${tamanoSeleccionado.ml}) - 20% OFF` 
        : `${prod.nombre} - 20% OFF`,
      precio: precioConDescuento,
      precioOriginal: precioBase,
      stock: tamanoSeleccionado ? tamanoSeleccionado.stock : (prod.stock || 10)
    };

    agregarAlCarrito(productoParaCarrito);
  };

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm product-card border-danger position-relative bg-white rounded-4 overflow-hidden">
        
        <span 
          className="position-absolute top-0 end-0 bg-danger text-white fw-bold px-3 py-1 rounded-start mt-3 shadow-sm" 
          style={{ zIndex: 5, fontSize: '0.85rem' }}
        >
          20% OFF
        </span>

        <img
          src={prod.imagen}
          className="card-img-top p-3"
          alt={prod.nombre}
          style={{ height: '220px', objectFit: 'contain' }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600';
          }}
        />

        <div className="card-body d-flex flex-column p-4">
          <span className="badge bg-secondary mb-2 align-self-start">{prod.categoria || 'Perfumes'}</span>
          <h5 className="fw-bold mb-1 text-dark">{prod.nombre}</h5>
          <p className="text-muted small flex-grow-1 mb-3 text-truncate">{prod.descripcion}</p>

          {prod.tamanos && prod.tamanos.length > 0 && (
            <div className="mb-3">
              <label className="form-label small fw-bold text-dark mb-1">Tamaño:</label>
              <select
                className="form-select form-select-sm rounded-3 fw-semibold border-secondary shadow-sm"
                value={tamanoSeleccionado ? tamanoSeleccionado.ml : ''}
                onChange={(e) => {
                  const tam = prod.tamanos.find((t) => t.ml === e.target.value);
                  if (tam) setTamanoSeleccionado(tam);
                }}
              >
                {prod.tamanos.map((t, idx) => (
                  <option key={idx} value={t.ml}>
                    {t.ml} ({t.stock} un. disponibles)
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
            <div>
              <span className="text-muted text-decoration-line-through small me-2">
                ${precioBase.toLocaleString('es-CL')}
              </span>
              <span className="fw-bold text-danger fs-5">
                ${precioConDescuento.toLocaleString('es-CL')}
              </span>
            </div>

            <div className="d-flex gap-2">
              <Link 
                to={`/producto/${prod.id}`} 
                className="btn btn-outline-dark btn-sm rounded-pill px-2"
              >
                Detalle
              </Link>
              <button 
                className="btn btn-danger btn-sm rounded-pill px-3 fw-bold shadow-sm" 
                onClick={handleAprovechar}
              >
                + Aprovechar
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export function Ofertas({ productos, agregarAlCarrito }) {
  const ofertas = productos.slice(0, 6);

  return (
    <div className="container my-5">
      <div className="bg-danger text-white p-4 p-md-5 rounded-4 mb-5 text-center shadow-sm">
        <h2 className="fw-bold mb-2">¡Ofertas Especiales de Temporada!</h2>
        <p className="mb-0 fs-5">Aprovecha hasta un 20% de descuento en artículos seleccionados.</p>
      </div>

      <div className="row g-4">
        {ofertas.map((prod) => (
          <TarjetaOferta 
            key={prod.id} 
            prod={prod} 
            agregarAlCarrito={agregarAlCarrito} 
          />
        ))}
      </div>
    </div>
  );
}

export default Ofertas;