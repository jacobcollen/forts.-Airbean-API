import jwt from 'jsonwebtoken';
import { findUserByEmail } from "../services/user.js";
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET;

if (!secret) {
  console.error("JWT_SECRET is not set");
  process.exit(1);
}

// Middleware to verify JWT-token
export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, secret, async (err, decoded) => {
        if (err) return res.sendStatus(403);

        const user = await findUserByEmail(decoded.email);

        if (!user) return res.sendStatus(403);

        req.user = user;
        next();
    });
}

// Middleware to verify if user is admin
export async function verifyAdmin(req, res, next) {
    try {
        const user = req.user;

        if (user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: "Access forbidden: Admins only" });
        }
    } catch (error) {
        console.error("Error in verifyAdmin middleware:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Middleware to verify if user is customer
export async function verifyCustomer(req, res, next) {
    try {
        const user = req.user;

        if (user.role === 'customer') {
            next();
        } else {
            res.status(403).json({ message: "Access forbidden: Customers only" });
        }
    } catch (error) {
        console.error("Error in verifyCustomer middleware:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}