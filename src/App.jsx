import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { productosIniciales } from './data/productos';
import { Navbar } from './components/Navbar';
import { Piepagina } from './components/Piepagina';
import { Toast } from './components/Toast';
import { Catalogo } from './pages/Catalogo';
import { Categorias } from './pages/Categorias';
import { DetalleProducto } from './pages/DetalleProducto';
import { Carrito } from './pages/Carrito';
import { Checkout } from './pages/Checkout';
import { PagoExitoso } from './pages/PagoExitoso';
import { Ofertas } from './pages/Ofertas';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import { AdminLogin } from './pages/AdminLogin';
import { ResultadosBusqueda } from './pages/ResultadosBusqueda';
import { NotFound } from './pages/NotFound';

export default function App() {
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem('aroma_productos_v11');
    if (guardados) {
      try {
        const parsed = JSON.parse(guardados);
        // 🧹 Limpia automáticamente cualquier producto con precio negativo o igual a 0 almacenado antes
        return parsed.filter(p => Number(p.precio) > 0);
      } catch (e) {
        return productosIniciales;
      }
    }
    return productosIniciales;
  });

  const [carrito, setCarrito] = useState(() => {
    const guardados = localStorage.getItem('aroma_carrito');
    return guardados ? JSON.parse(guardados) : [];
  });

  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem('aroma_usuario_activo');
    return guardado ? JSON.parse(guardado) : null;
  });

  const [usuarioAdmin, setUsuarioAdmin] = useState(() => {
    const guardado = localStorage.getItem('aroma_admin_activo');
    return guardado ? JSON.parse(guardado) : null;
  });

  const [busqueda, setBusqueda] = useState('');
  const [mensajeToast, setMensajeToast] = useState('');

  useEffect(() => {
    localStorage.setItem('aroma_productos_v11', JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    localStorage.setItem('aroma_carrito', JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('aroma_usuario_activo', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('aroma_usuario_activo');
    }
  }, [usuario]);

  useEffect(() => {
    if (usuarioAdmin) {
      localStorage.setItem('aroma_admin_activo', JSON.stringify(usuarioAdmin));
    } else {
      localStorage.removeItem('aroma_admin_activo');
    }
  }, [usuarioAdmin]);

  const iniciarSesion = (datosUsuario) => setUsuario(datosUsuario);
  const cerrarSesion = () => setUsuario(null);

  const iniciarSesionAdmin = (datosAdmin) => setUsuarioAdmin(datosAdmin);
  const cerrarSesionAdmin = () => setUsuarioAdmin(null);

  const mostrarNotificacion = (mensaje) => {
    setMensajeToast(mensaje);
    setTimeout(() => {
      setMensajeToast('');
    }, 2500);
  };

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existente = prevCarrito.find((item) => item.id === producto.id);
      if (existente) {
        return prevCarrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });

    mostrarNotificacion(`¡${producto.nombre} añadido al carrito!`);
  };

  const actualizarCantidad = (id, cantidad) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(id);
      return;
    }
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === id ? { ...item, cantidad } : item
      )
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  // 🛡️ ESCUDO DE SEGURIDAD GLOBAL: Rechaza cualquier precio <= 0 o inválido
  const agregarProducto = (nuevoProducto) => {
    const precioNumerico = Number(nuevoProducto.precio);

    if (isNaN(precioNumerico) || precioNumerico <= 0) {
      alert('Error: El precio del producto debe ser un valor numérico mayor a $0.');
      return;
    }

    const productoValidado = {
      ...nuevoProducto,
      precio: precioNumerico
    };

    setProductos((prev) => [...prev, productoValidado]);
    mostrarNotificacion(`Producto "${nuevoProducto.nombre}" guardado con éxito`);
  };

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const cantidadCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    (p.categoria && p.categoria.toLowerCase().includes(busqueda.toLowerCase())) ||
    (p.descripcion && p.descripcion.toLowerCase().includes(busqueda.toLowerCase()))
  );

  return (
    <Router>
      <Navbar 
        cantidadCarrito={cantidadCarrito} 
        usuario={usuario} 
        cerrarSesion={cerrarSesion}
        usuarioAdmin={usuarioAdmin}
        cerrarSesionAdmin={cerrarSesionAdmin}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />
      <Routes>
        <Route path="/" element={<Catalogo productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
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
        <Route path="/categorias" element={<Categorias productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/producto/:id" element={<DetalleProducto productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/ofertas" element={<Ofertas productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
        <Route 
          path="/carrito" 
          element={
            <Carrito 
              carrito={carrito} 
              vaciarCarrito={vaciarCarrito} 
              eliminarDelCarrito={eliminarDelCarrito} 
              actualizarCantidad={actualizarCantidad}
            />
          } 
        />
        <Route path="/checkout" element={<Checkout carrito={carrito} vaciarCarrito={vaciarCarrito} usuario={usuario} />} />
        <Route path="/pago-exitoso" element={<PagoExitoso />} />
        <Route path="/login" element={<Login onLogin={iniciarSesion} />} />
        <Route path="/admin-login" element={<AdminLogin onLoginAdmin={iniciarSesionAdmin} />} />

        <Route
          path="/admin"
          element={
            usuarioAdmin ? (
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
      <Piepagina />
      <Toast mensaje={mensajeToast} />
    </Router>
  );
}