const API_URL = "http://localhost:8080/api";

const getHeaders = (conAuth = false) => {
  const headers = { "Content-Type": "application/json" };
  if (conAuth) {
    const cliente = JSON.parse(localStorage.getItem("aroma_usuario_activo") || "null");
    const admin = JSON.parse(localStorage.getItem("aroma_admin_activo") || "null");
    const sesion = cliente || admin;

    if (sesion?.token) {
      headers["Authorization"] = `Bearer ${sesion.token}`;
    }
  }
  return headers;
};

export const loginApi = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.mensaje || "Credenciales incorrectas");
  return data;
};

export const registrarApi = async (nombre, email, password) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ nombre, email, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.mensaje || "Error al registrar usuario");
  return data;
};

export const obtenerProductosApi = async () => {
  const res = await fetch(`${API_URL}/productos`);
  if (!res.ok) throw new Error("No se pudieron cargar los productos");
  return res.json();
};

export const crearProductoApi = async (producto) => {
  const res = await fetch(`${API_URL}/productos`, {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify(producto),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.mensaje || "Error al crear el perfume");
  return data;
};

export const eliminarProductoApi = async (id) => {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: "DELETE",
    headers: getHeaders(true),
  });
  if (!res.ok) throw new Error("Error al eliminar el perfume");
};

export const crearPedidoApi = async (pedido) => {
  const res = await fetch(`${API_URL}/pedidos`, {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify(pedido),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.mensaje || "Error al registrar la compra");
  return data;
};

export const obtenerPedidosApi = async () => {
  const res = await fetch(`${API_URL}/pedidos`, {
    headers: getHeaders(true),
  });
  if (!res.ok) throw new Error("Error al cargar pedidos");
  return res.json();
};

export const actualizarEstadoPedidoApi = async (id, estado) => {
  const res = await fetch(`${API_URL}/pedidos/${id}/estado`, {
    method: "PATCH",
    headers: getHeaders(true),
    body: JSON.stringify({ estado }),
  });
  if (!res.ok) throw new Error("Error al actualizar el estado del pedido");
  return res.json();
};

export const obtenerUsuariosApi = async () => {
  const res = await fetch(`${API_URL}/usuarios`, {
    headers: getHeaders(true),
  });
  if (!res.ok) throw new Error("Error al cargar usuarios");
  return res.json();
};

export const crearUsuarioApi = async (usuario) => {
  const res = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify(usuario),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.mensaje || "Error al crear usuario");
  return data;
};

export const eliminarUsuarioApi = async (id) => {
  const res = await fetch(`${API_URL}/usuarios/${id}`, {
    method: "DELETE",
    headers: getHeaders(true),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.mensaje || "Error al eliminar usuario");
};