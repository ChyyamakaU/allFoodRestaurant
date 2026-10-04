/* eslint-disable no-undef */
const express = require("express");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

app.use(express.json());

app.use("/api/categories", categoryRoutes);

module.exports = app;