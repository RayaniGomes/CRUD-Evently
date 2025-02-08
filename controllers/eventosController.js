const Evento = require('../models/Evento');

// Criar um novo Evento
const createEvento = async (req, res) => {
    try {
        const novoEvento = new Evento(req.body);
        await novoEvento.save();
        res.status(201).json(novoEvento);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar Evento' });
    }
};

// Listar todos os Eventos
const getEventos = async (req, res) => {
    try {
        const Eventos = await Evento.find();
        res.status(200).json(Eventos);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar Eventos' });
    }
};

//Mostrar Evento por ID
const getEventoById = async (req, res) => {
    try {
        // O ID é passado na URL como parâmetro
        const { id } = req.params;

        // Busca o Evento no banco de dados usando o _id
        const Evento = await Evento.findById(id);

        // Se o Evento não for encontrado, retorna um erro 404
        if (!Evento) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }

        // Se encontrado, retorna o Evento
        res.status(200).json(Evento);
    } catch (err) {
        console.error('Erro ao buscar Evento por ID:', err);
        res.status(500).json({ error: 'Erro ao buscar Evento' });
    }
};


// Atualizar Evento por ID
const updateEvento = async (req, res) => {
    try {
        const EventoAtualizado = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(EventoAtualizado);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar Evento' });
    }
};

// Deletar Evento por ID
const deleteEvento = async (req, res) => {
    try {
        await Evento.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar Evento' });
    }
};

module.exports = { createEvento, getEventos, updateEvento, deleteEvento, getEventoById };