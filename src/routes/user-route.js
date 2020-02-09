'use strict'

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

router.post('/', userController.post);
router.post('/authenticate', userController.authenticate);

module.exports = router;