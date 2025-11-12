// Desarrollar...
import express from 'express';
import { leerLibros } from './libros.mjs';

const PUERTO=5000

const app = express();


app.get('/libros/:precio_menor', async (req,res) =>{

    const precioUsuario = parseInt(req.params.precio_menor)
    
    try {
        const libros = await leerLibros();

        const filtra = libros.filter( p =>{return p.precio < precioUsuario
        })

        res.status(200).json(filtra)

    } catch (error) {
        console.error('no anda');
        
    }
})

app.listen(PUERTO);
