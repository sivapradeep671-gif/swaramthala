const db = require('../../database/db');

class GodownService {
    async getAll() {
        return db.find('godowns');
    }

    async getById(id) {
        return db.findOne('godowns', g => g.id === id);
    }

    async create(data) {
        const enrichedData = {
            ...data,
            status: 'Active',
            lastInspection: 'Pending',
            stock: 0,
            humidity: 0,
            riskScore: 0
        };
        return db.create('godowns', enrichedData);
    }
}

module.exports = new GodownService();
