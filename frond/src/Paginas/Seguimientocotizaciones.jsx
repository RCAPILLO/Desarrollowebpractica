import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Estilos/Paginas/Seguimientocotizaciones.css';

const SeguirCotizaciones = () => {
  const [quotations, setQuotations] = useState([]);
  const [statuses, setStatuses] = useState([]); // Dinámico según la API
  const [editedRows, setEditedRows] = useState({}); // Para rastrear los cambios en los estados
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await fetch('http://localhost:4000/seguimiento_cotizaciones');
        if (!response.ok) {
          throw new Error('Error al obtener las cotizaciones');
        }
        const data = await response.json();
        setQuotations(data);

        // Dinámicamente extraer los estados disponibles
        const uniqueStatuses = Array.from(new Set(data.map((q) => q.estado)));
        setStatuses(uniqueStatuses);
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al cargar las cotizaciones');
      }
    };

    fetchQuotations();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    // Marcar fila como editada si cambia el estado
    setEditedRows((prev) => ({ ...prev, [id]: true }));
    setQuotations(
      quotations.map((quotation) =>
        quotation.id_cotizacion === id ? { ...quotation, estado: newStatus } : quotation
      )
    );
  };

  const handleSaveChange = async (id) => {
    const quotation = quotations.find((q) => q.id_cotizacion === id);
    try {
      const response = await fetch('http://localhost:4000/api/seguimiento_cotizaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_cotizacion: id,
          fecha: new Date().toISOString().split('T')[0],
          estado: quotation.estado,
          id_usuario: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el cambio de estado');
      }

      alert('Estado actualizado y seguimiento registrado correctamente');
      setEditedRows((prev) => ({ ...prev, [id]: false }));
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al actualizar el estado');
    }
  };
/*Boton para ir a nueva cotizacion*/
  const handleNewQuotation = () => {
    navigate('/cotizar');
  };

  return (
    <div className="contenedor_principal_seguimiento_cotizaciones">
      <h2>Seguimiento de Cotizaciones</h2>
      <button className="new-quotation-button" onClick={handleNewQuotation}>
        Nuevo
      </button>
      <div className="contenedor_tabla">
        <table>
          <thead>
            <tr>
              <th>N° Cotización</th>
              <th>Fecha Creación</th>
              <th>Fecha Envío</th>
              <th>Nombre Cliente</th>
              <th>Subtotal</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((quotation) => (
              <tr key={quotation.id_cotizacion}>
                <td>{quotation.id_cotizacion}</td>
                <td>{quotation.fecha_cotizacion}</td>
                <td>{quotation.fecha_envio}</td>
                <td>{quotation.razon_social}</td>
                <td>{quotation.subtotal}</td>
                <td>
                  <select
                    value={quotation.estado}
                    onChange={(e) =>
                      handleStatusChange(quotation.id_cotizacion, e.target.value)
                    }
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    disabled={!editedRows[quotation.id_cotizacion]}
                    onClick={() => handleSaveChange(quotation.id_cotizacion)}
                  >
                    Guardar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeguirCotizaciones;
