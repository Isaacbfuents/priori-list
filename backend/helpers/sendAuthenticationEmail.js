import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import 'dotenv/config';


const sendAuthenticationEmail = async (correo, userId) => {
    try {
        // Crear token de verificacion
        const verificationToken = jwt.sign(
            {id: userId},
            process.env.VERIFICATION_TOKEN_SECRET,
            { expiresIn: "10m" }
        )

        // Enlace de verificacion
        const verificationLink = `${process.env.FRONTEND_URL}/auth/verify-account?token=${verificationToken}`;
        // Configurar el transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.CORREO_USER,
                pass: process.env.PASSWORD_USER
            }
        })
        
        // Contenido del correo
        const mailOptions = {
            from: `"Priori-list" <${process.env.CORREO_USER}>`,
            to: correo,
            subject: "Verifica tu cuenta",
            html: `
                <h2>¡Bienvenido!</h2>
                <p>Para activar tu cuenta, haz clic en el siguiente enlace:</p>
                <a href="${verificationLink}" target="_blank">Verificar cuenta</a>
                <p>Este enlace expirará en 15 minutos.</p>
            `
        }

        // Enviar correo electronico
        await transporter.sendMail(mailOptions);
        console.log(`Correo de verificacion enviado a ${correo}`);
        
        
    } catch (error) {
        console.log(error);
    }
}   



export default sendAuthenticationEmail;