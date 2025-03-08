const express = require("express");
const {
  createEvent,
  deleteEvent,
  getEventById,
  getEvents,
  updateEvent,
} = require("../controllers/eventController");

const router = express.Router();

router.post("/events", createEvent); 
router.get("/events", getEvents); 
router.get("/events/:id", getEventById); 
router.patch("/events/:id", updateEvent); 
router.delete("/events/:id", deleteEvent); 

module.exports = router;
