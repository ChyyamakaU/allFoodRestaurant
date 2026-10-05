/* eslint-disable no-undef */

const express = require("express");

const {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} = require("../controllers/orderController");

const authenticateUser = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authenticateUser, getOrders);
router.get("/:id", authenticateUser, getOrderById);

router.post("/", createOrder);

router.put("/:id", authenticateUser, updateOrder);
router.delete("/:id", authenticateUser, deleteOrder);

module.exports = router;