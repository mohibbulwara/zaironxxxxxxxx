
import React, { useEffect, useState, useRef } from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Header from './components/Header';
import CursorTrail from './components/CursorTrail';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

// --- TECHNICAL DECRYPT COMPONENT ---
const DecryptText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/-_=+*^!#';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <span ref={ref} className="font-mono tracking-tighter">
      {displayText || text.replace(/./g, '_')}
    </span>
  );
};

// --- DATA BLOCK COMPONENT ---
const DataBlock = ({ label, value, sub, delay = 0 }: { label: string; value: string; sub?: string; delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    className="group relative border-l border-zinc-800 pl-4 py-2 hover:border-cyan-500/50 transition-colors"
  >
    <div className="text-[9px] uppercase font-bold tracking-[0.3em] text-zinc-600 mb-1 group-hover:text-cyan-500/50 transition-colors">{label}</div>
    <div className="text-lg font-bold text-zinc-300 leading-tight">{value}</div>
    {sub && <div className="text-[9px] font-mono text-zinc-700 mt-1 uppercase tracking-widest">{sub}</div>}
    
    {/* Corner Decorative */}
    <div className="absolute top-0 right-0 w-1 h-1 bg-zinc-800 group-hover:bg-cyan-500 transition-colors" />
  </motion.div>
);

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 5]);

  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const targetId = target.getAttribute('href');
      
      if (targetId && targetId.startsWith('#') && targetId.length > 1) {
        try {
          const element = document.querySelector(targetId);
          if (element) {
            e.preventDefault();
            element.scrollIntoView({
              behavior: 'smooth'
            });
          }
        } catch (err) {
          console.warn('Smooth scroll failed for selector:', targetId);
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleSmoothScroll as any);
    });

    return () => {
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', handleSmoothScroll as any);
      });
    };
  }, []);

  return (
    <div className="bg-black min-h-screen relative selection:bg-cyan-500/30 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CursorTrail />
        <Header />
        
        <main>
          <Hero />
          
          <section id="about" className="py-48 bg-black relative">
            {/* Engineering Background schematics */}
            <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent" />
              <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] border border-dashed border-white rounded-full opacity-10 animate-[spin_60s_linear_infinite]" />
            </div>

            <div className="container mx-auto px-6 lg:px-20 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                
                {/* Left Side: The "Studio Kernel" */}
                <div className="lg:col-span-7 space-y-16">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-8">
                       <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.5em]">System Architecture v4.0.2</span>
                       <div className="h-[1px] flex-grow bg-zinc-900" />
                    </div>
                    
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-zinc-100">
                      <DecryptText text="Zaironx" /> <span className="text-zinc-500 font-light italic">is a digital</span> <br />
                      <span className="text-cyan-500/80 underline decoration-zinc-800 underline-offset-8 decoration-2"><DecryptText text="engineering" /></span> <DecryptText text="studio" />
                    </h2>
                    
                    <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
                      Focused on building <span className="text-zinc-300">high-performance</span> systems and <span className="text-zinc-300">visually immersive</span> interfaces that operate at scale.
                    </p>
                  </div>

                  {/* Technical Specs Array */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8">
                    <DataBlock label="Core Logic" value="Typescript" sub="Strict / Type-Safe" />
                    <DataBlock label="Visual Engine" value="WebGL" sub="60FPS Target" delay={0.1} />
                    <DataBlock label="Scale Factor" value="Infinite" sub="Horizontal Expansion" delay={0.2} />
                  </div>
                </div>

                {/* Right Side: Process Console */}
                <div className="lg:col-span-5">
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.98 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     className="glass border-zinc-800 rounded-2xl p-8 relative overflow-hidden group"
                   >
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
                      
                      <div className="flex justify-between items-center mb-8">
                        <div className="flex gap-1.5">
                           <div className="w-2 h-2 rounded-full bg-red-500/20" />
                           <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                           <div className="w-2 h-2 rounded-full bg-green-500/20" />
                        </div>
                        <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Process.log</span>
                      </div>

                      <div className="space-y-6">
                        {[
                          { time: "09:00:12", event: "KERNEL_INIT", status: "OK", color: "text-green-500/50" },
                          { time: "09:00:45", event: "LOAD_UI_MODULES", status: "ACTIVE", color: "text-cyan-500/50" },
                          { time: "09:01:22", event: "SYNC_BLOCKCHAIN_NODES", status: "PENDING", color: "text-zinc-600" },
                          { time: "09:01:59", event: "RENDER_IMMERSIVE_LAYER", status: "COMPLETED", color: "text-green-500/50" }
                        ].map((log, i) => (
                          <div key={i} className="flex justify-between items-center font-mono text-[10px]">
                            <span className="text-zinc-700">{log.time}</span>
                            <span className="text-zinc-400 font-bold">{log.event}</span>
                            <span className={`${log.color} font-bold`}>[{log.status}]</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-12 pt-8 border-t border-zinc-900">
                        <p className="text-zinc-500 text-xs leading-relaxed italic">
                          "We don't just build websites; we architect digital environments where performance meets poetry."
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                           <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                              <span className="text-[10px] font-bold text-cyan-500">ZX</span>
                           </div>
                           <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Studio Lead</span>
                        </div>
                      </div>

                      {/* Scanning Light Effect */}
                      <motion.div 
                        animate={{ top: ["-10%", "110%"] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        className="absolute left-0 w-full h-[20%] bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none"
                      />
                   </motion.div>
                </div>

              </div>
            </div>
          </section>

          <Services />
          <Skills />
          <Experience />
          <Portfolio />
          <Contact />
        </main>
      </motion.div>
    </div>
  );
};

export default App;
