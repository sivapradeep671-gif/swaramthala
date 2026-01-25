const app = require('../src/main');
const http = require('http');
const axios = require('axios');

const PORT = 3009;
const BASE_URL = `http://localhost:${PORT}/api/v1/reports/cag-audit`;

async function runTest() {
    console.log('--- Debugging CAG Audit Report Data ---');

    const server = http.createServer(app);
    await new Promise(resolve => server.listen(PORT, resolve));

    try {
        const res = await axios.get(BASE_URL);
        const data = res.data.data;

        console.log('Response received.');

        // Strict Integrity Check
        const checks = [
            { field: 'date', valid: data.date && !isNaN(new Date(data.date).getTime()) },
            { field: 'stats.totalCapacity', valid: typeof data.stats?.totalCapacity === 'number' },
            { field: 'stats.currentStock', valid: typeof data.stats?.currentStock === 'number' },
            { field: 'stats.utilization', valid: typeof data.stats?.utilization === 'string' }, // toFixed returns string
            { field: 'stats.lossValue', valid: typeof data.stats?.lossValue === 'number' },
            { field: 'anomalies', valid: Array.isArray(data.anomalies) },
            { field: 'criticalIncidents', valid: Array.isArray(data.criticalIncidents) }
        ];

        const failed = checks.filter(c => !c.valid);

        if (failed.length > 0) {
            console.error('❌ Data Validation Failed:', failed);
            console.log('Full Data:', JSON.stringify(data, null, 2));
        } else {
            console.log('✅ Data Structure is Valid.');
            console.log('Sample Anomaly:', data.anomalies[0]);
            console.log('Sample Incident:', data.criticalIncidents[0]);
        }

    } catch (error) {
        console.error('❌ API Request Failed:', error.message);
        if (error.response) console.error('Data:', error.response.data);
    } finally {
        server.close();
    }
}

runTest();
