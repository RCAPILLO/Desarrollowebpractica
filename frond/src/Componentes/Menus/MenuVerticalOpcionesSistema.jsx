import React from 'react';
import { Link } from 'react-router-dom'; // Porque estamos usando  React Router para la navegación
import '../../Estilos/Menu/VerticalMenu.css';

const VerticalMenu = () => {
  return (
    <nav className="vertical-menu">
      <ul>
        <li>
          <Link to="/clientes">Clientes</Link>
        </li>
        <li>
          <Link to="/cotizar">Cotizar</Link>
        </li>
        <li>
          <Link to="/seguimientocotizaciones">Seguimiento Cotizaciones</Link>
        </li>
        <li>
          <Link to="/productos">Productos</Link>
        </li>
        <li>
          <Link to="/salir">Salir</Link>
        </li>
      </ul>
    </nav>
  );
};

export default VerticalMenu;