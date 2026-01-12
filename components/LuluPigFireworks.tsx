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
    // Generate random particles
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: -10, // start above screen
      rotation: Math.random() * 720 - 360,
      scale: 0.5 + Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 0.5,
    }));

    setParticles(newParticles);

    // Hide after animation completes
    const timer = setTimeout(() => {
      setShow(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              width: '60px',
              height: '60px',
            }}
            initial={{
              y: particle.y,
              opacity: 0,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              y: window.innerHeight + 100,
              opacity: [0, 1, 1, 0],
              scale: [0, particle.scale, particle.scale, 0],
              rotate: particle.rotation,
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: 'easeOut',
            }}
          >
            <Image
              src="/images/lulu-pig.png"
              alt="Lulu Pig"
              width={60}
              height={60}
              className="object-contain"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
