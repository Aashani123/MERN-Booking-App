import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../modals/user";

const router = express.Router();

// Create login API and add validation middleware
router.post("/login", [
    check("email", "Email is required").isEmail(),
    check("password", "Password should be more than 6 characters").isLength({ min: 6 }),
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Compare the entered password with the stored one
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Create access token and return it as a cookie
        const token = jwt.sign({ userId: user.id },
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: "1d",
            }
        );

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });
        res.status(200).json({ userId: user._id });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

export default router;
