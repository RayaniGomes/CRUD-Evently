const { default: mongoose } = require("mongoose");
const Usuario = require("../models/Usuario");

// Criar um novo Usuario
const createUsuario = async (req, res) => {
  try {
    const email = req.body.email;
    console.log("Email recebido na requisição:", email);

    const emailExists = await Usuario.findOne({ email });
    console.log("Email exists:", emailExists);
    if (emailExists) {
      return res.status(400).json({ error: "Email ja cadastrado" });
    }

    const novoUsuario = new Usuario(req.body);
    await novoUsuario.save();
    res.status(201).json(novoUsuario);
  } catch (err) {
    console.error("Erro ao criar usuario:", err);
    res
      .status(500)
      .json({ error: "Erro ao criar usuario", details: err.message });
  }
};

// Listar todos os usuarios
const getUsuarios = async (req, res) => {
  try {
    const { nome } = req.query; // Obtém o parâmetro de consulta 'nome'

    let usuarios;
    if (nome) {
      // Se o nome for fornecido, filtra os usuários pelo nome
      usuarios = await Usuario.find({ nome: { $regex: nome, $options: "i" } }); // 'i' para case insensitive
    } else {
      // Se não houver nome, retorna todos os usuários
      usuarios = await Usuario.find();
    }

    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar usuarios" });
  }
};

//Mostrar usuario por ID
const getUsuarioById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    // Busca o usuario no banco de dados usando o _id
    const usuario = await Usuario.findById(req.params.id);

    // Se o usuario não for encontrado, retorna um erro 404
    if (!usuario) {
      return res.status(404).json({ message: "Usuario não encontrado" });
    }

    // Se encontrado, retorna o usuario
    res.status(200).json(usuario);
  } catch (err) {
    console.error("Erro ao buscar usuario por ID:", err);
    res.status(500).json({ error: "Erro ao buscar usuario" });
  }
};

const getUsuarioByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    console.log("Email recebido na requisição:", email);

    if (!email) {
      return res.status(400).json({ error: "O parâmetro email é obrigatório" });
    }

    const usuario = await Usuario.findOne({ email });
    console.log("Usuário encontrado:", usuario); // Adiciona log para depuração

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json(usuario);
  } catch (err) {
    console.error("Erro ao buscar usuário por email:", err);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
};

// Atualizar usuario por ID
const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, dataNascimento, email, senha, criador } = req.body;
  const fotoPerfil = req.file ? req.file.path : req.body.fotoPerfil;

  try {
    const usuarioAtualizado = await Usuario.findByIdAndUpdate(
      id,
      { nome, dataNascimento, email, senha, fotoPerfil, criador },
      { new: true, runValidators: true }
    );

    if (!usuarioAtualizado) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(200).json(usuarioAtualizado);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
};

// Deletar usuario por ID
const deleteUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar usuario" });
  }
};

module.exports = {
  createUsuario,
  getUsuarios,
  getUsuarioByEmail,
  updateUsuario,
  deleteUsuario,
  getUsuarioById,
};
