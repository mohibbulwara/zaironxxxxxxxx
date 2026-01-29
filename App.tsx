
import React, { useEffect } from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Header from './components/Header';
import CursorTrail from './components/CursorTrail';
import { motion } from 'framer-motion';

const App: React.FC = () => {
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
    <div className="bg-black min-h-screen relative selection:bg-cyan-500/30">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CursorTrail />
        <Header />
        
        <main>
          <Hero />
          
          <section id="about" className="py-40 bg-black relative">
             <div className="container mx-auto px-6">
               <div className="max-w-5xl mx-auto text-center">
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl lg:text-5xl text-white font-medium leading-[1.2] tracking-tight"
                  >
                    "Zaironx is an engineering studio focused on building high-performance, visually immersive digital experiences that scale."
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-20 flex justify-center gap-12 flex-wrap"
                  >
                      <div className="text-left">
                          <span className="text-cyan-400 text-5xl font-bold block mb-2">10+</span>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">Websites Built</span>
                      </div>
                      <div className="text-left">
                          <span className="text-purple-400 text-5xl font-bold block mb-2">10+</span>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">Sectors Served</span>
                      </div>
                      <div className="text-left">
                          <span className="text-white text-5xl font-bold block mb-2">Google</span>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">Certified</span>
                      </div>
                  </motion.div>
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
