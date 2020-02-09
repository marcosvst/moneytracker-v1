'use strict'

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const schema = new Schema ({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum: ['Food', 'Health', 'Fun', 'Need', 'Gift', 'Medication', 'Other', 'Education'],
        default: 'Other'
    },
    tags: [{
        type: String,
        required: false
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Expense', schema);