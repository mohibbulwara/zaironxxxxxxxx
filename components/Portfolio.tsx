
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ExternalLink, Globe, Wifi } from 'lucide-react';
import { Project } from '../types';

// Using React.FC to properly handle React attributes like 'key' when rendering in a list and ensuring type safety with the Project interface.
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: "circOut" }}
      className="group relative h-[450px] lg:h-[550px] rounded-[1.5rem] overflow-hidden bg-zinc-900/40 border border-zinc-800 transition-all duration-700 hover:border-cyan-500/50 block"
    >
      {/* Background Media Interface */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-in-out"
        />
        {/* Elite Overlay: Scan Lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
      </div>

      {/* Top Bar: Technical Status */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-20">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-cyan-500 animate-pulse' : 'bg-green-500/50'}`} />
            <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
              Status: {isHovered ? 'ACCESSING_SERVER' : 'ONLINE_SECURE'}
            </span>
          </div>
          <span className="text-[8px] font-mono text-zinc-600 tracking-[0.3em] ml-3">IP_SRC: 0x{index}F{index}D</span>
        </div>
        
        <div className="flex gap-2">
          {['HTTPS', 'V4.0'].map(badge => (
            <span key={badge} className="px-2 py-0.5 border border-zinc-800/50 rounded-sm text-[8px] font-mono text-zinc-500 group-hover:border-cyan-500/30 group-hover:text-cyan-500 transition-colors">
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end z-10">
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0.8, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="h-[1px] w-8 bg-cyan-500/50" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-500">
              {project.category}
            </span>
          </motion.div>

          <h3 className="text-3xl lg:text-5xl font-bold text-zinc-100 tracking-tighter group-hover:text-white transition-colors">
            {project.title}
          </h3>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag: string) => (
              <span key={tag} className="text-[9px] font-mono px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-500 uppercase group-hover:text-zinc-300 transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* View Interaction Button */}
        <div className="mt-8 pt-8 border-t border-zinc-800/50 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
           <div className="flex items-center gap-2">
             <Globe size={14} className="text-zinc-500" />
             <span className="text-[10px] font-mono text-zinc-500 lowercase tracking-wider">{project.link.replace('https://', '')}</span>
           </div>
           <div className="flex items-center gap-2 text-cyan-400 group-hover:text-cyan-300">
             <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Launch Project</span>
             <ExternalLink size={16} />
           </div>
        </div>
      </div>

      {/* Decorative Corner Grid */}
      <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity">
         <div className="grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => <div key={i} className="w-1 h-1 bg-white rounded-full" />)}
         </div>
      </div>
    </motion.a>
  );
};

const Portfolio: React.FC = () => {
  return (
    <section id="work" className="py-48 bg-black relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/5 blur-[200px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-12">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <Wifi size={16} className="text-cyan-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-zinc-600">Active Deployments</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-100 leading-[0.9]">
              Selected <span className="text-zinc-600 italic font-light">Digital</span> <br />
              <span className="text-cyan-500/80">Architecture.</span>
            </h2>
          </div>

          <div className="lg:text-right space-y-4">
            <p className="text-zinc-500 text-sm max-w-xs ml-auto leading-relaxed uppercase tracking-wider font-medium">
              A curated collection of production environments engineered for performance and scalability.
            </p>
            <div className="h-[1px] w-full bg-zinc-900" />
            <a href="https://github.com" target="_blank" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-cyan-400 transition-colors">
              Repository Archive <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Bottom Callout */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-40 flex flex-col items-center text-center"
        >
           <div className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.5em] mb-8">End of Records</div>
           <div className="w-[1px] h-32 bg-gradient-to-b from-zinc-800 to-transparent" />
        </motion.div>

      </div>
    </section>
  );
};

export default Portfolio;
