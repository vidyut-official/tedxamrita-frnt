"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { CheckCircle2, School, Globe2, Loader2, ArrowRight, User, Mail, Lock, Phone, AlertCircle } from "lucide-react";
import { registerUser } from "@/lib/users";

export default function RegisterCard() {
  const [selected, setSelected] = useState<"college" | "external">("college");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim() || (selected === "external" && !phone.trim())) {
      setMessage("Please fill in all required fields.");
      setIsSuccess(false);
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      await registerUser({
        full_name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        // phone: phone.trim(),
        user_type: selected === "college" ? "amrita" : "others",
        user_role: "participant",
      });
      setIsSuccess(true);
      setMessage("Welcome to TEDxAmritapuri community!");
    } catch (err: any) {
      setIsSuccess(false);
      setMessage(err?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-500/30">
      {/* Mobile Header */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* LEFT COLUMN: Branding */}
        <section className="hidden lg:flex relative flex-col justify-center p-16 overflow-hidden min-h-screen">
          <div className="absolute top-1/4 -left-12 w-72 h-72 bg-red-600/20 blur-[100px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 -right-12 w-64 h-64 bg-orange-600/10 blur-[80px] rounded-full" />

          <div className="relative z-10 space-y-8 max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:flex items-center gap-4"
            >            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-6xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-6">
                BEYOND <br />
                THE VISIBLE
              </h1>
              <p className="text-neutral-400 text-lg lg:text-xl max-w-md font-light leading-relaxed">
                Join a global community of thinkers and doers at Amrita Vishwa Vidyapeetham.
              </p>
            </motion.div>
          </div>
        </section>

        {/* RIGHT COLUMN: Form */}
        <section className="relative flex flex-col justify-center items-center p-6 lg:p-16 order-2 bg-neutral-900/30 border-l border-white/5">
          <div className="w-full max-w-md space-y-8">
            <header className="text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-black mb-2">Create Account</h2>
              <p className="text-neutral-500">Enter your details to get started</p>
            </header>

            {/* Type Selector */}
            <div className="flex p-1 bg-black/40 border border-white/10 rounded-2xl relative">
              <LayoutGroup>
                {(['college', 'external'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelected(type)}
                    className={`relative flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold z-10 transition-colors duration-300 ${selected === type ? "text-white" : "text-neutral-500"
                      }`}
                  >
                    {type === 'college' ? <School size={16} /> : <Globe2 size={16} />}
                    <span className="capitalize">{type === 'college' ? 'Amritapuri' : 'External'}</span>
                    {selected === type && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-red-600 rounded-xl -z-10 shadow-lg shadow-red-600/20"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                ))}
              </LayoutGroup>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                icon={<User size={20} />}
                placeholder="Full Name"
                value={name}
                onChange={setName}
                disabled={loading}
              />

              <AnimatePresence mode="popLayout">
                {selected === "external" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <InputField
                      icon={<Phone size={20} />}
                      type="tel"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={setPhone}
                      disabled={loading}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

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
              {/* 
              <div className="flex items-center gap-3 py-2 px-1">
                <input 
                  type="checkbox" 
                  id="terms" 
                  required 
                  className="w-5 h-5 rounded border-white/10 bg-white/5 checked:bg-red-600 transition-all cursor-pointer"
                />
                <label htmlFor="terms" className="text-xs text-neutral-400 leading-tight cursor-pointer">
                  I agree to the <span className="text-white underline">Terms</span> and <span className="text-white underline">Privacy Policy</span>.
                </label>
              </div> */}

              <motion.button
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-500 disabled:bg-neutral-800 text-white py-4 rounded-2xl font-bold transition-all shadow-xl shadow-red-600/10 flex items-center justify-center gap-2 group mt-4"
              >
                {loading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <>
                    Sign Up Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-3 p-4 rounded-2xl border ${isSuccess ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                  }`}
              >
                {isSuccess ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <p className="text-sm font-medium">{message}</p>
              </motion.div>
            )}

            <footer className="text-center pt-8 border-t border-white/5">
              <p className="text-sm text-neutral-500">
                Already have an account?{" "}
                <button
                  onClick={() => window.location.href = '/login'}
                  className="text-white font-bold hover:text-red-500 transition-colors"
                >
                  Sign In
                </button>
              </p>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}

function InputField({ icon, type = "text", placeholder, value, onChange, disabled }: any) {
  return (
    <div className="relative group">
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