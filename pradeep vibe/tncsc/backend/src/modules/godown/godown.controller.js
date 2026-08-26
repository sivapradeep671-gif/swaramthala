const godownService = require('./godown.service');
const riskService = require('../risk-engine/risk.service');

class GodownController {
    async list(req, res, next) {
        try {
            const godowns = await godownService.getAll();
            // Enrich with Risk Scores for Dashboard
            const enriched = await Promise.all(godowns.map(async (g) => {
                const riskScore = await riskService.calculateRisk(g.id);
                return { ...g, riskScore };
            }));
            res.json({ success: true, data: enriched });
        } catch (e) { next(e); }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const godown = await godownService.getById(id);
            if (!godown) return res.status(404).json({ success: false, message: 'Godown not found' });

            // Enrich with Real-time Risk Score
            const riskScore = await riskService.calculateRisk(id);

            res.json({ success: true, data: { ...godown, riskScore } });
        } catch (e) { next(e); }
    }

    async create(req, res, next) {
        try {
            const { id, name, district, capacity, manager } = req.body;
            if (!id || !name || !district) {
                return res.status(400).json({ success: false, message: 'Missing required fields' });
            }

            const existing = await godownService.getById(id);
            if (existing) {
                return res.status(400).json({ success: false, message: 'Godown ID already exists' });
            }

            const newGodown = await godownService.create(req.body);
            res.json({ success: true, message: 'Godown Created Successfully', data: newGodown });
        } catch (e) { next(e); }
    }
}

module.exports = new GodownController();
