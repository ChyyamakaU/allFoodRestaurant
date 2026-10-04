/* eslint-disable no-undef */
const express = require("express");

const { getOrders, getOrderById, createOrder, updateOrder, deleteOrder} = require("../controllers/orderController");
const authenticateUser = require("../middlewares/authMiddleware")

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/", authenticateUser, createOrder);
router.put("/:id", authenticateUser, updateOrder);
router.delete("/:id", authenticateUser, deleteOrder);

module.exports = router;