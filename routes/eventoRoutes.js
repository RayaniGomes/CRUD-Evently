import express from 'express';
import { createEvento, deleteEvento, getEventoById, getEventos, updateEvento } from '../controllers/eventosController';

const router = express.Router();

router.post('/eventos', createEvento);       // Criar projeto
router.get('/eventos', getEventos);          // Listar todos os projetos
router.put('/eventos/:id', updateEvento);    // Atualizar projeto por ID
router.delete('/eventos/:id', deleteEvento); // Deletar projeto por ID
router.get('/eventos/:id', getEventoById); // Mostrar projeto por ID

export default router;