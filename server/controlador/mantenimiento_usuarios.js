import { json } from "express";
import { pool } from "../basedatos.js";
//Las API para gestionar la tabla usuarios CRUD
//Extraer todos los usuarios
export const getusuarios = async (req, res) => {
    const [result] = await pool.query("SELECT * FROM usuarios");
    res.json(result);
}
//Extraer un unico usuario
export const getusuario = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM usuarios WHERE id_usuario=?", [req.params.id]);
        
        if (result.length === 0) {
            return res.status(404).json({ mensaje: "Registro no encontrado" });
        }

        res.json(result[0]); // Enviar el primer (y único) resultado encontrado
    } catch (error) {
        console.error("Error en getusuario:", error);
        res.status(500).json({ mensaje: "Error al obtener el usuario" });
    }
};
//Crear un usuario
export const createusuario = async (req, res) => {
    const { nombres, apellido_paterno, apellido_materno, direccion, distrito, telefono, email, id_rol } = req.body;

    if (id_rol === null) {
        return res.status(400).json({ error: "El campo 'id_rol' es obligatorio y no puede ser nulo." });
    }

    try {
        const result = await pool.query(
            'INSERT INTO usuarios(nombres, apellido_paterno, apellido_materno, direccion, distrito, telefono, email, id_rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nombres, apellido_paterno, apellido_materno, direccion, distrito, telefono, email, id_rol]
        );
        console.log("Datos recibidos:", req.body);
        res.send('Creando usuario');
    } catch (err) {
        console.error("Error en la consulta SQL:", err);
        res.status(500).json({ error: "Error al crear el usuario." });
    }

};
//Actualizar datos de un usuario
export const updateusuario = async (req, res) => {
    try {
        const [result] = await pool.query("UPDATE usuarios SET ? WHERE id_usuario=?", [req.body, req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado o sin cambios" });
        }

        res.json({ mensaje: "Usuario actualizado exitosamente" });
    } catch (error) {
        console.error("Error en updateusuario:", error);
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
};
//Eliminar un usuario
export const deleteusuario = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM usuarios WHERE id_usuario=?", [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.sendStatus(204); // Devuelve 204 si la eliminación fue exitosa
    } catch (error) {
        console.error("Error en deleteusuario:", error);
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
};

// APIs para gestionar roles (tabla rol)
// Obtener todos los roles
export const getRoles = async (req, res) => {
    const [result] = await pool.query("SELECT * FROM rol");
    res.json(result);
};

// Crear un rol
export const createRol = async (req, res) => {
    const { nombre, descripcion, fecha_creacion } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO rol (nombre, descripcion, fecha_creacion) VALUES (?, ?, ?)",
            [nombre, descripcion, fecha_creacion]
        );
        res.json({ mensaje: "Rol creado exitosamente", id: result.insertId });
    } catch (err) {
        console.error("Error en createRol:", err);
        res.status(500).json({ error: "Error al crear el rol" });
    }
};

// APIs para gestionar contraseñas de usuario (tabla usuario_contraseñas)
// Crear una contraseña para un usuario
export const createPassword = async (req, res) => {
    const { id_usuario, contraseña_hash, fecha_creacion, fecha_expiracion } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO usuario_contraseñas (id_usuario, contraseña_hash, fecha_creacion, fecha_expiracion) VALUES (?, ?, ?, ?)",
            [id_usuario, contraseña_hash, fecha_creacion, fecha_expiracion]
        );
        res.json({ mensaje: "Contraseña creada exitosamente", id: result.insertId });
    } catch (err) {
        console.error("Error en createPassword:", err);
        res.status(500).json({ error: "Error al crear la contraseña" });
    }
};

// Obtener contraseñas de un usuario
export const getPasswords = async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const [result] = await pool.query(
            "SELECT * FROM usuario_contraseñas WHERE id_usuario = ?",
            [id_usuario]
        );
        res.json(result);
    } catch (err) {
        console.error("Error en getPasswords:", err);
        res.status(500).json({ error: "Error al obtener contraseñas" });
    }
};
