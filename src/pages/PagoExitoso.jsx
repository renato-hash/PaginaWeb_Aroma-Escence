import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function PagoExitoso() {
  const location = useLocation();

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

  if (!orden) {
    return (
      <main className="container my-5 py-5 text-center">
        <section
          className="card shadow-sm border-0 p-5 rounded-4 mx-auto"
          style={{ maxWidth: '650px' }}
        >
          <h2 className="fw-bold mb-3">No hay una orden reciente</h2>
          <p className="text-muted mb-4">Aún no has realizado una compra en esta sesión.</p>
          <Link to="/" className="btn btn-success fw-bold py-2 px-4 rounded-3">
            Volver a la Tienda
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="container my-5">
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
          <h2 id="titulo-compra-exitosa" className="fw-bold text-success mb-1">
            ¡Se ha realizado la compra con éxito!
          </h2>
          <p className="text-muted mb-0">
            Orden de compra Nº <strong>#{orden.numeroOrden}</strong>
            {orden.fecha && <span className="ms-2">• {orden.fecha}</span>}
          </p>
        </div>

        <hr className="my-4" />

        <article className="mb-4">
          <h5 className="fw-bold mb-3">Datos del despacho y boleta:</h5>
          {orden.cliente?.rut && (
            <p className="mb-1">
              <strong>RUT:</strong> {orden.cliente.rut}
            </p>
          )}
          <p className="mb-1">
            <strong>Nombre:</strong> {orden.cliente?.nombre}
          </p>
          <p className="mb-1">
            <strong>Correo:</strong> {orden.cliente?.email}
          </p>
          {orden.cliente?.telefono && (
            <p className="mb-1">
              <strong>Teléfono:</strong> {orden.cliente.telefono}
            </p>
          )}
          <p className="mb-1">
            <strong>Dirección:</strong> {orden.despacho?.direccion}, {orden.despacho?.comuna},{' '}
            {orden.despacho?.region}
          </p>
          {orden.metodoPago && (
            <p className="mb-0">
              <strong>Método de pago:</strong> {orden.metodoPago}
            </p>
          )}
        </article>

        {Array.isArray(orden.productos) && orden.productos.length > 0 && (
          <article className="mb-4">
            <h5 className="fw-bold mb-3">Detalle de la compra:</h5>
            <ul className="list-group list-group-flush border rounded-3">
              {orden.productos.map((item, idx) => (
                <li
                  key={`${item.id}-${item.ml || idx}`}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <span className="fw-semibold">
                      {item.nombre} {item.ml && `(${item.ml})`}
                    </span>
                    <small className="text-muted d-block">
                      Cantidad: {item.cantidad} × ${Number(item.precio).toLocaleString('es-CL')}
                    </small>
                  </div>
                  <span className="fw-bold">
                    ${(Number(item.precio) * Number(item.cantidad)).toLocaleString('es-CL')}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        )}

        <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded-3 mb-4">
          <span className="fs-5 fw-bold">Total Pagado:</span>
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