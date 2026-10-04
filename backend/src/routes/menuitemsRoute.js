/* eslint-disable no-undef */
const express = require("express");

const {
    getMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
} = require("../controllers/menuitemController");
const authenticateUser = require("../middlewares/authMiddleware")

const router = express.Router();

router.get("/", getMenuItems);
router.get("/:id", getMenuItemById);
router.post("/", authenticateUser, createMenuItem);
router.put("/:id", authenticateUser, updateMenuItem);
router.delete("/:id", authenticateUser, deleteMenuItem);

module.exports = router;