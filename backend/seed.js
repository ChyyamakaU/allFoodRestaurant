/* eslint-disable no-undef */
const sequelize = require("./config/database");
const {
    User,
    Category,
    MenuItem
} = require("./model");

const seedDatabase = async () => {
    try {
        await sequelize.authenticate();

        console.log("Database connected.");

        // Create users
        const user = await User.create({
            name: "John Doe",
            email: "john@example.com",
            password: "password123"
        });

        // Create categories
        const mainMeals = await Category.create({
            name: "Main Meals",
            description: "Rice, pasta and other main dishes"
        });

        const drinks = await Category.create({
            name: "Drinks",
            description: "Soft drinks and other beverages"
        });

        const desserts = await Category.create({
            name: "Desserts",
            description: "Cakes, ice cream and other desserts"
        });

        // Create menu items
        await MenuItem.create({
            name: "Jollof Rice",
            description: "Nigerian-style jollof rice",
            price: 3500,
            categoryId: mainMeals.id
        });

        await MenuItem.create({
            name: "Fried Rice",
            description: "Fried rice served with vegetables",
            price: 4000,
            categoryId: mainMeals.id
        });

        await MenuItem.create({
            name: "Coca-Cola",
            description: "Chilled soft drink",
            price: 1000,
            categoryId: drinks.id
        });

        await MenuItem.create({
            name: "Chocolate Cake",
            description: "Slice of chocolate cake",
            price: 2500,
            categoryId: desserts.id
        });

        console.log("Sample data inserted successfully.");

    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await sequelize.close();
    }
};

seedDatabase();