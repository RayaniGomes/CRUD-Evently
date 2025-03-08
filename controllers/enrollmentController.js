const Enrollment = require("../models/Enrollment");

const createEnrollment = async (req, res) => {
  try {
    const { event, enrollment } = req.body;

    const enrollmentExists = await Enrollment.findOne({
      "event.name": event.name,
      "enrollment.name": enrollment.name,
    });
    

    if (enrollmentExists) {
      return res
        .status(400)
        .json({ error: "Usuário já está inscrito neste evento." });
    }

    const newEnrollment = new Enrollment(req.body);

    await newEnrollment.save();
    res.status(201).json(newEnrollment);
  } catch (err) {
    console.error("Erro ao fazer a inscrição:", err);
    res
      .status(500)
      .json({ error: "Erro ao fazer a inscrição.", details: err.message });
  }
};

const getEnrollment = async (req, res) => {
  try {
    const { name } = req.query;

    let query = {};
    if (name) {
      query["enrollment.name"] = { $regex: name, $options: "i" };
    }

    const enrollments = await Enrollment.find(query);

    res.status(200).json(enrollments);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao listar inscrições", details: err.message });
  }
};

const deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ error: "Inscrição não encontrada." });
    }

    res.status(200).json({ message: "Inscrição deletada com sucesso." });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao deletar inscrição", details: err.message });
  }
};

module.exports = {
  createEnrollment,
  getEnrollment,
  deleteEnrollment,
};
