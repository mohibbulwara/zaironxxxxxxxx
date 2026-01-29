
import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ExternalLink } from 'lucide-react';

const Portfolio: React.FC = () => {
  return (
    <section id="work" className="py-24 bg-[#080808]">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold mb-4"
            >
              Selected <span className="text-cyan-400">Work</span>
            </motion.h2>
            <div className="h-1 w-20 bg-cyan-400" />
          </div>
          <a href="#" className="hidden lg:block text-xs font-bold uppercase tracking-widest text-white/50 hover:text-cyan-400 transition-colors">
            View Archive →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[400px] rounded-[2.5rem] overflow-hidden cursor-pointer"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end transform transition-transform duration-500">
                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400 mb-2 block">{project.category}</span>
                    <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-3 py-1 glass rounded-full text-white/70 border-white/10 uppercase">
                            {tag}
                        </span>
                        ))}
                    </div>
                </div>
                
                <div className="absolute top-10 right-10 w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500">
                  <ExternalLink size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
