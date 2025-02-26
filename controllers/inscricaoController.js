const Inscricao = require("../models/Inscricao");

// Criar uma nova inscrição
const createInscricao = async (req, res) => {
  try {
    // Aqui você precisa extrair o 'evento' e 'inscritos' do req.body
    const { evento, inscritos } = req.body;

    // Verificar se o usuário já está inscrito no evento
    const inscricaoExistente = await Inscricao.findOne({
      "evento.nome": evento.nome,
      "inscritos.nome": inscritos.nome,
    });

    if (inscricaoExistente) {
      return res.status(400).json({ error: "Usuário já está inscrito neste evento." });
    }

    // Criar nova inscrição
    const novaInscricao = new Inscricao(req.body);
    await novaInscricao.save();

    res.status(201).json(novaInscricao);
  } catch (err) {
    console.error("Erro ao fazer a inscrição:", err);
    res.status(500).json({ error: "Erro ao fazer a inscrição.", details: err.message });
  }
};

// Listar todas as inscrições (com filtro por nome)
const getInscricao = async (req, res) => {
  try {
    const { nome } = req.query;

    let query = {};
    if (nome) {
      query["inscritos.nome"] = { $regex: nome, $options: "i" };
    }

    const inscricoes = await Inscricao.find(query)
      .populate("evento.id", "nome") // Popula evento com apenas o nome
      .populate("inscritos.id", "nome"); // Popula inscritos com apenas o nome

    res.status(200).json(inscricoes);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar inscrições", details: err.message });
  }
};


// Deletar inscrição por ID
const deleteInscricao = async (req, res) => {
  try {
    const inscricao = await Inscricao.findByIdAndDelete(req.params.id);

    if (!inscricao) {
      return res.status(404).json({ error: "Inscrição não encontrada." });
    }

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar inscrição", details: err.message });
  }
};

module.exports = {
  createInscricao,
  getInscricao,
  deleteInscricao,
};
