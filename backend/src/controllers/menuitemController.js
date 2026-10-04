/* eslint-disable no-undef */
const { MenuItem, Category } = require("../../model");

const getMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.findAll({
            include: {
                model: Category,
                attributes: ["id", "name"]
            }
        });

        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMenuItemById = async (req, res) => {
    try {
        const menuItem = await MenuItem.findByPk(req.params.id, {
            include: {
                model: Category,
                attributes: ["id", "name"]
            }
        });

        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createMenuItem = async (req, res) => {
    try {
        const { name, description, price, categoryId } = req.body;

        if (!name || !price || !categoryId) {
            return res.status(400).json({
                message: "Name, price and categoryId are required"
            });
        }

        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        const menuItem = await MenuItem.create({
            name,
            description,
            price,
            categoryId
        });

        res.status(201).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.findByPk(req.params.id);

        if (!menuItem) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        const { name, description, price, categoryId } = req.body;

        if (categoryId) {
            const category = await Category.findByPk(categoryId);

            if (!category) {
                return res.status(404).json({
                    message: "Category not found"
                });
            }
        }

        await menuItem.update({
            name,
            description,
            price,
            categoryId
        });

        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.findByPk(req.params.id);

        if (!menuItem) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        await menuItem.destroy();

        res.status(200).json({
            message: "Menu item deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
};