"use client";

import { useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadStarsPreset } from "@tsparticles/preset-stars";
import type { Engine } from "@tsparticles/engine";

export default function SpaceBackground() {
  const [init, setInit] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateTheme = () => {
      const dark = document.documentElement.classList.contains("dark");
      setIsDark(dark);
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadStarsPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init || !mounted) return null;

  return (
    <Particles
      key={isDark ? "dark" : "light"}
      id="tsparticles"
      options={{
        preset: "stars",
        fullScreen: { enable: true, zIndex: -2 },
        background: { color: isDark ? "#000000" : "#ffffff" },
        particles: { color: { value: isDark ? "#ffffff" : "#1a1a1a" } },
      }}
    />
  );
}
