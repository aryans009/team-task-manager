"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "Member" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid credentials");
      } else {
        router.push("/dashboard");
      }
    } else {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsLogin(true); 
        alert("Account created! Please log in.");
      } else {
        const data = await res.json();
        setError(data.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">{isLogin ? "Login" : "Sign Up"}</h2>
        
        {error && <p className="bg-red-100 text-red-600 p-2 mb-4 rounded">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="border p-2 rounded text-black"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded text-black"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded text-black"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          
          {!isLogin && (
            <select 
              className="border p-2 rounded text-black"
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
            </select>
          )}

          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            {isLogin ? "Log In" : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
        </p>
      </div>
    </div>
  );
}