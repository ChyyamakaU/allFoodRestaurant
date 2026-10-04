/* eslint-disable no-undef */
const express = require("express");
const categoryRoutes = require("./routes/categoryRoute");
const menuitems =require("./routes/menuitemsRoute");
const orders = require("./routes/orderRoute")
const orderitem = require("./routes/orderitemRoute")
const users = require("./routes/userRoute");
const cors = require("cors")


const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use("/api/categories", categoryRoutes);
app.use("/api/menuitems", menuitems);
app.use("/api/orders", orders)
app.use("/api/orderitem", orderitem)
app.use("/api/users", users)

module.exports = app;