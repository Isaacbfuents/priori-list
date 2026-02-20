import jwt from 'jsonwebtoken';
import 'dotenv/config';
import RefreshToken from '../models/RefreshToken.js';

const logout = async (req, res) => {

    try {
        const refreshToken = req.body.token; // Acceder al refresh token

        const eliminateToken = await RefreshToken.findOneAndDelete({token: refreshToken});
        if(!eliminateToken) return res.status(400).json({message: "No se pudo eliminar el refresh token correctamente"});
        return res.status(200).json({message: "El refresh token fue eliminado correctamente"})
        
    } catch (error) {
        console.log(error);
    }
    

}

export default logout;