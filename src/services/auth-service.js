'use strict';

var jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateToken = async (data) => {
    return jwt.sign({data}, process.env.SALT_KEY);
}

exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, process.env.SALT_KEY);
    return data;
}

exports.authorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        res.status(401).json({
            message: 'Restricted access'
        });
    } else {
        jwt.verify(token, process.env.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Invalid token'
                });
            } else {
                next();
            }
        });
    }
};

exports.isAdmin = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Invalid token'
        });
    } else {
        jwt.verify(token, process.env.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Invalid token'
                });
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                } else {
                    res.status(403).json({
                        message: 'Admin only'
                    });
                }
            }
        });
    }
};