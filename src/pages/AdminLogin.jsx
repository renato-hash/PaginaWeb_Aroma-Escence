import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AdminLogin({ onLoginAdmin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const trabajadoresAutorizados = [
    { nombre: 'Administrador Principal', email: 'admin@aroma.cl', password: 'admin123', rol: 'admin' },
    { nombre: 'Operador Tienda', email: 'trabajador@aroma.cl', password: 'staff123', rol: 'trabajador' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    
    const empleadoEncontrado = trabajadoresAutorizados.find(
      (t) => t.email.toLowerCase() === email.toLowerCase() && t.password === password
    );

    if (empleadoEncontrado) {
      const datosSesion = {
        nombre: empleadoEncontrado.nombre,
        email: empleadoEncontrado.email,
        rol: empleadoEncontrado.rol
      };
      onLoginAdmin(datosSesion);
      navigate('/admin');
    } else {
      setError('Credenciales de trabajador no válidas. Acceso denegado.');
    }
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4 rounded-4 border-dark" style={{ maxWidth: '420px', width: '100%' }}>
        <div className="text-center mb-3">
          <span className="fs-1">🔐</span>
          <h3 className="fw-bold mt-2">Portal Trabajadores</h3>
          <p className="text-muted small">Ingreso exclusivo para personal administrativo</p>
        </div>

        {error && <div className="alert alert-danger py-2 small text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Correo Institucional</label>
            <input
              type="email"
              className="form-control"
              placeholder="admin@aroma.cl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Contraseña de Acceso</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-dark w-100 fw-bold py-2 mb-3">
            Ingresar al Panel
          </button>
        </form>

        <div className="bg-light p-3 rounded-3 small text-muted">
          <strong>Credenciales de prueba:</strong>
          <ul className="mb-0 ps-3 mt-1">
            <li><code>admin@aroma.cl</code> / <code>admin123</code></li>
            <li><code>trabajador@aroma.cl</code> / <code>staff123</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
}