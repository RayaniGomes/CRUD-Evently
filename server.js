require('dotenv').config();

const express = require('express');
const cors = require('cors')
const connectDB = require('./config/database');
const eventoRoutes = require('./routes/eventoRoutes'); // Rotas de evento
const usuarioRoutes = require('./routes/usuarioRoutes');   // Rotas de usuario

const app = express();

// Middleware
app.use(express.json());
app.use(cors())
// Conectar ao banco de dados
connectDB();

// Rotas
app.use('/', eventoRoutes);  // Prefixo para as rotas de evento
app.use('/', usuarioRoutes);   // Prefixo para as rotas de usuario

// Inicializar servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
