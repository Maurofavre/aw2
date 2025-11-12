import { readFile } from 'node:fs/promises'
import {dirname, join} from 'node:path'
import { fileURLToPath } from 'node:url' 

const carpeta = dirname(fileURLToPath(import.meta.url)) //<------ ruta de la carpeta actual

const rutaArchivo = join(carpeta, 'libros.json')

export async function leerLibros(){
    try{
        const datos = await readFile(rutaArchivo)
        return await JSON.parse(datos)
    }catch(error){
        throw error
    }
}