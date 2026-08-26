const { io } = require("socket.io-client");

const axios = require('axios');
console.log("--- Testing WebSocket Connection (Fleet + Alerts) ---");

const socket = io("http://localhost:3001");

socket.on("connect", () => {
    console.log("✅ Connected to WebSocket Server! ID:", socket.id);
});

socket.on("fleet_update", (data) => {
    console.log(`✅ Received 'fleet_update' event.`);
    // Don't exit yet, wait for alert
});

socket.on("new_alert", (alert) => {
    console.log(`✅ Received 'new_alert' event: ${alert.title}`);
    console.log("Test Passed. Exiting...");
    socket.disconnect();
    process.exit(0);
});

// Trigger an Alert after connection
socket.on("connect", async () => {
    console.log("✅ Connected to WebSocket Server! ID:", socket.id);
    console.log("⏳ Triggering test alert via API...");
    try {
        await axios.post('http://localhost:3001/api/v1/alerts', {
            priority: 'Test',
            title: 'Socket Test Alert',
            location: 'Test Loc',
            type: 'Test'
        });
    } catch (e) {
        console.error("Failed to trigger alert:", e.message);
    }
});

socket.on("connect_error", (err) => {
    console.error("❌ Connection Error:", err.message);
    process.exit(1);
});

// Timeout if no event received
setTimeout(() => {
    console.error("❌ Timeout: No 'fleet_update' received within 5 seconds.");
    process.exit(1);
}, 5000);
