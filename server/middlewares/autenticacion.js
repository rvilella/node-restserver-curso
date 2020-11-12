const jwt = require('jsonwebtoken');

// Verificar token
let verificaToken = (req, res, next) => {

    let token = req.get('token');

    //decoded = payload
    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: 'Token no válido'
            });
        }

        req.usuario = decoded.usuario;

        next();

    });

    console.log(token);


    // res.json({
    //     token: token
    // });

};

// Verificar AdminRole
let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    let role = usuario.role;

    if (role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }

};


// Verificar Token para imagen
let verificaTokenImg = (req, res, next) => {

    let token = req.query.token;

    //decoded = payload
    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: 'Token no válido'
            });
        }

        req.usuario = decoded.usuario;

        next();

    });

    console.log(token);

}

module.exports = {
    verificaToken,
    verificaAdmin_Role,
    verificaTokenImg
}