"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Countdown from "./ui/Countdown";

export default function Hero({ scrolled }: { scrolled: boolean }) {
  const [showHeroLogo, setShowHeroLogo] = useState(!scrolled);

  useEffect(() => {
    if (!scrolled) {
      const id = requestAnimationFrame(() => setShowHeroLogo(true));
      return () => cancelAnimationFrame(id);
    } else {
      setShowHeroLogo(false);
    }
  }, [scrolled]);

  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <AnimatePresence mode="wait">
        {showHeroLogo && (
          <motion.div
            key="hero-logo"
            layout
            layoutId="tedx-logo"
            className="w-full max-w-[820px] px-4 flex flex-col items-center -translate-y-12 md:-translate-y-16"
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 20,
              mass: 1,
            }}
          >
            {/* Logo */}
            <motion.div layout>
              <Image
                src="/logo-white.png"
                alt="TEDxAmritapuri Logo"
                width={1000}
                height={300}
                priority
                className="w-full h-auto object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.75)]"
              />
            </motion.div>

            {/* Countdown with suspense reveal */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="mt-12 text-white"
            >
              <Countdown />
            </motion.div>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
              className="mt-14 px-14 py-4 bg-red-600 hover:bg-white hover:text-black text-sm font-semibold uppercase tracking-[0.35em] transition-all duration-300 shadow-[0_0_40px_rgba(255,0,0,0.4)]"
            >
              coming soon
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}