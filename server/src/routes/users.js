import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = express.Router();

import { UserModel } from "../models/Users.js"

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (user) {
        return res.json({message: "User already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel ({username, password: hashedPassword})

    await newUser.save();

    res.json({message: "User Registered Successfully"});
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) {
        return res.json({message: "User doesn't exist"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid){
        return res.json({message: "Username or Password is Incorrect"})
    }

    const token = jwt.sign({id: user.id}, "secret")
    console.log("Logging in user:", user.username); // Debugging
    res.json({ token, userID: user._id, username: user.username });
})

export { router as userRouter };