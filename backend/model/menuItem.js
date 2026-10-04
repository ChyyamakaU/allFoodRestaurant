/* eslint-disable no-undef */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const MenuItem = sequelize.define("MenuItem", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = MenuItem;