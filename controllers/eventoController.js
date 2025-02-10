const Evento = require("../models/Evento");
const mongoose = require('mongoose');

// Criar um novo evento
const createEvento = async (req, res) => {
  try {
    const novoEvento = new Evento(req.body);
    await novoEvento.save();
    res.status(201).json(novoEvento);
  } catch (err) {
    console.error("Erro ao criar evento:", err);
    res.status(500).json({ error: "Erro ao criar evento", details: err.message });
  }
};

// Listar todos os eventos
const getEventos = async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.status(200).json(eventos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar eventos" });
  }
};

//Mostrar evento por ID
const getEventoById = async (req, res) => {
  // Verifica se o ID é um ObjectId válido do MongoDB
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    // Tenta buscar o evento pelo ID
    const evento = await Evento.findById(req.params.id);

    // Se o evento não for encontrado, retorna um erro 404
    if (!evento) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    // Se o evento for encontrado, retorna o evento com status 200
    res.status(200).json(evento);
  } catch (err) {
    // Registra o erro no console e retorna um erro 500
    console.error("Erro ao buscar evento por ID:", err);
    res.status(500).json({ error: "Erro interno ao buscar evento" });
  }
};

// Atualizar evento por ID
const updateEvento = async (req, res) => {
  try {
    const eventoAtualizado = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(eventoAtualizado);
  } catch (err) {
    console.error("Erro ao atualizar evento:", err);
    res.status(500).json({ error: "Erro ao atualizar evento", details: err.message });
  }  
};

// Deletar evento por ID
const deleteEvento = async (req, res) => {
  try {
    await Evento.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar evento" });
  }
};

module.exports = {
  createEvento,
  getEventos,
  getEventoById,
  updateEvento,
  deleteEvento,
};
