import express from 'express';
import cookieParser from 'cookie-parser';
import { validarDatosFront, verificarSesionId,enviarCookie,autenticarUsuario } from './funciones.mjs';

import dotenv from 'dotenv';

dotenv.config();
const PUERTO = process.env.PUERTO || 3001;

const usuariosRegistrados = [
    { nombre: 'admin1', pass: '123' },
    { nombre: 'admin2', pass: '123' },
    { nombre: 'admin3', pass: '123' },
];

const app = express();


// Middlewares
app.use(express.json());
app.use(cookieParser());

// Ruta logout
app.get('/logout' , (req, res) => {
    res.cookie('sessionId', '', {
        maxAge: 0,
    });
    res.redirect('/login');
});

// Ruta autenticacion
app.post('/autenticacion', validarDatosFront ,(req, res) => {
    try {
        const { nombre, pass } = req.body;
        const usuarioVerificado = autenticarUsuario(
            nombre,
            pass,
            usuariosRegistrados
        );
        if (!usuarioVerificado) {
            return res.sendStatus(401);
        }else{
            enviarCookie(res);
            return res.redirect('/');
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});


// Front login (público)
app.use('/login', express.static('login'));

// Front administración (protegido)
app.use('/', verificarSesionId, express.static('admin'));

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});