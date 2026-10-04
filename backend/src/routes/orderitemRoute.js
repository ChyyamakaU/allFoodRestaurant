/* eslint-disable no-undef */
const express = require("express");

const {
    getOrderItems,
    getOrderItemById,
    createOrderItem,
    deleteOrderItem
} = require("../controllers/orderitemController");

const router = express.Router();

router.get("/", getOrderItems);
router.get("/:id", getOrderItemById);
router.post("/", createOrderItem);
router.delete("/:id", deleteOrderItem);

module.exports = router;