import React from 'react';
import { Link } from 'react-router-dom';

export function Piepagina() {
  return (
    <footer id="pie-pagina" className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container text-center text-md-start">
        <div className="row">
          <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-warning">Aroma & Esencia</h5>
            <p className="text-light">
              Perfumería especializada en fragancias exclusivas y familias olfativas de alta calidad. Encuentra el aroma perfecto para cada ocasión.
            </p>
            <p className="text-white-50 small">
              Horario de atención: Lunes a Viernes de 09:00 a 18:00 hrs.
            </p>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-warning">Navegación</h5>
            <p><Link to="/" className="text-light text-decoration-none">Catálogo</Link></p>
            <p><Link to="/categorias" className="text-light text-decoration-none">Categorías</Link></p>
            <p><Link to="/ofertas" className="text-light text-decoration-none">Ofertas</Link></p>
            <p><Link to="/carrito" className="text-light text-decoration-none">Mi Carrito</Link></p>
          </div>

          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-warning">Contacto</h5>
            <p className="text-light">Av. Providencia 1234, Santiago, Chile</p>
            <p className="text-light">contacto@aromayesencia.cl</p>
            <p className="text-light">+56 9 1234 5678</p>
          </div>

          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-warning">Servicios</h5>
            <p className="text-light small">Aceptamos Webpay, Tarjetas de Crédito, Débito y Transferencia Bancaria.</p>
            <p className="text-light small">Envíos a todo Chile a través de Starken y Chilexpress.</p>
          </div>
        </div>

        <hr className="my-4 border-secondary" />

        <div className="row align-items-center">
          <div className="col-md-12 text-center">
            <p className="text-white-50 mb-0">
              © {new Date().getFullYear()} Aroma & Esencia.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}