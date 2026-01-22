import { useState } from "react";
import axiosClient from "../api/axiosClient";

export default function Login({ onAuth }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegister) {
        const res = await axiosClient.post("/auth/register", {
          name,
          email,
          password,
          confirmPassword,
        });
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        onAuth({ token, user });
      } else {
        const res = await axiosClient.post("/auth/login", { email, password });
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        onAuth({ token, user });
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Auth failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        {isRegister ? "Sign Up" : "Log In"}
      </h2>
      {error && <div className="bg-red-100 text-red-800 p-2 mb-3">{error}</div>}
      <form onSubmit={submit} className="space-y-3">
        {isRegister && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full border px-3 py-2"
            required
          />
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          className="w-full border px-3 py-2"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="w-full border px-3 py-2"
          required
        />
        {isRegister && (
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            type="password"
            className="w-full border px-3 py-2"
            required
          />
        )}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            {isRegister ? "Sign Up" : "Log In"}
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm text-indigo-600"
          >
            {isRegister ? "Already have an account? Log In" : "Create account"}
          </button>
        </div>
      </form>
    </div>
  );
}
