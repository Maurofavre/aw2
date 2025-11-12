export function enviarCookie(res) {
    res.cookie('sessionId', '222222', {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true, 
        secure: true,
        sameSite: 'strict'
    }); 
}
export function verificarSesionId(req, res, next) {
    try {
        const { sessionId } = req.cookies;
        if (sessionId && sessionId === '222222') {
            next();
        }else{
            return res.redirect('/login');
        }
    } catch (error) {
        console.log(error);
        return res
            .redirect('/login')
    }
}
export function autenticarUsuario(nombre, pass, usuarios) {
    const usuarioEncontrado = usuarios.find(
        (usuario) => usuario.nombre === nombre && usuario.pass === pass
    );
    return usuarioEncontrado;
}

export function validarDatosFront(req, res, next) {
    try{
        const { nombre, pass } = req.body;
        if (!nombre || !pass) {
            return res.sendStatus(400);
        }
        next();
    } catch (error) {
        return res.sendStatus(400);
    }
}
