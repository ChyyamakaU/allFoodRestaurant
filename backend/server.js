/* eslint-disable no-undef */
const express = require("express");
const sequelize = require("./config/database");

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.json({
        message: "AllFood Restaurant API is running"
    });
});

sequelize.authenticate()
    .then(() => {
        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });