const express = require("express");
const {
  createEvento,
  deleteEvento,
  getEventoById,
  getEventos,
  updateEvento,
} = require("../controllers/eventoController");

const router = express.Router();

router.post("/eventos", createEvento); // Criar projeto
router.get("/eventos", getEventos); // Listar todos os projetos
router.get("/eventos/:id", getEventoById); // Mostrar projeto por ID
router.put("/eventos/:id", updateEvento); // Atualizar projeto por ID
router.delete("/eventos/:id", deleteEvento); // Deletar projeto por ID

module.exports = router;
