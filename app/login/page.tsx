"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, ArrowRight, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
// import { loginUser } from "@/lib/users"; // connect later
import Image from "next/image";
export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      return "Email and password are required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Enter a valid email address.";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setIsError(true);
      setMessage(error);
      return;
    }

    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      // await loginUser({ email, password });

      // Temporary fake success
      await new Promise((res) => setTimeout(res, 1200));

      setMessage("Login successful! Redirecting...");
      setIsError(false);

      // TODO: router.push("/dashboard");

    } catch (err: any) {
      setIsError(true);
      setMessage("Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-500/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* LEFT SIDE (DESKTOP ONLY) */}
        <section className="hidden lg:flex relative flex-col justify-center p-16 overflow-hidden min-h-screen">
          <div className="absolute top-1/4 -left-12 w-72 h-72 bg-red-600/20 blur-[100px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 -right-12 w-64 h-64 bg-orange-600/10 blur-[80px] rounded-full" />

          <div className="relative z-10 space-y-8 max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter"
            >
              WELCOME <br />
              BACK
            </motion.h1>

            <p className="text-neutral-400 text-lg max-w-md font-light leading-relaxed">
              Continue your journey with TEDxAmritapuri.
              <br />
              Ideas worth spreading.
            </p>
          </div>
        </section>

        {/* RIGHT SIDE FORM */}
        <section className="flex flex-col justify-center items-center p-6 lg:p-16 bg-neutral-900/30 border-l border-white/5">
          <div className="w-full max-w-md space-y-8">
            <Image src="/logo-white.png" alt="TEDxAmritapuri" width={160} height={40} className="hidden md:block w-32 md:w-40 h-auto object-contain mx-auto lg:mx-0" priority />
            <header className="text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-black mb-2">
                Sign In
              </h2>
              <p className="text-neutral-500">
                Access your TEDxAmritapuri account
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">

              <InputField
                icon={<Mail size={20} />}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={setEmail}
                disabled={loading}
              />

              <InputField
                icon={<Lock size={20} />}
                type="password"
                placeholder="Password"
                value={password}
                onChange={setPassword}
                disabled={loading}
              />

              <motion.button
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-500 disabled:bg-neutral-800 text-white py-4 rounded-2xl font-bold transition-all shadow-xl shadow-red-600/10 flex items-center justify-center gap-2 group mt-4"
              >
                {loading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-3 p-4 rounded-2xl border ${
                  isError
                    ? "bg-red-500/10 border-red-500/20 text-red-400"
                    : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                }`}
              >
                <AlertCircle size={18} />
                <p className="text-sm font-medium">{message}</p>
              </motion.div>
            )}

            <footer className="text-center pt-8 border-t border-white/5">
              <p className="text-sm text-neutral-500">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-white font-bold hover:text-red-500 transition-colors"
                >
                  Create Account
                </a>
              </p>
            </footer>

          </div>
        </section>
      </div>
    </main>
  );
}

function InputField({
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled,
}: any) {
  return (
    
    <div className="relative group">
        <Navbar scrolled={true}  />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-red-500 transition-colors">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-red-500/50 focus:ring-4 focus:ring-red-500/10 transition-all text-sm lg:text-base disabled:opacity-50"
      />
    </div>
  );
}