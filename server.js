import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/database';
import usuarioRoutes from './routes/usuarioRoutes';
import eventoRoutes from './routes/eventoRoutes';

const app = express();

// Middleware
app.use(express.json());
app.use(cors())
// Conectar ao banco de dados
connectDB();

// Rotas
app.use('/', usuarioRoutes); 
app.use('/', eventoRoutes); 

// Inicializar servidor
const PORT = process.env.MONGODB_URI;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
