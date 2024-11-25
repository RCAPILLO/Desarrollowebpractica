import { Router } from "express";
import {
    getusuarios,
    getusuario,
    createusuario,
    updateusuario,
    deleteusuario
} from '../controlador/mantenimiento_usuarios.js'
/*Rutas para usuarios*/
const router = Router();
router.get('/usuarios', getusuarios)
router.get('/usuario/:id', getusuario)
router.post('/usuario', createusuario)
router.put('/usuario/:id', updateusuario)
router.delete('/usuario/:id', deleteusuario)

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/*Crear una cotizacion*/
import { crearCotizacion } from "../controlador/tareas_controlador.js";
router.put('/crearcotizacion',crearCotizacion)
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*Api para extraer seguimieto de la cotizacion*/    
import { getseguimiento_cotizaciones } from "../controlador/seguimiento_cotizaciones.js";
router.get('/seguimiento_cotizaciones',getseguimiento_cotizaciones)

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/* Api para extraer los productos de disponibles*/
import{getproductos} from "../controlador/mantenimiento_productos.js";
router.get('/mantenimiento_productos',getproductos)
/*api RUTA para cotizar prodcutos*/
import { getlistadoproductoscotizar } from "../controlador/cotizar_productos.js";
router.get('/cotizar_productos',getlistadoproductoscotizar)
export default router;