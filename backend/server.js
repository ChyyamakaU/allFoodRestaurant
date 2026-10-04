/* eslint-disable no-undef */
require("dotenv").config();

const app = require("./src/app");
const sequelize = require("./config/database");
require("./model");

const PORT = process.env.PORT || 5000;

sequelize.sync()
    .then(() => {
        console.log("Database tables created successfully");

        return sequelize.authenticate();
    })
    .then(() => {
        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });