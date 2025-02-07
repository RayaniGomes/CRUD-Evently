const express = require('express');
const { createUsuario, getUsuarios, updateUsuario, deleteUsuario, getUsuarioById } = require('../controllers/usuarioController');

const router = express.Router();

router.post('/usuarios', createUsuario);      // Criar funcionário
router.get('/usuarios', getUsuarios);        // Listar todos
router.put('/usuarios/:id', updateUsuario);  // Atualizar por ID
router.delete('/usuarios/:id', deleteUsuario); // Deletar por ID
router.get('/usuarios/:id', getUsuarioById); // Mostrar por ID

module.exports = router;