'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/tournament-controller');

router.post('/', controller.post);
router.put('/admin/:id', controller.put);
router.get('/', controller.get);
router.delete('/', controller.delete);

module.exports = router;