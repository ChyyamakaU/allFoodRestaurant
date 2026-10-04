/* eslint-disable no-undef */
const express = require("express");
const categoryRoutes = require("./routes/categoryRoute");
const menuitems =require("./routes/menuitemsRoute");
const orders = require("./routes/orderRoute")

const app = express();

app.use(express.json());

app.use("/api/categories", categoryRoutes);
app.use("/api/menuitems", menuitems);
app.use("/api/orders", orders)

module.exports = app;