/* eslint-disable no-undef */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const OrderItem = sequelize.define("OrderItem", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    menuItemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },

    unitPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

module.exports = OrderItem;