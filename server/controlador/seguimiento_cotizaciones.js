import { json } from "express";
import { pool } from "../basedatos.js";
export const getseguimiento_cotizaciones = async (req, res) => {
    const [result] = await pool.query("SELECT c.id_cotizacion, cl.razon_social, c.fecha AS fecha_cotizacion, COALESCE(sc.estado, 'Sin seguimiento') AS estado, MAX(CASE WHEN sc.estado = 'Enviado' THEN sc.fecha ELSE NULL END) AS fecha_envio, SUM(dc.cantidad * dc.precio) AS subtotal FROM cotizaciones c JOIN clientes cl ON c.id_cliente = cl.id_cliente LEFT JOIN detalle_cotizaciones dc ON c.id_cotizacion = dc.id_cotizacion LEFT JOIN seguimiento_cotizaciones sc ON c.id_cotizacion = sc.id_cotizacion GROUP BY c.id_cotizacion, cl.razon_social, c.fecha, sc.estado")
    res.json(result);
    
}