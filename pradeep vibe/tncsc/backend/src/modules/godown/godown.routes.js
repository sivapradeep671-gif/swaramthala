const express = require('express');
const router = express.Router();
const controller = require('./godown.controller');
const { protect, authorize } = require('../../middleware/auth.middleware');

router.get('/', controller.list);
router.get('/:id', controller.getOne);

// Create Godown - Admin/RM only
router.post('/', protect, authorize('Admin', 'RegionalManager', 'HQ'), controller.create);

module.exports = router;
