
import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-[#080808]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold mb-6"
            >
              Mastered <span className="text-purple-400">Technologies</span>
            </motion.h2>
            <p className="text-white/60 text-lg max-w-lg mb-12">
              Leveraging the most advanced modern tech stack to build robust, future-proof applications.
            </p>
            
            <div className="flex flex-wrap gap-4">
              {['Git', 'Docker', 'Firebase Studio', 'Cloud Functions', 'AWS', 'Vercel'].map((tool) => (
                <span key={tool} className="glass px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest border border-white/5 hover:border-purple-400/50 transition-colors cursor-default">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            {SKILLS.map((category) => (
              <div key={category.category}>
                <h3 className="text-xs uppercase font-bold tracking-[0.3em] text-white/40 mb-8 flex items-center">
                  <span className="mr-4">{category.category}</span>
                  <div className="h-[1px] flex-grow bg-white/10" />
                </h3>
                <div className="space-y-6">
                  {category.items.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-end mb-2">
                        <span className="font-bold text-white/80">{skill.name}</span>
                        <span className="text-xs font-bold text-cyan-400">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
