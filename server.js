require('dotenv').config();

const express = require('express');
const cors = require('cors')
const connectDB = require('./config/database');
const eventoRoutes = require('./routes/eventoRoutes'); // Rotas de funcionários
const usuarioRoutes = require('./routesusuariotRoutes');   // Rotas de projetos

const app = express();

// Middleware
app.use(express.json());
app.use(cors())
// Conectar ao banco de dados
connectDB();

// Rotas
app.use('/', eventoRoutes);  // Prefixo para as rotas de funcionários
app.use('/', usuarioRoutes);   // Prefixo para as rotas de projetos

// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
