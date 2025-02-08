const mongoose = require('mongoose');

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error('Variável de ambiente MONGODB_URI não está definida');
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conexão ao MongoDB realizada com sucesso!');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
