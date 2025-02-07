const Evento = require("../models/Eventos");

// Criar um novo evento
const createEvento = async (req, res) => {
  try {
    const novoEvento = new Evento(req.body);
    await novoEvento.save();
    res.status(201).json(novoEvento);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar evento" });
  }
};

// Listar todos os eventos
const getEventos = async (res) => {
  try {
    const Eventos = await Evento.find();
    res.status(200).json(Eventos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar eventos" });
  }
};

//Mostrar evento por ID
const getEventoById = async (req, res) => {
  try {
    // O ID é passado na URL como parâmetro
    const { id } = req.params;

    // Busca o evento no banco de dados usando o id
    const evento = await Evento.findById(id);

    // Se o evento não for encontrado, retorna um erro 404
    if (!evento) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    // Se encontrado, retorna o evento
    res.status(200).json(evento);
  } catch (err) {
    console.error("Erro ao buscar evento por ID:", err);
    res.status(500).json({ error: "Erro ao buscar evento" });
  }
};

// Atualizar evento por ID
const updateEvento = async (req, res) => {
  try {
    const eventoAtualizado = await Evento.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(eventoAtualizado);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar evento" });
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

module.exports = { createEvento, getEventos, getEventoById, updateEvento, deleteEvento };
