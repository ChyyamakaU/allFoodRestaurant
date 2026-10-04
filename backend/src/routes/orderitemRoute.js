/* eslint-disable no-undef */
const express = require("express");

const { getOrderItems, getOrderItemById, createOrderItem, deleteOrderItem} = require("../controllers/orderitemController");
const authenticateUser = require("../middlewares/authMiddleware")


const router = express.Router();

router.get("/", authenticateUser, getOrderItems);
router.get("/:id", authenticateUser, getOrderItemById);
router.post("/", authenticateUser,createOrderItem);
router.delete("/:id", authenticateUser, deleteOrderItem);

module.exports = router;