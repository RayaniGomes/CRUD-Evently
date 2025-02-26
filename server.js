require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");

const eventoRoutes = require("./routes/eventoRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const inscricaoRoutes = require("./routes/inscricaoRoutes");

const app = express();

// 🛑 TEM QUE VIR ANTES DAS ROTAS!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();

// 🟢 Registra as rotas APÓS as middlewares
app.use("/", eventoRoutes);
app.use("/", usuarioRoutes);
app.use("/", inscricaoRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
