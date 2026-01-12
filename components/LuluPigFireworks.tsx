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
  trajectory: 'fall' | 'explode' | 'spiral';
}

export default function LuluPigFireworks() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Generate 50 particles with different trajectories
    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => {
      const trajectories: ('fall' | 'explode' | 'spiral')[] = ['fall', 'explode', 'spiral'];
      const trajectory = trajectories[i % 3];

      return {
        id: i,
        x: Math.random() * 100, // percentage
        y: trajectory === 'explode' ? 50 : -10, // explode from center, others from top
        rotation: Math.random() * 1440 - 720, // more rotation
        scale: 0.8 + Math.random() * 1.2, // larger size range
        duration: 2.5 + Math.random() * 2,
        delay: Math.random() * 1,
        trajectory,
      };
    });

    setParticles(newParticles);

    // Hide after animation completes
    const timer = setTimeout(() => {
      setShow(false);
    }, 5500);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  const getAnimationProps = (particle: Particle) => {
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;

    switch (particle.trajectory) {
      case 'explode':
        // Explode from center to edges
        const angle = (particle.id * 360) / 50;
        const distance = screenWidth * 0.6;
        return {
          x: [0, Math.cos(angle * Math.PI / 180) * distance],
          y: [0, Math.sin(angle * Math.PI / 180) * distance],
        };

      case 'spiral':
        // Spiral down
        return {
          x: [0, Math.sin(particle.id * 0.5) * 200],
          y: [particle.y, screenHeight + 100],
        };

      default:
        // Fall straight down
        return {
          x: [0, (Math.random() - 0.5) * 100],
          y: [particle.y, screenHeight + 100],
        };
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden bg-black/20">
      <AnimatePresence>
        {particles.map((particle) => {
          const animation = getAnimationProps(particle);

          return (
            <motion.div
              key={particle.id}
              className="absolute"
              style={{
                left: particle.trajectory === 'explode' ? '50%' : `${particle.x}%`,
                top: particle.trajectory === 'explode' ? '50%' : 0,
                width: '100px',
                height: '100px',
              }}
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
                scale: 0,
                rotate: 0,
              }}
              animate={{
                x: animation.x,
                y: animation.y,
                opacity: [0, 1, 1, 1, 0],
                scale: [0, particle.scale * 1.5, particle.scale, particle.scale, 0],
                rotate: particle.rotation,
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: particle.trajectory === 'explode' ? 'easeOut' : 'linear',
              }}
            >
              <Image
                src="/images/lulu-pig.png"
                alt="Lulu Pig"
                width={100}
                height={100}
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
