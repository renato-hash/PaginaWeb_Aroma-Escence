import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation
} from 'react-router-dom';
import { productosIniciales } from './data/productos';
import {
  obtenerProductosApi,
  crearProductoApi,
  eliminarProductoApi
} from './services/api';
import { Navbar } from './components/Navbar';
import { Piepagina } from './components/Piepagina';
import { Toast } from './components/Toast';
import { RuletaDescuento } from './components/RuletaDescuento';
import { Catalogo } from './pages/Catalogo';
import { Productos } from './pages/Productos';
import { Nosotros } from './pages/Nosotros';
import { Categorias } from './pages/Categorias';
import { CategoriaDetalle } from './pages/CategoriaDetalle';
import { DetalleProducto } from './pages/DetalleProducto';
import { Carrito } from './pages/Carrito';
import { Checkout } from './pages/Checkout';
import { PagoExitoso } from './pages/PagoExitoso';
import { Ofertas } from './pages/Ofertas';
import { PerfumeMatch } from './pages/PerfumeMatch';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import { AdminLogin } from './pages/AdminLogin';
import { ResultadosBusqueda } from './pages/ResultadosBusqueda';
import { NotFound } from './pages/NotFound';

function BloqueoClienteEnOperador({ mostrarNotificacion }) {
  useEffect(() => {
    mostrarNotificacion(
      'Acceso denegado: no puedes ingresar a la sección de operador con una cuenta de cliente.'
    );
  }, []);

  return <Navigate to="/" replace />;
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const normalizarImagen = (prod) => ({
    ...prod,
    imagen:
      typeof prod.imagen === 'string'
        ? prod.imagen.replace(/^public\//, '/')
        : prod.imagen
  });

  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem('aroma_productos_v17');
    if (guardados) {
      try {
        const parsed = JSON.parse(guardados);
        if (Array.isArray(parsed)) {
          const validos = parsed
            .filter((p) => Number(p.precio) > 0)
            .map(normalizarImagen);
          const idsExistentes = new Set(validos.map((p) => p.id));
          const nombresExistentes = new Set(
            validos.map((p) => p.nombre?.toLowerCase().trim())
          );
          const nuevos = productosIniciales
            .filter(
              (p) =>
                !idsExistentes.has(p.id) &&
                !nombresExistentes.has(p.nombre?.toLowerCase().trim())
            )
            .map(normalizarImagen);
          return [...validos, ...nuevos];
        }
        return productosIniciales.map(normalizarImagen);
      } catch (e) {
        return productosIniciales.map(normalizarImagen);
      }
    }
    return productosIniciales.map(normalizarImagen);
  });

  const [carrito, setCarrito] = useState(() => {
    const guardados = localStorage.getItem('aroma_carrito');
    if (guardados) {
      try {
        const parsed = JSON.parse(guardados);
        return Array.isArray(parsed)
          ? parsed.filter(
              (item) =>
                item &&
                item.id &&
                Number(item.cantidad) > 0 &&
                Number(item.precio) > 0
            )
          : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [usuario, setUsuario] = useState(() => {
    try {
      const guardado = localStorage.getItem('aroma_usuario_activo');
      return guardado ? JSON.parse(guardado) : null;
    } catch (e) {
      return null;
    }
  });

  const [usuarioAdmin, setUsuarioAdmin] = useState(() => {
    try {
      if (localStorage.getItem('aroma_usuario_activo')) {
        localStorage.removeItem('aroma_admin_activo');
        return null;
      }
      const guardado = localStorage.getItem('aroma_admin_activo');
      return guardado ? JSON.parse(guardado) : null;
    } catch (e) {
      return null;
    }
  });

  const [busqueda, setBusqueda] = useState('');
  const [mensajeToast, setMensajeToast] = useState('');

  useEffect(() => {
    const cargarProductosBackend = async () => {
      try {
        const listaBackend = await obtenerProductosApi();
        if (Array.isArray(listaBackend) && listaBackend.length > 0) {
          const validosBackend = listaBackend
            .filter((p) => Number(p.precio) > 0)
            .map(normalizarImagen);
          const idsBackend = new Set(validosBackend.map((p) => p.id));
          const nombresBackend = new Set(
            validosBackend.map((p) => p.nombre?.toLowerCase().trim())
          );
          const lanzamientosLocales = productosIniciales
            .filter(
              (p) =>
                p.id > 36 &&
                !idsBackend.has(p.id) &&
                !nombresBackend.has(p.nombre?.toLowerCase().trim())
            )
            .map(normalizarImagen);
          setProductos([...validosBackend, ...lanzamientosLocales]);
        }
      } catch (error) {}
    };
    cargarProductosBackend();
  }, []);

  useEffect(() => {
    localStorage.setItem('aroma_productos_v17', JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    localStorage.setItem('aroma_carrito', JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('aroma_usuario_activo', JSON.stringify(usuario));
      if (usuarioAdmin) {
        setUsuarioAdmin(null);
      }
      localStorage.removeItem('aroma_admin_activo');
    } else {
      localStorage.removeItem('aroma_usuario_activo');
    }
  }, [usuario]);

  useEffect(() => {
    if (usuarioAdmin && !usuario) {
      localStorage.setItem('aroma_admin_activo', JSON.stringify(usuarioAdmin));
    } else {
      localStorage.removeItem('aroma_admin_activo');
    }
  }, [usuarioAdmin, usuario]);

  const mostrarNotificacion = (mensaje) => {
    setMensajeToast(mensaje);
    setTimeout(() => {
      setMensajeToast('');
    }, 3000);
  };

  const iniciarSesion = (datosUsuario) => {
    setUsuarioAdmin(null);
    localStorage.removeItem('aroma_admin_activo');
    setUsuario(datosUsuario);
    mostrarNotificacion(`¡Bienvenido/a, ${datosUsuario.nombre || 'Cliente'}!`);
  };

  const cerrarSesion = () => {
    setUsuario(null);
    mostrarNotificacion('Has cerrado sesión.');
  };

  const iniciarSesionAdmin = (datosAdmin) => {
    setUsuario(null);
    localStorage.removeItem('aroma_usuario_activo');
    setUsuarioAdmin(datosAdmin);
    mostrarNotificacion(`Sesión de operador iniciada: ${datosAdmin.nombre || 'Operador'}`);
  };

  const cerrarSesionAdmin = () => {
    setUsuarioAdmin(null);
    mostrarNotificacion('Sesión de operador cerrada.');
  };

  const obtenerInfoRealProducto = (id, ml = null, fallbackItem = {}) => {
    const prodCatalogo = productos.find((p) => p.id === id);
    if (!prodCatalogo) {
      return {
        existe: false,
        precio: Number(fallbackItem.precio) || 0,
        stock: fallbackItem.stock !== undefined ? Number(fallbackItem.stock) : 0
      };
    }

    if (ml && Array.isArray(prodCatalogo.tamanos)) {
      const variante = prodCatalogo.tamanos.find((t) => t.ml === ml);
      if (variante) {
        return {
          existe: true,
          precio: Number(variante.precio),
          stock: Number(variante.stock)
        };
      }
    }

    return {
      existe: true,
      precio: Number(prodCatalogo.precio),
      stock:
        prodCatalogo.stock !== undefined && prodCatalogo.stock !== null
          ? Number(prodCatalogo.stock)
          : 99
    };
  };

  const esMismoItemCarrito = (item, id, ml = null) => {
    const itemMl = item.ml || item.tamano || null;
    return item.id === id && itemMl === (ml || null);
  };

  const agregarAlCarrito = (producto) => {
    if (!usuario) {
      mostrarNotificacion(
        'Debes registrarte o iniciar sesión como cliente para agregar productos al carrito.'
      );
      navigate('/login', {
        state: {
          desde: location.pathname,
          abrirRegistro: true,
          mensaje:
            'Para agregar productos al carrito, primero debes registrarte o iniciar sesión.'
        }
      });
      return;
    }

    if (!producto || !producto.id) {
      mostrarNotificacion('Error: Producto inválido.');
      return;
    }

    const mlSeleccionado = producto.ml || producto.tamano || null;
    const infoReal = obtenerInfoRealProducto(producto.id, mlSeleccionado, producto);
    const precioValido =
      Number(producto.precio) > 0 ? Number(producto.precio) : infoReal.precio;

    if (isNaN(precioValido) || precioValido <= 0) {
      mostrarNotificacion('Error: Este producto no tiene un precio válido.');
      return;
    }

    if (infoReal.stock <= 0) {
      mostrarNotificacion(`"${producto.nombre}" está agotado.`);
      return;
    }

    const existente = carrito.find((item) =>
      esMismoItemCarrito(item, producto.id, mlSeleccionado)
    );

    if (existente && existente.cantidad + 1 > infoReal.stock) {
      mostrarNotificacion(
        `Stock máximo alcanzado (${infoReal.stock} unid.) para ${producto.nombre}.`
      );
      return;
    }

    setCarrito((prevCarrito) => {
      const yaExiste = prevCarrito.find((item) =>
        esMismoItemCarrito(item, producto.id, mlSeleccionado)
      );
      if (yaExiste) {
        return prevCarrito.map((item) =>
          esMismoItemCarrito(item, producto.id, mlSeleccionado)
            ? {
                ...item,
                precio: precioValido,
                stock: infoReal.stock,
                cantidad: item.cantidad + 1
              }
            : item
        );
      }
      return [
        ...prevCarrito,
        {
          ...producto,
          ml: mlSeleccionado,
          precio: precioValido,
          stock: infoReal.stock,
          cantidad: 1
        }
      ];
    });

    const etiquetaMl = mlSeleccionado ? ` (${mlSeleccionado})` : '';
    mostrarNotificacion(`¡${producto.nombre}${etiquetaMl} añadido al carrito!`);
  };

  const actualizarCantidad = (id, nuevaCantidad, ml = null) => {
    if (!usuario) return;

    const cantidadEntera = Math.floor(Number(nuevaCantidad));
    if (isNaN(cantidadEntera)) return;

    if (cantidadEntera <= 0) {
      eliminarDelCarrito(id, ml);
      return;
    }

    const itemActual = carrito.find((item) => esMismoItemCarrito(item, id, ml));
    const mlReal = ml ?? itemActual?.ml ?? itemActual?.tamano ?? null;
    const infoReal = obtenerInfoRealProducto(id, mlReal, itemActual || {});

    if (infoReal.stock <= 0) {
      mostrarNotificacion('Este producto se quedó sin stock.');
      return;
    }

    if (cantidadEntera > infoReal.stock) {
      mostrarNotificacion(`Solo hay ${infoReal.stock} unidades disponibles.`);
      setCarrito((prevCarrito) =>
        prevCarrito.map((item) =>
          esMismoItemCarrito(item, id, mlReal)
            ? { ...item, cantidad: infoReal.stock, stock: infoReal.stock }
            : item
        )
      );
      return;
    }

    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        esMismoItemCarrito(item, id, mlReal)
          ? { ...item, cantidad: cantidadEntera, stock: infoReal.stock }
          : item
      )
    );
  };

  const eliminarDelCarrito = (id, ml = null) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((item) => {
        if (ml !== null) {
          return !esMismoItemCarrito(item, id, ml);
        }
        return item.id !== id;
      })
    );
    mostrarNotificacion('Producto eliminado del carrito.');
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    mostrarNotificacion('El carrito ha sido vaciado.');
  };

  const descontarStockCompra = (itemsComprados) => {
    setProductos((prevProductos) =>
      prevProductos.map((prod) => {
        const comprasDeEsteProd = itemsComprados.filter((item) => item.id === prod.id);
        if (comprasDeEsteProd.length === 0) return prod;

        const totalComprado = comprasDeEsteProd.reduce(
          (acc, item) => acc + Number(item.cantidad),
          0
        );

        let nuevosTamanos = prod.tamanos;
        if (Array.isArray(prod.tamanos)) {
          nuevosTamanos = prod.tamanos.map((t) => {
            const compraVariante = comprasDeEsteProd.find(
              (item) => (item.ml || item.tamano) === t.ml
            );
            if (compraVariante) {
              return {
                ...t,
                stock: Math.max(0, Number(t.stock) - Number(compraVariante.cantidad))
              };
            }
            return t;
          });
        }

        return {
          ...prod,
          tamanos: nuevosTamanos,
          stock:
            prod.stock !== undefined && prod.stock !== null
              ? Math.max(0, Number(prod.stock) - totalComprado)
              : prod.stock
        };
      })
    );
  };

  const agregarProducto = async (nuevoProducto) => {
    const precioNumerico = Number(nuevoProducto.precio);
    const stockNumerico =
      nuevoProducto.stock !== undefined ? Number(nuevoProducto.stock) : 10;

    if (isNaN(precioNumerico) || precioNumerico <= 0) {
      alert('Error: El precio del producto debe ser un valor numérico mayor a $0.');
      return;
    }

    if (isNaN(stockNumerico) || stockNumerico < 0) {
      alert('Error: El stock no puede ser negativo.');
      return;
    }

    const productoValidado = {
      ...nuevoProducto,
      precio: precioNumerico,
      stock: Math.floor(stockNumerico)
    };

    try {
      const creadoEnBackend = await crearProductoApi(productoValidado);
      setProductos((prev) => [...prev, creadoEnBackend]);
      mostrarNotificacion(`Producto "${creadoEnBackend.nombre}" guardado en base de datos`);
    } catch (error) {
      setProductos((prev) => [...prev, productoValidado]);
      mostrarNotificacion(`Producto "${nuevoProducto.nombre}" guardado localmente`);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await eliminarProductoApi(id);
    } catch (error) {}
    setProductos((prev) => prev.filter((p) => p.id !== id));
    mostrarNotificacion('Producto eliminado.');
  };

  const cantidadCarrito = usuario
    ? carrito.reduce((acc, item) => acc + item.cantidad, 0)
    : 0;

  const productosFiltrados = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (p.categoria && p.categoria.toLowerCase().includes(busqueda.toLowerCase())) ||
      (p.descripcion && p.descripcion.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const operadorValido = Boolean(usuarioAdmin && !usuario);
  const esRutaAdmin =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/admin-login');

  return (
    <>
      <Navbar
        cantidadCarrito={cantidadCarrito}
        usuario={usuario}
        cerrarSesion={cerrarSesion}
        usuarioAdmin={operadorValido ? usuarioAdmin : null}
        cerrarSesionAdmin={cerrarSesionAdmin}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />
      <Routes>
        <Route
          path="/"
          element={<Catalogo productos={productos} agregarAlCarrito={agregarAlCarrito} />}
        />
        <Route
          path="/productos"
          element={<Productos productos={productos} agregarAlCarrito={agregarAlCarrito} />}
        />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route
          path="/busqueda"
          element={
            <ResultadosBusqueda
              productos={productosFiltrados}
              agregarAlCarrito={agregarAlCarrito}
              busqueda={busqueda}
            />
          }
        />
        <Route
          path="/categorias"
          element={<Categorias productos={productos} agregarAlCarrito={agregarAlCarrito} />}
        />
        <Route
          path="/categorias/:categoria"
          element={
            <CategoriaDetalle productos={productos} agregarAlCarrito={agregarAlCarrito} />
          }
        />
        <Route
          path="/producto/:id"
          element={
            <DetalleProducto productos={productos} agregarAlCarrito={agregarAlCarrito} />
          }
        />
        <Route
          path="/ofertas"
          element={<Ofertas productos={productos} agregarAlCarrito={agregarAlCarrito} />}
        />
        <Route
          path="/match"
          element={<PerfumeMatch productos={productos} agregarAlCarrito={agregarAlCarrito} />}
        />
        <Route
          path="/carrito"
          element={
            usuario ? (
              <Carrito
                carrito={carrito}
                productos={productos}
                vaciarCarrito={vaciarCarrito}
                eliminarDelCarrito={eliminarDelCarrito}
                actualizarCantidad={actualizarCantidad}
                mostrarNotificacion={mostrarNotificacion}
              />
            ) : (
              <Navigate
                to="/login"
                state={{
                  desde: '/carrito',
                  abrirRegistro: true,
                  mensaje: 'Debes registrarte o iniciar sesión para ver tu carrito.'
                }}
                replace
              />
            )
          }
        />
        <Route
          path="/checkout"
          element={
            usuario ? (
              <Checkout
                carrito={carrito}
                productos={productos}
                vaciarCarrito={vaciarCarrito}
                descontarStockCompra={descontarStockCompra}
                usuario={usuario}
                mostrarNotificacion={mostrarNotificacion}
              />
            ) : (
              <Navigate
                to="/login"
                state={{
                  desde: '/checkout',
                  abrirRegistro: true,
                  mensaje: 'Debes registrarte o iniciar sesión para finalizar tu compra.'
                }}
                replace
              />
            )
          }
        />
        <Route path="/pago-exitoso" element={<PagoExitoso />} />
        <Route path="/login" element={<Login onLogin={iniciarSesion} />} />

        <Route
          path="/admin-login"
          element={
            usuario ? (
              <BloqueoClienteEnOperador mostrarNotificacion={mostrarNotificacion} />
            ) : operadorValido ? (
              <Navigate to="/admin" replace />
            ) : (
              <AdminLogin onLoginAdmin={iniciarSesionAdmin} />
            )
          }
        />

        <Route
          path="/admin"
          element={
            usuario ? (
              <BloqueoClienteEnOperador mostrarNotificacion={mostrarNotificacion} />
            ) : operadorValido ? (
              <Admin
                productos={productos}
                agregarProducto={agregarProducto}
                eliminarProducto={eliminarProducto}
              />
            ) : (
              <Navigate to="/admin-login" replace />
            )
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      {!esRutaAdmin && (
        <RuletaDescuento
          usuario={usuario}
          onPremioGanado={(premio) => {
            if (premio?.texto) {
              mostrarNotificacion(`¡Premio activado: ${premio.texto}!`);
            }
          }}
        />
      )}
      <Piepagina />
      <Toast mensaje={mensajeToast} />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
