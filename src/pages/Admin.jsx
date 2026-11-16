import React, { useState, useEffect } from 'react';
import {
  obtenerUsuariosApi,
  crearUsuarioApi,
  eliminarUsuarioApi,
  obtenerPedidosApi,
  actualizarEstadoPedidoApi
} from '../services/api';

const USUARIOS_BASE = [
  {
    id: 1,
    nombre: 'Administrador Principal',
    email: 'admin@aroma.cl',
    rol: 'Administrador'
  },
  {
    id: 2,
    nombre: 'Operador Tienda',
    email: 'trabajador@aroma.cl',
    rol: 'Operador'
  }
];

export function Admin({ productos = [], agregarProducto, eliminarProducto }) {
  const [pestanaActiva, setPestanaActiva] = useState('productos');

  const categoriasDisponibles = [
    'Frescos',
    'Amaderados',
    'Orientales',
    'Gourmand',
    'Cítricos',
    'Florales'
  ];

  const [form, setForm] = useState({
    nombre: '',
    marca: '',
    precio: '',
    categoria: 'Frescos',
    stock: '10',
    descripcion: '',
    imagen: '/images/the-most-wanted-intense.webp'
  });
  const [errores, setErrores] = useState({});

  const [usuarios, setUsuarios] = useState(() => {
    try {
      const guardados = JSON.parse(localStorage.getItem('aroma_usuarios') || '[]');
      const clienteActivo = JSON.parse(
        localStorage.getItem('aroma_usuario_activo') || 'null'
      );
      const lista = Array.isArray(guardados) && guardados.length > 0 ? guardados : USUARIOS_BASE;

      if (
        clienteActivo &&
        clienteActivo.email &&
        !lista.some((u) => u.email.toLowerCase() === clienteActivo.email.toLowerCase())
      ) {
        return [
          ...lista,
          {
            id: clienteActivo.id || Date.now(),
            nombre: clienteActivo.nombre || 'Cliente',
            email: clienteActivo.email,
            rol: 'Cliente'
          }
        ];
      }
      return lista;
    } catch (e) {
      return USUARIOS_BASE;
    }
  });

  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    email: '',
    rol: 'Cliente'
  });
  const [errorUsuario, setErrorUsuario] = useState('');

  const [pedidos, setPedidos] = useState(() => {
    try {
      const guardados = JSON.parse(localStorage.getItem('aroma_pedidos') || '[]');
      if (Array.isArray(guardados) && guardados.length > 0) {
        return guardados;
      }
      const ultimaOrden = JSON.parse(localStorage.getItem('aroma_ultima_orden') || 'null');
      return ultimaOrden ? [{ ...ultimaOrden, estado: ultimaOrden.estado || 'Pendiente' }] : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    const cargarDatosAdminBackend = async () => {
      try {
        const listaUsuarios = await obtenerUsuariosApi();
        if (Array.isArray(listaUsuarios) && listaUsuarios.length > 0) {
          setUsuarios(listaUsuarios);
        }
      } catch (e) {
        
      }

      try {
        const listaPedidos = await obtenerPedidosApi();
        if (Array.isArray(listaPedidos) && listaPedidos.length > 0) {
          setPedidos(listaPedidos);
        }
      } catch (e) {
        
      }
    };

    cargarDatosAdminBackend();
  }, []);

  useEffect(() => {
    localStorage.setItem('aroma_usuarios', JSON.stringify(usuarios));
  }, [usuarios]);

  useEffect(() => {
    localStorage.setItem('aroma_pedidos', JSON.stringify(pedidos));
  }, [pedidos]);

  
  const limpiarError = (campo) => {
    if (errores[campo]) {
      setErrores((prev) => ({ ...prev, [campo]: '' }));
    }
  };

  const handleNumeroEnteroChange = (e) => {
    const { name, value } = e.target;
    const soloDigitos = value.replace(/\D/g, '');
    setForm((prev) => ({ ...prev, [name]: soloDigitos }));
    limpiarError(name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    limpiarError(name);
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    const precioNum = Number(form.precio);
    const stockNum = Number(form.stock);

    if (!form.nombre.trim() || form.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'Ingresa el nombre del perfume (mínimo 3 caracteres).';
    }
    if (!form.precio || isNaN(precioNum) || precioNum <= 0) {
      nuevosErrores.precio = 'El precio debe ser un número entero mayor a $0.';
    }
    if (!form.categoria) {
      nuevosErrores.categoria = 'Selecciona una categoría válida.';
    }
    if (form.stock === '' || isNaN(stockNum) || stockNum < 0) {
      nuevosErrores.stock = 'El stock debe ser 0 o mayor.';
    }
    if (!form.descripcion.trim() || form.descripcion.trim().length < 10) {
      nuevosErrores.descripcion = 'Ingresa una descripción de al menos 10 caracteres.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmitProducto = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    agregarProducto({
      id: Date.now(),
      nombre: form.nombre.trim(),
      marca: form.marca.trim() || 'Aroma & Esencia',
      precio: Math.floor(Number(form.precio)),
      categoria: form.categoria,
      stock: Math.floor(Number(form.stock)),
      descripcion: form.descripcion.trim(),
      imagen: form.imagen.trim() || '/images/the-most-wanted-intense.webp'
    });

    setForm({
      nombre: '',
      marca: '',
      precio: '',
      categoria: 'Frescos',
      stock: '10',
      descripcion: '',
      imagen: '/images/the-most-wanted-intense.webp'
    });
    setErrores({});
  };

  const handleEliminarProducto = (producto) => {
    if (window.confirm(`¿Seguro que deseas eliminar "${producto.nombre}" del catálogo?`)) {
      eliminarProducto(producto.id);
    }
  };

  const handleAgregarUsuario = async (e) => {
    e.preventDefault();
    setErrorUsuario('');

    const nombreLimpio = nuevoUsuario.nombre.trim();
    const emailLimpio = nuevoUsuario.email.trim().toLowerCase();

    if (nombreLimpio.length < 3) {
      setErrorUsuario('Ingresa un nombre válido (mínimo 3 caracteres).');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio)) {
      setErrorUsuario('Ingresa un correo electrónico válido.');
      return;
    }
    if (usuarios.some((u) => u.email.toLowerCase() === emailLimpio)) {
      setErrorUsuario('Ya existe un usuario registrado con ese correo.');
      return;
    }

    const payloadUsuario = {
      nombre: nombreLimpio,
      email: emailLimpio,
      rol: nuevoUsuario.rol,
      password: 'changeme123'
    };

    try {
      const creadoBackend = await crearUsuarioApi(payloadUsuario);
      setUsuarios((prev) => [...prev, creadoBackend]);
    } catch (errorApi) {
      const msg = (errorApi.message || '').toLowerCase();
      if (msg.includes('registrado') || msg.includes('existe')) {
        setErrorUsuario('Ya existe un usuario registrado con ese correo.');
        return;
      }
      
      setUsuarios((prev) => [
        ...prev,
        {
          id: Date.now(),
          nombre: nombreLimpio,
          email: emailLimpio,
          rol: nuevoUsuario.rol
        }
      ]);
    }

    setNuevoUsuario({ nombre: '', email: '', rol: 'Cliente' });
  };

  const handleEliminarUsuario = async (usuarioObj) => {
    if (usuarioObj.email === 'admin@aroma.cl') return;
    if (window.confirm(`¿Eliminar al usuario "${usuarioObj.nombre}"?`)) {
      try {
        await eliminarUsuarioApi(usuarioObj.id);
      } catch (e) {
        
      }
      setUsuarios((prev) => prev.filter((u) => u.id !== usuarioObj.id));
    }
  };

  const handleCambiarEstadoPedido = async (pedidoObj, nuevoEstado) => {
    const identificador = pedidoObj.id || pedidoObj.numeroOrden;
    try {
      await actualizarEstadoPedidoApi(identificador, nuevoEstado);
    } catch (e) {
      
    }

    setPedidos((prev) =>
      prev.map((ped) =>
        (ped.id && ped.id === pedidoObj.id) || ped.numeroOrden === pedidoObj.numeroOrden
          ? { ...ped, estado: nuevoEstado }
          : ped
      )
    );
  };

  const badgeEstadoPedido = (estado) => {
    switch (estado) {
      case 'Entregado':
        return 'bg-success';
      case 'Enviado':
        return 'bg-primary';
      case 'En preparación':
        return 'bg-info text-dark';
      default:
        return 'bg-warning text-dark';
    }
  };

  return (
    <main className="container my-4">
      <section aria-labelledby="titulo-panel-admin">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
          <h2 id="titulo-panel-admin" className="fw-bold mb-0">
            Panel de Administración
          </h2>

          
          <ul className="nav nav-pills gap-2" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                type="button"
                className={`nav-link fw-semibold ${
                  pestanaActiva === 'productos' ? 'active bg-dark text-warning' : 'text-dark border'
                }`}
                onClick={() => setPestanaActiva('productos')}
              >
                <i className="fa-solid fa-box-open me-2" aria-hidden="true"></i>
                Productos ({productos.length})
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                type="button"
                className={`nav-link fw-semibold ${
                  pestanaActiva === 'usuarios' ? 'active bg-dark text-warning' : 'text-dark border'
                }`}
                onClick={() => setPestanaActiva('usuarios')}
              >
                <i className="fa-solid fa-users me-2" aria-hidden="true"></i>
                Usuarios ({usuarios.length})
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                type="button"
                className={`nav-link fw-semibold ${
                  pestanaActiva === 'pedidos' ? 'active bg-dark text-warning' : 'text-dark border'
                }`}
                onClick={() => setPestanaActiva('pedidos')}
              >
                <i className="fa-solid fa-receipt me-2" aria-hidden="true"></i>
                Pedidos ({pedidos.length})
              </button>
            </li>
          </ul>
        </div>

        {pestanaActiva === 'productos' && (
          <div className="row g-4">
            <div className="col-lg-4">
              <article className="card p-4 shadow-sm border-0 rounded-4">
                <h5 className="fw-bold mb-3">Agregar Producto</h5>
                <form onSubmit={handleSubmitProducto} noValidate>
                  <div className="mb-2">
                    <label htmlFor="admin-prod-nombre" className="form-label small fw-bold">
                      Nombre del Perfume *
                    </label>
                    <input
                      id="admin-prod-nombre"
                      name="nombre"
                      type="text"
                      className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                      placeholder="Ej: Dior Sauvage Elixir"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                    />
                    {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                  </div>

                  <div className="mb-2">
                    <label htmlFor="admin-prod-marca" className="form-label small fw-bold">
                      Marca
                    </label>
                    <input
                      id="admin-prod-marca"
                      name="marca"
                      type="text"
                      className="form-control"
                      placeholder="Ej: Dior, Lattafa, Azzaro"
                      value={form.marca}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="row g-2 mb-2">
                    <div className="col-6">
                      <label htmlFor="admin-prod-precio" className="form-label small fw-bold">
                        Precio (CLP) *
                      </label>
                      <input
                        id="admin-prod-precio"
                        name="precio"
                        type="text"
                        inputMode="numeric"
                        className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
                        placeholder="Ej: 49990"
                        value={form.precio}
                        onChange={handleNumeroEnteroChange}
                        required
                      />
                      {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
                    </div>

                    <div className="col-6">
                      <label htmlFor="admin-prod-stock" className="form-label small fw-bold">
                        Stock Disponible *
                      </label>
                      <input
                        id="admin-prod-stock"
                        name="stock"
                        type="text"
                        inputMode="numeric"
                        className={`form-control ${errores.stock ? 'is-invalid' : ''}`}
                        placeholder="Ej: 15"
                        value={form.stock}
                        onChange={handleNumeroEnteroChange}
                        required
                      />
                      {errores.stock && <div className="invalid-feedback">{errores.stock}</div>}
                    </div>
                  </div>

                  <div className="mb-2">
                    <label htmlFor="admin-prod-categoria" className="form-label small fw-bold">
                      Categoría *
                    </label>
                    <select
                      id="admin-prod-categoria"
                      name="categoria"
                      className={`form-select ${errores.categoria ? 'is-invalid' : ''}`}
                      value={form.categoria}
                      onChange={handleChange}
                      required
                    >
                      {categoriasDisponibles.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {errores.categoria && (
                      <div className="invalid-feedback">{errores.categoria}</div>
                    )}
                  </div>

                  <div className="mb-2">
                    <label htmlFor="admin-prod-imagen" className="form-label small fw-bold">
                      Ruta o URL de Imagen
                    </label>
                    <input
                      id="admin-prod-imagen"
                      name="imagen"
                      type="text"
                      className="form-control"
                      placeholder="/images/perfume.webp"
                      value={form.imagen}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="admin-prod-descripcion" className="form-label small fw-bold">
                      Descripción *
                    </label>
                    <textarea
                      id="admin-prod-descripcion"
                      name="descripcion"
                      rows="3"
                      className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
                      placeholder="Notas principales y características del perfume..."
                      value={form.descripcion}
                      onChange={handleChange}
                      required
                    ></textarea>
                    {errores.descripcion && (
                      <div className="invalid-feedback">{errores.descripcion}</div>
                    )}
                  </div>

                  <button className="btn btn-primary w-100 fw-bold py-2" type="submit">
                    <i className="fa-solid fa-plus me-2" aria-hidden="true"></i>
                    Guardar Producto
                  </button>
                </form>
              </article>
            </div>

            <div className="col-lg-8">
              <article className="card p-4 shadow-sm border-0 rounded-4">
                <h5 className="fw-bold mb-3">Lista de Productos</h5>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th className="text-center">Stock</th>
                        <th>Precio</th>
                        <th className="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productos.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center text-muted py-4">
                            No hay productos registrados en el catálogo.
                          </td>
                        </tr>
                      ) : (
                        productos.map((p) => (
                          <tr key={p.id}>
                            <td className="fw-semibold">{p.nombre}</td>
                            <td>
                              <span className="badge bg-secondary">
                                {p.categoria || 'General'}
                              </span>
                            </td>
                            <td className="text-center">
                              {Number(p.stock) <= 0 ? (
                                <span className="badge bg-danger">Agotado (0)</span>
                              ) : (
                                <span className="badge bg-success">{p.stock} unid.</span>
                              )}
                            </td>
                            <td>${p.precio ? Number(p.precio).toLocaleString('es-CL') : 0}</td>
                            <td className="text-center">
                              <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={() => handleEliminarProducto(p)}
                              >
                                <i className="fa-solid fa-trash me-1" aria-hidden="true"></i>
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </article>
            </div>
          </div>
        )}

       
        {pestanaActiva === 'usuarios' && (
          <div className="row g-4">
            <div className="col-lg-4">
              <article className="card p-4 shadow-sm border-0 rounded-4">
                <h5 className="fw-bold mb-3">Registrar Usuario</h5>
                {errorUsuario && (
                  <div className="alert alert-danger py-2 small">{errorUsuario}</div>
                )}
                <form onSubmit={handleAgregarUsuario} noValidate>
                  <div className="mb-2">
                    <label htmlFor="admin-user-nombre" className="form-label small fw-bold">
                      Nombre Completo *
                    </label>
                    <input
                      id="admin-user-nombre"
                      type="text"
                      className="form-control"
                      placeholder="Ej: Camila Rojas"
                      value={nuevoUsuario.nombre}
                      onChange={(e) =>
                        setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-2">
                    <label htmlFor="admin-user-email" className="form-label small fw-bold">
                      Correo Electrónico *
                    </label>
                    <input
                      id="admin-user-email"
                      type="email"
                      className="form-control"
                      placeholder="camila@gmail.com"
                      value={nuevoUsuario.email}
                      onChange={(e) =>
                        setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="admin-user-rol" className="form-label small fw-bold">
                      Rol en el Sistema
                    </label>
                    <select
                      id="admin-user-rol"
                      className="form-select"
                      value={nuevoUsuario.rol}
                      onChange={(e) =>
                        setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })
                      }
                    >
                      <option value="Cliente">Cliente</option>
                      <option value="Operador">Operador</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 fw-bold py-2">
                    <i className="fa-solid fa-user-plus me-2" aria-hidden="true"></i>
                    Guardar Usuario
                  </button>
                </form>
              </article>
            </div>

            <div className="col-lg-8">
              <article className="card p-4 shadow-sm border-0 rounded-4">
                <h5 className="fw-bold mb-3">Usuarios Registrados</h5>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th className="text-center">Rol</th>
                        <th className="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuarios.map((u) => (
                        <tr key={u.id}>
                          <td className="fw-semibold">{u.nombre}</td>
                          <td>{u.email}</td>
                          <td className="text-center">
                            <span
                              className={`badge ${
                                u.rol === 'Administrador'
                                  ? 'bg-warning text-dark'
                                  : u.rol === 'Operador'
                                  ? 'bg-info text-dark'
                                  : 'bg-secondary'
                              }`}
                            >
                              {u.rol}
                            </span>
                          </td>
                          <td className="text-center">
                            {u.email === 'admin@aroma.cl' ? (
                              <span className="text-muted small">Principal</span>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={() => handleEliminarUsuario(u)}
                              >
                                <i className="fa-solid fa-trash me-1" aria-hidden="true"></i>
                                Eliminar
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            </div>
          </div>
        )}

        {pestanaActiva === 'pedidos' && (
          <article className="card p-4 shadow-sm border-0 rounded-4">
            <h5 className="fw-bold mb-3">Historial de Pedidos y Órdenes de Compra</h5>
            {pedidos.length === 0 ? (
              <div className="text-center text-muted py-5">
                <i className="fa-solid fa-box-open fa-2x mb-2" aria-hidden="true"></i>
                <p className="mb-0">
                  Aún no hay pedidos registrados. Realiza una compra de prueba desde el carrito
                  para verla aquí.
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>Orden #</th>
                      <th>Cliente / RUT</th>
                      <th>Despacho</th>
                      <th>Productos</th>
                      <th>Total</th>
                      <th className="text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidos.map((ped) => {
                      const itemsPedido = ped.productos || ped.detalles || [];
                      return (
                        <tr key={ped.id || ped.numeroOrden}>
                          <td className="fw-bold">
                            #{ped.numeroOrden || ped.id}
                            <small className="text-muted d-block fw-normal">{ped.fecha}</small>
                          </td>
                          <td>
                            <div className="fw-semibold">
                              {ped.cliente?.nombre || ped.nombreCliente}
                            </div>
                            {(ped.cliente?.rut || ped.rutCliente) && (
                              <small className="text-muted d-block">
                                RUT: {ped.cliente?.rut || ped.rutCliente}
                              </small>
                            )}
                            <small className="text-muted">
                              {ped.cliente?.email || ped.emailCliente}
                            </small>
                          </td>
                          <td className="small">
                            {ped.despacho
                              ? `${ped.despacho.direccion}, ${ped.despacho.comuna} (${ped.despacho.region})`
                              : `${ped.direccion || ''}, ${ped.comuna || ''} (${ped.region || ''})`}
                          </td>
                          <td className="small">
                            <ul className="mb-0 ps-3">
                              {itemsPedido.map((item, idx) => (
                                <li key={idx}>
                                  {item.cantidad}x {item.nombre || item.nombreProducto}
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="fw-bold text-success">
                            ${Number(ped.total).toLocaleString('es-CL')}
                          </td>
                          <td className="text-center">
                            <span className={`badge mb-1 d-block ${badgeEstadoPedido(ped.estado)}`}>
                              {ped.estado || 'Pendiente'}
                            </span>
                            <select
                              aria-label={`Estado de orden ${ped.numeroOrden || ped.id}`}
                              className="form-select form-select-sm"
                              value={ped.estado || 'Pendiente'}
                              onChange={(e) => handleCambiarEstadoPedido(ped, e.target.value)}
                            >
                              <option value="Pendiente">Pendiente</option>
                              <option value="En preparación">En preparación</option>
                              <option value="Enviado">Enviado</option>
                              <option value="Entregado">Entregado</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </article>
        )}
      </section>
    </main>
  );
}