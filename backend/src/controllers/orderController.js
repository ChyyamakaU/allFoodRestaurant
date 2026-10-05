/* eslint-disable no-undef */

const { Order, User, OrderItem, MenuItem } = require("../../model");

const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: User,
                    attributes: ["id", "name", "email"]
                },
                {
                    model: OrderItem,
                    include: {
                        model: MenuItem,
                        attributes: ["id", "name", "price"]
                    }
                }
            ]
        });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["id", "name", "email"]
                },
                {
                    model: OrderItem,
                    include: {
                        model: MenuItem,
                        attributes: ["id", "name", "price"]
                    }
                }
            ]
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const createOrder = async (req, res) => {
    try {
        const { userId, items } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: "userId is required"
            });
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                message: "Order must contain at least one item"
            });
        }

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        let totalAmount = 0;

        const orderItemsData = [];

        for (const item of items) {
            const menuItem = await MenuItem.findByPk(item.menuItemId);

            if (!menuItem) {
                return res.status(404).json({
                    message: `Menu item with id ${item.menuItemId} not found`
                });
            }

            if (!item.quantity || item.quantity < 1) {
                return res.status(400).json({
                    message: "Quantity must be at least 1"
                });
            }

            const itemTotal =
                Number(menuItem.price) * item.quantity;

            totalAmount += itemTotal;

            orderItemsData.push({
                menuItemId: menuItem.id,
                quantity: item.quantity,
                unitPrice: menuItem.price
            });
        }

        const order = await Order.create({
            userId,
            totalAmount
        });

        for (const item of orderItemsData) {
            await OrderItem.create({
                orderId: order.id,
                menuItemId: item.menuItemId,
                quantity: item.quantity,
                unitPrice: item.unitPrice
            });
        }

        const createdOrder = await Order.findByPk(order.id, {
            include: [
                {
                    model: User,
                    attributes: ["id", "name", "email"]
                },
                {
                    model: OrderItem,
                    include: {
                        model: MenuItem,
                        attributes: ["id", "name", "price"]
                    }
                }
            ]
        });

        res.status(201).json(createdOrder);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        const { status } = req.body;

        await order.update({
            status
        });

        res.status(200).json(order);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        await order.destroy();

        res.status(200).json({
            message: "Order deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};