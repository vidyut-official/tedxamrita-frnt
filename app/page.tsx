"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ParticlesBackground from "@/components/ParticlesBackground";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.01,
  });

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative bg-black text-white overflow-x-hidden selection:bg-red-600 selection:text-white">

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-red-600 origin-left z-[110]"
        style={{ scaleX }}
      />

      {/* Background Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticlesBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60" />
      </div>

      <Navbar scrolled={scrolled} />

      <div className="relative z-10">

        {/* ================= HERO ================= */}
        <Hero />

        {/* ================= HISTORIC DEBUT ================= */}
        <section className="pt-8 pb-12 md:pt-24 md:pb-32 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto text-center"
          >
            <h2 className="text-red-600 font-bold uppercase tracking-[0.4em] text-xs mb-6">
              A Historic Debut
            </h2>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase leading-[0.95] mb-8 tracking-tighter">
              Amrita <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                Vishwa Vidyapeetham Amritapuri
              </span>
            </h1>

            <p className="text-white/60 text-lg md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
              Hosting <span className="text-white font-medium underline underline-offset-8 decoration-red-600/50">TEDx</span> for the very first time.
              Ideas worth spreading, arriving at the heart of Amritapuri.
            </p>
          </motion.div>
        </section>

        {/* ================= SPEAKERS IMAGE SECTION ================= */}
        <section id="speakers" className="py-10 md:py-32 px-6">
          <div className="relative max-w-5xl mx-auto overflow-hidden rounded-xl">
            <Image
              src="/speakers.png"
              alt="Speakers"
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />

            {/* Subtle radial fade */}
            <div className="absolute inset-0 pointer-events-none
              bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.85))]" />
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section id="about" className="py-12 md:py-32 scroll-mt-24 px-6">
          <div className="max-w-5xl mx-auto text-center">

            <h2 className="text-red-600 font-bold uppercase tracking-[0.4em] text-xs mb-6">
              About TEDxAmritapuri
            </h2>

            <h3 className="text-3xl md:text-6xl font-black uppercase leading-tight tracking-tighter mb-10">
              Beyond the <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                Visible
              </span>
            </h3>

            <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              TEDxAmritapuri is an independently organized TED event hosted at
              <span className="text-white font-medium"> Amrita Vishwa Vidyapeetham</span>.
              Bringing together visionaries, innovators, and changemakers, we aim to spark
              powerful conversations that challenge perspectives and inspire meaningful action.
            </p>

            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mt-8">
              From technology and science to art, leadership, and social impact,
              TEDxAmritapuri creates a platform where bold ideas meet passionate minds.
              This is more than an event — it's the beginning of a movement.
            </p>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-12 md:py-32 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center bg-neutral-900/40 p-8 md:p-24 border border-white/10 relative overflow-hidden rounded-xl">

              <div className="absolute -top-24 -right-24 w-64 md:w-96 h-64 md:h-96 bg-red-600/10 blur-[100px] rounded-full" />

              <div className="relative z-10 text-center md:text-left">
                <h3 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase mb-6 leading-tight tracking-tighter">
                  Be part of <br className="hidden md:block" />the movement.
                </h3>

                <p className="text-white/50 text-base md:text-lg mb-8 max-w-sm mx-auto md:mx-0">
                  Limited seats available for the most anticipated event of the year.
                </p>

                <Link href="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full md:w-auto bg-red-600 text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-2xl shadow-red-600/20"
                  >
                    Reserve Spot
                  </motion.button>
                </Link>
              </div>

              <div className="relative z-10 text-center md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12">
                <h4 className="text-red-600 font-bold uppercase tracking-widest text-xs md:text-sm mb-2">
                  Save the Date
                </h4>

                <p className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter tabular-nums">
                  2026
                </p>

                <p className="text-white/30 uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] mt-4 font-bold underline decoration-red-600 underline-offset-4">
                  Amritapuri Campus
                </p>
              </div>

            </div>
          </motion.div>
        </section>

      </div>
    </main>
  );
}