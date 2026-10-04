/* eslint-disable no-undef */

const express = require("express");
const sequelize = require("./config/database");
require("./model");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "AllFood Restaurant API is running"
    });
});

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