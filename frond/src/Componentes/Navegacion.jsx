import { Link } from "react-router-dom";
import '../Estilos/Navegacion.css'; // Importa el archivo CSS
import logo from '../Images/logo_termotem.png';

function Navegar() {
    return (
        <>
            <div className="container">
  <div className="cabecera">
    <div className="titulo_empresa">
      <img src={logo} alt="Logo de termotem" className="logo" />
      <h1>TERMOTEM PERU S.A.C.</h1>
    </div>
  </div>
  <div className="navegar">
    <ul className="links">
      <li><Link className="link" to="/Inicio">Inicio</Link></li>
      <li><Link className="link" to="/Archivo">Nosotros</Link></li>
      <li><Link className="link" to="/Gestion">Productos</Link></li>
      <li><Link className="link" to="/Consultas">Galería</Link></li>
      <li><Link className="link" to="/Buscar">Repuestos</Link></li>
      <li><Link className="link" to="/Contactanos">Contáctanos</Link></li>
    </ul>
  </div>
</div>
        </>
    );
}

export default Navegar;
