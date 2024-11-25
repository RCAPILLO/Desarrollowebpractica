import React from 'react'
import iconfacebook from '../Images/Iconos/icons-facebook.png';
import iconlinkedin from '../Images/Iconos/icons-linkedin.png';
import iconwhatsapp from '../Images/Iconos/icons-whatsapp.png';
import iconemail from '../Images/Iconos/icons-email.png';
import iconcelular from '../Images/Iconos/icons-celular.png';
import iconubicacion from '../Images/Iconos/icons-ubicacion.png';
import '../Estilos/Informacion.css';
function Informacion() {
  return (
    <div className='contenedor-informacion-general'>
      <div className='contenedor-informacion'>
        <div className='contenedor-informacion-detalle'>
          <img className='icon' src={iconubicacion} alt='icono de ubicacion'/>
          <h3>Calle los opalos 2160 SJL, Lima 36 Peru</h3>
        </div>
        <div className='contenedor-informacion-detalle'>
          <img className='icon' src={iconemail} alt='icono de email' />
          <h3>ventas@termotem.com</h3>
        </div>
        <div className='contenedor-informacion-detalle'>
          <img className='icon' src={iconcelular} alt='icono de celular' />
          <h3>Wssp.(+51) 999 632 537</h3>
        </div>
      </div>
      <div className='contenedor-redes-sociales'>
        <img className='social-icon' src={iconfacebook} alt='Icono de facebook' />
        <img className='social-icon' src={iconlinkedin} />
        <img className='social-icon' src={iconwhatsapp} />
      </div>

    </div>)

}
export default Informacion;