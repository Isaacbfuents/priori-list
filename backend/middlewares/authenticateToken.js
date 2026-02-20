import jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from '../models/User.js';

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']; // Acceder al token
    
    if(!authHeader) { // En caso de no recibir token
        return res.status(401).json({message: "Acceso denegado. No cuentas con un token."})
    }

    const token = authHeader.split(' ')[1]; // Acceder al valor del token
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.status(403).json({message: "El token ha expirado o es inválido"});
        }
        req.user = user;
        next();
    }); // Verificar el jwt
}

export {
    authenticateToken
}