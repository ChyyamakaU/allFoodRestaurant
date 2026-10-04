/* eslint-disable no-undef */
const express = require("express");

const { getUsers, getUserById, createUser, updateUser, deleteUser, loginUser} = require("../controllers/userController");
const {authenticateUser}= require("../middlewares/authMiddleware")

const router = express.Router();

router.get("/", authenticateUser, getUsers);
router.get("/:id", authenticateUser, getUserById);
router.post("/", createUser);
router.put("/:id", authenticateUser, updateUser);
router.delete("/:id", authenticateUser, deleteUser)
router.post("/login", loginUser)

module.exports = router
