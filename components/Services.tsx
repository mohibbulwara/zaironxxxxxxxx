
import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import * as LucideIcons from 'lucide-react';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold mb-4"
          >
            Core <span className="text-cyan-400">Expertise</span>
          </motion.h2>
          <div className="h-1 w-20 bg-cyan-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const iconName = service.icon;
            // Robust check for the icon component in the module
            const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Code;
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass p-8 rounded-3xl group hover:border-cyan-400/30 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-cyan-400/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300 text-cyan-400">
                  <IconComponent size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="mt-8 flex items-center text-cyan-400 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                  Learn More 
                  <LucideIcons.ArrowRight size={14} className="ml-2" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
