import { json } from "express";
import { pool } from "../basedatos.js";
/*Ruta para extraer listado de productos*/
export const getproductos = async (req, res) => {
    const [result] = await pool.query("SELECT * FROM productos");
    res.json(result)

}
