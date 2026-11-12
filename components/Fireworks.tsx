
"use client";

import { useEffect, useRef } from "react";

interface FireworksProps {
  active: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
}

export default function Fireworks({ active }: FireworksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let animationId = 0;
    let particles: Particle[] = [];
    let lastBurst = 0;
    let running = true;

    const colors = [
      "#ff4f91",
      "#ff8fab",
      "#ffd166",
      "#ffffff",
      "#ff3d68",
      "#d98cff",
    ];

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
      );
    };

    const burst = (x: number, y: number) => {
      const count = 65;

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = Math.random() * 4 + 1.5;

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: Math.random() * 0.012 + 0.008,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 3 + 1,
        });
      }
    };

    const animate = (time: number) => {
      if (!running) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      if (time - lastBurst > 480) {
        burst(
          Math.random() * width * 0.8 + width * 0.1,
          Math.random() * height * 0.45 + height * 0.1
        );
        lastBurst = time;
      }

      particles = particles.filter((particle) => particle.alpha > 0);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.035;
        particle.vx *= 0.99;
        particle.alpha -= particle.decay;

        ctx.globalAlpha = Math.max(0, particle.alpha);
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = particle.color;

        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);

    // Bắn pháo hoa ngay khi hiệu ứng bắt đầu
    burst(window.innerWidth * 0.5, window.innerHeight * 0.3);
    burst(window.innerWidth * 0.25, window.innerHeight * 0.4);
    burst(window.innerWidth * 0.75, window.innerHeight * 0.4);

    animationId = requestAnimationFrame(animate);

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  if (!active) return null;

  return <canvas ref={canvasRef} className="fireworks-canvas" />;
}
