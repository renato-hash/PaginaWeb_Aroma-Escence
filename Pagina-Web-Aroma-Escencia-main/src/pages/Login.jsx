import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({ onLogin }) {
  const [esRegistro, setEsRegistro] = useState(false);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (esRegistro && !nombre)) {
      setError('Por favor completa todos los campos.');
      return;
    }

    
    const usuariosGuardados = JSON.parse(localStorage.getItem('aroma_usuarios') || '[]');

    if (esRegistro) {
     
      const existe = usuariosGuardados.some((u) => u.email === email);
      if (existe) {
        setError('El correo electrónico ya está registrado.');
        return;
      }

      const nuevoUsuario = { nombre, email, password, rol: 'cliente' };
      usuariosGuardados.push(nuevoUsuario);
      localStorage.setItem('aroma_usuarios', JSON.stringify(usuariosGuardados));

      onLogin({ nombre: nuevoUsuario.nombre, email: nuevoUsuario.email, rol: 'cliente' });
      navigate('/');
    } else {
      // Iniciar sesión
      const usuarioEncontrado = usuariosGuardados.find(
        (u) => u.email === email && u.password === password
      );

      // Usuario de prueba por defecto si no hay registrados
      if (!usuarioEncontrado && email === 'usuario@aroma.cl' && password === '123456') {
        const usuarioDemo = { nombre: 'Cliente Demo', email, rol: 'cliente' };
        onLogin(usuarioDemo);
        navigate('/');
        return;
      }

      if (usuarioEncontrado) {
        onLogin({ nombre: usuarioEncontrado.nombre, email: usuarioEncontrado.email, rol: 'cliente' });
        navigate('/');
      } else {
        setError('Credenciales incorrectas. Intenta con usuario@aroma.cl y clave 123456.');
      }
    }
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: '420px', width: '100%' }}>
        <h3 className="text-center fw-bold mb-3">
          {esRegistro ? 'Crear Cuenta' : 'Iniciar Sesión'}
        </h3>
        <p className="text-muted text-center small mb-4">
          {esRegistro ? 'Regístrate para realizar tus compras' : 'Ingresa tus datos para acceder'}
        </p>

        {error && <div className="alert alert-danger py-2 small text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          {esRegistro && (
            <div className="mb-3">
              <label className="form-label fw-bold">Nombre Completo</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej: María González"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label fw-bold">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              placeholder="ejemplo@correo.cl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-warning w-100 fw-bold py-2 mb-3">
            {esRegistro ? 'Registrarse' : 'Ingresar'}
          </button>
        </form>

        <div className="text-center pt-2 border-top">
          <button
            className="btn btn-link text-decoration-none p-0 small"
            onClick={() => {
              setEsRegistro(!esRegistro);
              setError('');
            }}
          >
            {esRegistro
              ? '¿Ya tienes una cuenta? Inicia sesión aquí'
              : '¿No tienes cuenta? Regístrate aquí'}
          </button>
        </div>
      </div>
    </div>
  );
}