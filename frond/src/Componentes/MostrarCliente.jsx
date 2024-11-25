import React from 'react';
import { Form, Formik } from 'formik';
import '../Estilos/MostrarCliente.css';

function MostrarCliente() {
    return (
        <div>
            <Formik>
                <Form className="form_container_cliente">
                        <div className="form-group">
                            <label>Tipo</label>
                            <input type='text' placeholder="Tipo" className="form-input" />
                        </div>
                        <div className="form-group">
                            <label>N°</label>
                            <input type='text' placeholder="N°" className="form-input" />
                        </div>
                        <div className="form-group">
                            <label>Serie</label>
                            <input type='text' placeholder="Serie" className="form-input" />
                        </div>
                        <div className="form-group">
                            <label>Fecha Emision</label>
                            <input type='text' placeholder="Fecha Emision" className="form-input" />
                        </div>
                    <div className="form-group">
                        <label>RUC</label>
                        <input type='text' placeholder="RUC" className="form-input" />
                    </div>
                    <div className="form-group">
                        <label>Razon Social</label>
                        <input type='text' placeholder="Razon Social" className="form-input" />
                    </div>
                    <div className="form-group">
                        <label>Vence</label>
                        <input type='text' placeholder="Vence" className="form-input" />
                    </div>
                    <div className="form-group">
                        <label>Direccion</label>
                        <input type='text' placeholder="Direccion" className="form-input" />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type='text' placeholder="Email" className="form-input" />
                    </div>
                    <div className="form-group">
                        <label>Forma de pago</label>
                        <input type='text' placeholder="Forma de Pago" className="form-input" />
                    </div>
                    <div className="form-group">
                        <label>Contacto</label>
                        <input type='text' placeholder="Contacto" className="form-input" />
                    </div>
                    <div className="form-group">
                        <label>Celular</label>
                        <input type='text' placeholder="Celular" className="form-input" />
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default MostrarCliente;