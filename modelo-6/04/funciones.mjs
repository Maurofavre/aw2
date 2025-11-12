import {readFile, writeFile} from 'fs/promises';
import {dirname, join} from 'node:path'
import { fileURLToPath } from 'node:url' 

const carpeta = dirname(fileURLToPath(import.meta.url))
const rutaArchivo = join(carpeta, 'libros.json')

export async function nuevoLibro(titulo, autor, disponible) {
    try{
        // Leer el archivo de libros
        const libros = await readFile(rutaArchivo, 'utf-8')
        // Nuevo
        const libro = {
            titulo,
            autor,
            disponible
        }
        // Convertir texto a JSON
        const librosArray = JSON.parse(libros)
        // Agregar libro al array
        librosArray.push(libro)
        await writeFile(rutaArchivo, JSON.stringify(librosArray, null, 2))
    }catch(error) {
        console.log(error)
        throw error
    }
}


// Middleware
export function verificarDatos(req, res, next) {

    try{
        if (!req.body) {
            return res.status(400).json({ error: 'Faltan datos' });
        }
        const { titulo, autor, disponible } = req.body;
        if (!titulo || !autor || typeof disponible !== 'boolean') {
            return res.status(400).json({ error: 'Faltan datos' });
        }
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
}