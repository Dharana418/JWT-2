import bcrypt from "bcryptjs";
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";

const secret_key = "your_jwt_secret";

export const createUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "✅ User created successfully" });
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).json({ error: "❌ Error signing up" });
  }
};

export const getRegisteredUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
        console.error("Error fetching users:", err.message);
        res.status(500).json({ error: "❌ Error fetching users" });
    }
};

export const getUserByUsername = async (req, res) => {
    try{
        const {username,password}=req.body;
        const user=await User.findOne({username});
        if(!user){
            return res.status(404).json({error:"❌ User not found"});
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({error:"❌ Invalid password"});
        }
        const token = jwt.sign({ id: user._id }, secret_key, { expiresIn: "1h" });
        res.status(200).json({ message: "✅ Login successful", token });
    } catch (err) {
        console.error("Error logging in:", err.message);
        res.status(500).json({ error: "❌ Error logging in" });
    }
};
