
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  tx: number; // target x drift
  ty: number; // target y fall
}

const CursorTrail: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [count, setCount] = useState(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePos({ x: clientX, y: clientY });

    // Spawn a star
    const newParticle: Particle = {
      id: Date.now() + Math.random(),
      x: clientX,
      y: clientY,
      size: Math.random() * 4 + 2,
      color: Math.random() > 0.5 ? '#22D3EE' : '#A855F7',
      tx: (Math.random() - 0.5) * 60, // drift left or right
      ty: 100 + Math.random() * 100, // fall down
    };

    setParticles((prev) => [...prev.slice(-25), newParticle]);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Clean up old particles
  useEffect(() => {
    const timer = setInterval(() => {
      setParticles((prev) => prev.filter((p) => Date.now() - p.id < 1000));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Primary Custom Cursor Dot */}
      <motion.div
        className="w-4 h-4 rounded-full border border-cyan-400/50 bg-cyan-400/10 flex items-center justify-center"
        animate={{
          x: mousePos.x - 8,
          y: mousePos.y - 8,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 400,
          mass: 0.5,
        }}
      >
        <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#22D3EE]" />
      </motion.div>

      {/* Falling Star Trail */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, x: p.x, y: p.y, scale: 1, rotate: 0 }}
            animate={{ 
              opacity: 0, 
              y: p.y + p.ty, 
              x: p.x + p.tx,
              scale: 0,
              rotate: 360
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute flex items-center justify-center"
            style={{ width: p.size, height: p.size }}
          >
            {/* Minimalist Star Shape */}
            <div 
              className="w-full h-full rounded-full"
              style={{ 
                backgroundColor: p.color,
                boxShadow: `0 0 12px ${p.color}`,
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
              }} 
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CursorTrail;
