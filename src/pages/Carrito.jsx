import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validarCuponApi } from '../services/api';

const ENVIO_GRATIS_DESDE = 60000;
const VALOR_ENVIO = 4990;
const KEY_PREMIO_ACTIVO = 'aroma_premio_ruleta';
const KEY_CUPON_APLICADO = 'aroma_cupon_aplicado';

const leerPremioDisponible = () => {
  try {
    const guardado = localStorage.getItem(KEY_PREMIO_ACTIVO);
    if (!guardado) return null;
    const parsed = JSON.parse(guardado);
    if (parsed && parsed.usado !== true && parsed.tipo !== 'nada') return parsed;
    return null;
  } catch (e) {
    return null;
  }
};

const leerCuponAplicado = () => {
  try {
    const guardado = localStorage.getItem(KEY_CUPON_APLICADO);
    if (!guardado) return null;
    const parsed = JSON.parse(guardado);
    const premioActivo = leerPremioDisponible();
    if (parsed && premioActivo && parsed.codigo === premioActivo.codigo) {
      return parsed;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export function Carrito({
  carrito = [],
  productos = [],
  vaciarCarrito,
  eliminarDelCarrito,
  actualizarCantidad,
  mostrarNotificacion
}) {
  const navigate = useNavigate();
  const cuponInputRef = useRef(null);

  const [premioDisponible, setPremioDisponible] = useState(leerPremioDisponible);
  const [cuponAplicado, setCuponAplicado] = useState(leerCuponAplicado);
  const [codigoInput, setCodigoInput] = useState(() => leerCuponAplicado()?.codigo || '');
  const [mensajeCupon, setMensajeCupon] = useState({ tipo: '', texto: '' });
  const [validandoCupon, setValidandoCupon] = useState(false);

  useEffect(() => {
    const sincronizar = () => {
      const disp = leerPremioDisponible();
      setPremioDisponible(disp);
      const apl = leerCuponAplicado();
      setCuponAplicado(apl);
    };
    window.addEventListener('storage', sincronizar);
    const intervalo = setInterval(sincronizar, 1000);
    return () => {
      window.removeEventListener('storage', sincronizar);
      clearInterval(intervalo);
    };
  }, []);

  useEffect(() => {
    const el = cuponInputRef.current;
    if (el) {
      el.style.setProperty('color', '#000000', 'important');
      el.style.setProperty('-webkit-text-fill-color', '#000000', 'important');
      el.style.setProperty('background-color', '#ffffff', 'important');
    }
  }, [codigoInput, cuponAplicado]);

  const handleAplicarCupon = async (codigoManual = null) => {
    const codigoAValidar = (codigoManual ?? codigoInput).trim().toUpperCase();
    if (!codigoAValidar) {
      setMensajeCupon({ tipo: 'error', texto: 'Ingresa un código de cupón.' });
      return;
    }

    const usuarioActivo = JSON.parse(localStorage.getItem('aroma_usuario_activo') || 'null');
    const premioLocal = leerPremioDisponible();
    const emailCuenta = usuarioActivo?.email || premioLocal?.email || '';

    setValidandoCupon(true);
    try {
      // Valida el cupón contra el backend Spring Boot
      const cuponServidor = await validarCuponApi(codigoAValidar, emailCuenta);
      const datosCupon = {
        ...premioLocal,
        ...cuponServidor,
        email: cuponServidor.usuarioEmail || emailCuenta
      };

      localStorage.setItem(KEY_PREMIO_ACTIVO, JSON.stringify(datosCupon));
      localStorage.setItem(KEY_CUPON_APLICADO, JSON.stringify(datosCupon));
      setCuponAplicado(datosCupon);
      setCodigoInput(datosCupon.codigo);
      setMensajeCupon({
        tipo: 'exito',
        texto: `¡Cupón ${datosCupon.codigo} (${datosCupon.texto}) aplicado correctamente!`
      });
      if (mostrarNotificacion) {
        mostrarNotificacion(`¡Cupón ${datosCupon.codigo} aplicado!`);
      }
    } catch (errorApi) {
      // Si el backend responde con error de validación (ej. usado / de otra cuenta)
      const msg = (errorApi.message || '').toLowerCase();
      if (
        msg.includes('existe') ||
        msg.includes('pertenece') ||
        msg.includes('utilizado')
      ) {
        setMensajeCupon({ tipo: 'error', texto: errorApi.message });
      } else if (premioLocal && premioLocal.codigo?.toUpperCase() === codigoAValidar) {
        // Respaldo offline si el servidor está apagado
        localStorage.setItem(KEY_CUPON_APLICADO, JSON.stringify(premioLocal));
        setCuponAplicado(premioLocal);
        setCodigoInput(premioLocal.codigo);
        setMensajeCupon({
          tipo: 'exito',
          texto: `¡Cupón ${premioLocal.codigo} (${premioLocal.texto}) aplicado correctamente!`
        });
        if (mostrarNotificacion) {
          mostrarNotificacion(`¡Cupón ${premioLocal.codigo} aplicado!`);
        }
      } else {
        setMensajeCupon({
          tipo: 'error',
          texto: 'El código ingresado no es válido para tu cuenta.'
        });
      }
    } finally {
      setValidandoCupon(false);
    }
  };

  const handleQuitarCupon = () => {
    localStorage.removeItem(KEY_CUPON_APLICADO);
    setCuponAplicado(null);
    setCodigoInput('');
    setMensajeCupon({ tipo: '', texto: '' });
  };

  const itemsValidados = carrito.map((item) => {
    const mlItem = item.ml || item.tamano || null;
    const prodCatalogo =
      productos.length > 0 ? productos.find((p) => p.id === item.id) : item;
    const eliminadoDelCatalogo = productos.length > 0 && !prodCatalogo;

    let precioActual = prodCatalogo ? Number(prodCatalogo.precio) : Number(item.precio);
    let stockRaw = prodCatalogo?.stock ?? item.stock;

    if (prodCatalogo && mlItem && Array.isArray(prodCatalogo.tamanos)) {
      const variante = prodCatalogo.tamanos.find((t) => t.ml === mlItem);
      if (variante) {
        precioActual = Number(variante.precio);
        stockRaw = variante.stock;
      }
    }

    const tieneControlStock = stockRaw !== undefined && stockRaw !== null;
    const stockDisponible = tieneControlStock ? Number(stockRaw) : 99;

    const sinStock = eliminadoDelCatalogo || (tieneControlStock && stockDisponible <= 0);
    const excedeStock = !sinStock && tieneControlStock && item.cantidad > stockDisponible;
    const precioInvalido = isNaN(precioActual) || precioActual <= 0;

    return {
      ...item,
      mlItem,
      precio: precioActual,
      tieneControlStock,
      stockDisponible,
      eliminadoDelCatalogo,
      sinStock,
      excedeStock,
      precioInvalido,
      esValido:
        !eliminadoDelCatalogo &&
        !sinStock &&
        !excedeStock &&
        !precioInvalido &&
        item.cantidad >= 1
    };
  });

  const subtotal = itemsValidados.reduce(
    (acc, item) => (item.esValido ? acc + item.precio * item.cantidad : acc),
    0
  );

  const porcentajeDescuento =
    cuponAplicado?.tipo === 'porcentaje' && Number(cuponAplicado.valor) > 0
      ? Number(cuponAplicado.valor)
      : 0;

  const montoDescuento =
    porcentajeDescuento > 0 ? Math.round((subtotal * porcentajeDescuento) / 100) : 0;

  const subtotalConDescuento = Math.max(0, subtotal - montoDescuento);

  const tieneEnvioGratisPorCupon = cuponAplicado?.tipo === 'envio_gratis';
  const costoEnvio =
    subtotalConDescuento > 0 &&
    subtotalConDescuento < ENVIO_GRATIS_DESDE &&
    !tieneEnvioGratisPorCupon
      ? VALOR_ENVIO
      : 0;

  const total = subtotalConDescuento + costoEnvio;
  const faltaParaEnvioGratis = tieneEnvioGratisPorCupon
    ? 0
    : Math.max(0, ENVIO_GRATIS_DESDE - subtotalConDescuento);

  const cantidadTotalUnidades = itemsValidados.reduce((acc, item) => acc + item.cantidad, 0);
  const hayErroresEnCarrito = itemsValidados.some((item) => !item.esValido);
  const puedeContinuarPago = itemsValidados.length > 0 && !hayErroresEnCarrito && subtotal > 0;

  const handleVaciarCarrito = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar todos los productos del carrito?')) {
      vaciarCarrito();
    }
  };

  const handleContinuarCheckout = (e) => {
    if (!puedeContinuarPago) {
      e.preventDefault();
      if (mostrarNotificacion) {
        mostrarNotificacion('Corrige los productos con problemas de stock antes de ir a pagar.');
      }
      return;
    }
    navigate('/checkout');
  };

  return (
    <main className="container my-4">
      <section aria-labelledby="titulo-carrito">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 id="titulo-carrito" className="fw-bold text-white mb-0">
            Carrito de Compras / Boleta
          </h2>
          {itemsValidados.length > 0 && (
            <span className="badge bg-secondary fs-6">
              {cantidadTotalUnidades} {cantidadTotalUnidades === 1 ? 'producto' : 'productos'}
            </span>
          )}
        </div>

        {itemsValidados.length === 0 ? (
          <div
            className="alert alert-info d-flex justify-content-between align-items-center"
            role="alert"
          >
            <span>Tu carrito está vacío. Agrega productos desde el catálogo para continuar.</span>
            <Link to="/productos" className="btn btn-primary btn-sm fw-bold">
              Ir al Catálogo
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              {hayErroresEnCarrito && (
                <div className="alert alert-warning fw-semibold" role="alert">
                  Uno o más productos de tu carrito superan el stock disponible actualmente. Ajústalos para continuar con el pago.
                </div>
              )}

              <ul className="list-group mb-3 shadow-sm">
                {itemsValidados.map((item) => {
                  const limiteAlcanzado =
                    item.tieneControlStock && item.cantidad >= item.stockDisponible;
                  const itemKey = `${item.id}-${item.mlItem || 'base'}`;

                  return (
                    <li
                      key={itemKey}
                      className={`list-group-item p-3 ${!item.esValido ? 'list-group-item-danger' : ''}`}
                    >
                      <article className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                        <div>
                          <h6 className="my-0 fw-bold">
                            {item.nombre}{' '}
                            {item.mlItem && (
                              <span className="badge bg-dark ms-1">{item.mlItem}</span>
                            )}
                          </h6>
                          <small className="text-muted d-block">
                            ${item.precio.toLocaleString('es-CL')} c/u
                            {item.tieneControlStock && !item.sinStock && (
                              <span className="ms-2">
                                (Stock disponible: {item.stockDisponible})
                              </span>
                            )}
                          </small>

                          {item.eliminadoDelCatalogo && (
                            <span className="badge bg-danger mt-1">
                              Producto no disponible en el catálogo
                            </span>
                          )}
                          {!item.eliminadoDelCatalogo && item.sinStock && (
                            <span className="badge bg-danger mt-1">
                              Producto agotado (sin stock)
                            </span>
                          )}
                          {item.excedeStock && (
                            <div className="mt-1 d-flex align-items-center gap-2">
                              <span className="badge bg-warning text-dark">
                                Cantidad supera el stock ({item.stockDisponible} máx.)
                              </span>
                              <button
                                type="button"
                                className="btn btn-link btn-sm p-0 text-decoration-underline"
                                onClick={() =>
                                  actualizarCantidad(item.id, item.stockDisponible, item.mlItem)
                                }
                              >
                                Ajustar a {item.stockDisponible}
                              </button>
                            </div>
                          )}
                          {!item.excedeStock && limiteAlcanzado && !item.sinStock && (
                            <small className="text-warning fw-semibold d-block mt-1">
                              Stock máximo alcanzado
                            </small>
                          )}
                        </div>

                        <div className="d-flex align-items-center justify-content-between justify-content-md-end gap-2">
                          <div
                            className="btn-group btn-group-sm me-2"
                            role="group"
                            aria-label={`Cantidad de ${item.nombre}`}
                          >
                            <button
                              type="button"
                              className="btn btn-outline-light"
                              onClick={() =>
                                actualizarCantidad(item.id, item.cantidad - 1, item.mlItem)
                              }
                              aria-label="Disminuir cantidad"
                            >
                              -
                            </button>
                            <span
                              className="btn btn-light disabled fw-bold text-dark"
                              style={{ opacity: 1 }}
                            >
                              {item.cantidad}
                            </span>
                            <button
                              type="button"
                              className="btn btn-outline-light"
                              onClick={() =>
                                actualizarCantidad(item.id, item.cantidad + 1, item.mlItem)
                              }
                              disabled={item.sinStock || limiteAlcanzado}
                              aria-label="Aumentar cantidad"
                            >
                              +
                            </button>
                          </div>

                          <span className="fw-bold me-3">
                            ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                          </span>

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => eliminarDelCarrito(item.id, item.mlItem)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>

              <div className="d-flex justify-content-between">
                <Link to="/productos" className="btn btn-outline-light">
                  Seguir Comprando
                </Link>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleVaciarCarrito}
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>

            <div className="col-lg-4">
              <aside className="card shadow-sm border-0 p-3">
                <div className="card-body">
                  <h5 className="card-title fw-bold">Resumen de Boleta</h5>
                  <hr />

                  <div className="mb-3 p-3 rounded-3 border border-secondary">
                    <label htmlFor="input-cupon-carrito" className="form-label small fw-bold mb-2">
                      🎟️ ¿Tienes un cupón de descuento?
                    </label>

                    {!cuponAplicado ? (
                      <>
                        <div className="input-group input-group-sm">
                          <input
                            ref={cuponInputRef}
                            id="input-cupon-carrito"
                            type="text"
                            className="form-control text-uppercase fw-bold"
                            placeholder="Ej: AROMA15-123"
                            value={codigoInput}
                            onChange={(e) => {
                              setCodigoInput(e.target.value.toUpperCase());
                              if (mensajeCupon.texto) setMensajeCupon({ tipo: '', texto: '' });
                            }}
                          />
                          <button
                            type="button"
                            className="btn btn-warning text-dark fw-bold"
                            disabled={validandoCupon}
                            onClick={() => handleAplicarCupon()}
                          >
                            {validandoCupon ? '...' : 'Aplicar'}
                          </button>
                        </div>

                        {premioDisponible?.codigo && (
                          <div className="mt-2 d-flex justify-content-between align-items-center">
                            <small className="text-warning">
                              Cupón ganado: <strong>{premioDisponible.codigo}</strong>
                            </small>
                            <button
                              type="button"
                              className="btn btn-link btn-sm p-0 text-warning fw-bold"
                              disabled={validandoCupon}
                              onClick={() => handleAplicarCupon(premioDisponible.codigo)}
                            >
                              Usar ahora
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="d-flex justify-content-between align-items-center bg-success bg-opacity-25 border border-success rounded-2 px-2 py-1">
                        <small className="text-success fw-bold">
                          ✓ {cuponAplicado.codigo} ({cuponAplicado.texto})
                        </small>
                        <button
                          type="button"
                          className="btn btn-sm btn-link text-danger p-0 fw-bold text-decoration-none"
                          onClick={handleQuitarCupon}
                        >
                          Quitar
                        </button>
                      </div>
                    )}

                    {mensajeCupon.texto && (
                      <small
                        className={`d-block mt-1 fw-semibold ${
                          mensajeCupon.tipo === 'error' ? 'text-danger' : 'text-success'
                        }`}
                      >
                        {mensajeCupon.texto}
                      </small>
                    )}
                  </div>

                  <div className="d-flex justify-content-between mb-2 text-muted">
                    <span>Productos ({cantidadTotalUnidades}):</span>
                    <span>${subtotal.toLocaleString('es-CL')}</span>
                  </div>

                  {cuponAplicado && montoDescuento > 0 && (
                    <div className="d-flex justify-content-between mb-2 text-success fw-bold">
                      <span>Descuento ({cuponAplicado.codigo}):</span>
                      <span>-${montoDescuento.toLocaleString('es-CL')}</span>
                    </div>
                  )}

                  <div className="d-flex justify-content-between mb-3">
                    <span>Envío:</span>
                    {costoEnvio === 0 ? (
                      <span className="text-success fw-bold">
                        GRATIS {tieneEnvioGratisPorCupon ? `(${cuponAplicado.codigo})` : ''}
                      </span>
                    ) : (
                      <span className="fw-semibold">
                        ${costoEnvio.toLocaleString('es-CL')}
                      </span>
                    )}
                  </div>

                  {faltaParaEnvioGratis > 0 && (
                    <div
                      className="small text-warning mb-3 p-2 rounded-3"
                      style={{
                        backgroundColor: 'rgba(255, 193, 7, 0.12)',
                        border: '1px solid rgba(255, 193, 7, 0.35)'
                      }}
                    >
                      <i className="fa-solid fa-truck-fast me-1" aria-hidden="true"></i>
                      Agrega <strong>${faltaParaEnvioGratis.toLocaleString('es-CL')}</strong> más
                      para tener <strong>envío GRATIS</strong>.
                    </div>
                  )}

                  <hr />
                  <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
                    <span>Total:</span>
                    <span className="text-success">${total.toLocaleString('es-CL')}</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-success w-100 py-2 fw-bold"
                    onClick={handleContinuarCheckout}
                    disabled={!puedeContinuarPago}
                  >
                    Ir al Checkout / Pagar
                  </button>
                </div>
              </aside>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}