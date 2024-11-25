import React from 'react';

const ClienteList = ({ clientes, onSelect, onDelete }) => {
  return (
    <div className="cliente-list">
      <h2>Lista de Clientes</h2>
      <table>
        <thead>
          <tr>
            <th>Razón Social</th>
            <th>RUC</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id_cliente}>
              <td>{cliente.razon_social}</td>
              <td>{cliente.ruc}</td>
              <td>
                <div className="cliente-item">
                  <button onClick={() => onSelect(cliente)}>Editar</button>
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(cliente.id_cliente)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Datos de ejemplo simulados
const sampleClientes = [
  {
    id_cliente: 1,
    razon_social: 'Empresa A',
    ruc: '123456789',
  },
  {
    id_cliente: 2,
    razon_social: 'Empresa B',
    ruc: '987654321',
  },
  {
    id_cliente: 3,
    razon_social: 'Empresa C',
    ruc: '567890123',
  },
  {
    id_cliente: 4,
    razon_social: 'Empresa D',
    ruc: '246813579',
  },
];

// Funciones de ejemplo para manejar las acciones
const handleSelect = (cliente) => {
  console.log('Editar:', cliente);
};

const handleDelete = (id_cliente) => {
  console.log('Eliminar:', id_cliente);
};

// Componente principal
const App = () => {
  return (
    <div>
      <ClienteList
        clientes={sampleClientes}  // Pasamos los datos locales
        onSelect={handleSelect}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
