// Desarrollar...
import express from 'express';
import {nuevoLibro, verificarDatos} from './funciones.mjs'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path'; 

const PUERTO = 4200

const app = express();

app.use(express.json())

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(join(__dirname, 'web')))


app.post('/libros/alta', verificarDatos , async(req,res)=>{

    const {titulo, autor, disponible} = req.body
    
    try {
        await nuevoLibro(titulo,autor,disponible)

        res.status(200).json({mensaje:'NUEVO LIBRO CARGADO'})


    } catch (error) {
        console.error('no funca');
        
    }



} )






app.listen(PUERTO);
