import bcrypt from "bcryptjs";
import User from "../models/userSchema.js";

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
