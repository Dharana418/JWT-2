import React, { useState } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    setPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setPage("login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-400 via-pink-500 to-yellow-400 animate-gradient-x">
      <div className="bg-white/30 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-full max-w-md animate-fadeInUp">
        {page === "signup" && <Signup goLogin={() => setPage("login")} />}
        {page === "login" && <Login goSignup={() => setPage("signup")} onLogin={handleLogin} />}
        {page === "dashboard" && <Dashboard token={token} onLogout={handleLogout} />}
      </div>
    </div>
  );
}

export default App;
