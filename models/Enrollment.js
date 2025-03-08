const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
  event: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    name: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    maxPeople: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    address: { type: String, required: true },
    number: { type: String, required: true },
    neighborhood: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    complement: { type: String, default: "" },
    image: { type: String, default: "sem-image.svg" },
    creator: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: { type: String },
      email: { type: String },
    },
  },
  enrollment: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Enrollment", EnrollmentSchema);
