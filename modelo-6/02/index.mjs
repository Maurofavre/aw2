// Desarrollar...
import express from 'express';

const PUERTO = 4000

const app = express();
app.listen(PUERTO);

app.get('/productos/:id', (req, res) => {

    const idUsuario = parseInt(req.params.id)

    const datos = {
        productos: [
            { id_producto: 1, nombre: 'Producto 1', precio: 5000 },
            { id_producto: 3, nombre: 'Producto 2', precio: 3000 },
            { id_producto: 15, nombre: 'Producto 3', precio: 8000 },
        ],
    };
    const productoEncontrado = datos.productos.find((producto) => {
        return producto.id_producto === idUsuario
    });

    if (productoEncontrado) {
        res.status(200).json(productoEncontrado);
    } else {
        res.status(404).json({mensaje: 'PRODUCTO NO ENCONTRADO'});
    }
});

// Captura lo que no se haya definido -> no modificar
app.use((req, res) => {
    res.status(404).json({ mensaje: 'Ruta o método no encontrado no encontrado' });
});