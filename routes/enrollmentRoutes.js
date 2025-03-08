const express = require("express");
const {
  createEnrollment,
  getEnrollment,
  deleteEnrollment,
} = require("../controllers/enrollmentController");

const router = express.Router();

router.post("/enrollments", createEnrollment);
router.get("/enrollments", getEnrollment);
router.delete("/enrollments/:id", deleteEnrollment); 

module.exports = router;
