"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import EventCountdown from "./EventCountdown";

export default function Hero({ scrolled }: { scrolled: boolean }) {
  const [showHeroLogo, setShowHeroLogo] = useState(true);

  useEffect(() => {
    if (scrolled) {
      setShowHeroLogo(false);
    } else {
      const id = requestAnimationFrame(() => setShowHeroLogo(true));
      return () => cancelAnimationFrame(id);
    }
  }, [scrolled]);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center">

      <AnimatePresence mode="wait">
        {showHeroLogo && (
          <motion.div
            key="hero-logo"
            layout
            layoutId="tedx-logo"
            className="w-full max-w-[820px] px-4 flex flex-col items-center"
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 22,
              mass: 0.8,
            }}
          >
            <Image
              src="/logo-white.png"
              alt="TEDxAmritapuri Logo"
              width={700}
              height={300}
              priority
              className="w-full max-w-[700px] h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
            />

            <EventCountdown />
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}   