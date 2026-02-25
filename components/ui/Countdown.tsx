"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const getNextMarchSecond = () => {
  const now = new Date();
  const currentYear = now.getFullYear();

  let target = new Date(currentYear, 2, 2, 0, 0, 0);

  if (now > target) {
    target = new Date(currentYear + 1, 2, 2, 0, 0, 0);
  }

  return target;
};

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  const calculateTimeLeft = (): TimeLeft => {
    const difference = getNextMarchSecond().getTime() - Date.now();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  useEffect(() => {
    // Set initial value only after mount
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    // Prevent hydration mismatch
    return (
      <div className="text-white text-center opacity-0">
        Loading...
      </div>
    );
  }

  const Number = ({ value }: { value: number }) => (
    <p className="text-4xl md:text-5xl font-semibold bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/90 to-white/20 transition-all duration-300">
      {String(value).padStart(2, "0")}
    </p>
  );

  return (
    <div className="text-white text-center">
      <h2 className="text-white text-2xl md:text-2xl font-semibold uppercase tracking-[0.55em] opacity-60 mb-10">
        The Wait Ends In
      </h2>

      <div className="flex justify-center gap-10 md:gap-14">
        <div className="flex flex-col items-center">
          <Number value={timeLeft.days} />
          <span className="text-xs uppercase tracking-[0.3em] opacity-50 mt-2">
            Days
          </span>
        </div>

        <div className="flex flex-col items-center">
          <Number value={timeLeft.hours} />
          <span className="text-xs uppercase tracking-[0.3em] opacity-50 mt-2">
            Hours
          </span>
        </div>

        <div className="flex flex-col items-center">
          <Number value={timeLeft.minutes} />
          <span className="text-xs uppercase tracking-[0.3em] opacity-50 mt-2">
            Minutes
          </span>
        </div>

        <div className="flex flex-col items-center">
          <Number value={timeLeft.seconds} />
          <span className="text-xs uppercase tracking-[0.3em] opacity-50 mt-2">
            Seconds
          </span>
        </div>
      </div>
    </div>
  );
}