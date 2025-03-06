const mongoose = require("mongoose");

const InscricaoSchema = new mongoose.Schema({
  evento: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "Evento" },
    nome: { type: String, required: true },
    data: { type: String, required: true },
    horario: { type: String, required: true },
    maxPessoas: { type: Number, required: true },
    tipo: { type: String, required: true },
    descricao: { type: String },
    local: { type: String, required: true },
    endereco: { type: String, required: true },
    numero: { type: String, required: true },
    bairro: { type: String },
    cidade: { type: String, required: true },
    uf: { type: String, required: true },
    complemento: { type: String, default: "" },
    imagem: { type: String, default: "sem-imagem.svg" },
    criador: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
      nome: { type: String },
      email: { type: String },
    },
  },
  inscritos: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
    nome: { type: String, required: true },
    email: { type: String, required: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Inscricao", InscricaoSchema);
