'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.post = async(user) => {
    return await user.save()
}

exports.getByEmail = async(email) => {
    const alreadyRegistered = await User.findOne({
        email: email
    });

    if (alreadyRegistered) {
        return true;
    } else {
        return false;
    }
}

exports.authenticate = async(data) => {
    const res = await User.findOne({
        email: data.email,
        password: data.password
    });

    return res;
}