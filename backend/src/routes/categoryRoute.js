/* eslint-disable no-undef */
const express = require("express");

const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory} = require("../controllers/categoryController");
const authenticateUser = require("../middlewares/authMiddleware")

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", authenticateUser, createCategory);
router.put("/:id", authenticateUser, updateCategory);
router.delete("/:id", authenticateUser, deleteCategory);

module.exports = router;