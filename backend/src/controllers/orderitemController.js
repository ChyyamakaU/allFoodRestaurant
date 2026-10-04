/* eslint-disable no-undef */
const { OrderItem, Order, MenuItem } = require("../../model");

const getOrderItems = async (req, res) => {
    try {
        const orderItems = await OrderItem.findAll({
            include: [
                {
                    model: MenuItem,
                    attributes: ["id", "name", "price"]
                },
                {
                    model: Order,
                    attributes: ["id", "status", "totalAmount"]
                }
            ]
        });

        res.status(200).json(orderItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrderItemById = async (req, res) => {
    try {
        const orderItem = await OrderItem.findByPk(req.params.id, {
            include: [
                {
                    model: MenuItem,
                    attributes: ["id", "name", "price"]
                },
                {
                    model: Order,
                    attributes: ["id", "status", "totalAmount"]
                }
            ]
        });

        if (!orderItem) {
            return res.status(404).json({
                message: "Order item not found"
            });
        }

        res.status(200).json(orderItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createOrderItem = async (req, res) => {
    try {
        const { orderId, menuItemId, quantity } = req.body;

        if (!orderId || !menuItemId || !quantity) {
            return res.status(400).json({
                message: "orderId, menuItemId and quantity are required"
            });
        }

        const order = await Order.findByPk(orderId);
        const menuItem = await MenuItem.findByPk(menuItemId);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        if (!menuItem) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        const orderItem = await OrderItem.create({
            orderId,
            menuItemId,
            quantity,
            unitPrice: menuItem.price
        });

        const itemTotal = Number(menuItem.price) * quantity;

        await order.update({
            totalAmount: Number(order.totalAmount) + itemTotal
        });

        res.status(201).json(orderItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteOrderItem = async (req, res) => {
    try {
        const orderItem = await OrderItem.findByPk(req.params.id);

        if (!orderItem) {
            return res.status(404).json({
                message: "Order item not found"
            });
        }

        const order = await Order.findByPk(orderItem.orderId);

        const itemTotal = Number(orderItem.unitPrice) * orderItem.quantity;

        if (order) {
            await order.update({
                totalAmount: Number(order.totalAmount) - itemTotal
            });
        }

        await orderItem.destroy();

        res.status(200).json({
            message: "Order item deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getOrderItems,
    getOrderItemById,
    createOrderItem,
    deleteOrderItem
};