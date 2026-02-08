
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SystemStorage from '../lib/store';
import { Skill } from '../types';

const Telemetry = () => {
  const [val, setVal] = useState('0x0000');
  useEffect(() => {
    const interval = setInterval(() => {
      const hex = Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
      setVal(`0x${hex}`);
    }, 150 + Math.random() * 300);
    return () => clearInterval(interval);
  }, []);
  return <span className="font-mono text-[8px] text-zinc-700 tracking-widest">{val}</span>;
};

const BitStream = ({ level, active }: { level: number, active: boolean }) => {
  const segments = 10;
  const filledSegments = Math.round(level / (100 / segments));

  return (
    <div className="flex gap-1">
      {[...Array(segments)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.1 }}
          whileInView={{ opacity: i < filledSegments ? 1 : 0.1 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
          className={`h-4 w-1.5 rounded-sm ${
            i < filledSegments 
              ? (active ? 'bg-cyan-400 shadow-[0_0_8px_#22D3EE]' : 'bg-zinc-500') 
              : 'bg-zinc-900'
          } transition-colors duration-300`}
        />
      ))}
    </div>
  );
};

const SkillModule: React.FC<{ skill: Skill, index: number }> = ({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="relative p-6 border border-zinc-900 bg-black/40 group hover:border-zinc-700 transition-all duration-500 rounded-lg overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:10px_10px]" />
      <div className={`absolute top-0 right-0 w-8 h-8 border-t border-r transition-colors duration-500 ${isHovered ? 'border-cyan-500/50' : 'border-zinc-800'}`} />
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-[0.4em] mb-1">DEP-{(800 + index).toString()}</span>
            <h4 className="text-xl font-bold text-zinc-200 group-hover:text-white transition-colors">{skill.name}</h4>
          </div>
          <Telemetry />
        </div>
        <div className="flex items-center justify-between mt-2">
           <BitStream level={skill.level} active={isHovered} />
           <span className={`font-mono text-[10px] font-bold ${isHovered ? 'text-cyan-400' : 'text-zinc-600'}`}>
             {skill.level}%
           </span>
        </div>
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ left: '-10%' }}
            animate={{ left: '110%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
            className="absolute top-0 bottom-0 w-[2px] bg-cyan-500/20 blur-[2px] pointer-events-none"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const [skillCategories, setSkillCategories] = useState<any[]>(SystemStorage.getData().skills);

  useEffect(() => {
    const handleUpdate = () => setSkillCategories(SystemStorage.getData().skills);
    window.addEventListener('system_data_updated', handleUpdate);
    return () => window.removeEventListener('system_data_updated', handleUpdate);
  }, []);

  return (
    <section id="skills" className="py-60 bg-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02]">
        <h2 className="text-[30vw] font-black tracking-tighter text-white">STACK</h2>
      </div>
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.6em]">System Protocol: Mastery</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-zinc-100 tracking-tight leading-none">
              Kernel <span className="text-zinc-600 font-light italic">Configuration</span> & <br />
              <span className="text-cyan-500/80">Dependency</span> Stack
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <p className="text-zinc-500 text-sm max-w-sm ml-auto leading-relaxed">
              Our technical DNA is comprised of optimized libraries and high-performance frameworks integrated at a system level.
            </p>
          </div>
        </div>
        <div className="space-y-24">
          {skillCategories.map((category) => (
            <div key={category.category}>
              <div className="flex items-center gap-6 mb-12">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-400 whitespace-nowrap">
                  {category.category} Modules
                </h3>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-zinc-900 via-zinc-800 to-transparent" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.items.map((skill: Skill, idx: number) => (
                  <SkillModule key={idx} skill={skill} index={idx} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
