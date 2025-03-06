const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    dataNascimento: { type: String, required: true },
    senha: { type: String, required: true },
    fotoPerfil: { type: String},
    criador: { type: Boolean, required: true },
    eventos: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Evento'},
        nome: { type: String}
    },
    minhasInscricoes: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Evento'},
        nome: { type: String}
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
