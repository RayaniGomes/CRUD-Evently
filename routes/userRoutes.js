const express = require("express");
const {
  createUser,
  getUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controllers/userController");

const router = express.Router();

router.post("/users", createUser); 
router.get("/users", getUsers); 
router.get("/users/email", getUserByEmail); 
router.patch("/users/:id", updateUser); 
router.delete("/users/:id", deleteUser); 
router.get("/users/:id", getUserById); 

module.exports = router;
