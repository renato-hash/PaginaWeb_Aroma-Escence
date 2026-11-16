import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../services/api';

export function AdminLogin({ onLoginAdmin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');
  const [cargando, setCargando] = useState(false);

  const validarFormulario = () => {
    const nuevosErrores = {};
    const emailLimpio = email.trim().toLowerCase();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailLimpio) {
      nuevosErrores.email = 'Ingresa tu correo institucional.';
    } else if (!regexEmail.test(emailLimpio)) {
      nuevosErrores.email = 'Ingresa un formato de correo válido.';
    }

    if (!password) {
      nuevosErrores.password = 'Ingresa tu contraseña de acceso.';
    } else if (password.length < 6) {
      nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres.';
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
    setCargando(true);

    // 1. Autenticación contra el Backend Spring Boot (JWT) usando api.js
    try {
      const data = await loginApi(emailLimpio, password);
      const rolBackend = (data.rol || data.role || '').toUpperCase();

      if (
        !rolBackend.includes('ADMIN') &&
        !rolBackend.includes('OPERADOR') &&
        !rolBackend.includes('TRABAJADOR')
      ) {
        setErrorGeneral('Acceso denegado: tu cuenta no tiene permisos de personal.');
        setCargando(false);
        return;
      }

      onLoginAdmin({
        id: data.id || Date.now(),
        nombre: data.nombre || 'Operador Tienda',
        email: data.email || emailLimpio,
        rol: rolBackend,
        token: data.token
      });

      setCargando(false);
      navigate('/admin', { replace: true });
      return;
    } catch (errorApi) {
      const msg = (errorApi.message || '').toLowerCase();
      if (msg.includes('incorrect') || msg.includes('credenciales')) {
        setErrorGeneral('Credenciales institucionales incorrectas.');
        setCargando(false);
        return;
      }
      // Si el backend Spring Boot aún no está activo, continúa con validación local (.env)
    }

    // 2. Respaldo local mediante variables de entorno (.env)
    const adminEmailEnv = (import.meta.env.VITE_ADMIN_EMAIL || '').toLowerCase();
    const adminPassEnv = import.meta.env.VITE_ADMIN_PASS || '';
    const staffEmailEnv = (import.meta.env.VITE_STAFF_EMAIL || '').toLowerCase();
    const staffPassEnv = import.meta.env.VITE_STAFF_PASS || '';

    if (adminEmailEnv && emailLimpio === adminEmailEnv && password === adminPassEnv) {
      onLoginAdmin({
        id: 1,
        nombre: 'Administrador Principal',
        email: emailLimpio,
        rol: 'ROLE_ADMIN',
        token: `jwt-admin-${Date.now()}`
      });
      setCargando(false);
      navigate('/admin', { replace: true });
      return;
    }

    if (staffEmailEnv && emailLimpio === staffEmailEnv && password === staffPassEnv) {
      onLoginAdmin({
        id: 2,
        nombre: 'Operador Tienda',
        email: emailLimpio,
        rol: 'ROLE_OPERADOR',
        token: `jwt-operador-${Date.now()}`
      });
      setCargando(false);
      navigate('/admin', { replace: true });
      return;
    }

    setCargando(false);
    setErrorGeneral('Correo institucional o contraseña incorrectos.');
  };

  return (
    <main className="container my-5 d-flex justify-content-center">
      <section
        aria-labelledby="titulo-portal-trabajadores"
        className="card shadow-lg p-4 p-md-5 rounded-4 border-0"
        style={{ maxWidth: '450px', width: '100%' }}
      >
        <div className="text-center mb-3">
          <div
            className="d-inline-flex align-items-center justify-content-center bg-warning-subtle text-warning-emphasis rounded-circle mb-2"
            style={{ width: '56px', height: '56px', fontSize: '1.6rem' }}
            aria-hidden="true"
          >
            🔐
          </div>
          <h2 id="titulo-portal-trabajadores" className="fw-bold mb-1">
            Portal Trabajadores
          </h2>
          <p className="text-muted small mb-0">
            Ingreso exclusivo para personal administrativo
          </p>
        </div>

        {errorGeneral && (
          <div className="alert alert-danger py-2 small text-center" role="alert">
            {errorGeneral}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="admin-email" className="form-label fw-bold">
              Correo Institucional *
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              className={`form-control ${errores.email ? 'is-invalid' : ''}`}
              placeholder="correo@aroma.cl"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errores.email) setErrores((prev) => ({ ...prev, email: '' }));
                if (errorGeneral) setErrorGeneral('');
              }}
              required
            />
            {errores.email && <div className="invalid-feedback">{errores.email}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="admin-password" className="form-label fw-bold">
              Contraseña de Acceso *
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              className={`form-control ${errores.password ? 'is-invalid' : ''}`}
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errores.password) setErrores((prev) => ({ ...prev, password: '' }));
                if (errorGeneral) setErrorGeneral('');
              }}
              required
            />
            {errores.password && <div className="invalid-feedback">{errores.password}</div>}
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 fw-bold py-2 rounded-3"
            disabled={cargando}
          >
            {cargando ? 'Verificando acceso...' : 'Ingresar al Panel'}
          </button>
        </form>
      </section>
    </main>
  );
}