import React, { useState, useEffect } from 'react';
import '../../Estilos/Formularios/ClientesForm.css';  // importar el archivo CSS

const ClienteForm = ({ onSubmit, selectedClient }) => {
  const [cliente, setCliente] = useState({
    razon_social: '',
    ruc: '',
    direccion: '',
    distrito: '',
    provincia: '',
    departamento: '',
    pais: '',
    contacto: '',
    telefono: '',
    email: ''
  });

  useEffect(() => {
    if (selectedClient) {
      setCliente(selectedClient);
    } else {
      resetForm();
    }
  }, [selectedClient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(cliente);
    resetForm();
  };

  const resetForm = () => {
    setCliente({
      razon_social: '',
      ruc: '',
      direccion: '',
      distrito: '',
      provincia: '',
      departamento: '',
      pais: '',
      contacto: '',
      telefono: '',
      email: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="razon_social">Razón Social</label>
        <input
          name="razon_social"
          value={cliente.razon_social}
          onChange={handleChange}
          placeholder="Razón Social"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="ruc">RUC</label>
        <input
          name="ruc"
          value={cliente.ruc}
          onChange={handleChange}
          placeholder="RUC"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="direccion">Dirección</label>
        <input
          name="direccion"
          value={cliente.direccion}
          onChange={handleChange}
          placeholder="Dirección"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="distrito">Distrito</label>
        <input
          name="distrito"
          value={cliente.distrito}
          onChange={handleChange}
          placeholder="Distrito"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="provincia">Provincia</label>
        <input
          name="provincia"
          value={cliente.provincia}
          onChange={handleChange}
          placeholder="Provincia"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="departamento">Departamento</label>
        <input
          name="departamento"
          value={cliente.departamento}
          onChange={handleChange}
          placeholder="Departamento"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="pais">País</label>
        <input
          name="pais"
          value={cliente.pais}
          onChange={handleChange}
          placeholder="País"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="contacto">Contacto</label>
        <input
          name="contacto"
          value={cliente.contacto}
          onChange={handleChange}
          placeholder="Contacto"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="telefono">Teléfono</label>
        <input
          name="telefono"
          value={cliente.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          value={cliente.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </div>
      <div className="form-group">
      <button type="submit" className="submit-btn">Guardar</button>
      <button type="submit" className="submit-btn">Nuevo</button></div>
      
    </form>
  );
};

export default ClienteForm;
