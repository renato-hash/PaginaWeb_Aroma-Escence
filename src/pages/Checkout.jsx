import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { crearPedidoApi } from '../services/api';

const ENVIO_GRATIS_DESDE = 60000;
const VALOR_ENVIO = 4990;
const KEY_PREMIO_ACTIVO = 'aroma_premio_ruleta';
const KEY_CUPON_APLICADO = 'aroma_cupon_aplicado';

const leerPremioDisponible = () => {
  try {
    const guardado = localStorage.getItem(KEY_PREMIO_ACTIVO);
    if (!guardado) return null;
    const parsed = JSON.parse(guardado);
    if (parsed && parsed.usado !== true && parsed.tipo !== 'nada') return parsed;
    return null;
  } catch (e) {
    return null;
  }
};

const leerCuponAplicado = () => {
  try {
    const guardado = localStorage.getItem(KEY_CUPON_APLICADO);
    if (!guardado) return null;
    const parsed = JSON.parse(guardado);
    const premioActivo = leerPremioDisponible();
    if (parsed && premioActivo && parsed.codigo === premioActivo.codigo) {
      return parsed;
    }
    return null;
  } catch (e) {
    return null;
  }
};

const formatearRut = (valor) => {
  const limpio = valor.replace(/[^0-9kK]/g, '').toUpperCase().slice(0, 9);
  if (limpio.length <= 1) return limpio;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${cuerpoFormateado}-${dv}`;
};

const validarRutChileno = (rutCompleto) => {
  const limpio = rutCompleto.replace(/[^0-9kK]/g, '').toUpperCase();
  if (limpio.length < 8 || limpio.length > 9) return false;

  const cuerpo = limpio.slice(0, -1);
  const dvIngresado = limpio.slice(-1);

  if (!/^\d+$/.test(cuerpo) || Number(cuerpo) < 1000000) return false;

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = 11 - (suma % 11);
  const dvEsperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto);

  return dvIngresado === dvEsperado;
};

export function Checkout({
  carrito = [],
  productos = [],
  vaciarCarrito,
  descontarStockCompra,
  usuario,
  mostrarNotificacion
}) {
  const navigate = useNavigate();
  const checkoutRef = useRef(null);

  const [premioDisponible, setPremioDisponible] = useState(leerPremioDisponible);
  const [cuponAplicado, setCuponAplicado] = useState(leerCuponAplicado);
  const [codigoInput, setCodigoInput] = useState(() => leerCuponAplicado()?.codigo || '');
  const [mensajeCupon, setMensajeCupon] = useState({ tipo: '', texto: '' });

  const regionesChile = [
    'Arica y Parinacota',
    'Tarapacá',
    'Antofagasta',
    'Atacama',
    'Coquimbo',
    'Valparaíso',
    'Región Metropolitana',
    "O'Higgins",
    'Maule',
    'Ñuble',
    'Biobío',
    'La Araucanía',
    'Los Ríos',
    'Los Lagos',
    'Aysén',
    'Magallanes'
  ];

  const [formData, setFormData] = useState({
    rut: usuario?.rut ? formatearRut(usuario.rut) : '',
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

  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');
  const [procesando, setProcesando] = useState(false);

  useEffect(() => {
    const sincronizar = () => {
      setPremioDisponible(leerPremioDisponible());
      setCuponAplicado(leerCuponAplicado());
    };
    window.addEventListener('storage', sincronizar);
    const intervalo = setInterval(sincronizar, 1000);
    return () => {
      window.removeEventListener('storage', sincronizar);
      clearInterval(intervalo);
    };
  }, []);

  useEffect(() => {
    const contenedor = checkoutRef.current;
    if (!contenedor) return;

    contenedor
      .querySelectorAll('.titulo-compra-blanco, .invalid-feedback')
      .forEach((el) => {
        el.style.setProperty('color', '#ffffff', 'important');
        el.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
        el.style.setProperty('opacity', '1', 'important');
      });

    contenedor
      .querySelectorAll('.form-control, .form-select')
      .forEach((el) => {
        el.style.setProperty('color', '#000000', 'important');
        el.style.setProperty('-webkit-text-fill-color', '#000000', 'important');
        el.style.setProperty('background-color', '#ffffff', 'important');
      });
  }, [carrito.length, metodoPago, errores, cuponAplicado, codigoInput]);

  const handleAplicarCupon = (codigoManual = null) => {
    const codigoAValidar = (codigoManual ?? codigoInput).trim().toUpperCase();
    if (!codigoAValidar) {
      setMensajeCupon({ tipo: 'error', texto: 'Ingresa un código de cupón.' });
      return;
    }

    const premio = leerPremioDisponible();
    if (!premio) {
      setMensajeCupon({
        tipo: 'error',
        texto: 'No tienes cupones disponibles en esta cuenta o ya fue utilizado.'
      });
      return;
    }

    if (premio.codigo?.toUpperCase() !== codigoAValidar) {
      setMensajeCupon({
        tipo: 'error',
        texto: 'El código ingresado no es válido para tu cuenta.'
      });
      return;
    }

    localStorage.setItem(KEY_CUPON_APLICADO, JSON.stringify(premio));
    setCuponAplicado(premio);
    setCodigoInput(premio.codigo);
    setMensajeCupon({
      tipo: 'exito',
      texto: `¡Cupón ${premio.codigo} (${premio.texto}) aplicado correctamente!`
    });
    if (mostrarNotificacion) {
      mostrarNotificacion(`¡Cupón ${premio.codigo} aplicado!`);
    }
  };

  const handleQuitarCupon = () => {
    localStorage.removeItem(KEY_CUPON_APLICADO);
    setCuponAplicado(null);
    setCodigoInput('');
    setMensajeCupon({ tipo: '', texto: '' });
  };

  const problemasStock = carrito.filter((item) => {
    const mlItem = item.ml || item.tamano || null;
    const prodCatalogo =
      productos.length > 0 ? productos.find((p) => p.id === item.id) : item;
    if (productos.length > 0 && !prodCatalogo) return true;

    let stockRaw = prodCatalogo?.stock ?? item.stock;
    if (prodCatalogo && mlItem && Array.isArray(prodCatalogo.tamanos)) {
      const variante = prodCatalogo.tamanos.find((t) => t.ml === mlItem);
      if (variante) stockRaw = variante.stock;
    }

    if (stockRaw !== undefined && stockRaw !== null) {
      return Number(stockRaw) <= 0 || item.cantidad > Number(stockRaw);
    }
    return false;
  });

  const subtotal = carrito.reduce(
    (acc, item) => acc + Number(item.precio) * Number(item.cantidad),
    0
  );

  // Cálculo de beneficios solo si el cupón fue validado y aplicado
  const porcentajeDescuento =
    cuponAplicado?.tipo === 'porcentaje' && Number(cuponAplicado.valor) > 0
      ? Number(cuponAplicado.valor)
      : 0;

  const montoDescuento =
    porcentajeDescuento > 0 ? Math.round((subtotal * porcentajeDescuento) / 100) : 0;

  const subtotalConDescuento = Math.max(0, subtotal - montoDescuento);

  const tieneEnvioGratisPorCupon = cuponAplicado?.tipo === 'envio_gratis';
  const costoEnvio =
    subtotalConDescuento > 0 &&
    subtotalConDescuento < ENVIO_GRATIS_DESDE &&
    !tieneEnvioGratisPorCupon
      ? VALOR_ENVIO
      : 0;

  const total = subtotalConDescuento + costoEnvio;

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name === 'rut') {
      value = formatearRut(value);
    }

    if (name === 'telefono') {
      value = value.replace(/\D/g, '').slice(0, 11);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: '' }));
    }
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

    setCardData((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.rut.trim()) {
      nuevosErrores.rut = 'Ingresa tu RUT.';
    } else if (!validarRutChileno(formData.rut)) {
      nuevosErrores.rut = 'Ingresa un RUT chileno válido (ej: 12.345.678-5).';
    }

    if (!formData.nombre.trim() || formData.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'Ingresa tu nombre completo (mínimo 3 caracteres).';
    } else if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(formData.nombre.trim())) {
      nuevosErrores.nombre = 'El nombre solo debe contener letras y espacios.';
    }

    const regexGmail = /^[a-zA-Z0-9._%+-]+@gmail\.(cl|com)$/i;
    if (!formData.email.trim() || !regexGmail.test(formData.email.trim())) {
      nuevosErrores.email =
        'El correo debe terminar obligatoriamente en @gmail.com o @gmail.cl.';
    }

    if (!/^\d{8,11}$/.test(formData.telefono)) {
      nuevosErrores.telefono =
        'Ingresa solo números (entre 8 y 11 dígitos, ej: 912345678).';
    }

    if (!formData.region) {
      nuevosErrores.region = 'Selecciona una región de despacho.';
    }

    if (!formData.comuna.trim() || formData.comuna.trim().length < 3) {
      nuevosErrores.comuna = 'Ingresa el nombre de la comuna (mínimo 3 letras).';
    } else if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(formData.comuna.trim())) {
      nuevosErrores.comuna = 'La comuna solo debe contener letras y espacios.';
    }

    if (!formData.direccion.trim() || formData.direccion.trim().length < 5) {
      nuevosErrores.direccion = 'Ingresa calle y numeración del domicilio.';
    }

    if (metodoPago === 'tarjeta') {
      const numLimpio = cardData.numeroTarjeta.replace(/\s/g, '');
      if (numLimpio.length < 15 || numLimpio.length > 16) {
        nuevosErrores.numeroTarjeta = 'El número de tarjeta debe tener 15 o 16 dígitos.';
      }

      if (!cardData.nombreTitular.trim() || cardData.nombreTitular.trim().length < 3) {
        nuevosErrores.nombreTitular =
          'Ingresa el nombre del titular tal como figura en la tarjeta.';
      }

      if (!/^\d{2}\/\d{2}$/.test(cardData.vencimiento)) {
        nuevosErrores.vencimiento = 'Ingresa el vencimiento en formato MM/AA.';
      } else {
        const [mesStr, anioStr] = cardData.vencimiento.split('/');
        const mes = Number(mesStr);
        const anio = 2000 + Number(anioStr);
        const hoy = new Date();
        const mesActual = hoy.getMonth() + 1;
        const anioActual = hoy.getFullYear();

        if (mes < 1 || mes > 12) {
          nuevosErrores.vencimiento = 'El mes debe estar entre 01 y 12.';
        } else if (anio < anioActual || (anio === anioActual && mes < mesActual)) {
          nuevosErrores.vencimiento = 'La tarjeta ingresada se encuentra vencida.';
        }
      }

      if (cardData.cvv.length < 3 || cardData.cvv.length > 4) {
        nuevosErrores.cvv = 'El CVV debe tener 3 o 4 dígitos.';
      }
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorGeneral('');

    if (carrito.length === 0 || subtotal <= 0) {
      setErrorGeneral('Tu carrito está vacío o tiene montos inválidos.');
      return;
    }

    if (problemasStock.length > 0) {
      setErrorGeneral(
        'Algunos productos ya no cuentan con stock suficiente. Regresa al carrito para ajustarlos.'
      );
      return;
    }

    if (!validarFormulario()) {
      setErrorGeneral('Revisa los campos marcados en rojo antes de confirmar tu compra.');
      return;
    }

    setProcesando(true);

    const nombresMetodo = {
      tarjeta: `Tarjeta de Crédito / Débito (${cardData.cuotas} ${
        cardData.cuotas === '1' ? 'cuota' : 'cuotas'
      })`,
      transferencia: 'Transferencia Bancaria',
      mercadopago: 'Mercado Pago / Servipag'
    };

    const nuevaOrden = {
      numeroOrden: `2026${Math.floor(100 + Math.random() * 900)}`,
      fecha: new Date().toLocaleDateString('es-CL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      cliente: {
        rut: formData.rut.trim(),
        nombre: formData.nombre.trim(),
        email: formData.email.trim(),
        telefono: formData.telefono.trim()
      },
      despacho: {
        direccion: formData.direccion.trim(),
        comuna: formData.comuna.trim(),
        region: formData.region
      },
      metodoPago: nombresMetodo[metodoPago] || metodoPago,
      productos: carrito.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        ml: item.ml || item.tamano || null,
        precio: Number(item.precio),
        cantidad: Number(item.cantidad)
      })),
      subtotal,
      descuentoRuleta: montoDescuento,
      cuponAplicado: cuponAplicado ? `${cuponAplicado.codigo} (${cuponAplicado.texto})` : null,
      costoEnvio,
      total
    };

    // Envía el pedido al Backend Spring Boot con token JWT
    let ordenFinal = { ...nuevaOrden, estado: 'Pendiente' };
    try {
      const payloadBackend = {
        ...nuevaOrden,
        usuarioId: usuario?.id || null,
        rutCliente: nuevaOrden.cliente.rut,
        nombreCliente: nuevaOrden.cliente.nombre,
        emailCliente: nuevaOrden.cliente.email,
        telefonoCliente: nuevaOrden.cliente.telefono,
        direccion: nuevaOrden.despacho.direccion,
        comuna: nuevaOrden.despacho.comuna,
        region: nuevaOrden.despacho.region,
        detalles: nuevaOrden.productos.map((p) => ({
          productoId: p.id,
          nombreProducto: p.nombre,
          ml: p.ml,
          precioUnitario: p.precio,
          cantidad: p.cantidad
        }))
      };

      const respuestaBackend = await crearPedidoApi(payloadBackend);
      if (respuestaBackend?.id) {
        ordenFinal.id = respuestaBackend.id;
      }
      if (respuestaBackend?.numeroOrden) {
        ordenFinal.numeroOrden = respuestaBackend.numeroOrden;
      }
    } catch (errorApi) {
      const msg = (errorApi.message || '').toLowerCase();
      if (msg.includes('stock') || msg.includes('insuficiente')) {
        setProcesando(false);
        setErrorGeneral(errorApi.message);
        return;
      }
    }

    // Marca el cupón utilizado como canjeado una vez concretada la compra
    if (cuponAplicado) {
      const cuponUsado = { ...cuponAplicado, usado: true };
      localStorage.setItem(KEY_PREMIO_ACTIVO, JSON.stringify(cuponUsado));
      if (cuponAplicado.userKey) {
        localStorage.setItem(
          `aroma_premio_ruleta_${cuponAplicado.userKey}`,
          JSON.stringify(cuponUsado)
        );
      }
      if (cuponAplicado.email) {
        localStorage.setItem(
          `aroma_premio_ruleta_${cuponAplicado.email.toLowerCase()}`,
          JSON.stringify(cuponUsado)
        );
      }
      localStorage.removeItem(KEY_CUPON_APLICADO);
      setCuponAplicado(null);
      setPremioDisponible(null);
    }

    localStorage.setItem('aroma_ultima_orden', JSON.stringify(ordenFinal));
    const pedidosGuardados = JSON.parse(localStorage.getItem('aroma_pedidos') || '[]');
    localStorage.setItem(
      'aroma_pedidos',
      JSON.stringify([ordenFinal, ...pedidosGuardados])
    );

    if (descontarStockCompra) {
      descontarStockCompra(carrito);
    }

    vaciarCarrito();
    setProcesando(false);

    if (mostrarNotificacion) {
      mostrarNotificacion('¡Pago procesado con éxito!');
    }

    navigate('/pago-exitoso', { state: { orden: ordenFinal } });
  };

  if (carrito.length === 0) {
    return (
      <main className="container text-center my-5 py-5">
        <section>
          <h2 className="fw-bold text-white mb-3">Tu carrito está vacío</h2>
          <p className="text-light opacity-75 mb-4">Agrega productos antes de proceder al pago.</p>
          <Link to="/productos" className="btn btn-warning text-dark fw-bold rounded-pill px-4">
            Ir al Catálogo
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main ref={checkoutRef} className="container my-5">
      <style>{`
        html body main .card .titulo-compra-blanco,
        html body main .titulo-compra-blanco,
        html body main .card .invalid-feedback,
        html body main .invalid-feedback,
        html body main .form-control.is-invalid ~ .invalid-feedback,
        html body main .form-select.is-invalid ~ .invalid-feedback {
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          opacity: 1 !important;
        }

        html body main .form-control,
        html body main .form-control:focus,
        html body main .form-select,
        html body main .form-select:focus {
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          background-color: #ffffff !important;
        }

        html body main .form-control::placeholder {
          color: #6c757d !important;
          -webkit-text-fill-color: #6c757d !important;
          opacity: 1 !important;
        }
      `}</style>

      <section aria-labelledby="titulo-checkout">
        <h2
          id="titulo-checkout"
          className="fw-bold mb-4 titulo-compra-blanco"
          style={{ color: '#ffffff' }}
        >
          Finalizar Compra
        </h2>

        {problemasStock.length > 0 && (
          <div
            className="alert alert-warning d-flex justify-content-between align-items-center mb-4"
            role="alert"
          >
            <span>Hay productos en tu pedido que superan el stock disponible actualmente.</span>
            <Link to="/carrito" className="btn btn-sm btn-dark fw-bold">
              Volver al Carrito
            </Link>
          </div>
        )}

        {errorGeneral && (
          <div className="alert alert-danger mb-4" role="alert">
            {errorGeneral}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-4">
            <div className="col-lg-7">
              <article className="card shadow-sm border-0 p-4 mb-4 rounded-4">
                <h4
                  className="fw-bold mb-3 titulo-compra-blanco"
                  style={{ color: '#ffffff' }}
                >
                  1. Datos de Envío y Boleta
                </h4>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="checkout-rut" className="form-label fw-bold">
                      RUT *
                    </label>
                    <input
                      id="checkout-rut"
                      type="text"
                      className={`form-control ${errores.rut ? 'is-invalid' : ''}`}
                      name="rut"
                      value={formData.rut}
                      onChange={handleInputChange}
                      placeholder="Ej: 12.345.678-5"
                      maxLength={12}
                      required
                    />
                    {errores.rut && <div className="invalid-feedback">{errores.rut}</div>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="checkout-nombre" className="form-label fw-bold">
                      Nombre Completo *
                    </label>
                    <input
                      id="checkout-nombre"
                      type="text"
                      autoComplete="name"
                      className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Ej: Ana Silva"
                      required
                    />
                    {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="checkout-email" className="form-label fw-bold">
                      Correo Electrónico *
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      autoComplete="email"
                      className={`form-control ${errores.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ana@gmail.com o ana@gmail.cl"
                      required
                    />
                    {errores.email && <div className="invalid-feedback">{errores.email}</div>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="checkout-telefono" className="form-label fw-bold">
                      Teléfono de Contacto *
                    </label>
                    <input
                      id="checkout-telefono"
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoComplete="tel-national"
                      className={`form-control ${errores.telefono ? 'is-invalid' : ''}`}
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      placeholder="Ej: 912345678"
                      required
                    />
                    {errores.telefono && (
                      <div className="invalid-feedback">{errores.telefono}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="checkout-region" className="form-label fw-bold">
                      Región *
                    </label>
                    <select
                      id="checkout-region"
                      autoComplete="address-level1"
                      className={`form-select ${errores.region ? 'is-invalid' : ''}`}
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      required
                    >
                      {regionesChile.map((reg, idx) => (
                        <option key={idx} value={reg}>
                          {reg}
                        </option>
                      ))}
                    </select>
                    {errores.region && <div className="invalid-feedback">{errores.region}</div>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="checkout-comuna" className="form-label fw-bold">
                      Comuna *
                    </label>
                    <input
                      id="checkout-comuna"
                      type="text"
                      autoComplete="address-level2"
                      className={`form-control ${errores.comuna ? 'is-invalid' : ''}`}
                      name="comuna"
                      value={formData.comuna}
                      onChange={handleInputChange}
                      placeholder="Ej: Santiago, Las Condes, Concepción"
                      required
                    />
                    {errores.comuna && <div className="invalid-feedback">{errores.comuna}</div>}
                  </div>

                  <div className="col-12">
                    <label htmlFor="checkout-direccion" className="form-label fw-bold">
                      Dirección y Número *
                    </label>
                    <input
                      id="checkout-direccion"
                      type="text"
                      autoComplete="street-address"
                      className={`form-control ${errores.direccion ? 'is-invalid' : ''}`}
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      placeholder="Av. Providencia 1234, Dpto 502"
                      required
                    />
                    {errores.direccion && (
                      <div className="invalid-feedback">{errores.direccion}</div>
                    )}
                  </div>
                </div>
              </article>

              <article className="card shadow-sm border-0 p-4 rounded-4">
                <h4
                  className="fw-bold mb-3 titulo-compra-blanco"
                  style={{ color: '#ffffff' }}
                >
                  2. Método de Pago
                </h4>

                <div className="d-flex flex-column gap-3 mb-4">
                  <div
                    className={`border rounded-3 p-3 d-flex align-items-center gap-3 ${
                      metodoPago === 'tarjeta' ? 'border-warning bg-light text-dark' : ''
                    }`}
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
                    <label
                      htmlFor="pagoTarjeta"
                      className={`m-0 fw-bold flex-grow-1 ${
                        metodoPago === 'tarjeta' ? 'text-dark' : ''
                      }`}
                      style={{ cursor: 'pointer' }}
                    >
                      Tarjeta de Crédito / Débito (Webpay)
                    </label>
                    <span className="badge bg-secondary">Visa / Mastercard / Redcompra</span>
                  </div>

                  <div
                    className={`border rounded-3 p-3 d-flex align-items-center gap-3 ${
                      metodoPago === 'transferencia' ? 'border-warning bg-light text-dark' : ''
                    }`}
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
                    <label
                      htmlFor="pagoTransferencia"
                      className={`m-0 fw-bold flex-grow-1 ${
                        metodoPago === 'transferencia' ? 'text-dark' : ''
                      }`}
                      style={{ cursor: 'pointer' }}
                    >
                      Transferencia Bancaria
                    </label>
                    <span className="badge bg-info text-dark">Datos al finalizar</span>
                  </div>

                  <div
                    className={`border rounded-3 p-3 d-flex align-items-center gap-3 ${
                      metodoPago === 'mercadopago' ? 'border-warning bg-light text-dark' : ''
                    }`}
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
                    <label
                      htmlFor="pagoMercadopago"
                      className={`m-0 fw-bold flex-grow-1 ${
                        metodoPago === 'mercadopago' ? 'text-dark' : ''
                      }`}
                      style={{ cursor: 'pointer' }}
                    >
                      Mercado Pago / Servipag
                    </label>
                    <span className="badge bg-primary">Dinero en cuenta</span>
                  </div>
                </div>

                {metodoPago === 'tarjeta' && (
                  <div className="border-top pt-3 mt-2">
                    <h6
                      className="fw-bold mb-3 titulo-compra-blanco"
                      style={{ color: '#ffffff' }}
                    >
                      Datos de la Tarjeta
                    </h6>
                    <div className="row g-3">
                      <div className="col-12">
                        <label htmlFor="card-numero" className="form-label small fw-bold">
                          Número de Tarjeta *
                        </label>
                        <input
                          id="card-numero"
                          type="text"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          className={`form-control ${errores.numeroTarjeta ? 'is-invalid' : ''}`}
                          name="numeroTarjeta"
                          placeholder="1234 5678 9012 3456"
                          value={cardData.numeroTarjeta}
                          onChange={handleCardChange}
                        />
                        {errores.numeroTarjeta && (
                          <div className="invalid-feedback">{errores.numeroTarjeta}</div>
                        )}
                      </div>

                      <div className="col-12">
                        <label htmlFor="card-titular" className="form-label small fw-bold">
                          Nombre del Titular *
                        </label>
                        <input
                          id="card-titular"
                          type="text"
                          autoComplete="cc-name"
                          className={`form-control ${errores.nombreTitular ? 'is-invalid' : ''}`}
                          name="nombreTitular"
                          placeholder="Como aparece en la tarjeta"
                          value={cardData.nombreTitular}
                          onChange={handleCardChange}
                        />
                        {errores.nombreTitular && (
                          <div className="invalid-feedback">{errores.nombreTitular}</div>
                        )}
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="card-vencimiento" className="form-label small fw-bold">
                          Vencimiento *
                        </label>
                        <input
                          id="card-vencimiento"
                          type="text"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          className={`form-control ${errores.vencimiento ? 'is-invalid' : ''}`}
                          name="vencimiento"
                          placeholder="MM/AA"
                          value={cardData.vencimiento}
                          onChange={handleCardChange}
                        />
                        {errores.vencimiento && (
                          <div className="invalid-feedback">{errores.vencimiento}</div>
                        )}
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="card-cvv" className="form-label small fw-bold">
                          CVV *
                        </label>
                        <input
                          id="card-cvv"
                          type="password"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          className={`form-control ${errores.cvv ? 'is-invalid' : ''}`}
                          name="cvv"
                          placeholder="123"
                          value={cardData.cvv}
                          onChange={handleCardChange}
                        />
                        {errores.cvv && <div className="invalid-feedback">{errores.cvv}</div>}
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="card-cuotas" className="form-label small fw-bold">
                          Cuotas
                        </label>
                        <select
                          id="card-cuotas"
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
                  <div className="alert alert-info small mt-2 mb-0">
                    Al hacer clic en "Pagar", te enviaremos los datos de la Cuenta Corriente de{' '}
                    <strong>Aroma &amp; Esencia SpA</strong> a tu correo electrónico para
                    completar la transferencia.
                  </div>
                )}

                {metodoPago === 'mercadopago' && (
                  <div className="alert alert-primary small mt-2 mb-0">
                    Serás redirigido a la pasarela segura de Mercado Pago para autorizar la
                    transacción.
                  </div>
                )}
              </article>
            </div>

            <div className="col-lg-5">
              <aside
                className="card shadow-sm border-0 p-4 rounded-4 position-sticky"
                style={{ top: '90px' }}
              >
                <h4
                  className="fw-bold mb-3 titulo-compra-blanco"
                  style={{ color: '#ffffff' }}
                >
                  Resumen del Pedido
                </h4>

                {/* Sección interactiva de Cupón de Descuento en Checkout */}
                <div className="mb-3 p-3 rounded-3 border border-secondary">
                  <label
                    htmlFor="input-cupon-checkout"
                    className="form-label small fw-bold mb-2 titulo-compra-blanco"
                  >
                    🎟️ ¿Tienes un cupón de descuento?
                  </label>

                  {!cuponAplicado ? (
                    <>
                      <div className="input-group input-group-sm">
                        <input
                          id="input-cupon-checkout"
                          type="text"
                          className="form-control text-uppercase fw-bold"
                          placeholder="Ej: AROMA15-123"
                          value={codigoInput}
                          onChange={(e) => {
                            setCodigoInput(e.target.value.toUpperCase());
                            if (mensajeCupon.texto) setMensajeCupon({ tipo: '', texto: '' });
                          }}
                        />
                        <button
                          type="button"
                          className="btn btn-warning text-dark fw-bold"
                          onClick={() => handleAplicarCupon()}
                        >
                          Aplicar
                        </button>
                      </div>

                      {premioDisponible?.codigo && (
                        <div className="mt-2 d-flex justify-content-between align-items-center">
                          <small className="text-warning">
                            Cupón disponible: <strong>{premioDisponible.codigo}</strong>
                          </small>
                          <button
                            type="button"
                            className="btn btn-link btn-sm p-0 text-warning fw-bold"
                            onClick={() => handleAplicarCupon(premioDisponible.codigo)}
                          >
                            Aplicar ahora
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center bg-success bg-opacity-25 border border-success rounded-2 px-2 py-1">
                      <small className="text-success fw-bold">
                        ✓ {cuponAplicado.codigo} ({cuponAplicado.texto})
                      </small>
                      <button
                        type="button"
                        className="btn btn-sm btn-link text-danger p-0 fw-bold text-decoration-none"
                        onClick={handleQuitarCupon}
                      >
                        Quitar
                      </button>
                    </div>
                  )}

                  {mensajeCupon.texto && (
                    <small
                      className={`d-block mt-1 fw-semibold ${
                        mensajeCupon.tipo === 'error' ? 'text-warning' : 'text-success'
                      }`}
                    >
                      {mensajeCupon.texto}
                    </small>
                  )}
                </div>

                <ul className="list-group list-group-flush mb-3">
                  {carrito.map((item) => {
                    const mlItem = item.ml || item.tamano || null;
                    return (
                      <li
                        key={`${item.id}-${mlItem || 'base'}`}
                        className="list-group-item d-flex justify-content-between align-items-center px-0"
                      >
                        <div>
                          <h6
                            className="my-0 fw-bold titulo-compra-blanco"
                            style={{ color: '#ffffff' }}
                          >
                            {item.nombre} {mlItem && `(${mlItem})`}
                          </h6>
                          <small className="text-muted">Cantidad: {item.cantidad}</small>
                        </div>
                        <span className="titulo-compra-blanco" style={{ color: '#ffffff' }}>
                          ${(Number(item.precio) * Number(item.cantidad)).toLocaleString('es-CL')}
                        </span>
                      </li>
                    );
                  })}

                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <span>Subtotal Productos</span>
                    <span className="titulo-compra-blanco" style={{ color: '#ffffff' }}>
                      ${subtotal.toLocaleString('es-CL')}
                    </span>
                  </li>

                  {cuponAplicado && montoDescuento > 0 && (
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      <span className="text-success fw-bold">
                        Descuento ({cuponAplicado.codigo})
                      </span>
                      <span className="text-success fw-bold">
                        -${montoDescuento.toLocaleString('es-CL')}
                      </span>
                    </li>
                  )}

                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    <div>
                      <span>Envío a Domicilio</span>
                      {costoEnvio > 0 && (
                        <small className="d-block text-muted">
                          Gratis en compras desde ${ENVIO_GRATIS_DESDE.toLocaleString('es-CL')}
                        </small>
                      )}
                    </div>
                    {costoEnvio === 0 ? (
                      <span className="text-success fw-bold">
                        GRATIS {tieneEnvioGratisPorCupon ? `(${cuponAplicado.codigo})` : ''}
                      </span>
                    ) : (
                      <span className="fw-semibold titulo-compra-blanco" style={{ color: '#ffffff' }}>
                        ${costoEnvio.toLocaleString('es-CL')}
                      </span>
                    )}
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center px-0 fs-5 fw-bold border-top pt-3">
                    <span>Total CLP</span>
                    <span className="text-warning">${total.toLocaleString('es-CL')}</span>
                  </li>
                </ul>

                <button
                  type="submit"
                  className="btn btn-warning text-dark w-100 fw-bold py-3 rounded-pill fs-5 shadow-sm"
                  disabled={problemasStock.length > 0 || procesando}
                >
                  {procesando
                    ? 'Procesando Pago...'
                    : `Pagar $${total.toLocaleString('es-CL')}`}
                </button>
              </aside>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}