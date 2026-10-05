/* eslint-disable no-undef */
require("dotenv").config();

const bcrypt = require("bcrypt");

const sequelize = require("./config/database");
const { User } = require("./model");

const createAdmin = async () => {
    try {
        await sequelize.authenticate();

        const email = "admin@allfood.com";
        const password = "Admin123!";
        const name = "AllFood Admin";

        const existingAdmin = await User.findOne({
            where: { email }
        });

        if (existingAdmin) {
            await existingAdmin.update({
                role: "admin"
            });

            console.log("Existing user has been made admin.");
        } else {
            const hashedPassword = await bcrypt.hash(
                password,
                10
            );

            await User.create({
                name,
                email,
                password: hashedPassword,
                role: "admin"
            });

            console.log("Admin account created.");
        }

        console.log("Email:", email);
        console.log("Password:", password);

        await sequelize.close();

    } catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1);
    }
};

createAdmin();