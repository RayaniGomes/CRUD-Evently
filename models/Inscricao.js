const mongoose = require("mongoose");

const InscricaoSchema = new mongoose.Schema({
  evento: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "Evento" },
    nome: { type: String, required: true },
  },
  inscritos: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
      nome: { type: String, required: true },
      email: { type: String, required: true },
    }
  ],
});

module.exports = mongoose.model("Inscricao", InscricaoSchema);
