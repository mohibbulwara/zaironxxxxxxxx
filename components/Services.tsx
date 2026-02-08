
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { SERVICES } from '../constants';
import { Service } from '../types';
import * as LucideIcons from 'lucide-react';

// Define interface for ServiceModule props to ensure type safety
interface ServiceModuleProps {
  service: Service;
  index: number;
}

// Using React.FC to properly handle React attributes like 'key' when rendering in a list
const ServiceModule: React.FC<ServiceModuleProps> = ({ service, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.Code;
  
  // Staggered layout: even items on left, odd on right for desktop
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className={`relative flex flex-col lg:flex-row items-center justify-center w-full mb-32 lg:mb-48 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
      
      {/* Connector Line (Desktop Only) */}
      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-full h-[1px] pointer-events-none overflow-hidden">
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, ease: "circOut", delay: 0.2 }}
          className={`h-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent w-[40%] mx-auto ${isEven ? 'origin-right' : 'origin-left'}`}
        />
      </div>

      {/* Service Content */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "circOut" }}
        className={`w-full lg:w-[45%] group ${isEven ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'}`}
      >
        <div className={`flex flex-col ${isEven ? 'lg:items-end' : 'lg:items-start'} gap-4`}>
          <div className="flex items-center gap-3 font-mono text-[10px] text-zinc-600 uppercase tracking-[0.5em]">
             <span>{isEven ? '' : `[0x0${index + 1}]`}</span>
             <div className="h-[1px] w-12 bg-zinc-800" />
             <span>{isEven ? `[0x0${index + 1}]` : ''}</span>
          </div>

          <h3 className="text-3xl md:text-5xl font-bold text-zinc-200 tracking-tighter group-hover:text-cyan-400 transition-colors duration-500">
            {service.title}
          </h3>

          <p className="text-zinc-500 text-sm md:text-base max-w-md leading-relaxed">
            {service.description}
          </p>

          <div className="flex flex-wrap gap-3 mt-4">
             {['OPTIMIZED', 'SCALABLE', 'SECURE'].map(tag => (
               <span key={tag} className="text-[8px] font-bold px-2 py-1 rounded border border-zinc-800 text-zinc-700 uppercase tracking-widest group-hover:border-cyan-900 group-hover:text-cyan-800 transition-colors">
                 {tag}
               </span>
             ))}
          </div>
        </div>
      </motion.div>

      {/* Central Node Visual */}
      <div className="relative z-10 my-8 lg:my-0">
        <motion.div 
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          className="w-20 h-20 rounded-2xl bg-black border border-zinc-800 flex items-center justify-center relative group"
        >
          {/* Internal Glow */}
          <div className="absolute inset-2 bg-cyan-500/5 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <IconComponent className="text-zinc-500 group-hover:text-cyan-400 transition-colors duration-500 relative z-10" size={32} />
          
          {/* Rotating Outer Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-8px] border border-dashed border-zinc-900 rounded-full"
          />
        </motion.div>
      </div>

      {/* Secondary Tech Specs (Desktop Only) */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "circOut", delay: 0.3 }}
        className={`hidden lg:block w-[45%] font-mono text-[9px] text-zinc-700 uppercase tracking-[0.3em] ${isEven ? 'pl-12' : 'pr-12 text-right'}`}
      >
        <div className="space-y-2 border-l border-zinc-900 pl-6 border-dashed">
          <div>Architecture: Micro-Kernel</div>
          <div>Stack_Priority: High</div>
          <div>Deploy_Status: Ready</div>
          <div className="text-cyan-900/40">Checksum: Validated</div>
        </div>
      </motion.div>
    </div>
  );
};

const Services: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const probeY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="services" ref={containerRef} className="py-60 bg-black relative overflow-hidden">
      
      {/* Background Decoratives */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-40">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="flex items-center gap-4 mb-4"
           >
             <div className="w-12 h-[1px] bg-zinc-800" />
             <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.8em]">Core Architecture</span>
             <div className="w-12 h-[1px] bg-zinc-800" />
           </motion.div>
           <h2 className="text-5xl md:text-7xl font-bold text-zinc-100 tracking-tighter text-center">
             System <span className="text-cyan-500 italic">Domains</span>
           </h2>
        </div>

        {/* The Stack Interface */}
        <div className="relative">
          
          {/* Central Vertical Spine (Desktop Only) */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-zinc-900">
             {/* The Moving Probe */}
             <motion.div 
               style={{ top: probeY }}
               className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_15px_#06b6d4] z-20"
             >
                <div className="absolute inset-[-10px] border border-cyan-500/20 rounded-full animate-ping" />
             </motion.div>
          </div>

          <div className="space-y-12">
            {SERVICES.map((service, index) => (
              <ServiceModule key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>

        {/* Section Footer: Technical Summary */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex flex-col items-center text-center space-y-6"
        >
          <div className="h-24 w-[1px] bg-gradient-to-b from-zinc-800 to-transparent" />
          <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] max-w-sm">
            End-to-end engineering excellence across all operational layers.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default Services;
