"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-b from-black to-neutral-950 text-gray-400 overflow-hidden border-t border-white/5">

            {/* Background Watermark */}
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
                <h1 className="text-[25vw] md:text-[18vw] font-bold text-white/[0.02] leading-none select-none translate-y-10 mb-10">
                    DevGov
                </h1>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">

                {/* Help / Newsletter Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-20 ">
                    <div>
                        <h3 className="text-white text-2xl font-semibold mb-2">Need a hand?</h3>
                        <p className="text-gray-500 max-w-sm">
                            Have any issues? Please reach out to us at{" "}
                            <a
                                href="mailto:devgov.company@gmail.com"
                                className="text-white hover:text-indigo-400 transition"
                            >
                                devgov.company@gmail.com
                            </a>
                        </p>

                    </div>

                    <div className="relative group max-w-md lg:ml-auto w-full">
                        {/* Input Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const message = e.target.message.value;
                                if (!message.trim()) return;
                                window.location.href = `mailto:devgov.company@gmail.com?subject=Support Request&body=${encodeURIComponent(message)}`;
                            }}
                            className="relative flex items-center"
                        >
                            <input
                                name="message"
                                type="text"
                                placeholder="How can we help?"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/30 transition-all"
                            />

                            <button
                                type="submit"
                                className="absolute right-3 px-4 py-2 bg-white text-black text-xs font-bold rounded-xl hover:bg-neutral-200 transition-colors"
                            >
                                Send
                            </button>
                        </form>

                        <p className="mt-3 text-[10px] text-gray-600 uppercase tracking-[0.2em] ml-2">
                            Typically replies in &lt; 24h
                        </p>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-12 flex flex-col md:flex-row items-center justify-between text-sm text-center md:text-left gap-6">

                    <div className="space-y-1">
                        <p className="text-gray-500">
                            © {new Date().getFullYear()} <span className="text-white/60">DevGov.</span> All rights reserved.
                        </p>
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                            TEDX AMRITAPURI 2026
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="h-px w-8 bg-white/10 hidden md:block" />
                        <p className="text-gray-400">
                            Made with ❤️ by{" "}
                            <span className="text-white font-medium hover:text-indigo-400 transition cursor-pointer">
                                DevGov
                            </span>
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    );
}