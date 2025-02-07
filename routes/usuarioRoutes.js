import express from 'express';
import { createUsuario, getUsuarios, updateUsuario, deleteUsuario, getUsuarioById } from '../controllers/usuarioController';

const router = express.Router();

router.post('/usuarios', createUsuario);      // Criar funcionário
router.get('/usuarios', getUsuarios);        // Listar todos
router.put('/usuarios/:id', updateUsuario);  // Atualizar por ID
router.delete('/usuarios/:id', deleteUsuario); // Deletar por ID
router.get('/usuarios/:id', getUsuarioById); // Mostrar por ID

export default router;