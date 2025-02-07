import mongoose from 'mongoose';

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error('Variável de ambiente MONGO_URI não está definida');
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexão ao MongoDB realizada com sucesso!');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err);
        process.exit(1);
    }
};

export default connectDB;
