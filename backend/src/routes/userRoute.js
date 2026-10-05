/* eslint-disable no-undef */
const express = require("express");

const {
    createUser,
    loginUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/userController");

const authenticateUser = require("../middlewares/authMiddleware");

const router = express.Router();


router.post("/register", createUser);

router.post("/login", loginUser);

router.get("/", authenticateUser, getUsers);

router.get("/:id", authenticateUser, getUserById);

router.put("/:id", authenticateUser, updateUser);

router.delete("/:id", authenticateUser, deleteUser);


module.exports = router;