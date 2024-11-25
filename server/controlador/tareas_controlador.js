
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
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/* API para crar una cotizacion y registrarlo */
// Crear una nueva cotización
export const crearCotizacion = async (req, res) => {
    const { id_usuario, id_cliente, tipo_moneda, productos } = req.body;
  
    // Validación de datos de entrada
    if (!id_usuario || !id_cliente || !tipo_moneda || !productos || productos.length === 0) {
      return res.status(400).json({ message: "Datos incompletos" });
    }
  
    const fecha = new Date().toISOString().split("T")[0];
    const connection = await pool.getConnection();
  
    try {
      // Inicia la transacción
      await connection.beginTransaction();
  
      // **Paso 1: Crear la cotización**
      const cotizacionQuery = `
        INSERT INTO cotizaciones (id_usuario, id_cliente, fecha, tipo_moneda)
        VALUES (?, ?, ?, ?)
      `;
      const [cotizacionResult] = await connection.query(cotizacionQuery, [
        id_usuario,
        id_cliente,
        fecha,
        tipo_moneda,
      ]);
      const id_cotizacion = cotizacionResult.insertId;
  
      // **Paso 2: Crear el detalle de la cotización**
      const detalleQuery = `
        INSERT INTO detalle_cotizaciones (id_cotizacion, id_producto, cantidad, precio)
        VALUES ?
      `;
      const detalleValues = productos.map(({ id_producto, cantidad, precio }) => [
        id_cotizacion,
        id_producto,
        cantidad,
        precio,
      ]);
      await connection.query(detalleQuery, [detalleValues]);
  
      // **Paso 3: Crear el seguimiento de la cotización, con estado inicial  "GENERADO"**
      
      const seguimientoQuery = `
        INSERT INTO seguimiento_cotizaciones (id_cotizacion, id_usuario,fecha, estado)
        VALUES (?, ?,?, ?)
      `;
      const estadoInicial = "GENERADO";
      await connection.query(seguimientoQuery, [id_cotizacion, id_usuario,fecha, estadoInicial]);
  
      // Confirma la transacción
      await connection.commit();
  
      // Responde con éxito que la cotizacion fue creaa
      res.status(201).json({
        message: "Cotización creada con éxito",
        id_cotizacion,
      });
    } catch (error) {
      // En caso de error, se revierte la transacción, aseguramos una correcta insercion de datos
      await connection.rollback();
      console.error("Error al crear la cotización:", error);
      res.status(500).json({
        message: "Error al crear la cotización",
        error: error.message,
      });
    } finally {
      // Liberar la conexion  en una buena practica
      connection.release();
    }
  };
  