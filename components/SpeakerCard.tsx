"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface SpeakerProps {
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export default function SpeakerCard({
  name,
  role,
  image,
  bio = "Speaker bio goes here. Visionary. Innovator. Changemaker.",
}: SpeakerProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="group relative cursor-pointer"
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped(!flipped)} // mobile tap support
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT SIDE */}
        <div
          className="relative aspect-[4/5] overflow-hidden bg-neutral-900 border border-white/5"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

          <div className="absolute bottom-0 left-0 p-6">
            <h4 className="text-2xl font-black uppercase tracking-tight">
              {name}
            </h4>
            <p className="text-white/50 text-xs uppercase tracking-[0.2em]">
              {role}
            </p>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 bg-neutral-950 border border-red-600/20 p-8 flex flex-col justify-center"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <h4 className="text-2xl font-black uppercase tracking-tight text-red-600 mb-4">
            {name}
          </h4>

          <p className="text-white/60 text-sm leading-relaxed mb-6">
            {bio}
          </p>

          <div className="w-12 h-[2px] bg-red-600 mb-4" />

          <p className="text-white/40 text-xs uppercase tracking-[0.2em]">
            Click to flip back
          </p>
        </div>
      </motion.div>

      {/* Glow */}
      <div className="absolute -inset-3 bg-red-600/0 group-hover:bg-red-600/10 blur-2xl -z-10 transition-all duration-700" />
    </div>
  );
}