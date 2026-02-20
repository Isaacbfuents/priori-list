import jwt from 'jsonwebtoken';
import 'dotenv/config';
import RefreshToken from '../models/RefreshToken.js';

const generateAccessToken = (userId) => {
    return jwt.sign(
        {id: userId},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '5m'} // Expira en un minuto
    )
}

const generateRefreshToken = async (userId) => {
    const refreshToken = jwt.sign(
        {id: userId},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'}
    );
    
    await RefreshToken.create({
        token: refreshToken,
        userId: userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Expira en 7 dias
    });
 
    return refreshToken;
}

export {
    generateAccessToken, 
    generateRefreshToken
};