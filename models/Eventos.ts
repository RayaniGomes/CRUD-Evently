import mongoose from "mongoose";

const EventoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    data: { type: String, required: true },
    horario: { type: String, required: true },
    maxPessoas: { type: Number, required: true },
    tipo: { type: String, required: true },
    descricao: { type: String, required: true },
    local: { type: String, required: true },
    endereco: { type: String, required: true },
    numero: { type: Number, required: true },
    bairro: { type: String, required: true },
    cidade: { type: String, required: true },
    uf: { type: String, required: true },
    complemento: { type: String, required: true },
    imagem: { type: String, required: true },
    criador: [
        {
            _id: { type: String, required: true },
            nome: { type: String, required: true },
            email: { type: String, required: true },
        }
    ],
    inscritos: [
        {
            _id: { type: String, required: true },
            nome: { type: String, required: true },
        }
    ]
});

module.exports = mongoose.model("Evento", EventoSchema);
