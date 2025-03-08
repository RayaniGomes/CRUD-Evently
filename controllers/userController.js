const { default: mongoose } = require("mongoose");
const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const email = req.body.email;
    const emailExists = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } });

    if (emailExists) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    res
      .status(500)
      .json({ error: "Erro ao criar usuário", details: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const { email } = req.query;
    let users = email
      ? await User.find({ email: { $regex: email, $options: "i" } })
      : await User.find();
    
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar usuários" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Erro ao buscar usuário por ID:", err);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const email = req.query.email;

    if (!email) {
      return res.status(400).json({ error: "O parâmetro email é obrigatório" });
    }

    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Erro ao buscar usuário por email:", err);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, dateOfBirth, email, password, creator } = req.body;
  const profilePhoto = req.file ? req.file.path : req.body.profilePhoto;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const userUpdate = await User.findByIdAndUpdate(
      id,
      { name, dateOfBirth, email, password, profilePhoto, creator },
      { new: true, runValidators: true }
    );

    if (!userUpdate) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(200).json(userUpdate);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
  getUserById,
};
