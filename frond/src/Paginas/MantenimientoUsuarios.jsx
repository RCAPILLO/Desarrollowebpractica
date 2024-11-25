import React, { useState, useEffect } from "react";

const MantenimientoUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombres: "",
        apellido_paterno: "",
        apellido_materno: "",
        direccion: "",
        distrito: "",
        telefono: "",
        email: "",
        id_rol: 1
    });

    const fetchUsuarios = async () => {
        const { data } = await axios.get("/api/usuarios");
        setUsuarios(data);
    };

    const fetchRoles = async () => {
        const { data } = await axios.get("/api/roles");
        setRoles(data);
    };

    const handleChange = (e) => {
        setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/usuarios", nuevoUsuario);
            fetchUsuarios(); // Actualiza la lista de usuarios
            alert("Usuario creado exitosamente");
        } catch (error) {
            console.error("Error al crear el usuario:", error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
        fetchRoles();
    }, []);

    return (
        <div>
            <h1>Gestión de Usuarios</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombres"
                    placeholder="Nombres"
                    value={nuevoUsuario.nombres}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="apellido_paterno"
                    placeholder="Apellido Paterno"
                    value={nuevoUsuario.apellido_paterno}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="apellido_materno"
                    placeholder="Apellido Materno"
                    value={nuevoUsuario.apellido_materno}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="direccion"
                    placeholder="Dirección"
                    value={nuevoUsuario.direccion}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="distrito"
                    placeholder="Distrito"
                    value={nuevoUsuario.distrito}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="telefono"
                    placeholder="Teléfono"
                    value={nuevoUsuario.telefono}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo Electrónico"
                    value={nuevoUsuario.email}
                    onChange={handleChange}
                    required
                />
                <select
                    name="id_rol"
                    value={nuevoUsuario.id_rol}
                    onChange={handleChange}
                >
                    {roles.map((rol) => (
                        <option key={rol.id_rol} value={rol.id_rol}>
                            {rol.nombre}
                        </option>
                    ))}
                </select>
                <button type="submit">Crear Usuario</button>
            </form>

            <h2>Usuarios Registrados</h2>
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id_usuario}>
                        {usuario.nombres} {usuario.apellido_paterno} - {usuario.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MantenimientoUsuarios;