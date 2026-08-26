const db = require('../../database/db');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

class AuthService {
    async login(email, password) {
        // In real app: verify password hash
        const user = await db.findOne('users', u => u.email === email && u.password === password);

        if (!user) return null;

        // Generate Real JWT
        const token = jwt.sign(
            { id: user.id, role: user.role, district: user.district },
            config.jwtSecret,
            { expiresIn: '1h' }
        );

        // Return safe user object + token
        const { password: _, ...userWithoutPass } = user;
        return {
            user: userWithoutPass,
            token,
            expiresIn: 3600
        };
    }
}

module.exports = new AuthService();
