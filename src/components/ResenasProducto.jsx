import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  obtenerResenasProductoApi,
  crearResenaApi,
  eliminarResenaApi
} from '../services/api';

const KEY_RESENAS = 'aroma_resenas_v1';

const leerResenasLocales = (productoId) => {
  try {
    const todas = JSON.parse(localStorage.getItem(KEY_RESENAS) || '{}');
    return Array.isArray(todas[productoId]) ? todas[productoId] : [];
  } catch (e) {
    return [];
  }
};

const guardarResenasLocales = (productoId, lista) => {
  try {
    const todas = JSON.parse(localStorage.getItem(KEY_RESENAS) || '{}');
    todas[productoId] = lista;
    localStorage.setItem(KEY_RESENAS, JSON.stringify(todas));
  } catch (e) {}
};

const verificarCompraUsuario = (emailUsuario, productoId) => {
  if (!emailUsuario) return false;
  try {
    const pedidos = JSON.parse(localStorage.getItem('aroma_pedidos') || '[]');
    return pedidos.some(
      (orden) =>
        orden?.cliente?.email?.toLowerCase() === emailUsuario.toLowerCase() &&
        Array.isArray(orden.productos) &&
        orden.productos.some((p) => Number(p.id) === Number(productoId))
    );
  } catch (e) {
    return false;
  }
};

export function ResenasProducto({
  productoId,
  nombreProducto,
  usuario,
  mostrarNotificacion
}) {
  const [resenas, setResenas] = useState(() => leerResenasLocales(productoId));
  const [calificacion, setCalificacion] = useState(5);
  const [hoverEstrella, setHoverEstrella] = useState(0);
  const [duracion, setDuracion] = useState('Larga duración (6-8 hrs)');
  const [estela, setEstela] = useState('Moderada');
  const [comentario, setComentario] = useState('');
  const [errorForm, setErrorForm] = useState('');
  const [enviando, setEnviando] = useState(false);
  const seccionRef = useRef(null);

  useEffect(() => {
    let cancelado = false;

    const cargarResenas = async () => {
      const locales = leerResenasLocales(productoId);
      setResenas(locales);

      try {
        const desdeBackend = await obtenerResenasProductoApi(productoId);
        if (!cancelado && Array.isArray(desdeBackend)) {
          setResenas(desdeBackend);
          guardarResenasLocales(productoId, desdeBackend);
        }
      } catch (err) {
        // Mantiene respaldo local si el servidor no responde
      }
    };

    cargarResenas();
    return () => {
      cancelado = true;
    };
  }, [productoId]);

  useEffect(() => {
    const contenedor = seccionRef.current;
    if (!contenedor) return;

    contenedor.querySelectorAll('.resena-texto-blanco').forEach((el) => {
      el.style.setProperty('color', '#ffffff', 'important');
      el.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
    });

    contenedor.querySelectorAll('textarea, select').forEach((el) => {
      el.style.setProperty('color', '#000000', 'important');
      el.style.setProperty('-webkit-text-fill-color', '#000000', 'important');
      el.style.setProperty('background-color', '#ffffff', 'important');
    });
  }, [resenas, comentario, duracion, estela]);

  const promedio =
    resenas.length > 0
      ? (resenas.reduce((acc, r) => acc + Number(r.calificacion), 0) / resenas.length).toFixed(1)
      : null;

  const handlePublicar = async (e) => {
    e.preventDefault();
    setErrorForm('');

    if (!usuario) {
      setErrorForm('Debes iniciar sesión para publicar una reseña.');
      return;
    }

    const textoLimpio = comentario.trim();
    if (textoLimpio.length < 10) {
      setErrorForm('Escribe al menos 10 caracteres contando tu experiencia con el aroma.');
      return;
    }

    const yaComento = resenas.some(
      (r) => r.email?.toLowerCase() === usuario.email?.toLowerCase()
    );
    if (yaComento) {
      setErrorForm('Ya publicaste una reseña para esta fragancia.');
      return;
    }

    const payloadResena = {
      productoId: Number(productoId),
      autor: usuario.nombre || 'Cliente',
      email: usuario.email,
      calificacion: Number(calificacion),
      duracion,
      estela,
      comentario: textoLimpio,
      fecha: new Date().toLocaleDateString('es-CL', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    };

    setEnviando(true);
    try {
      const guardadaBackend = await crearResenaApi(payloadResena);
      const actualizadas = [guardadaBackend, ...resenas];
      setResenas(actualizadas);
      guardarResenasLocales(productoId, actualizadas);
      setComentario('');
      setCalificacion(5);

      if (mostrarNotificacion) {
        mostrarNotificacion('¡Gracias por compartir tu reseña!');
      }
    } catch (errorApi) {
      const msg = (errorApi.message || '').toLowerCase();
      if (msg.includes('publicaste') || msg.includes('incompletos')) {
        setErrorForm(errorApi.message);
      } else {
        // Respaldo offline si el servidor no responde
        const nuevaLocal = {
          id: Date.now(),
          ...payloadResena,
          compraVerificada: verificarCompraUsuario(usuario.email, productoId)
        };
        const actualizadas = [nuevaLocal, ...resenas];
        setResenas(actualizadas);
        guardarResenasLocales(productoId, actualizadas);
        setComentario('');
        setCalificacion(5);

        if (mostrarNotificacion) {
          mostrarNotificacion('¡Gracias por compartir tu reseña!');
        }
      }
    } finally {
      setEnviando(false);
    }
  };

  const handleEliminarResena = async (idResena) => {
    try {
      if (usuario?.email) {
        await eliminarResenaApi(idResena, usuario.email);
      }
    } catch (err) {}

    const filtradas = resenas.filter((r) => r.id !== idResena);
    setResenas(filtradas);
    guardarResenasLocales(productoId, filtradas);
    if (mostrarNotificacion) {
      mostrarNotificacion('Reseña eliminada.');
    }
  };

  const renderEstrellas = (valor) => {
    return [1, 2, 3, 4, 5].map((num) => (
      <span
        key={num}
        style={{
          color: num <= valor ? '#ffc107' : '#6c757d',
          fontSize: '1.1rem'
        }}
      >
        ★
      </span>
    ));
  };

  return (
    <section
      ref={seccionRef}
      className="mt-5 pt-4 border-top border-secondary"
      aria-labelledby="titulo-resenas"
    >
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
        <div>
          <h3 id="titulo-resenas" className="fw-bold mb-1 resena-texto-blanco">
            Opiniones de Clientes
          </h3>
          <p className="small mb-0 resena-texto-blanco opacity-75">
            Experiencias reales sobre {nombreProducto}
          </p>
        </div>

        {promedio ? (
          <div
            className="px-3 py-2 rounded-3 d-flex align-items-center gap-2"
            style={{ backgroundColor: 'rgba(255, 193, 7, 0.15)', border: '1px solid #c99a4b' }}
          >
            <span className="fs-4 fw-bold text-warning">{promedio}</span>
            <div>
              <div>{renderEstrellas(Math.round(Number(promedio)))}</div>
              <small className="resena-texto-blanco">
                Basado en {resenas.length} {resenas.length === 1 ? 'reseña' : 'reseñas'}
              </small>
            </div>
          </div>
        ) : (
          <span className="badge bg-secondary">Aún sin calificaciones</span>
        )}
      </div>

      <div className="row g-4">
        <div className="col-lg-5">
          <div
            className="card border-0 p-4 rounded-4 shadow-sm"
            style={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <h5 className="fw-bold mb-3 resena-texto-blanco">Escribe tu reseña</h5>

            {!usuario ? (
              <div className="text-center py-3">
                <p className="small resena-texto-blanco mb-3">
                  Inicia sesión con tu cuenta de cliente para calificar este perfume y ayudar a
                  otros compradores.
                </p>
                <Link
                  to="/login"
                  className="btn btn-warning text-dark fw-bold rounded-pill px-4"
                >
                  Iniciar Sesión
                </Link>
              </div>
            ) : (
              <form onSubmit={handlePublicar} noValidate>
                <div className="mb-3">
                  <label className="form-label small fw-bold resena-texto-blanco d-block">
                    Tu calificación *
                  </label>
                  <div className="d-flex gap-1">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setCalificacion(num)}
                        onMouseEnter={() => setHoverEstrella(num)}
                        onMouseLeave={() => setHoverEstrella(0)}
                        aria-label={`${num} estrellas`}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '1.8rem',
                          lineHeight: 1,
                          padding: '0 4px',
                          cursor: 'pointer',
                          color: num <= (hoverEstrella || calificacion) ? '#ffc107' : '#555555'
                        }}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label htmlFor="resena-duracion" className="form-label small fw-bold resena-texto-blanco">
                      Duración en piel
                    </label>
                    <select
                      id="resena-duracion"
                      className="form-select form-select-sm"
                      value={duracion}
                      onChange={(e) => setDuracion(e.target.value)}
                    >
                      <option value="Suave (2-4 hrs)">Suave (2-4 hrs)</option>
                      <option value="Moderada (4-6 hrs)">Moderada (4-6 hrs)</option>
                      <option value="Larga duración (6-8 hrs)">Larga duración (6-8 hrs)</option>
                      <option value="Eterna (+8 hrs)">Eterna (+8 hrs)</option>
                    </select>
                  </div>

                  <div className="col-6">
                    <label htmlFor="resena-estela" className="form-label small fw-bold resena-texto-blanco">
                      Estela / Proyección
                    </label>
                    <select
                      id="resena-estela"
                      className="form-select form-select-sm"
                      value={estela}
                      onChange={(e) => setEstela(e.target.value)}
                    >
                      <option value="Íntima">Íntima</option>
                      <option value="Moderada">Moderada</option>
                      <option value="Intensa">Intensa</option>
                      <option value="Enorme">Enorme</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="resena-comentario" className="form-label small fw-bold resena-texto-blanco">
                    Tu opinión sobre el aroma *
                  </label>
                  <textarea
                    id="resena-comentario"
                    rows="3"
                    className="form-control"
                    placeholder="¿Qué notas sientes más? ¿Para qué ocasión lo recomiendas?"
                    value={comentario}
                    onChange={(e) => {
                      setComentario(e.target.value);
                      if (errorForm) setErrorForm('');
                    }}
                    maxLength={400}
                  />
                  <small className="resena-texto-blanco opacity-75 d-block text-end mt-1">
                    {comentario.length}/400
                  </small>
                </div>

                {errorForm && (
                  <div className="alert alert-warning py-2 small fw-semibold">{errorForm}</div>
                )}

                <button
                  type="submit"
                  disabled={enviando}
                  className="btn btn-warning text-dark w-100 fw-bold rounded-pill"
                >
                  {enviando ? 'Publicando...' : 'Publicar Reseña'}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="col-lg-7">
          {resenas.length === 0 ? (
            <div
              className="p-4 rounded-4 text-center"
              style={{ backgroundColor: '#121212', border: '1px dashed rgba(255,255,255,0.2)' }}
            >
              <p className="mb-0 resena-texto-blanco">
                Todavía no hay reseñas para este perfume. ¡Sé el primero en compartir tu opinión!
              </p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {resenas.map((item) => (
                <article
                  key={item.id}
                  className="p-3 rounded-4"
                  style={{
                    backgroundColor: '#121212',
                    border: '1px solid rgba(255,255,255,0.12)'
                  }}
                >
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <div className="d-flex align-items-center gap-2 flex-wrap">
                        <strong className="resena-texto-blanco">{item.autor}</strong>
                        {item.compraVerificada && (
                          <span className="badge bg-success" style={{ fontSize: '0.72rem' }}>
                            ✓ Compra verificada
                          </span>
                        )}
                      </div>
                      <div>{renderEstrellas(item.calificacion)}</div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <small className="resena-texto-blanco opacity-75">{item.fecha}</small>
                      {usuario?.email?.toLowerCase() === item.email?.toLowerCase() && (
                        <button
                          type="button"
                          onClick={() => handleEliminarResena(item.id)}
                          className="btn btn-sm btn-outline-danger py-0 px-2"
                          title="Eliminar mi reseña"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="d-flex flex-wrap gap-2 mb-2">
                    <span className="badge bg-dark border border-secondary">
                      ⏱️ Duración: {item.duracion}
                    </span>
                    <span className="badge bg-dark border border-secondary">
                      💨 Estela: {item.estela}
                    </span>
                  </div>

                  <p className="mb-0 small resena-texto-blanco" style={{ lineHeight: 1.5 }}>
                    {item.comentario}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}