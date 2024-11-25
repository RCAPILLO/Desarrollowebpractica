import React from 'react';
import { useNavigate } from 'react-router-dom'; // Para la navegación
import '../Estilos/MostrarUsuario.css'; // Importa el archivo CSS
import Usuario from '../Images/Icon_usuario-32.png';

function MostrarUsuario() {
  const navigate = useNavigate(); // Hook para manejar navegación

  const handleLoginClick = () => {
    navigate('/IniciarSesion'); // Cambia '/iniciar-sesion' por la ruta de tu pantalla de inicio de sesión
  };

  return (
    <div className="MostrarUsuario" onClick={handleLoginClick}>
      <div className="usuario-contenedor">
        <span className="texto-iniciar-sesion">Iniciar Sesión</span>
        <div className="icono-usuario">
          <img src={Usuario} alt="Usuario" />
        </div>
      </div>
    </div>
  );
}

export default MostrarUsuario;
