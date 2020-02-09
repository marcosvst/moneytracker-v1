'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const router = express.Router();

try {
    // Database connection
    mongoose.connect(
        process.env.CONNECTION_STRING, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    });
} catch(e) {
    console.log(e);
}

// Models load
const Expense = require('./models/expense-model');
const User = require('./models/user-model');

// Routes load
const indexRoute = require('./routes/index-route');
const expenseRoute = require('./routes/expense-route');
const userRoute = require('./routes/user-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS 
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/expenses', expenseRoute);
app.use('/users', userRoute);


module.exports = app;