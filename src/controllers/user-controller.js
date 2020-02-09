'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/user-repository');
const md5 = require('md5');
const authService = require('../services/auth-service');
require('dotenv').config();

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 1, 'Name must have at least 3 caracters');
    contract.isEmail(req.body.email, 'Invalid e-mail');
    contract.hasMinLen(req.body.password, 6, 'Password must have at least 6 caracters');

    if ( !contract.isValid() ) {
        res.status(400).send( contract.errors() ).end();
        return;
    }

    var user = new User(req.body);
    user.password = md5(user.password + process.env.SALT_KEY);

    try {
        const alreadyRegistered = await repository.getByEmail(user.email);
        
        if (!alreadyRegistered) {
            await repository.post(user);

            res.status(200).send({
                message: 'User successfuly recorded'
            });
        } else {
            res.status(409).send({
                message: 'User already registered'
            });
        }

    } catch (e) {
        res.status(500).send({
            message: 'Request failed'
        });
    }
};

exports.authenticate = async(req, res, next) => {
    try {
        var userData = new User(req.body);
        userData.password = md5(req.body.password + process.env.SALT_KEY);

        const user = await repository.authenticate(userData);

        if ( !user ) {
            res.status(404).send({
                message: 'Invalid e-mail or password'
            });            
            
            return;
        }

        const token = await authService.generateToken({
            id: user.id,
            email: user.email,
            password: user.password
        });

        res.status(201).send({
            token: token,
            data: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
        
    } catch (e) {
        res.status(500).send({
            message: 'Request failed'
        });
    }
};