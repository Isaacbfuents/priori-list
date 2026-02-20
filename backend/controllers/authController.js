import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from '../models/User.js';
import sendAuthenticationEmail from '../helpers/sendAuthenticationEmail.js';
import {generateAccessToken, generateRefreshToken} from '../helpers/generateTokens.js';

const register = async (req, res) => {
    const userInfo = req.body; // Acceder a los datos del nuevo usuario 

    try {
        // Validar que no exista otra cuenta con el mismo correo
        const userExist = await User.findOne({email: userInfo.email});
        if(userExist) {
            return res.status(400).json({message: "El correo electronico ya esta registrado"})
        }

        // Crear el usuario
        const user = new User(userInfo); // Nuevo usuario usando en modelo

        await user.save(); // Guardarlo en la db
        
        console.log(user._id);
        sendAuthenticationEmail(user.email, user._id);
        
        
        // Respuesta de exito
        res.status(201).json({
            success: true,
            message: `Registro exitoso. Verifica tu correo electrónico ${user.email}`,
            auth: user.auth     
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Ocurrio un error al registrar el usuario", error: error.message})
    }
}

const login = async (req, res) => {
    const { email, password } = req.body; // Leer la info del usuario

    // Validar que no haya un campo vacio
    if(!email || !password) {
        return res.status(400).json({message: "No se completaron todos los campos"})
    }
    
    try {
        const user = await User.findOne({ email }); // Usuario con el correo
        // Si el usuario no es encontrado
        if(!user) { 
            return res.status(404).json({message: "No se encontró una cuenta con este correo"}); // En caso de que no se encuentre usuario con el correo proporcionado
        }
        
        // Si si se encontro el usuario
        const match = await bcrypt.compare(password, user.password)// Comparar las contraseñas
        if(!match) { // Si el password no coincide
            return res.status(401).json({message: "El password es incorrecto"})
        } 

        // Si el usuario no esta autenticado
        if(!user.auth) {
            sendAuthenticationEmail(user.email, user._id);
            return res.json({
                success: true,
                message: "Es necesario verificar el correo",
                auth: user.auth
            })
        }

        if(user.auth) {
            // Si el usuario ya tiene la cuenta autenticada se genera un JWT
            const accessToken = generateAccessToken(user._id);
            
            const refreshToken = await generateRefreshToken(user._id); // Tambien un refresh token que se guarda en la db

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true, // Protección contra ataques XSS
                secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
                sameSite: 'Strict', // Prevención contra CSRF (ajústalo según necesidad)
                path: '/', // Disponible en toda la app
                maxAge: 60 * 60 * 24 * 30 * 1000, // 30 días
            });

            res.json({
                success: true,
                auth: user.auth,
                accessToken
            })
        }
        
        
        // Iniciado sesion correctamente
        // return res.status(200).json({message: "Se ha iniciado sesion correctamente"});

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Ocurrio un error al registrar el usuario", error: error.message});
    }      
}

const authenticate = async (req, res) => {
    try {
        const { verificationToken } = req.params; // Acceder al token

        // Verificar el token
        const decoded = jwt.verify(verificationToken, process.env.VERIFICATION_TOKEN_SECRET)

        const user = await User.findById(decoded.id); // Buscar el usuario con ese id

        if(!user) { // Si no se encuentra el usuario con el id
            return res.status(404).json({message: "Usuario no encontrado"});
        }

        if(user.auth) { // Si ya esta autenticado
            return res.status(400).json({message: "Usuario ya autenticado"});
        }

        // Actualizar auth a true
        user.auth = true;
        await user.save();

        res.status(200).json({message: "Se ha autenticado correctamente tu cuenta.", auth: user.auth});
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Token inválido o expirado' });
    }
}

export {
    register,
    login,
    authenticate
}