const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    data_de_nascimento: { type: String, required: true },
    senha: { type: String, required: true },
    criador: { type: Boolean, required: true },
    eventos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Evento' }], 
    minhasInscricoes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Evento' }]
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
