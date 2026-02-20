import app from './index.js';
import connectDb from './config/db.js';
import 'dotenv/config';

// Conectar a la db
connectDb();

// Definir puerto
const PORT = process.env.PORT || 4000;

// Puerto del app
app.listen(PORT);
