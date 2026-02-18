"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface SpeakerProps {
  name: string;
  role: string;
  image: string;
}

export default function SpeakerCard({ name, role, image }: SpeakerProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group cursor-pointer"
    >
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
            View Profile
          </p>
        </div>
      </div>
      
      {/* Details Section */}
      <div className="mt-6 relative">
        {/* Decorative line that grows from left */}
        <div className="absolute -top-3 left-0 w-8 h-[2px] bg-red-600 group-hover:w-full transition-all duration-700 ease-in-out" />
        
        <motion.h4 
          className="text-2xl font-black uppercase tracking-tighter leading-none mb-1 group-hover:text-red-600 transition-colors duration-300"
        >
          {name.split(' ').map((word, i) => (
            <span key={i} className="inline-block mr-2">{word}</span>
          ))}
        </motion.h4>
        
        <div className="flex items-center gap-2">
          <span className="w-0 h-px bg-white/30 group-hover:w-4 transition-all duration-500" />
          <p className="text-white/40 group-hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300">
            {role}
          </p>
        </div>
      </div>

      {/* Subtle Glitch Shadow Effect on the whole card */}
      <div className="absolute -inset-2 bg-red-600/0 group-hover:bg-red-600/5 blur-2xl -z-10 transition-all duration-700" />
    </motion.div>
  );
}