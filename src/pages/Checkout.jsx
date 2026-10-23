import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function Checkout({ carrito, vaciarCarrito, usuario }) {
  const navigate = useNavigate();
  
  const regionesChile = [
    "Arica y Parinacota", "Tarapacá", "Antofagasta", "Atacama", "Coquimbo",
    "Valparaíso", "Región Metropolitana", "O'Higgins", "Maule", "Ñuble",
    "Biobío", "La Araucanía", "Los Ríos", "Los Lagos", "Aysén", "Magallanes"
  ];

  const [formData, setFormData] = useState({
    nombre: usuario ? usuario.nombre : '',
    email: usuario ? usuario.email : '',
    telefono: '',
    direccion: '',
    region: 'Región Metropolitana',
    comuna: ''
  });

  const [metodoPago, setMetodoPago] = useState('tarjeta'); 

  const [cardData, setCardData] = useState({
    numeroTarjeta: '',
    nombreTitular: usuario ? usuario.nombre : '',
    vencimiento: '',
    cvv: '',
    cuotas: '1'
  });

  const [error, setError] = useState('');

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    let { name, value } = e.target;

    if (name === 'numeroTarjeta') {
      value = value.replace(/\D/g, '').slice(0, 16);
      value = value.replace(/(\d{4})/g, '$1 ').trim();
    }

    
    if (name === 'vencimiento') {
      value = value.replace(/\D/g, '').slice(0, 4);
      if (value.length >= 3) {
        value = `${value.slice(0, 2)}/${value.slice(2)}`;
      }
    }


    if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 4);
    }

    setCardData({ ...cardData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');


    if (!formData.nombre || !formData.email || !formData.telefono || !formData.direccion || !formData.comuna) {
      setError('Por favor, completa todos los campos de despacho.');
      return;
    }

    if (metodoPago === 'tarjeta') {
      const numLimpio = cardData.numeroTarjeta.replace(/\s/g, '');
      if (numLimpio.length < 15) {
        setError('Ingresa un número de tarjeta válido de 15 o 16 dígitos.');
        return;
      }
      if (!cardData.nombreTitular) {
        setError('Ingresa el nombre impreso en la tarjeta.');
        return;
      }
      if (cardData.vencimiento.length < 5) {
        setError('Ingresa la fecha de vencimiento en formato MM/AA.');
        return;
      }
      if (cardData.cvv.length < 3) {
        setError('Ingresa el código de seguridad (CVV) de 3 o 4 dígitos.');
        return;
      }
    }

    vaciarCarrito();
    navigate('/pago-exitoso');
  };

  if (carrito.length === 0) {
    return (
      <div className="container text-center my-5 py-5">
        <h2 className="fw-bold mb-3">Tu carrito está vacío 🛒</h2>
        <p className="text-muted mb-4">Agrega productos antes de proceder al pago.</p>
        <Link to="/" className="btn btn-warning fw-bold rounded-pill px-4">
          Ir al Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">Finalizar Compra</h2>

      {error && <div className="alert alert-danger mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-lg-7">
            <div className="card shadow-sm border-0 p-4 mb-4 rounded-4">
              <h4 className="fw-bold mb-3 text-warning">1. Datos de Envío</h4>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Nombre Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Ej: Ana Silva"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ana@ejemplo.cl"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Teléfono de Contacto</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="+56 9 1234 5678"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Región</label>
                  <select
                    className="form-select"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                  >
                    {regionesChile.map((reg, idx) => (
                      <option key={idx} value={reg}>{reg}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Comuna</label>
                  <input
                    type="text"
                    className="form-control"
                    name="comuna"
                    value={formData.comuna}
                    onChange={handleInputChange}
                    placeholder="Ej: Santiago, Las Condes, Concepción"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Dirección y Número</label>
                  <input
                    type="text"
                    className="form-control"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    placeholder="Av. Providencia 1234, Dpto 502"
                  />
                </div>
              </div>
            </div>

            <div className="card shadow-sm border-0 p-4 rounded-4">
              <h4 className="fw-bold mb-3 text-warning">2. Método de Pago</h4>
              
              <div className="d-flex flex-column gap-3 mb-4">
                <div 
                  className={`border rounded-3 p-3 cursor-pointer d-flex align-items-center gap-3 ${metodoPago === 'tarjeta' ? 'border-warning bg-light' : ''}`}
                  onClick={() => setMetodoPago('tarjeta')}
                  style={{ cursor: 'pointer' }}
                >
                  <input
                    type="radio"
                    name="metodoPago"
                    id="pagoTarjeta"
                    checked={metodoPago === 'tarjeta'}
                    onChange={() => setMetodoPago('tarjeta')}
                  />
                  <label htmlFor="pagoTarjeta" className="m-0 fw-bold flex-grow-1" style={{ cursor: 'pointer' }}>
                     Tarjeta de Crédito / Débito (Webpay)
                  </label>
                  <span className="badge bg-secondary">Visa / Mastercard / Redcompra</span>
                </div>

                <div 
                  className={`border rounded-3 p-3 cursor-pointer d-flex align-items-center gap-3 ${metodoPago === 'transferencia' ? 'border-warning bg-light' : ''}`}
                  onClick={() => setMetodoPago('transferencia')}
                  style={{ cursor: 'pointer' }}
                >
                  <input
                    type="radio"
                    name="metodoPago"
                    id="pagoTransferencia"
                    checked={metodoPago === 'transferencia'}
                    onChange={() => setMetodoPago('transferencia')}
                  />
                  <label htmlFor="pagoTransferencia" className="m-0 fw-bold flex-grow-1" style={{ cursor: 'pointer' }}>
                     Transferencia Bancaria
                  </label>
                  <span className="badge bg-info text-dark">Datos al finalizar</span>
                </div>

                <div 
                  className={`border rounded-3 p-3 cursor-pointer d-flex align-items-center gap-3 ${metodoPago === 'mercadopago' ? 'border-warning bg-light' : ''}`}
                  onClick={() => setMetodoPago('mercadopago')}
                  style={{ cursor: 'pointer' }}
                >
                  <input
                    type="radio"
                    name="metodoPago"
                    id="pagoMercadopago"
                    checked={metodoPago === 'mercadopago'}
                    onChange={() => setMetodoPago('mercadopago')}
                  />
                  <label htmlFor="pagoMercadopago" className="m-0 fw-bold flex-grow-1" style={{ cursor: 'pointer' }}>
                     Mercado Pago / Servipag
                  </label>
                  <span className="badge bg-primary">Dinero en cuenta</span>
                </div>
              </div>

              {metodoPago === 'tarjeta' && (
                <div className="border-top pt-3 mt-2">
                  <h6 className="fw-bold mb-3">Datos de la Tarjeta</h6>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label small fw-bold">Número de Tarjeta</label>
                      <input
                        type="text"
                        className="form-control"
                        name="numeroTarjeta"
                        placeholder="1234 5678 9012 3456"
                        value={cardData.numeroTarjeta}
                        onChange={handleCardChange}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold">Nombre del Titular</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nombreTitular"
                        placeholder="Como aparece en la tarjeta"
                        value={cardData.nombreTitular}
                        onChange={handleCardChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-bold">Vencimiento</label>
                      <input
                        type="text"
                        className="form-control"
                        name="vencimiento"
                        placeholder="MM/AA"
                        value={cardData.vencimiento}
                        onChange={handleCardChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-bold">CVV</label>
                      <input
                        type="password"
                        className="form-control"
                        name="cvv"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={handleCardChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-bold">Cuotas</label>
                      <select
                        className="form-select"
                        name="cuotas"
                        value={cardData.cuotas}
                        onChange={(e) => setCardData({ ...cardData, cuotas: e.target.value })}
                      >
                        <option value="1">1 Cuota (Sin Interés)</option>
                        <option value="3">3 Cuotas sin Interés</option>
                        <option value="6">6 Cuotas sin Interés</option>
                        <option value="12">12 Cuotas</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {metodoPago === 'transferencia' && (
                <div className="alert alert-info small mt-2">
                  Al hacer clic en "Pagar Ahora", te enviaremos los datos de la Cuenta Corriente de <strong>Aroma & Esencia SpA</strong> a tu correo electrónico para completar la transferencia.
                </div>
              )}

              {metodoPago === 'mercadopago' && (
                <div className="alert alert-primary small mt-2">
                  Serás serás redirigido a la pasarela segura de Mercado Pago para autorizar la transacción.
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card shadow-sm border-0 p-4 rounded-4 position-sticky" style={{ top: '90px' }}>
              <h4 className="fw-bold mb-3">Resumen del Pedido</h4>
              <ul className="list-group list-group-flush mb-3">
                {carrito.map((item) => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <div>
                      <h6 className="my-0 fw-bold">{item.nombre}</h6>
                      <small className="text-muted">Cantidad: {item.cantidad}</small>
                    </div>
                    <span className="text-muted">${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between align-items-center px-0 text-success">
                  <span>Envío a Domicilio</span>
                  <span>GRATIS</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0 fs-5 fw-bold border-top pt-3">
                  <span>Total CLP</span>
                  <span className="text-warning">${total.toLocaleString('es-CL')}</span>
                </li>
              </ul>

              <button type="submit" className="btn btn-warning w-100 fw-bold py-3 rounded-pill fs-5 shadow-sm">
                 Pagar ${total.toLocaleString('es-CL')}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}