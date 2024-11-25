
import React from 'react';
import { Form, Formik } from 'formik';
import '../Estilos/BotonesSeguimiento.css';

function BotonesSeguimiento() {
  return (
    <Formik>
      <Form className="botones-seguimiento">
        <button type="button">Nuevo</button>
        <button type="button">Enviar</button>
        <button type="button">Anular</button>
        <button type="button">Facturar</button>
        
      </Form>
    </Formik>
  );
}

export default BotonesSeguimiento;