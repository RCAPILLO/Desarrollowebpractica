import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Iniciosesion from './Paginas/Iniciosesion';
import Inicio from './Paginas/Inicio';
import Noexistepage from './Paginas/Notfound';
import Navegar from './Componentes/Navegacion';
import MostrarUsuario from './Componentes/Usuario';
import BotonesSeguimiento from './Componentes/BotonesSeguimiento'; // Importa BotonesSeguimiento
import ClientesPage from './Paginas/ClientesPagina';
import Cotizar from './Paginas/Cotizaciones';
import SeguirCotizaciones from './Paginas/Seguimientocotizaciones';
import MantenimientoUsuarios from './Paginas/MantenimientoUsuarios';
function App() {
  return (
    <>
      <div className="contenedor_cabecera_principal">
        <Navegar />
        <MostrarUsuario />
      </div>
      <Routes>
        <Route path="/IniciarSesion" element={<Iniciosesion />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Clientes" element={<ClientesPage />} />
        <Route path="/Mantenimientousuarios" element={<MantenimientoUsuarios />} />
        <Route path="/Seguimiento" element={
          <>
            <SeguirCotizaciones />
            <BotonesSeguimiento /> {/* Botones solo aparece en Seguimiento */}
          </>
        } />
        <Route path="/Cotizar" element={
          <>
            <Cotizar />
          </>
        }
        />
        <Route path="/*" element={<Noexistepage />} />
      </Routes>
    </>
  );
}

export default App;
