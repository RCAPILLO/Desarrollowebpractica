import React from "react"
import Informacion from "../Componentes/Informacion";
import '../Estilos/Inicio.css'
function Inicio(){
    return(
        <div className='container-principal' >
            <div className='container-titulo-principal'>
                <h1>Mas de 50 años reunidos con nuestras representadas, somos espacialistas en CHILER y HVAC</h1>
                <h5>Nuestra empresa mantiene una politica de innovacion para garantizar equipos y servicios de alta calidad</h5> 
            </div>
            <Informacion/>
        </div>
    )
}
export default Inicio;