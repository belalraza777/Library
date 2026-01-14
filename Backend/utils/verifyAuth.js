const jwt = require("jsonwebtoken");

module.exports = function verifyAuth(req, res, next) {
    // Get token from cookie or header
    let token = req.cookies?.token;

    // If no token in cookie, check Authorization header
    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7); // Remove 'Bearer ' prefix
        }
    }

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Invalid or expired token",
                error: "Forbidden"
            });
        }
        req.user = user;
        next();
    });
};
