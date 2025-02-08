require('dotenv').config();

const express = require('express');
const cors = require('cors')
const connectDB = require('./config/database');
const employeeRoutes = require('./routes/employeeRoutes'); // Rotas de funcionários
const projectRoutes = require('./routes/projectRoutes');   // Rotas de projetos

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
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
