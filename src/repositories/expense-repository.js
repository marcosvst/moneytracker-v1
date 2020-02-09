'use strict'

const mongoose = require('mongoose');
const Expense = mongoose.model('Expense');

exports.getByCategory = async(category, user) => {
    const res = await Expense.find({ 
        category: category,
        user: user.data.id
    });

    return res;
}

exports.getById = async(id) => {
    const res = await Expense.findById(id);

    return res;
}

exports.getByTag = async(tag, user) => {
    const res = await Expense.find({ 
        tags: tag,
        user: user.data.id
    });

    return res;
}

exports.get = async(user) => {
    const res = await Expense.find({
        user: user.data.id
    });

    return res;
}

exports.post = async(data) => {
    var data = new Expense(data);

    await data.save();
}

exports.update = async(id, data) => {
    return await Expense.findByIdAndUpdate(id, { $set: data })
}

exports.delete = async(id) => {
    return await Expense.findOneAndRemove(id);
}
