import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ResenasProducto } from '../components/ResenasProducto';

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

export function DetalleProducto({
  productos = [],
  agregarAlCarrito,
  usuario,
  mostrarNotificacion
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const piramideRef = useRef(null);

  const producto = productos.find(
    (p) => String(p.id) === String(id) || String(id).startsWith(`${p.id}-`)
  );
  const [tamanoSeleccionado, setTamanoSeleccionado] = useState(null);

  useEffect(() => {
    if (producto && Array.isArray(producto.tamanos) && producto.tamanos.length > 0) {
      const defaultTam =
        producto.tamanos.find((t) => t.ml === '100 ml') || producto.tamanos[0];
      setTamanoSeleccionado(defaultTam);
    } else {
      setTamanoSeleccionado(null);
    }
  }, [producto]);

  useEffect(() => {
    const contenedor = piramideRef.current;
    if (!contenedor) return;

    contenedor.querySelectorAll('.texto-piramide-negro').forEach((el) => {
      el.style.setProperty('color', '#000000', 'important');
      el.style.setProperty('-webkit-text-fill-color', '#000000', 'important');
      el.style.setProperty('opacity', '1', 'important');
    });
  }, [producto]);

  if (!producto) {
    return (
      <main className="container my-5 text-center py-5">
        <section>
          <h2 className="fw-bold mb-3">Producto no encontrado</h2>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-dark rounded-pill px-4 py-2"
          >
            <i className="fa-solid fa-arrow-left me-2" aria-hidden="true"></i>
            Volver al catálogo
          </button>
        </section>
      </main>
    );
  }

  const esOferta = Number(producto.id) <= 6;
  const acordesLista = producto.acordes || ['fresco', 'amaderado', 'aromático'];

  const precioBase = tamanoSeleccionado
    ? Number(tamanoSeleccionado.precio)
    : Number(producto.precio);

  const precioFinal = esOferta
    ? Math.floor((precioBase * 0.8) / 100) * 100 + 90
    : precioBase;

  const stockActual = tamanoSeleccionado
    ? Number(tamanoSeleccionado.stock)
    : Number(producto.stock ?? 0);

  const handleAgregarAlCarrito = () => {
    if (stockActual <= 0) return;

    const mlActual = tamanoSeleccionado ? tamanoSeleccionado.ml : null;

    const productoParaCarrito = {
      ...producto,
      id: producto.id,
      ml: mlActual,
      tamano: mlActual,
      precio: precioFinal,
      precioOriginal: precioBase,
      stock: stockActual,
      nombre: mlActual
        ? `${producto.nombre} (${mlActual})${esOferta ? ' - 20% OFF' : ''}`
        : `${producto.nombre}${esOferta ? ' - 20% OFF' : ''}`
    };

    agregarAlCarrito(productoParaCarrito);
  };

  return (
    <main className="container my-5">
      <style>{`
        html body main .piramide-olfativa-negra .texto-piramide-negro,
        html body main .piramide-olfativa-negra strong,
        html body main .piramide-olfativa-negra div {
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          opacity: 1 !important;
        }
      `}</style>

      <section
        aria-labelledby="titulo-detalle-producto"
        className="card shadow-lg p-4 p-md-5 border-0 rounded-4 bg-white position-relative"
      >
        {esOferta && (
          <span
            className="position-absolute top-0 end-0 bg-danger text-white fw-bold px-3 py-2 rounded-start mt-4 shadow-sm"
            style={{ zIndex: 5, fontSize: '0.9rem' }}
          >
            20% OFF
          </span>
        )}

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
            <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
            <span>Volver al catálogo</span>
          </button>
        </div>

        <article className="row g-5 align-items-center">
          <div className="col-12 col-md-5 text-center">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="img-fluid rounded-4 p-2"
              style={{ maxHeight: '480px', objectFit: 'contain' }}
              onError={(e) => {
                e.target.src =
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyOLUnP_BwhZdu4mFK-HJnYiKNm8DXXhp-zn0JRknOg7XJwb4Nan12v_Y&s=10';
              }}
            />
          </div>

          <div className="col-12 col-md-7">
            <div className="text-center text-md-start mb-3">
              <span
                className="text-uppercase fw-bold text-dark d-block mb-1"
                style={{ letterSpacing: '4px', fontSize: '1.3rem' }}
              >
                {producto.marca || 'PERFUMES'}
              </span>
              <small
                className="text-muted text-uppercase fw-semibold"
                style={{ letterSpacing: '2px', fontSize: '0.75rem' }}
              >
                PARFUMS
              </small>
            </div>

            <div className="my-4">
              <p className="text-muted text-center text-md-start small mb-3 fw-semibold">
                acordes principales
              </p>

              <div className="d-flex flex-column gap-1 align-items-center align-items-md-start">
                {acordesLista.map((acorde, index) => {
                  const nombreLimpio = acorde.toLowerCase().trim();
                  const estiloColor = COLORES_ACORDES[nombreLimpio] || {
                    bg: '#6c757d',
                    text: '#ffffff'
                  };
                  const porcentajeAncho = Math.max(100 - index * 8, 45);

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

            <h2 id="titulo-detalle-producto" className="fw-bold mb-2 text-dark">
              {producto.nombre}
            </h2>

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
                <h3 className="text-success fw-bold">${precioFinal.toLocaleString('es-CL')}</h3>
              )}
            </div>

            {Array.isArray(producto.tamanos) && producto.tamanos.length > 0 && (
              <div className="mb-4">
                <label htmlFor="select-tamano-perfume" className="form-label fw-bold text-dark mb-1">
                  Tamaño
                </label>
                <select
                  id="select-tamano-perfume"
                  className="form-select form-select-lg border-secondary rounded-3 fw-semibold shadow-sm"
                  style={{ maxWidth: '320px', cursor: 'pointer' }}
                  value={tamanoSeleccionado ? tamanoSeleccionado.ml : ''}
                  onChange={(e) => {
                    const tamEncontrado = producto.tamanos.find(
                      (t) => t.ml === e.target.value
                    );
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

            {producto.notas && (
              <div
                ref={piramideRef}
                className="piramide-olfativa-negra card bg-light border-0 rounded-4 p-3 mb-4"
              >
                <h6 className="fw-bold mb-2 texto-piramide-negro" style={{ color: '#000000' }}>
                  <i className="fa-solid fa-flask me-2 text-warning" aria-hidden="true"></i>
                  Pirámide Olfativa
                </h6>
                <div className="small texto-piramide-negro" style={{ color: '#000000' }}>
                  <div className="mb-1 texto-piramide-negro" style={{ color: '#000000' }}>
                    <strong className="texto-piramide-negro" style={{ color: '#000000' }}>
                      Salida:
                    </strong>{' '}
                    {producto.notas.salida}
                  </div>
                  <div className="mb-1 texto-piramide-negro" style={{ color: '#000000' }}>
                    <strong className="texto-piramide-negro" style={{ color: '#000000' }}>
                      Corazón:
                    </strong>{' '}
                    {producto.notas.corazon}
                  </div>
                  <div className="texto-piramide-negro" style={{ color: '#000000' }}>
                    <strong className="texto-piramide-negro" style={{ color: '#000000' }}>
                      Fondo:
                    </strong>{' '}
                    {producto.notas.fondo}
                  </div>
                </div>
              </div>
            )}

            <p className="mb-3 text-muted small">
              <strong>Stock disponible:</strong>{' '}
              {stockActual > 0 ? (
                <>
                  {stockActual} unidades{' '}
                  {tamanoSeleccionado ? `para ${tamanoSeleccionado.ml}` : ''}
                </>
              ) : (
                <span className="text-danger fw-bold">Sin stock disponible</span>
              )}
            </p>

            <button
              type="button"
              className={`btn btn-lg rounded-pill w-100 fw-bold shadow-sm py-2 ${
                stockActual <= 0 ? 'btn-secondary' : esOferta ? 'btn-danger' : 'btn-success'
              }`}
              onClick={handleAgregarAlCarrito}
              disabled={stockActual <= 0}
            >
              <i className="fa-solid fa-cart-plus me-2" aria-hidden="true"></i>
              {stockActual <= 0 ? 'Producto Agotado' : 'Agregar al Carrito'}
            </button>
          </div>
        </article>
      </section>

      <ResenasProducto
        productoId={producto.id}
        nombreProducto={producto.nombre}
        usuario={usuario}
        mostrarNotificacion={mostrarNotificacion}
      />
    </main>
  );
}

export default DetalleProducto;