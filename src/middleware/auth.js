import jwt from 'jsonwebtoken';
import { findUserByEmail } from "../services/user.js";

const secret = process.env.JWT_SECRET;

// Middleware to verify JWT-token
export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
// Middleware to verify if user is admin
export async function verifyAdmin(req, res, next) {
    try {
        const { email } = req.user;
        const user = await findUserByEmail(email);

        if (user && user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: "Access forbidden: Admins only" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// Middleware to verify if user is customer
export async function verifyCustomer(req, res, next) {
    try {
        const { email } = req.user;
        const user = await findUserByEmail(email);

        if (user && user.role === 'customer') {
            next();
        } else {
            res.status(403).json({ message: "Access forbidden: Customers only" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
