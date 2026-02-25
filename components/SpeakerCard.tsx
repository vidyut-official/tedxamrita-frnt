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
<<<<<<< HEAD
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
=======
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 border border-white/5">
        {/* Background "Ghost" Red Glow on Hover */}
        <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/10 transition-colors duration-700 z-10" />
        
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)]"
        />

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500 z-20" />

        {/* Animated Corner Accents (TEDx Style) */}
        <div className="absolute top-4 right-4 overflow-hidden z-30">
          <motion.div 
            initial={{ x: 50, y: -50 }}
            whileHover={{ x: 0, y: 0 }}
            className="w-8 h-8 border-t-2 border-r-2 border-red-600 opacity-0 group-hover:opacity-100 transition-all duration-500"
          />
        </div>

        {/* Bottom Info Overlay (Reveals on Hover) */}
        <div className="absolute bottom-0 left-0 p-6 z-30 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-white/0 group-hover:text-white/70 text-[10px] uppercase tracking-[0.3em] font-bold mb-2 transition-colors duration-500">
            Revealing Soon
          </p>
        </div>
      </div>
      
      {/* Details Section */}
      <div className="mt-6 relative">
        {/* Decorative line that grows from left */}
        <div className="absolute -top-3 left-0 w-8 h-[2px] bg-red-600 group-hover:w-full transition-all duration-700 ease-in-out" />
        
        <motion.h4 
          className="text-2xl font-black uppercase tracking-tighter leading-none mb-1 group-hover:text-red-600 transition-colors duration-300"
>>>>>>> 7107fa27d80d387855e80f48af29445c22d9ab98
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