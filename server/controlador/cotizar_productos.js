import {json} from "express";
import {pool} from "../basedatos.js";

/*Listado para cotizar*/
export const getlistadoproductoscotizar = async (req,res)=>{
    const [result] = await pool.query("SELECT id_producto,nombre,unidad_medida FROM productos");
    res.json(result);
}