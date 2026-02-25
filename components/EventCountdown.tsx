"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EVENT_DATE = new Date("2026-03-02T09:00:00").getTime();

function calculateTimeLeft() {
  const now = Date.now();
  const difference = EVENT_DATE - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function EventCountdown() {
  // Prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  // Initialize with static values (safe for SSR)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Do not render until mounted (prevents hydration error)
  if (!isMounted) return null;

  const renderBox = (value: number, label: string) => (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="text-4xl md:text-6xl font-black tabular-nums"
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
      <span className="text-xs uppercase tracking-[0.3em] text-white/40 mt-2">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex gap-5 md:gap-20 justify-center">
      {renderBox(timeLeft.days, "Days")}
      {renderBox(timeLeft.hours, "Hours")}
      {renderBox(timeLeft.minutes, "Minutes")}
      {renderBox(timeLeft.seconds, "Seconds")}
    </div>
  );
}