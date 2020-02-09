'use strict'

const mongoose = require('mongoose');
const Expense = mongoose.model('Expense');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/expense-repository');
const authService = require('../services/auth-service');

exports.getByCategory = async(req, res, next) => {
    try {
        // Get and decode token
        const user = await authService.decodeToken( req.header('x-access-token') );

        var expenses = await repository.getByCategory(req.params.category, user);

        res.status(200).send(expenses);
    } catch (e) {
        res.status(500).send({
            message: 'Request failed'
        });
    }
};

exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Request failed'
        });
    }
};

exports.getByTag = async(req, res, next) => {
    try {
        // Get and decode token
        const user = await authService.decodeToken( req.header('x-access-token') );

        var expenses = await repository.getByTag(req.params.tag, user);

        res.status(200).send(expenses);
    } catch (e) {
        res.status(500).send({
            message: 'Request failed'
        });
    }
};

exports.get = async(req, res, next) => {
    try {
        // Get and decode token
        const user = await authService.decodeToken( req.header('x-access-token') );
        
        const expenses = await repository.get(user);

        res.status(200).send(expenses);

    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Request failed',
            e
        });

        console.log("ERRO: " + e);
    }
}

exports.post = async(req, res, next) => {
    try {
        // Get and decode token
        const user = await authService.decodeToken( req.header('x-access-token') );

        var expense = new Expense(req.body);
        expense.user = user.data.id;

        await repository.post(expense);

        res.status(200).send({
            message: 'Expense successfuly recorded'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Request failed',
            e
        });
    }
} 

exports.update = async(req, res, next) => {
    try {
        var data = await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: "Expense successfuly updated"
        });
    } catch (e) {
        res.status(500).send({
            message: 'Request failed'
        });
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.params.id);
        res.status(200).send({
            message: "Exepense successfuly deleted"
        });
    } catch (e) {
        res.status(500).send({
            message: 'Request failed'
        });
    }
};