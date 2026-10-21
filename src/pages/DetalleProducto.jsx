// src/pages/DetalleProducto.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// 🎨 Mapa de colores para los Acordes Principales
const COLORES_ACORDES = {
  'cálido especiado': { bg: '#d02c00', text: '#ffffff' },
  'fresco especiado': { bg: '#83b82a', text: '#ffffff' },
  'dulce': { bg: '#f24251', text: '#ffffff' },
  'ámbar': { bg: '#c86a37', text: '#ffffff' },
  'amaderado': { bg: '#8c6243', text: '#ffffff' },
  'caramelo': { bg: '#e8be89', text: '#333333' },
  'aromático': { bg: '#60a3bc', text: '#ffffff' },
  'cítrico': { bg: '#f1c40f', text: '#333333' },
  'fresco': { bg: '#2ecc71', text: '#ffffff' },
  'floral': { bg: '#e84393', text: '#ffffff' },
  'blanco floral': { bg: '#f8efba', text: '#333333' },
  'vainilla': { bg: '#f39c12', text: '#ffffff' },
  'afrutado': { bg: '#e67e22', text: '#ffffff' },
  'tropical': { bg: '#ff7675', text: '#ffffff' },
  'cuero': { bg: '#5c3d2e', text: '#ffffff' },
  'marino': { bg: '#00cec9', text: '#ffffff' },
  'acuático': { bg: '#74b9ff', text: '#ffffff' },
  'incienso': { bg: '#636e72', text: '#ffffff' },
  'ahumado': { bg: '#2d3436', text: '#ffffff' },
  'terroso': { bg: '#795548', text: '#ffffff' },
  'musgoso': { bg: '#00b894', text: '#ffffff' },
  'atalcado': { bg: '#e0a96d', text: '#ffffff' },
  'verde': { bg: '#27ae60', text: '#ffffff' },
  'herbal': { bg: '#10ac84', text: '#ffffff' },
  'ron': { bg: '#d35400', text: '#ffffff' },
  'licoroso': { bg: '#8e44ad', text: '#ffffff' },
  'canela': { bg: '#b71540', text: '#ffffff' },
  'café': { bg: '#4e342e', text: '#ffffff' },
  'pachulí': { bg: '#6d4c41', text: '#ffffff' },
  'lavanda': { bg: '#a29bfe', text: '#ffffff' },
  'almendra': { bg: '#ffeaa7', text: '#333333' },
  'ozónico': { bg: '#81ecec', text: '#333333' },
  'rosa': { bg: '#fd79a8', text: '#ffffff' },
  'tabaco': { bg: '#a0522d', text: '#ffffff' }
};

export function DetalleProducto({ productos, agregarAlCarrito }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Limpia el ID en caso de venir con sufijos de oferta
  const idLimpio = String(id).split('-')[0];
  const producto = productos.find((p) => String(p.id) === idLimpio);

  const [tamanoSeleccionado, setTamanoSeleccionado] = useState(null);

  useEffect(() => {
    if (producto && producto.tamanos && producto.tamanos.length > 0) {
      const defaultTam = producto.tamanos.find(t => t.ml === '100 ml') || producto.tamanos[0];
      setTamanoSeleccionado(defaultTam);
    } else {
      setTamanoSeleccionado(null);
    }
  }, [producto]);

  if (!producto) {
    return (
      <div className="container my-5 text-center py-5">
        <h2 className="fw-bold mb-3">Producto no encontrado</h2>
        <button 
          onClick={() => navigate('/')} 
          className="btn btn-dark rounded-pill px-4 py-2"
        >
          Volver al catálogo
        </button>
      </div>
    );
  }

  // Detecta si es un producto promocional (ID <= 6)
  const esOferta = Number(producto.id) <= 6;

  const acordesLista = producto.acordes || ['fresco', 'amaderado', 'aromático'];

  const precioBase = tamanoSeleccionado ? tamanoSeleccionado.precio : producto.precio;
  
  // 🎯 Redondeo comercial terminado en 90 para ofertas
  const precioFinal = esOferta ? (Math.floor((precioBase * 0.80) / 100) * 100 + 90) : precioBase;
  const stockActual = tamanoSeleccionado ? tamanoSeleccionado.stock : (producto.stock || 10);

  const handleAgregarAlCarrito = () => {
    const productoParaCarrito = {
      ...producto,
      id: esOferta 
        ? `${producto.id}-${tamanoSeleccionado ? tamanoSeleccionado.ml : 'std'}-oferta`
        : `${producto.id}-${tamanoSeleccionado ? tamanoSeleccionado.ml : 'std'}`,
      precio: precioFinal,
      precioOriginal: precioBase,
      stock: stockActual,
      nombre: tamanoSeleccionado 
        ? `${producto.nombre} (${tamanoSeleccionado.ml})${esOferta ? ' - 20% OFF' : ''}` 
        : `${producto.nombre}${esOferta ? ' - 20% OFF' : ''}`
    };
    agregarAlCarrito(productoParaCarrito);
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4 p-md-5 border-0 rounded-4 bg-white position-relative">
        
        {/* Badge 20% OFF */}
        {esOferta && (
          <span 
            className="position-absolute top-0 end-0 bg-danger text-white fw-bold px-3 py-2 rounded-start mt-4 shadow-sm" 
            style={{ zIndex: 5, fontSize: '0.9rem' }}
          >
            20% OFF
          </span>
        )}

        {/* Botón Volver totalmente activo en todo el recuadro */}
        <div className="mb-4 d-flex justify-content-start">
          <button 
            type="button"
            onClick={() => navigate('/')} 
            className="btn btn-outline-dark rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 fw-semibold shadow-sm border-2"
            style={{ 
              cursor: 'pointer', 
              userSelect: 'none',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <span style={{ fontSize: '1.1rem', lineHeight: '1' }}>&larr;</span>
            <span>Volver al catálogo</span>
          </button>
        </div>

        <div className="row g-5 align-items-center">
          
          {/* Imagen del Perfume */}
          <div className="col-12 col-md-5 text-center">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="img-fluid rounded-4 p-2"
              style={{ maxHeight: '480px', objectFit: 'contain' }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600';
              }}
            />
          </div>

          {/* Información y Variaciones */}
          <div className="col-12 col-md-7">
            
            <div className="text-center text-md-start mb-3">
              <span 
                className="text-uppercase fw-bold text-dark d-block mb-1" 
                style={{ letterSpacing: '4px', fontSize: '1.3rem' }}
              >
                {producto.marca || 'PERFUMES'}
              </span>
              <small className="text-muted text-uppercase fw-semibold" style={{ letterSpacing: '2px', fontSize: '0.75rem' }}>
                PARFUMS
              </small>
            </div>

            {/* Acordes Principales */}
            <div className="my-4">
              <p className="text-muted text-center text-md-start small mb-3 fw-semibold">
                acordes principales
              </p>

              <div className="d-flex flex-column gap-1 align-items-center align-items-md-start">
                {acordesLista.map((acorde, index) => {
                  const nombreLimpio = acorde.toLowerCase().trim();
                  const estiloColor = COLORES_ACORDES[nombreLimpio] || { bg: '#6c757d', text: '#ffffff' };
                  const porcentajeAncho = Math.max(100 - (index * 8), 45);

                  return (
                    <div
                      key={index}
                      className="d-flex align-items-center justify-content-center fw-bold shadow-sm"
                      style={{
                        backgroundColor: estiloColor.bg,
                        color: estiloColor.text,
                        width: `${porcentajeAncho}%`,
                        height: '28px',
                        borderRadius: '0 8px 8px 0',
                        fontSize: '0.85rem',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {nombreLimpio}
                    </div>
                  );
                })}
              </div>
            </div>

            <h2 className="fw-bold mb-2 text-dark">{producto.nombre}</h2>
            
            {/* Visualización de Precios */}
            <div className="mb-3">
              {esOferta ? (
                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted text-decoration-line-through fs-5">
                    ${precioBase.toLocaleString('es-CL')}
                  </span>
                  <span className="text-danger fw-bold display-6">
                    ${precioFinal.toLocaleString('es-CL')}
                  </span>
                </div>
              ) : (
                <h3 className="text-success fw-bold">
                  ${precioFinal.toLocaleString('es-CL')}
                </h3>
              )}
            </div>

            {/* Selector de Tamaño */}
            {producto.tamanos && producto.tamanos.length > 0 && (
              <div className="mb-4">
                <label className="form-label fw-bold text-dark mb-1">Tamaño</label>
                <select
                  className="form-select form-select-lg border-secondary rounded-3 fw-semibold shadow-sm"
                  style={{ maxWidth: '320px', cursor: 'pointer' }}
                  value={tamanoSeleccionado ? tamanoSeleccionado.ml : ''}
                  onChange={(e) => {
                    const tamEncontrado = producto.tamanos.find(t => t.ml === e.target.value);
                    if (tamEncontrado) setTamanoSeleccionado(tamEncontrado);
                  }}
                >
                  {producto.tamanos.map((tam, idx) => (
                    <option key={idx} value={tam.ml}>
                      {tam.ml} ({tam.stock} un. disponibles)
                    </option>
                  ))}
                </select>
              </div>
            )}

            <p className="text-muted small mb-4">
              {producto.descripcionLarga || producto.descripcion}
            </p>

            {/* Pirámide Olfativa */}
            {producto.notas && (
              <div className="card bg-light border-0 rounded-4 p-3 mb-4">
                <h6 className="fw-bold text-dark mb-2">Pirámide Olfativa</h6>
                <div className="small text-muted">
                  <div className="mb-1"><strong>Salida:</strong> {producto.notas.salida}</div>
                  <div className="mb-1"><strong>Corazón:</strong> {producto.notas.corazon}</div>
                  <div><strong>Fondo:</strong> {producto.notas.fondo}</div>
                </div>
              </div>
            )}

            <p className="mb-3 text-muted small">
              <strong>Stock disponible:</strong> {stockActual} unidades {tamanoSeleccionado ? `para ${tamanoSeleccionado.ml}` : ''}
            </p>

            <button 
              className={`btn btn-lg rounded-pill w-100 fw-bold shadow-sm py-2 ${esOferta ? 'btn-danger' : 'btn-success'}`}
              onClick={handleAgregarAlCarrito}
            >
              + Agregar al Carrito
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default DetalleProducto;