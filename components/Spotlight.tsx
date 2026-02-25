"use client";

import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import EventCountdown from "./EventCountdown";

export default function SpotlightSection() {
  return (
    <section className="relative py-40 flex items-center justify-center overflow-hidden bg-black">

      {/* Spotlight Beam */}
      <Spotlight
        fill="red"
        className="top-0 left-1/2 -translate-x-1/2"
      />
    
      {/* Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:70px_70px]" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="relative z-10 max-w-5xl text-center px-6"
      >
        <h2 className="text-red-600 uppercase tracking-[0.4em] text-xs mb-8">
          The Stage Is Set
        </h2>

    <EventCountdown/>
      </motion.div>

    </section>
  );
}
