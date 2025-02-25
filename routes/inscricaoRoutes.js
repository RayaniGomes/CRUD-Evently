const express = require("express");
const {
  createInscricao,
  getInscricao,
  deleteInscricao,
} = require("../controllers/inscricaoController");

const router = express.Router();

router.post("/inscricoes", createInscricao); // Criar inscrição
router.get("/inscricoes", getInscricao); // Listar inscrições
router.delete("/inscricoes/:id", deleteInscricao); // Deletar inscrição por ID

module.exports = router;
