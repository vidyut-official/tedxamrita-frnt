"use client";

import Image from "next/image";
import EventCountdown from "./EventCountdown";

export default function Hero() {
  return (
    // Change this line:
<section className="relative min-h-[80dvh] md:min-h-dvh flex items-center justify-center">
      <div className="w-full max-w-3xl px-4 flex flex-col items-center">
        <Image
          src="/logo-white.png"
          alt="TEDxAmritapuri Logo"
          width={700}
          height={300}
          priority
          className="w-full max-w-175 h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
        />

        <EventCountdown />
      </div>
    </section>
  );
}