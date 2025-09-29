import React, { useEffect, useState } from "react";

export default function Dashboard({ token, onLogout }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/users/signup", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => {});
  }, [token]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Dashboard</h2>
      <button onClick={onLogout} className="mb-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600">Logout</button>
      <h3 className="text-lg font-semibold">Registered Users:</h3>
      <ul className="mt-3 space-y-2">
        {users.map((u) => (
          <li key={u._id} className="border p-2 rounded bg-gray-100">
            <strong>{u.username}</strong> ({u.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
