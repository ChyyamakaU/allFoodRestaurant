const bcrypt = require("bcrypt");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "allfood_restaurant",
    "postgres",
    "allFood12345",
    {
        host: "localhost",
        port: 5432,
        dialect: "postgres",
        logging: false
    }
);

const User = require("./model/user");

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
            const hashedPassword = await bcrypt.hash(password, 10);

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
    }
};

createAdmin();
