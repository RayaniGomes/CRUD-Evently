const Event = require("../models/Event");
const mongoose = require("mongoose");

const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error("Erro ao criar evento:", err);
    res
      .status(500)
      .json({ error: "Erro ao criar evento", details: err.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const { creator, date, city, state, category, name } = req.query;

    let filter = {};

    if (creator) {
      filter["creator.email"] = creator;
    }

    if (date) { 
      filter.date = date;
    }

    if (city) {
      filter.city = { $regex: new RegExp(`^${city}$`, "i") };
    }

    if (state) {
      filter.state = { $regex: new RegExp(`^${state}$`, "i") };
    }

    if (category) {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (name) {
      filter.name = { $regex: new RegExp(name, "i") };
    }
    

    const events = await Event.find(filter);

    res.status(200).json(events);
  } catch (err) {
    console.error("Erro ao listar eventos:", err);
    res.status(500).json({ error: "Erro ao listar eventos" });
  }
};

const getEventById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    res.status(200).json(event);
  } catch (err) {
    console.error("Erro ao buscar evento por ID:", err);
    res.status(500).json({ error: "Erro interno ao buscar evento" });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    date,
    time,
    maxPeople,
    category,
    description,
    location,
    address,
    number,
    neighborhood,
    city,
    state,
    complement,
    image,
    creator,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const eventUpdate = await Event.findByIdAndUpdate(
      id,
      {
        name,
        date,
        time,
        maxPeople,
        category,
        description,
        location,
        address,
        number,
        neighborhood,
        city,
        state,
        complement,
        image,
        creator,
      },
      { new: true, runValidators: true }
    );

    if (!eventUpdate) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    res.status(200).json(eventUpdate);
  } catch (err) {
    console.error("Erro ao atualizar evento:", err);
    res
      .status(500)
      .json({ error: "Erro ao atualizar evento", details: err.message });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    res.status(200).json({ message: "Evento deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao excluir evento" });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
