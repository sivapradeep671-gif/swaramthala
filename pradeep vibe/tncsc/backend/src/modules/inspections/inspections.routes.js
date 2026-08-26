const express = require('express');
const router = express.Router();
const controller = require('./inspections.controller');
const { protect } = require('../../middleware/auth.middleware');

router.use(protect);

router.get('/', controller.list);
router.post('/', controller.create);

module.exports = router;
