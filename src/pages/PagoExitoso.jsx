import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function PagoExitoso() {
  const location = useLocation();
  const contenedorRef = useRef(null);

  const orden = React.useMemo(() => {
    if (location.state?.orden) {
      return location.state.orden;
    }
    try {
      const guardada = localStorage.getItem('aroma_ultima_orden');
      return guardada ? JSON.parse(guardada) : null;
    } catch (e) {
      return null;
    }
  }, [location.state]);

  useEffect(() => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;

    contenedor.querySelectorAll('.texto-boleta-blanco').forEach((el) => {
      el.style.setProperty('color', '#ffffff', 'important');
      el.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
      el.style.setProperty('opacity', '1', 'important');
    });

    contenedor.querySelectorAll('.texto-total-oscuro').forEach((el) => {
      el.style.setProperty('color', '#111827', 'important');
      el.style.setProperty('-webkit-text-fill-color', '#111827', 'important');
      el.style.setProperty('opacity', '1', 'important');
    });
  }, [orden]);

  if (!orden) {
    return (
      <main ref={contenedorRef} className="container my-5 py-5 text-center pantalla-pago-exitoso">
        <style>{`
          html body main.pantalla-pago-exitoso .texto-boleta-blanco {
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
            opacity: 1 !important;
          }
        `}</style>
        <section
          className="card shadow-sm border-0 p-5 rounded-4 mx-auto"
          style={{ maxWidth: '650px' }}
        >
          <h2 className="fw-bold mb-3 texto-boleta-blanco" style={{ color: '#ffffff' }}>
            No hay una orden reciente
          </h2>
          <p className="mb-4 texto-boleta-blanco" style={{ color: '#ffffff' }}>
            Aún no has realizado una compra en esta sesión.
          </p>
          <Link to="/" className="btn btn-success fw-bold py-2 px-4 rounded-3">
            Volver a la Tienda
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main ref={contenedorRef} className="container my-5 pantalla-pago-exitoso">
      <style>{`
        html body main.pantalla-pago-exitoso .card .texto-boleta-blanco,
        html body main.pantalla-pago-exitoso .texto-boleta-blanco,
        html body main.pantalla-pago-exitoso .list-group-item .texto-boleta-blanco {
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          opacity: 1 !important;
        }
        html body main.pantalla-pago-exitoso .bg-light .texto-total-oscuro,
        html body main.pantalla-pago-exitoso .texto-total-oscuro {
          color: #111827 !important;
          -webkit-text-fill-color: #111827 !important;
          opacity: 1 !important;
        }
      `}</style>

      <section
        aria-labelledby="titulo-compra-exitosa"
        className="card shadow border-0 p-4 p-md-5 rounded-4 mx-auto"
        style={{ maxWidth: '780px' }}
      >
        <div className="text-center mb-4">
          <div
            className="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-3 mb-3 shadow-sm"
            style={{ width: '56px', height: '56px', fontSize: '2rem' }}
            aria-hidden="true"
          >
            <i className="fa-solid fa-check"></i>
          </div>
          <h2
            id="titulo-compra-exitosa"
            className="fw-bold mb-1 texto-boleta-blanco"
            style={{ color: '#ffffff' }}
          >
            ¡Se ha realizado la compra con éxito!
          </h2>
          <p className="mb-0 texto-boleta-blanco" style={{ color: '#ffffff' }}>
            Orden de compra Nº <strong className="texto-boleta-blanco">#{orden.numeroOrden}</strong>
            {orden.fecha && <span className="ms-2 texto-boleta-blanco">• {orden.fecha}</span>}
          </p>
        </div>

        <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.2)' }} />

        <article className="mb-4">
          <h5 className="fw-bold mb-3 texto-boleta-blanco" style={{ color: '#ffffff' }}>
            Datos del despacho y boleta:
          </h5>
          {orden.cliente?.rut && (
            <p className="mb-1 texto-boleta-blanco" style={{ color: '#ffffff' }}>
              <strong className="texto-boleta-blanco">RUT:</strong> {orden.cliente.rut}
            </p>
          )}
          <p className="mb-1 texto-boleta-blanco" style={{ color: '#ffffff' }}>
            <strong className="texto-boleta-blanco">Nombre:</strong> {orden.cliente?.nombre}
          </p>
          <p className="mb-1 texto-boleta-blanco" style={{ color: '#ffffff' }}>
            <strong className="texto-boleta-blanco">Correo:</strong> {orden.cliente?.email}
          </p>
          {orden.cliente?.telefono && (
            <p className="mb-1 texto-boleta-blanco" style={{ color: '#ffffff' }}>
              <strong className="texto-boleta-blanco">Teléfono:</strong> {orden.cliente.telefono}
            </p>
          )}
          <p className="mb-1 texto-boleta-blanco" style={{ color: '#ffffff' }}>
            <strong className="texto-boleta-blanco">Dirección:</strong> {orden.despacho?.direccion},{' '}
            {orden.despacho?.comuna}, {orden.despacho?.region}
          </p>
          {orden.metodoPago && (
            <p className="mb-0 texto-boleta-blanco" style={{ color: '#ffffff' }}>
              <strong className="texto-boleta-blanco">Método de pago:</strong> {orden.metodoPago}
            </p>
          )}
        </article>

        {Array.isArray(orden.productos) && orden.productos.length > 0 && (
          <article className="mb-4">
            <h5 className="fw-bold mb-3 texto-boleta-blanco" style={{ color: '#ffffff' }}>
              Detalle de la compra:
            </h5>
            <ul className="list-group list-group-flush border rounded-3">
              {orden.productos.map((item, idx) => (
                <li
                  key={`${item.id}-${item.ml || idx}`}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <span className="fw-semibold texto-boleta-blanco" style={{ color: '#ffffff' }}>
                      {item.nombre} {item.ml && `(${item.ml})`}
                    </span>
                    <small className="d-block texto-boleta-blanco" style={{ color: '#ffffff' }}>
                      Cantidad: {item.cantidad} × ${Number(item.precio).toLocaleString('es-CL')}
                    </small>
                  </div>
                  <span className="fw-bold texto-boleta-blanco" style={{ color: '#ffffff' }}>
                    ${(Number(item.precio) * Number(item.cantidad)).toLocaleString('es-CL')}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        )}

        <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded-3 mb-4">
          <span className="fs-5 fw-bold texto-total-oscuro" style={{ color: '#111827' }}>
            Total Pagado:
          </span>
          <span className="fs-4 fw-bold text-success">
            ${Number(orden.total).toLocaleString('es-CL')}
          </span>
        </div>

        <Link
          to="/"
          className="btn w-100 fw-bold py-3 text-white rounded-3"
          style={{ backgroundColor: '#435346' }}
        >
          Volver a la Tienda
        </Link>
      </section>
    </main>
  );
}