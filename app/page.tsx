"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ParticlesBackground from "@/components/ParticlesBackground";
import Link from "next/link";
import Image from "next/image";
import SpeakerCard from "@/components/SpeakerCard";
import Footer from "@/components/Footer";

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

        {/* ================= SPEAKERS ================= */}
        <section id="speakers" className="relative py-20 md:py-32 overflow-hidden">
          {/* Black Vignette Fade */}
          <div className="pointer-events-none absolute inset-0 
            bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_80%)]" />

          {/* Background */}
          <div className="relative max-w-7xl mx-auto px-4 md:px-6">
            {/* Title */}
            <div className="text-center mb-16 md:mb-24">
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">
                Our <span className="text-red-600">Speakers</span>
              </h2>
            </div>

            {/* Mobile: Prashant First Stack */}
            {/* <div className="md:hidden flex flex-col items-center gap-12 mb-12">
             
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full max-w-md flex flex-col items-center"
              >
                <motion.img
                  src="/Layer 2.png"
                  alt="Prasanth Balakrishnan Nair"
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="max-h-[400px] w-auto object-contain 
                    mix-blend-multiply drop-shadow-[0_0_40px_rgba(255,0,0,0.3)] 
                    hover:mix-blend-normal hover:drop-shadow-[0_0_60px_rgba(255,0,0,0.5)] 
                    transition-all duration-500"
                />
                <div className="text-center mt-6">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                    Prasanth Balakrishnan Nair
                  </h3>
                  <p className="text-red-600 uppercase tracking-[0.3em] text-sm mt-3 font-bold">
                    Astronaut
                  </p>
                </div>
              </motion.div>

           
              <div className="grid grid-cols-2 gap-8 w-full max-w-4xl">
                <SideSpeaker
                  image="/Layer 5.png"
                  name="Vishnuraj P"
                  role="IAS"
                  delay={0.2}
                  className="max-h-[200px]"
                />
                <SideSpeaker
                  image="/Layer 3.png"
                  name="Lenaa"
                  role="Actress"
                  delay={0.4}
                  className="max-h-[200px]"
                />
                <SideSpeaker
                  image="/Layer 6.png"
                  name="Hariraj Madhav Rajendran"
                  role="Advocate"
                  delay={0.6}
                  className="max-h-[200px]"
                />
                <SideSpeaker
                  image="/Layer 4.png"
                  name="Sreejith Panickar"
                  role="Advocate"
                  delay={0.8}
                  className="max-h-[200px]"
                />
                <div className="col-span-2 flex justify-center">
                  <SideSpeaker
                    image="/Layer 7.png"
                    name="Dr. Balakrishnan Shankar"
                    role="Dean, Amrita School of Engineering"
                    delay={1.0}
                    className="max-h-[200px] w-auto"
                  />
                </div>
              </div>
            </div> */}

            {/* Desktop: NEW LAYOUT - Prasanth BIG + 1 each side + 3 below */}
            <div className="hidden md:block">
              {/* TOP ROW: 1 LEFT + BIG PRASANTH + 1 RIGHT */}
              <div className="grid grid-cols-3 items-end gap-8 mb-20">
                {/* LEFT SIDE - 1 Speaker */}
                <div className="flex justify-center">
                  <SideSpeaker
                    image="/Layer 5.png"
                    name="Vishnuraj P"
                    role="IAS"
                    delay={0.4}
                  />
                </div>

                {/* CENTER - HUGE PRASANTH */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <motion.img
                    src="/Layer 2.png"
                    alt="Prasanth Balakrishnan Nair"
                    initial={{ scale: 0.85 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    className="max-h-[650px] lg:max-h-[850px] w-auto object-contain 
                      mix-blend-multiply drop-shadow-[0_0_80px_rgba(255,0,0,0.5)]
                      hover:mix-blend-normal hover:drop-shadow-[0_0_120px_rgba(255,0,0,0.7)]
                      transition-all duration-700 mx-auto"
                  />
                  <div className="text-center mt-12">
                    <h3 className="text-5xl lg:text-3xl font-black text-white uppercase tracking-tight">
                      Prasanth Balakrishnan Nair
                    </h3>
                    <p className="text-red-600 uppercase tracking-[0.4em] text-base lg:text-lg mt-6 font-bold">
                      Astronaut
                    </p>
                  </div>
                </motion.div>

                {/* RIGHT SIDE - 1 Speaker */}
                <div className="flex justify-center">
                  <SideSpeaker
                    image="/Layer 3.png"
                    name="Lenaa"
                    role="Actress"
                    delay={0.8}
                  />
                </div>
              </div>

              {/* BOTTOM ROW: 3 Speakers */}
              <div className="grid grid-cols-3 gap-12 items-center">
                <SideSpeaker
                  image="/Layer 6.png"
                  name="Hariraj Madhav Rajendran"
                  role="Advocate"
                  delay={1.2}
                />
                <SideSpeaker
                  image="/Layer 4.png"
                  name="Sreejith Panickar"
                  role="Advocate"
                  delay={1.6}
                />
                <SideSpeaker
                  image="/Layer 7.png"
                  name="Dr. Balakrishnan Shankar"
                  role="Dean, Amrita School of Engineering"
                  delay={2.0}
                />
              </div>
            </div>
          </div>
        </section>
        <section id="speakers" className="">

          {[
            {
              name: "Prasanth Balakrishnan Nair",
              role: "Astronaut",
              image: "/Layer 2.png",
              bio: "Indian Air Force pilot and astronaut with distinguished service and leadership in aerospace missions."
            },
            {
              name: "Lenaa",
              role: "Actress",
              image: "/Layer 3.png",
              bio: "Renowned actress known for powerful performances across Indian cinema and television."
            },
            {
              name: "Sreejith Panickar",
              role: "Advocate",
              image: "/Layer 4.png",
              bio: "Legal expert and public intellectual known for insightful discussions and analysis."
            },
            {
              name: "Vishnuraj P",
              role: "IAS",
              image: "/Layer 5.png",
              bio: "Indian Administrative Service officer dedicated to governance and public service."
            },
                        {
              name: "Hariraj Madhav Rajendran",
              role: "Advocate",
              image: "/Layer 6.png",
              bio: "Legal expert and public intellectual known for insightful discussions and analysis."
            },
            {
              name: "Dr. Balakrishnan Shankar",
              role: "Dean, Amrita School of Engineering",
              image: "/Layer 7.png",
              bio: "Esteemed academic leader and Dean at Amrita School of Engineering with a focus on innovation and research."
            }
          ].map((speaker, index) => (
            <SpeakerRow
              key={speaker.name}
              speaker={speaker}
              reverse={index % 2 !== 0}
            />
          ))}

        </section>
        {/* ================= CTA ================= */}
        <section
          id="register"
          className="relative py-24 md:py-40 px-4 md:px-6 overflow-hidden"
        >
          {/* Background subtle texture glow */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-black" />
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-red-600/10 blur-[150px] rounded-full" /> */}

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative max-w-6xl mx-auto"
          >
            {/* TICKET CONTAINER */}
            <div className="relative grid md:grid-cols-[3fr_1fr] bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(255,0,0,0.15)]">
              {/* LEFT SIDE — MAIN TICKET */}
              <div className="relative p-10 md:p-16">
                {/* Perforation effect left */}
                <div className="absolute top-0 left-0 h-full w-6 flex flex-col justify-between py-6">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-black rounded-full -ml-2" />
                  ))}
                </div>

                <div className="pl-6">
                  <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight mb-6">
                    Grab Your <span className="text-red-600">Ticket</span>
                  </h3>

                  <p className="text-white/60 text-lg mb-10 max-w-xl leading-relaxed">
                    Join us for an unforgettable TEDx experience at Amrita University.
                    Seats are limited. Secure yours before they're gone.
                  </p>

                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div>
                      <p className="text-white/40 uppercase tracking-widest text-xs mb-2">
                        Event Date
                      </p>
                      <p className="text-3xl font-bold">
                        March <span className="text-red-600">2</span>, 2026
                      </p>
                    </div>

                    <div className="hidden md:block w-px h-12 bg-white/10" />

                    <div>
                      <p className="text-white/40 uppercase tracking-widest text-xs mb-2">
                        Location
                      </p>
                      <p className="text-xl font-semibold">
                        Amritapuri Campus
                      </p>
                    </div>
                  </div>

                  <Link href="/">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-12 px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest transition-all duration-300 rounded-md"
                    >
                      Coming Soon
                    </motion.button>
                  </Link>
                </div>
              </div>

              {/* RIGHT SIDE — DATE STRIP */}
              <div className="relative bg-white border-t md:border-t-0 md:border-l border-white/10 flex flex-col items-center justify-center p-8">
                {/* Perforation effect right */}
                <div className="absolute top-0 right-0 h-full w-6 flex flex-col justify-between py-6">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-neutral-900 rounded-full -mr-2" />
                  ))}
                </div>

                <div className="text-center md:rotate-90 flex flex-col items-center gap-6">
                  {/* Barcode */}
                  <div className="flex items-end gap-[2px] h-20">
                    {[1, 3, 1, 1, 2, 4, 1, 2, 3, 1, 2, 4, 1, 3, 2, 1, 1, 3, 4, 1, 1, 1, 1, 2, 3, 4, 5, 1, 1, 2, 3, 1, 1, 1, 2, 3, 4].map((w, i) => (
                      <div
                        key={i}
                        className="bg-black"
                        style={{
                          width: `${w}px`,
                          height: "100%"
                        }}
                      />
                    ))}
                  </div>

                  {/* Barcode number */}
                  <p className="font-mono text-[10px] tracking-[0.3em] text-black/70">
                    TXA-02032026
                  </p>

                  {/* Date */}
                  <p className="text-red-900 uppercase tracking-[0.4em] text-xs font-bold">
                    02 • 03 • 2026
                  </p>

                  {/* Divider */}
                  <div className="w-24 h-[1px] bg-black/20" />

                  {/* Admit */}
                  <p className="text-black/50 uppercase tracking-widest text-xs">
                    Entry Ticket
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
       <Footer />
    </main>
  );
}
function SpeakerRow({
  speaker,
  reverse,
}: {
  speaker: any;
  reverse?: boolean;
}) {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">

      {/* Background subtle gradient */}
      <div className="absolute inset-0" />

      <div
        className={`relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center ${reverse ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1" : ""
          }`}
      >

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? 100 : -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img
            src={speaker.image}
            alt={speaker.name}
            className="max-h-[500px] md:max-h-[650px] object-contain 
                       drop-shadow-[0_0_60px_rgba(255,0,0,0.4)]"
          />
        </motion.div>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
            {speaker.name}
          </h2>

          <p className="text-red-600 uppercase tracking-[0.4em] mt-6">
            {speaker.role}
          </p>

          <p className="text-white/60 mt-8 text-lg leading-relaxed max-w-lg">
            {speaker.bio}
          </p>

          {/* <div className="mt-10">
            <button className="px-8 py-3 border border-red-600 text-red-600 uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300">
              Learn More
            </button>
          </div> */}
        </motion.div>

      </div>
    </section>
  );
}
function SideSpeaker({
  image,
  name,
  role,
  delay,
  className = "",
}: {
  image: string;
  name: string;
  role: string;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center w-full"
    >
      <img
        src={image}
        alt={name}
        className={`w-full h-auto max-h-[200px] md:max-h-[320px] object-contain 
          mix-blend-multiply brightness-90 saturate-50 
          hover:mix-blend-normal hover:brightness-110 hover:saturate-100
          drop-shadow-[0_8px_32px_rgba(0,0,0,0.6)]
          transition-all duration-500 ${className}`}
        loading="lazy"
      />
      <h4 className="text-white font-bold uppercase mt-3 md:mt-4 text-base md:text-lg">
        {name}
      </h4>
      <p className="text-red-600 text-xs md:text-sm uppercase tracking-widest mt-1 md:mt-2 font-medium">
        {role}
      </p>
    </motion.div>
  );
}
