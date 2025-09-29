import React, { useState } from "react";

export default function Login({ goSignup, onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("✅ Login successful!");
        onLogin(data.token);
      } else {
        setMsg(data.error || "❌ Login failed");
      }
    } catch (err) {
      setMsg("❌ Server error");
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-extrabold text-center text-white mb-6 drop-shadow-lg">
        Welcome Back
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          className="w-full p-3 rounded-2xl border-none outline-none focus:ring-2 focus:ring-purple-300 bg-white/30 placeholder-white text-white backdrop-blur-sm"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full p-3 rounded-2xl border-none outline-none focus:ring-2 focus:ring-pink-300 bg-white/30 placeholder-white text-white backdrop-blur-sm"
        />
        <button className="w-full p-3 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:scale-105 transform transition duration-300 shadow-lg">
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-white/80">
        Don’t have an account?{" "}
        <button onClick={goSignup} className="font-bold text-yellow-200 hover:underline">
          Sign up
        </button>
      </p>
      {msg && (
        <p className="mt-3 text-center text-white drop-shadow-md">{msg}</p>
      )}
    </div>
  );
}
