// Desarrollar...
import {writeFile} from 'fs/promises'
import path from 'path'
import { stringify } from 'querystring'

const productos ={
    nombre:'AURICULARES DE PRUEBA' ,
    marca:'MAUROO' ,
    precio: '15000' 
}

const nuevoJson = path.resolve('producto.json')

async function nuevoArchivo() {
    try {
        
        const nuevoProductos = JSON.stringify(productos)
         await writeFile(nuevoJson,nuevoProductos)
        console.log('✅ Archivo creado correctamente:', nuevoJson)
        
    } catch (error) {
        console.error('❌ Error al crear el archivo:', error.message)
    }

}

nuevoArchivo()


