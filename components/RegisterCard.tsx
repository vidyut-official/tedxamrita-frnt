"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { CheckCircle2, School, Globe2, ArrowRight } from "lucide-react";

export default function RegisterCard() {
  const [selected, setSelected] = useState<"college" | "external" | null>(null);

  return (
    <section className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#050505] text-white overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative max-w-xl sm:max-w-2xl md:max-w-4xl mx-auto">
        
        <LayoutGroup>
          <motion.div
            layout
            className="bg-neutral-900/40 backdrop-blur-2xl border border-white/5 rounded-3xl shadow-2xl"
          >
            <div className="px-6 py-10 sm:px-10 sm:py-14 md:px-14 md:py-16">

              {/* Header */}
              <div className="text-center mb-10 sm:mb-14">
                <span className="text-red-500 text-xs sm:text-sm tracking-[0.3em] uppercase font-mono">
                  Registration
                </span>

                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mt-3 tracking-tight leading-tight">
                  Choose Your <span className="text-red-600">Path</span>
                </h2>

                <p className="text-white/40 mt-4 text-sm sm:text-base max-w-md mx-auto">
                  Select your category to continue registration for TEDxAmritapuri 2026.
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <OptionCard
                  title="Amritapuri Students"
                  description="Exclusive for @am.amrita.edu handles."
                  icon={<School className="w-5 h-5 sm:w-6 sm:h-6" />}
                  isActive={selected === "college"}
                  onClick={() => setSelected("college")}
                />

                <OptionCard
                  title="External Participants"
                  description="For innovators across the globe."
                  icon={<Globe2 className="w-5 h-5 sm:w-6 sm:h-6" />}
                  isActive={selected === "external"}
                  onClick={() => setSelected("external")}
                />
              </div>

              {/* Action */}
              <AnimatePresence mode="wait">
                {selected && (
                  <motion.div
                    key={selected}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-10 sm:mt-14 border-t border-white/10 pt-8 text-center"
                  >
                    <p className="text-white/40 text-sm sm:text-base mb-8 max-w-md mx-auto">
                      {selected === "college"
                        ? "Please use your official university email ID for verification."
                        : "Ensure your details are accurate. Confirmation will be sent via email."}
                    </p>

                    <motion.a
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      href={
                        selected === "college"
                          ? "#college-link"
                          : "#external-link"
                      }
                      className="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 px-8 sm:px-12 py-4 sm:py-5 rounded-full text-sm sm:text-base font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] w-full sm:w-auto"
                    >
                      Proceed to Register
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                    </motion.a>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}

function OptionCard({ title, description, icon, isActive, onClick }: any) {
  return (
    <motion.button
      whileHover={{ y: -3 }}
      onClick={onClick}
      className={`relative w-full text-left p-6 sm:p-8 rounded-2xl transition-all duration-300 border ${
        isActive
          ? "bg-white/5 border-red-600 shadow-[0_0_25px_rgba(220,38,38,0.15)]"
          : "bg-transparent border-white/10 hover:border-white/20"
      }`}
    >
      <div
        className={`mb-4 inline-flex items-center justify-center p-3 rounded-xl transition-colors ${
          isActive
            ? "bg-red-600 text-white"
            : "bg-white/5 text-white/60"
        }`}
      >
        {icon}
      </div>

      <h4 className="text-lg sm:text-xl font-bold mb-2">{title}</h4>
      <p className="text-white/40 text-sm leading-relaxed">{description}</p>

      {isActive && (
        <motion.div
          layoutId="active-check"
          className="absolute top-4 right-4 text-red-500"
        >
          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.div>
      )}
    </motion.button>
  );
}