import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.JWT_SECRET;

if (!secret) {
    console.error("JWT_SECRET is not set in the environment variables");
    process.exit(1);
}

// Your loginController.js code...

export async function loginController(req, res) {
    try {
        // Validate the request body
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { email, password } = value;

        let user = null;
        if (email === 'customer@example.com' && password === 'customerpassword') {
            user = { email: email, role: "customer" };
        } else if (email === 'admin@example.com' && password === 'adminpassword') {
            user = { email: email, role: "admin" };
        }

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(user, secret, { expiresIn: '1h' });
        return res.status(200).json({ message: `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} logged in successfully`, token });

    } catch (error) {
        const statusCode = error.message === "Invalid email" || error.message === "Invalid password" ? 400 : 500;
        return res.status(statusCode).json({ message: error.message });
    }
}

export default loginController;
