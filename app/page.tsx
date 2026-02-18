"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ParticlesBackground from "@/components/ParticlesBackground";
import SpeakerCard from "@/components/SpeakerCard";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const speakers = useMemo(() => [
    { id: 1, image: "/TED_01.jpg.jpeg" },
    { id: 2, image: "/TED_02.jpg.jpeg" },
    { id: 3, image: "/TED_03.jpg.jpeg" },
    { id: 4, image: "/TED_04.jpg.jpeg" },
  ], []);


  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  return (
    <main className="relative bg-black text-white selection:bg-red-600 selection:text-white antialiased overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-red-600 origin-left z-[110]" style={{ scaleX }} />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticlesBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black" />
      </div>

      <Navbar scrolled={scrolled} />

      <div className="relative z-10 w-full">
        <Hero scrolled={scrolled} />

        {/* Section 1: Historic Debut - Fixed height for mobile */}
        <section className="py-24 md:py-40
">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto text-center"
          >
            <h2 className="text-red-600 font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs mb-6 md:mb-8">
              A Historic Debut
            </h2>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase leading-[0.95] mb-8 md:mb-12 tracking-tighter">
              Amrita <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Vishwa Vidyapeetham</span>
            </h1>
            <p className="text-white/60 text-lg md:text-2xl max-w-2xl mx-auto font-light leading-relaxed px-4 md:px-0">
              Hosting <span className="text-white font-medium underline underline-offset-8 decoration-red-600/50">TEDx</span> for the very first time.
              Ideas worth spreading, arriving at the heart of Amritapuri.
            </p>
          </motion.div>
        </section>

        {/* Section 2: Speakers Grid - Responsive padding and grid columns */}
        <section className="py-20 md:py-32 px-6 bg-white/[0.02] backdrop-blur-md border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-12 md:mb-20 text-center md:text-left"
            >
              <h2 className="text-red-600 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4">The Lineup</h2>
              <h3 className="text-3xl md:text-6xl font-black uppercase italic">The Voice of Change</h3>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            >
              {speakers.map((speaker, index) => (
                <SpeakerCard name={""} role={""} key={index} {...speaker} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Section 3: CTA - Changed padding and flex layout for mobile */}
        <section className="py-20 md:py-40 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center bg-neutral-900/40 p-8 md:p-24 border border-white/10 relative overflow-hidden rounded-xl md:rounded-sm">
              <div className="absolute -top-24 -right-24 w-64 md:w-96 h-64 md:h-96 bg-red-600/10 blur-[80px] md:blur-[120px] rounded-full" />

              <div className="relative z-10 text-center md:text-left">
                <h3 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase mb-6 leading-tight tracking-tighter">
                  Be part of <br className="hidden md:block" />the movement.
                </h3>
                <p className="text-white/50 text-base md:text-lg mb-8 max-w-sm mx-auto md:mx-0">
                  Limited seats available for the most anticipated event of the year.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-auto bg-red-600 text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-2xl shadow-red-600/20"
                >
                  Reserve Spot
                </motion.button>
              </div>

              <div className="relative z-10 text-center md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12">
                <h4 className="text-red-600 font-bold uppercase tracking-widest text-xs md:text-sm mb-2">Save the Date</h4>
                <p className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter tabular-nums">2026</p>
                <p className="text-white/30 uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] mt-4 font-bold underline decoration-red-600 underline-offset-4">Amritapuri Campus</p>
              </div>
            </div>
          </motion.div>
        </section>

        <footer className="py-12 md:py-20 text-center border-t border-white/5 opacity-50">
          <p className="text-white/20 text-[8px] md:text-[10px] uppercase tracking-[0.5em] md:tracking-[1em] px-4">
            TEDxAmritapuri 2026 • Independently Organized
          </p>
        </footer>
      </div>
    </main>
  );
}