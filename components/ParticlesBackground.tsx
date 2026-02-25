"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  // This should only run once per app lifecycle
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log("TEDx Particles Loaded:", container);
  };

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      className="absolute inset-0 -z-10"
      options={{
        fullScreen: { enable: false },
        background: {
          color: "transparent", // Set to transparent so your CSS background shows through
        },
        fpsLimit: 240,
        particles: {
          number: {
            value: 250,
            density: {
              enable: true,
            },
          },
          color: {
            value: ["#ff2b06", "#ffffff"], // Official TED Red and White
          },
          links: {
            enable: true,
            color: "#ff2b06",
            distance: 100,
            opacity: 0.7,
            width: 1.2,
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            outModes: {
              default: "bounce", // "out" feels smoother than "bounce" for hero sections
            },
          },
          opacity: {
            value: 0.7,
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            resize: {
              enable: true,
            },
          },
          modes: {
            grab: {
              distance: 200,
              links: {
                opacity: 0.8,
              },
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}