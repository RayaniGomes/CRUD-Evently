const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    data: { type: String, required: true },
    horario: { type: String, required: true },
    maxPessoas: { type: Number, required: true },
    tipo: { type: String, required: true },
    descricao: { type: String},
    local: { type: String, required: true },
    endereco: { type: String, required: true },
    numero: { type: String, required: true },
    bairro: { type: String },
    cidade: { type: String, required: true },
    uf: { type: String, required: true, enum: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'] },
    complemento: { type: String, default: "" },
    imagem: { type: String, default: "sem-imagem.svg" },
    criador: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
        nome: { type: String }
    },
    inscritos: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
        nome: { type: String }
    },
});

module.exports = mongoose.model("Evento", EventoSchema);