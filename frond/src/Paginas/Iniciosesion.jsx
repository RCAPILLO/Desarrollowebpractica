import React, { useState } from "react";
import { Form, Formik, Field } from "formik";
import { useNavigate } from "react-router-dom"; // Para redirección
import "../Estilos/Iniciosesion.css";

function Iniciosesion() {
    const navigate = useNavigate();
    const [usuarioIngresado, setUsuarioIngresado] = useState("");

    // Credenciales válidas (esto se puede reemplazar con una consulta a un backend)
    const credencialesValidas = {
        usuario: "admin",
        password: "12345",
    };

    return (
        <div>
            <Formik
                initialValues={{ usuario: "", password: "" }}
                validate={(values) => {
                    const errors = {};
                    if (!values.usuario) {
                        errors.usuario = "El usuario es obligatorio";
                    }
                    if (!values.password) {
                        errors.password = "La contraseña es obligatoria";
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                    if (
                        values.usuario === credencialesValidas.usuario &&
                        values.password === credencialesValidas.password
                    ) {
                        setUsuarioIngresado(values.usuario); // Guarda el usuario
                        navigate("/seguimiento"); // Redirige
                    } else {
                        alert("Usuario o contraseña incorrectos");
                    }
                }}
            >
                {({ values, errors, handleSubmit, isValid, touched }) => (
                    <Form
                        className="form_container_inicio"
                        onSubmit={handleSubmit}
                    >
                        <label className="form-label">Usuario</label>
                        <Field
                            type="text"
                            name="usuario"
                            placeholder="Usuario"
                            className="form_input_inicio"
                        />
                        {errors.usuario && touched.usuario && (
                            <div className="error">{errors.usuario}</div>
                        )}

                        <label className="form-label">Password</label>
                        <Field
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="form_input_inicio"
                        />
                        {errors.password && touched.password && (
                            <div className="error">{errors.password}</div>
                        )}

                        <button
                            type="submit"
                            className="form_button_inicio"
                            disabled={!values.usuario || !values.password}
                        >
                            Ingresar
                        </button>

                        <label className="form-label">Olvidé contraseña</label>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Iniciosesion;
