'use strict'

const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense-controller');
const authService = require('../services/auth-service');

router.get('/', authService.authorize, expenseController.get);
router.get('/tags/:tag', authService.authorize, expenseController.getByTag);
router.get('/categories/:category', authService.authorize, expenseController.getByCategory);
router.get('/:id', authService.authorize, expenseController.getById);
router.post('/', authService.authorize, expenseController.post);
router.put('/:id', authService.authorize, expenseController.update);
router.delete('/:id', authService.authorize, expenseController.delete);

module.exports = router;
