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
    const { criador, data, cidade, uf, tipo, nome } = req.query;

    let filtros = {};

    // Filtra por criador, se fornecido
    if (criador) {
      filtros["criador.id"] = criador;
    }

    // Filtra por data (ajustando formato, se necessário)
    if (data) {
      const dataFormatada = data.replaceAll("/", "-"); // Ajuste conforme formato no banco
      filtros.data = dataFormatada;
    }

    // Filtra por cidade (ignorando maiúsculas e minúsculas)
    if (cidade) {
      filtros.cidade = { $regex: new RegExp(cidade, "i") };
    }

    // Filtra por estado (UF)
    if (uf) {
      filtros.uf = { $regex: new RegExp(uf, "i") };
    }

    // Filtra por tipo de evento
    if (tipo) {
      filtros.tipo = { $regex: new RegExp(tipo, "i") };
    }

    // Filtra por nome (ignorando maiúsculas e minúsculas)
    if (nome) {
      filtros.nome = { $regex: new RegExp(nome, "i") };
    }

    // Busca eventos no banco de dados com os filtros aplicados
    const eventos = await Evento.find(filtros);

    res.status(200).json(eventos);
  } catch (err) {
    console.error("Erro ao listar eventos:", err);
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
  const { id } = req.params;
  const { criador, data, cidade, uf, tipo, nome, descricao, local, endereco, numero, bairro, imagem, inscritos, maxPessoas, complemento, horario } = req.body;

  try {
    const eventoAtualizado = await Evento.findByIdAndUpdate(
      id,
      { criador, data, cidade, uf, tipo, nome, descricao, local, endereco, numero, bairro, imagem, inscritos, maxPessoas, complemento, horario },      
      { new: true, runValidators: true }
    );

    if (!eventoAtualizado) {
      return res.status(404).json({ error: "Evento nao encontrado" });
    }

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
