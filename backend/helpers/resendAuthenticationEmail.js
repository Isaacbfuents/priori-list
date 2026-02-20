import User from "../models/User.js";
import sendAuthenticationEmail from "./sendAuthenticationEmail.js";

const resendAuthenticationEmail = async (req, res) => {
    const { email } = req.body;
    
    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({message: 'No se encontro una cuenta con este correo electronico'});
        }
    
        sendAuthenticationEmail(email, user.id, res);
        return res.status(200).json({message: "Correo reenviado correctamente"});
    } catch (error) {
        console.log("Ocurrio un error al reenviar el correo electronico", error); 
    }
    
}

export default resendAuthenticationEmail;