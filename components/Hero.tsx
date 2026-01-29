
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import Robot from './Robot';

const Hero: React.FC = () => {
  const [scale, setScale] = useState(0.8);
  const [fov, setFov] = useState(30);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScale(0.55); // Smaller robot for mobile
        setFov(45); // Wider FOV for mobile to fit everything
      } else {
        setScale(0.8);
        setFov(30);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#080808] to-black -z-10" />
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full -z-10" />

      <div className="relative w-full h-full z-10 flex items-center justify-center">
        <Canvas 
          dpr={[1, 2]}
          style={{ 
            width: '100%', 
            height: '100%', 
            position: 'absolute', 
            top: 0, 
            left: 0,
            touchAction: 'pan-y' // CRITICAL: Allows vertical scrolling on mobile
          }}
          camera={{ position: [0, 0, 5], fov: fov }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={fov} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            enableRotate={true}
            maxPolarAngle={Math.PI / 1.8} 
            minPolarAngle={Math.PI / 2.5} 
          />
          
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#22D3EE" />

          <Suspense fallback={null}>
            <Environment preset="city" />
            <group scale={scale} position={[0, -0.2, 0]}>
              <Robot />
            </group>
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-end py-24 md:py-32 pointer-events-none z-20">
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent" />
          <span className="text-[9px] uppercase font-bold tracking-[0.5em] text-white/20">Explore Interface</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
