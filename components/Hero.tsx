
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import Robot from './Robot';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#080808] to-black -z-10" />
      
      {/* Background Grid for depth */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      {/* Subtle center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full -z-10" />

      <div className="relative w-full h-full z-10 flex items-center justify-center">
        <Canvas 
          dpr={[1, 2]}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
          camera={{ position: [0, 0, 5], fov: 30 }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={30} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            maxPolarAngle={Math.PI / 1.8} 
            minPolarAngle={Math.PI / 2.5} 
          />
          
          {/* Default lighting fallback in case Environment fails */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#22D3EE" />

          <Suspense fallback={null}>
            <Environment preset="city" />
            {/* Reduced scale from 1.4 to 0.8 for a "small" look */}
            <group scale={0.8} position={[0, -0.2, 0]}>
              <Robot />
            </group>
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Content Overlays */}
      <div className="absolute inset-0 flex flex-col items-center justify-end py-24 pointer-events-none z-20">
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
