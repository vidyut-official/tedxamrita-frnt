"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, AlertCircle, CheckCircle2, Lock } from "lucide-react";
import { loginUser, registerUser } from "@/lib/users";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  role: string;
  exp: number;
};

export default function SpotRegistration() {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Registration state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // ---------------- LOGIN ----------------
  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      setMessage("Please enter email and password.");
      setIsError(true);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await loginUser(loginEmail, loginPassword);

      localStorage.setItem("access", res.access);
      localStorage.setItem("refresh", res.refresh);

      const decoded = jwtDecode<DecodedToken>(res.access);  
      if (decoded.role !== "registration") {
        setMessage("Access denied. Registration team only.");
        setIsError(true);
        return;
      }

      setIsAuthenticated(true);
      setMessage("Login successful.");
      setIsError(false);
    } catch (err: any) {
      setMessage(err.message || "Login failed");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- CREATE PARTICIPANT ----------------
  const handleCreate = async () => {
    if (!name.trim()) {
      setMessage("Full name is required.");
      setIsError(true);
      return;
    }

    if (!email.trim()) {
      setMessage("Email is required.");
      setIsError(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Enter a valid email address.");
      setIsError(true);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const userRes = await registerUser({
        full_name: name,
        email,
        password: name.split(" ")[0] + "@123",
        user_type: "others",
        user_role: "participant",
      });

      setMessage("Participant registered successfully.");
      setIsError(false);

      // Redirect to events page with participant id
      setTimeout(() => {
        router.push(`/spot_registration/events`);
      }, 1000);
    } catch (err: any) {
      setMessage(err.message || "Registration failed");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- LOGIN UI ----------------
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white p-6">
        <div className="w-full max-w-md bg-zinc-900/60 backdrop-blur-xl p-8 rounded-3xl space-y-6 border border-white/10 shadow-2xl">
          <div className="flex items-center gap-2">
            <Lock size={20} />
            <h1 className="text-2xl font-bold">Registration Team Login</h1>
          </div>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-600"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-600"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-xl font-bold flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Login"}
          </button>

          {message && (
            <div
              className={`flex items-center gap-2 text-sm ${
                isError ? "text-red-400" : "text-green-400"
              }`}
            >
              {isError ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
              {message}
            </div>
          )}
        </div>
      </main>
    );
  }

  // ---------------- REGISTRATION UI ----------------
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-zinc-900/60 backdrop-blur-xl p-10 rounded-3xl space-y-6 border border-white/10 shadow-2xl">
        <h1 className="text-3xl font-bold">Spot Registration</h1>

        <input
          placeholder="Full Name"
          className="w-full p-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-600"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleCreate}
          className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-xl font-bold flex justify-center items-center"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Register Participant"}
        </button>

        {message && (
          <div
            className={`flex items-center gap-2 text-sm ${
              isError ? "text-red-400" : "text-green-400"
            }`}
          >
            {isError ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
            {message}
          </div>
        )}
      </div>
    </main>
  );
}