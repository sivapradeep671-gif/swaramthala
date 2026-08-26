const express = require('express');
const router = express.Router();
const db = require('../../database/db');
const { getIO } = require('../../services/socket.service');

// Controller Logic Inline for simplicity in this artifact
// Get Alerts from DB
router.get('/', async (req, res) => {
    try {
        const alerts = await db.find('alerts');
        const tasks = [
            { id: 101, title: "Conduct manual moisture test", assignee: "R. Kumar (QM)", status: "In Progress" },
            { id: 102, title: "Verify aeration fan functionality", assignee: "S. Singh (Tech)", status: "Open" }
        ];
        res.json({ success: true, count: alerts.length, data: { alerts, tasks } });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

router.post('/', async (req, res) => {
    const newAlert = await db.create('alerts', {
        ...req.body,
        status: 'Open',
        date: new Date().toISOString()
    });
    res.json({ success: true, message: 'Alert Created', data: newAlert });

    // Broadcast Alert via Socket
    try {
        const io = getIO();
        io.emit('new_alert', newAlert);
    } catch (e) {
        console.error("Socket emit failed:", e.message);
    }
});

module.exports = router;
