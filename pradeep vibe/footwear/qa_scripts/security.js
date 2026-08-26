/* eslint-disable @typescript-eslint/no-require-imports */
const http = require('http');

const runRateLimitTest = async () => {
    console.log('Testing rate limits (expecting HTTP 429 after 10 requests)...');
    let promises = [];
    
    for (let i = 0; i < 15; i++) {
        promises.push(new Promise((resolve) => {
            const req = http.request({
                hostname: 'localhost',
                port: 3000,
                path: '/api/checkout',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            }, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    resolve({ status: res.statusCode, retryAfter: res.headers['retry-after'], data });
                });
            });
            req.on('error', (e) => resolve({ error: e.message }));
            req.write(JSON.stringify({ items: [] }));
            req.end();
        }));
    }

    const results = await Promise.all(promises);
    const successes = results.filter(r => r.status !== 429 && !r.error).length;
    const rateLimited = results.filter(r => r.status === 429).length;
    
    console.log(`Successes (Allowed): ${successes}`);
    console.log(`Rate Limited (HTTP 429): ${rateLimited}`);
    
    if (rateLimited > 0) {
        console.log('✅ Rate limiting is active.');
    } else {
        console.log('❌ Rate limiting appears to be missing or misconfigured.');
    }
};

runRateLimitTest();
