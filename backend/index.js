import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import authRoutes from './routes/authRoutes.js';
import homePageRoutes from './routes/homePageRoutes.js';

// Inicializar el app
const app = express();

// Habilitar cors para peticiones del frontend
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));

// Poder leer json
app.use(express.json());

// Poder leer cookies 
app.use(cookieParser());

// Usar las rutas de autenticacion
app.use('/api/auth', authRoutes);

// Usar rutas de la pag principal
app.use('/api/home-page' ,homePageRoutes);


export default app;