const { get } = require('mongoose');
const Usuario = require('../models/Usuario');

// Criar um novo Usuario
const createUsuario = async (req, res) => {
    try {
        const novoUsuario = new Usuario(req.body);
        await novoUsuario.save();
        res.status(201).json(novoUsuario);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar usuario' });
    }
};

// Listar todos os usuarios
const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar usuarios' });
    }
};

//Mostrar usuario por ID
const getUsuarioById = async (req, res) => {
    try {
        // O ID é passado na URL como parâmetro
        const { id } = req.params;

        // Busca o usuario no banco de dados usando o _id
        const usuario = await Usuario.findById(id);

        // Se o usuario não for encontrado, retorna um erro 404
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario não encontrado' });
        }

        // Se encontrado, retorna o usuario
        res.status(200).json(usuario);
    } catch (err) {
        console.error('Erro ao buscar usuario por ID:', err);
        res.status(500).json({ error: 'Erro ao buscar usuario' });
    }
};


// Atualizar usuario por ID
const updateUsuario = async (req, res) => {
    try {
        const usuarioAtualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(usuarioAtualizado);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar usuario' });
    }
};

// Deletar usuario por ID
const deleteUsuario = async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar usuario' });
    }
};

export { createUsuario, getUsuarios, updateUsuario, deleteUsuario, getUsuarioById };