import express from 'express';
import cors from 'cors';
import { PORT } from './configuracion.js';
/*import rutas from './rutas/index_rutas.js';*/
import ruta_tareas from './rutas/ruta_tareas.js';
const app = express();
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.use(express.json());
/*app.use(rutas);*/
app.use(ruta_tareas);
app.listen(PORT);
console.log('Servidor backend escuchando en puerto ' + PORT);
