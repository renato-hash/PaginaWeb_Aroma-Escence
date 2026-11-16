import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginApi, registrarApi } from '../services/api';

export function Login({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [esRegistro, setEsRegistro] = useState(
    Boolean(location.state?.abrirRegistro)
  );
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');
  const [cargando, setCargando] = useState(false);

  const mensajeRedireccion = location.state?.mensaje || '';
  const rutaDestino = location.state?.desde || '/';

  useEffect(() => {
    if (location.state?.abrirRegistro) {
      setEsRegistro(true);
    }
  }, [location.state]);

  const limpiarErrorCampo = (campo) => {
    if (errores[campo]) {
      setErrores((prev) => ({ ...prev, [campo]: '' }));
    }
    if (errorGeneral) {
      setErrorGeneral('');
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    const emailLimpio = email.trim().toLowerCase();
    const regexGmail = /^[a-zA-Z0-9._%+-]+@gmail\.(cl|com)$/i;

    if (esRegistro) {
      if (!nombre.trim() || nombre.trim().length < 3) {
        nuevosErrores.nombre = 'Ingresa tu nombre completo (mínimo 3 caracteres).';
      } else if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(nombre.trim())) {
        nuevosErrores.nombre = 'El nombre solo debe contener letras y espacios.';
      }
    }

    if (!emailLimpio) {
      nuevosErrores.email = 'Ingresa tu correo electrónico.';
    } else if (!regexGmail.test(emailLimpio)) {
      nuevosErrores.email =
        'El correo debe terminar obligatoriamente en @gmail.com o @gmail.cl.';
    }

    if (!password) {
      nuevosErrores.password = 'Ingresa una contraseña.';
    } else if (password.length < 6) {
      nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    if (esRegistro) {
      if (!confirmPassword) {
        nuevosErrores.confirmPassword = 'Confirma tu contraseña.';
      } else if (password !== confirmPassword) {
        nuevosErrores.confirmPassword = 'Las contraseñas no coinciden.';
      }
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorGeneral('');

    if (!validarFormulario()) {
      return;
    }

    const emailLimpio = email.trim().toLowerCase();
    const nombreLimpio = nombre.trim();
    setCargando(true);

    // 1. Intenta autenticar o registrar contra Backend Spring Boot usando api.js
    try {
      const data = esRegistro
        ? await registrarApi(nombreLimpio, emailLimpio, password)
        : await loginApi(emailLimpio, password);

      if (data.rol && data.rol !== 'Cliente') {
        setCargando(false);
        setErrorGeneral(
          'Esta cuenta pertenece al personal administrativo. Usa el Portal Personal.'
        );
        return;
      }

      const sesionCliente = {
        id: data.id || Date.now(),
        nombre: data.nombre || nombreLimpio || emailLimpio.split('@')[0],
        email: data.email || emailLimpio,
        rol: 'Cliente',
        token: data.token
      };

      onLogin(sesionCliente);
      setCargando(false);
      navigate(rutaDestino, { replace: true });
      return;
    } catch (errorApi) {
      // Si el backend respondió con error de negocio (credenciales inválidas o correo duplicado)
      const msg = errorApi.message || '';
      if (
        msg.toLowerCase().includes('incorrect') ||
        msg.toLowerCase().includes('credenciales')
      ) {
        setErrorGeneral('Correo o contraseña incorrectos.');
        setCargando(false);
        return;
      }
      if (
        msg.toLowerCase().includes('registrado') ||
        msg.toLowerCase().includes('existe')
      ) {
        setErrores({ email: 'Este correo electrónico ya se encuentra registrado.' });
        setCargando(false);
        return;
      }
      // Si es error de red (Failed to fetch), continúa al respaldo local
    }

    // 2. Respaldo local sincronizado con el módulo Usuarios de Admin.jsx
    let usuariosGuardados = [];
    try {
      usuariosGuardados = JSON.parse(localStorage.getItem('aroma_usuarios') || '[]');
      if (!Array.isArray(usuariosGuardados)) usuariosGuardados = [];
    } catch (err) {
      usuariosGuardados = [];
    }

    if (esRegistro) {
      const existe = usuariosGuardados.some(
        (u) => u.email && u.email.toLowerCase() === emailLimpio
      );

      if (existe) {
        setCargando(false);
        setErrores({ email: 'Este correo electrónico ya se encuentra registrado.' });
        return;
      }

      const nuevoUsuario = {
        id: Date.now(),
        nombre: nombreLimpio,
        email: emailLimpio,
        password,
        rol: 'Cliente'
      };

      usuariosGuardados.push(nuevoUsuario);
      localStorage.setItem('aroma_usuarios', JSON.stringify(usuariosGuardados));

      onLogin({
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: 'Cliente',
        token: `jwt-cliente-${nuevoUsuario.id}`
      });

      setCargando(false);
      navigate(rutaDestino, { replace: true });
    } else {
      const usuarioEncontrado = usuariosGuardados.find(
        (u) => u.email && u.email.toLowerCase() === emailLimpio && u.password === password
      );

      if (usuarioEncontrado) {
        if (usuarioEncontrado.rol && usuarioEncontrado.rol !== 'Cliente') {
          setCargando(false);
          setErrorGeneral(
            'Esta cuenta pertenece al personal administrativo. Usa el Portal Personal.'
          );
          return;
        }

        onLogin({
          id: usuarioEncontrado.id || Date.now(),
          nombre: usuarioEncontrado.nombre,
          email: usuarioEncontrado.email,
          rol: 'Cliente',
          token: `jwt-cliente-${usuarioEncontrado.id || Date.now()}`
        });
        setCargando(false);
        navigate(rutaDestino, { replace: true });
      } else {
        setCargando(false);
        setErrorGeneral(
          'Correo o contraseña incorrectos. Si aún no tienes cuenta, regístrate abajo.'
        );
      }
    }
  };

  const alternarModo = () => {
    setEsRegistro(!esRegistro);
    setErrores({});
    setErrorGeneral('');
    setConfirmPassword('');
  };

  return (
    <main className="container my-5 d-flex justify-content-center">
      <section
        aria-labelledby="titulo-auth"
        className="card shadow-lg p-4 p-md-5 rounded-4 border-0"
        style={{ maxWidth: '440px', width: '100%' }}
      >
        <div className="text-center mb-2">
          <div
            className="d-inline-flex align-items-center justify-content-center bg-warning-subtle text-warning-emphasis rounded-circle mb-2"
            style={{ width: '54px', height: '54px', fontSize: '1.4rem' }}
            aria-hidden="true"
          >
            <i className={`fa-solid ${esRegistro ? 'fa-user-plus' : 'fa-user'}`}></i>
          </div>
          <h3 id="titulo-auth" className="fw-bold mb-1">
            {esRegistro ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </h3>
          <p className="text-muted small mb-0">
            {esRegistro
              ? 'Regístrate para agregar productos al carrito y comprar'
              : 'Ingresa tus datos para acceder a tu cuenta'}
          </p>
        </div>

        {mensajeRedireccion && (
          <div className="alert alert-warning py-2 small text-center fw-semibold" role="alert">
            <i className="fa-solid fa-circle-info me-1" aria-hidden="true"></i>
            {mensajeRedireccion}
          </div>
        )}

        {errorGeneral && (
          <div className="alert alert-danger py-2 small text-center" role="alert">
            {errorGeneral}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {esRegistro && (
            <div className="mb-3">
              <label htmlFor="login-nombre" className="form-label fw-bold">
                Nombre Completo *
              </label>
              <input
                id="login-nombre"
                type="text"
                autoComplete="name"
                className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                placeholder="Ej: María González"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                  limpiarErrorCampo('nombre');
                }}
                required
              />
              {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="login-email" className="form-label fw-bold">
              Correo Electrónico *
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              className={`form-control ${errores.email ? 'is-invalid' : ''}`}
              placeholder="ejemplo@gmail.com o ejemplo@gmail.cl"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                limpiarErrorCampo('email');
              }}
              required
            />
            {errores.email && <div className="invalid-feedback">{errores.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="login-password" className="form-label fw-bold">
              Contraseña *
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete={esRegistro ? 'new-password' : 'current-password'}
              className={`form-control ${errores.password ? 'is-invalid' : ''}`}
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                limpiarErrorCampo('password');
              }}
              required
            />
            {errores.password && <div className="invalid-feedback">{errores.password}</div>}
          </div>

          {esRegistro && (
            <div className="mb-3">
              <label htmlFor="login-confirm-password" className="form-label fw-bold">
                Confirmar Contraseña *
              </label>
              <input
                id="login-confirm-password"
                type="password"
                autoComplete="new-password"
                className={`form-control ${errores.confirmPassword ? 'is-invalid' : ''}`}
                placeholder="Repite tu contraseña"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  limpiarErrorCampo('confirmPassword');
                }}
                required
              />
              {errores.confirmPassword && (
                <div className="invalid-feedback">{errores.confirmPassword}</div>
              )}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-warning w-100 fw-bold py-2 mb-3"
            disabled={cargando}
          >
            <i
              className={`fa-solid ${esRegistro ? 'fa-user-plus' : 'fa-right-to-bracket'} me-2`}
              aria-hidden="true"
            ></i>
            {cargando
              ? 'Procesando...'
              : esRegistro
              ? 'Registrarme y Continuar'
              : 'Ingresar'}
          </button>
        </form>

        <div className="text-center pt-2 border-top">
          <button
            type="button"
            className="btn btn-link text-decoration-none p-0 small"
            onClick={alternarModo}
          >
            {esRegistro
              ? '¿Ya tienes una cuenta? Inicia sesión aquí'
              : '¿No tienes cuenta? Regístrate aquí'}
          </button>
        </div>
      </section>
    </main>
  );
}