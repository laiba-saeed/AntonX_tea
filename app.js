const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require("body-parser");

const app = express();

const memberRoutes = require("./api/routes/member");

mongoose.connect('mongodb+srv://book:book123@cluster0.fqutw5t.mongodb.net/?retryWrites=true&w=majority');

app.use(bodyParser.json());
app.use("/members", memberRoutes);

module.exports = app;