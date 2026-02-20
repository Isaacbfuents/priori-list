import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const { Schema } = mongoose;

const userSchema = new Schema( {
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    auth: {
        type: Boolean,
        default: false        
    },
    token: {
        type: String
    }

});

userSchema.pre('save', async function(next) {
    // Si el campo de contraseña ha sido modificado
    if(this.isModified('password')) {
        const salt = await bcrypt.genSalt(12);  // Genera un salt para el hash
        this.password = await bcrypt.hash(this.password, salt);  // Hashea la contraseña
    }
    next();  // Continúa con el guardado del documento
});

const User = mongoose.model('User', userSchema);

export default User;