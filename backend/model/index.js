const User = require("./User");
const Category = require("./Category");
const MenuItem = require("./MenuItem");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

// User → Orders
User.hasMany(Order, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});

Order.belongsTo(User, {
    foreignKey: "userId"
});

// Category → Menu Items
Category.hasMany(MenuItem, {
    foreignKey: "categoryId",
    onDelete: "CASCADE"
});

MenuItem.belongsTo(Category, {
    foreignKey: "categoryId"
});

// Order → Order Items
Order.hasMany(OrderItem, {
    foreignKey: "orderId",
    onDelete: "CASCADE"
});

OrderItem.belongsTo(Order, {
    foreignKey: "orderId"
});

// Menu Item → Order Items
MenuItem.hasMany(OrderItem, {
    foreignKey: "menuItemId",
    onDelete: "CASCADE"
});

OrderItem.belongsTo(MenuItem, {
    foreignKey: "menuItemId"
});

module.exports = {
    User,
    Category,
    MenuItem,
    Order,
    OrderItem
};