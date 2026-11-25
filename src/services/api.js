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

// --- RULETA Y CUPONES ---

export const obtenerEstadoRuletaApi = async (email) => {
  const res = await fetch(`${API_URL}/ruleta/estado?email=${encodeURIComponent(email)}`);
  if (!res.ok) throw new Error("Error al consultar ruleta");
  return res.json();
};

export const registrarGiroRuletaApi = async (datosGiro) => {
  const res = await fetch(`${API_URL}/ruleta/girar`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(datosGiro),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.mensaje || "No se pudo registrar el giro");
  return data;
};

export const validarCuponApi = async (codigo, email) => {
  const res = await fetch(`${API_URL}/ruleta/validar`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ codigo, email }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.mensaje || "Cupón inválido");
  return data;
};

// --- RESEÑAS DE PRODUCTOS ---

export const obtenerResenasProductoApi = async (productoId) => {
  const res = await fetch(`${API_URL}/resenas/producto/${productoId}`);
  if (!res.ok) throw new Error("Error al cargar reseñas");
  return res.json();
};

export const crearResenaApi = async (resena) => {
  const res = await fetch(`${API_URL}/resenas`, {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify(resena),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.mensaje || "Error al publicar reseña");
  return data;
};

export const eliminarResenaApi = async (id, email) => {
  const res = await fetch(`${API_URL}/resenas/${id}?email=${encodeURIComponent(email)}`, {
    method: "DELETE",
    headers: getHeaders(true),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.mensaje || "Error al eliminar reseña");
};