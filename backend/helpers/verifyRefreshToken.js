import jwt from 'jsonwebtoken';
import 'dotenv/config';
import RefreshToken from '../models/RefreshToken.js';
import { generateAccessToken } from '../helpers/generateTokens.js';

const verifyRefreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken; // Acceder al refresh token
    

    if(refreshToken == null) { // Si no es encontrado
        return res.status(401).json({message: "JWT no disponible"});
    }

    try {
        const existRefreshToken = await RefreshToken.findOne({token: refreshToken}); // Validar que exista el refresh token en la db

        if(!existRefreshToken || existRefreshToken.isExpired) { // Si la db no encuentra el refresh token
            return res.status(404).json({message: "El refresh token no fue encontrado"});
        }
    
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if ( err ) {
                console.log('JWT verification failed', err)
                return res.status(403).json({message: "Hubo un error en la verificacion del refresh token"})
            };
            const accessToken = generateAccessToken(user.id);
            
            return res.json({
                success: true,
                accessToken
            })
        })    
    } catch (error) {
        console.log(error);
    }
}

export default verifyRefreshToken;