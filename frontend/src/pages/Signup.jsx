import React, { useState } from "react";
import { Mail, User, Lock } from "lucide-react";

export default function Signup({ goLogin }) {
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("✅ Signup successful! Please login.");
      } else {
        setMsg(data.error || "❌ Signup failed");
      }
    } catch (err) {
      setMsg("❌ Server error");
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-extrabold text-center text-white mb-6 drop-shadow-lg">
        Create Account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-white/70" size={20} />
          <input
            name="email"
            placeholder="Email"
            className="w-full pl-10 p-3 rounded-2xl border-none outline-none focus:ring-2 focus:ring-pink-300 bg-white/30 placeholder-white text-white backdrop-blur-sm"
            onChange={handleChange}
            required
          />
        </div>
        <div className="relative">
          <User className="absolute left-3 top-3 text-white/70" size={20} />
          <input
            name="username"
            placeholder="Username"
            className="w-full pl-10 p-3 rounded-2xl border-none outline-none focus:ring-2 focus:ring-purple-300 bg-white/30 placeholder-white text-white backdrop-blur-sm"
            onChange={handleChange}
            required
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-white/70" size={20} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full pl-10 p-3 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-300 bg-white/30 placeholder-white text-white backdrop-blur-sm"
            onChange={handleChange}
            required
          />
        </div>
        <button className="w-full p-3 rounded-2xl font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:scale-105 transform transition duration-300 shadow-lg">
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center text-white/80">
        Already have an account?{" "}
        <button
          onClick={goLogin}
          className="font-bold text-yellow-200 hover:underline"
        >
          Login
        </button>
      </p>
      {msg && (
        <p className="mt-4 text-center font-medium text-white drop-shadow-md">
          {msg}
        </p>
      )}
    </div>
  );
}
