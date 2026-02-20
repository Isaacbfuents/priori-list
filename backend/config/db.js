import mongoose from 'mongoose';
import 'dotenv/config';

// Funcion para conectar a db con moongose
const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.URI);
        console.log('Se ha conectado a la db correctamente');        
    } catch (error) {
        console.log(error);
    }
}

export default connectDb