"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Speakers", href: "/speakers" },
  { name: "Schedule", href: "/event" },
  { name: "Team", href: "/team" },
];

export default function Navbar({ scrolled }: { scrolled: boolean }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled || isOpen
            ? "bg-black/90 backdrop-blur-xl py-4 border-b border-white/5"
            : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo - Always visible but scales */}
          <Link href="/" className="relative z-[110] flex items-center">
            <motion.div
              animate={{ scale: scrolled ? 0.9 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Image
                src="/logo-white.png" // Ensure this is your TEDx logo
                alt="TEDxAmritapuri"
                width={160}
                height={40}
                className="w-32 md:w-40 h-auto object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex gap-8">
              {navLinks.map((link) => (
                <NavLink key={link.name} link={link} active={pathname === link.href} />
              ))}
            </div>
            <Link
              href="/register"
              className="bg-red-600 hover:bg-white hover:text-black text-white px-7 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 active:scale-95"
            >
              Get Tickets
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[110] md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white block"
            />
            <motion.span 
              animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="w-6 h-0.5 bg-white block"
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white block"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] bg-black flex flex-col justify-center px-10 md:hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,43,6,0.1),transparent_50%)]" />

            <div className="flex flex-col gap-8 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`text-4xl font-black uppercase tracking-tighter ${
                      pathname === link.href ? "text-red-600" : "text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10"
              >
                <Link
                  href="/register"
                  className="bg-red-600 text-white px-8 py-5 text-sm font-bold uppercase tracking-widest inline-block w-full text-center"
                >
                  Register Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Sub-component for Desktop Hover Effect
function NavLink({ link, active }: { link: any; active: boolean }) {
  return (
    <Link
      href={link.href}
      className={`relative group text-[10px] font-bold uppercase tracking-[0.25em] transition-colors ${
        active ? "text-red-600" : "text-white/70 hover:text-white"
      }`}
    >
      {link.name}
      <span className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-red-600 transition-all duration-300 group-hover:w-full ${active ? 'w-full' : ''}`} />
    </Link>
  );
}