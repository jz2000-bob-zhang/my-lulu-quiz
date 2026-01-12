'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  duration: number;
  delay: number;
}

export default function LuluPigFireworks() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Generate 180 small particles for dense effect
    const newParticles: Particle[] = Array.from({ length: 180 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: -10 - Math.random() * 20, // stagger start positions
      rotation: Math.random() * 360,
      scale: 0.3 + Math.random() * 0.4, // smaller size: 0.3-0.7
      duration: 3 + Math.random() * 2, // 3-5 seconds
      delay: Math.random() * 1.5, // stagger delays
    }));

    setParticles(newParticles);

    // Hide after animation completes
    const timer = setTimeout(() => {
      setShow(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden bg-gradient-to-b from-pink-100/30 to-transparent">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute will-change-transform"
            style={{
              left: `${particle.x}%`,
              width: '40px',
              height: '40px',
            }}
            initial={{
              y: particle.y,
              opacity: 0,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
              opacity: [0, 1, 1, 0.8, 0],
              scale: [0, particle.scale, particle.scale, particle.scale * 0.8, 0],
              rotate: particle.rotation,
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: 'linear',
              opacity: { times: [0, 0.1, 0.5, 0.9, 1] },
            }}
          >
            <Image
              src="/images/lulu-pig.png"
              alt="Lulu Pig"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
