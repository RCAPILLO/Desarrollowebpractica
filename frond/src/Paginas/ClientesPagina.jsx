import React, { useState, useEffect } from 'react';
import ClienteForm from '../Componentes/Formularios/ClientesForm.jsx';
import ClienteList from '../Componentes/Formularios/ClientesList.jsx';
import '../Estilos/Paginas/ClientesPagina.css'

const ClientesPage = () => {
  const [clientes, setClientes] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    const response = await fetch('/api/clientes'); // Ajusta esta URL a la correcta
    const data = await response.json();
    setClientes(data);
  };

  const handleAddOrUpdate = async (cliente) => {
    if (cliente.id_cliente) {
      await fetch(`/api/clientes/${cliente.id_cliente}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
      });
    } else {
      await fetch('/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
      });
    }
    fetchClientes();
    setSelectedClient(null);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/clientes/${id}`, { method: 'DELETE' });
    fetchClientes();
  };

  const handleSelect = (cliente) => {
    setSelectedClient(cliente);
  };

  return (
    <div className="clientes-page">
      <h1>Formulario Clientes</h1>
      
      <div className="form-list-container">
        {/* ClienteForm a la izquierda */}
        <div className="cliente-form-container">
          <ClienteForm onSubmit={handleAddOrUpdate} selectedClient={selectedClient} />
        </div>

        {/* ClienteList a la derecha */}
        <div className="cliente-list-container">
          <ClienteList clientes={clientes} onSelect={handleSelect} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default ClientesPage;
