
import React from 'react';
import { motion } from 'framer-motion';
import { STATS } from '../constants';
import { CheckCircle, Award, Star } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section className="py-24 bg-black border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center group"
            >
              <h4 className="text-5xl lg:text-7xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-500">
                {stat.value}
              </h4>
              <p className="text-xs uppercase font-bold tracking-widest text-white/40 group-hover:text-white/60 transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="glass p-12 rounded-[3rem] relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Award size={120} className="text-cyan-400" />
                </div>
                <h3 className="text-3xl font-bold mb-8">Professional Journey</h3>
                <div className="space-y-8">
                    <div className="flex gap-6">
                        <div className="flex-shrink-0 w-12 h-12 bg-cyan-400/10 rounded-xl flex items-center justify-center text-cyan-400">
                            <Star size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">Former Fiverr & Upwork Freelancer</h4>
                            <p className="text-white/50 text-sm">High-credibility professional delivering top-tier solutions to global clients.</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="flex-shrink-0 w-12 h-12 bg-purple-400/10 rounded-xl flex items-center justify-center text-purple-400">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">Currently Working at XyronX</h4>
                            <p className="text-white/50 text-sm">Contributing to enterprise-grade web applications and innovative software suites.</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="flex-shrink-0 w-12 h-12 bg-green-400/10 rounded-xl flex items-center justify-center text-green-400">
                            <Award size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">Google Certified Professional</h4>
                            <p className="text-white/50 text-sm">Validating expertise in cloud architecture and professional software engineering.</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="space-y-6"
            >
                <h3 className="text-4xl font-bold">Bridging <span className="text-cyan-400">Vision</span> and Reality</h3>
                <p className="text-white/60 text-lg leading-relaxed">
                    With over 10 successfully delivered projects across various industries, Zaironx represents the pinnacle of modern web engineering. From early internships to professional stints at XyronX, our founder brings enterprise-level standards to every client interaction.
                </p>
                <div className="pt-4 grid grid-cols-2 gap-4">
                    <div className="glass px-6 py-4 rounded-2xl border-white/5">
                        <p className="text-xs font-bold text-white/40 uppercase mb-1">Status</p>
                        <p className="text-sm font-bold">Open to Hire</p>
                    </div>
                    <div className="glass px-6 py-4 rounded-2xl border-white/5">
                        <p className="text-xs font-bold text-white/40 uppercase mb-1">Timezone</p>
                        <p className="text-sm font-bold">Global / Remote</p>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
