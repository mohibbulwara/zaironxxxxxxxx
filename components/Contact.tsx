
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Github, Twitter, Linkedin, Facebook, Instagram, Youtube, Zap } from 'lucide-react';

const Contact: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <section id="contact" className="py-24 bg-black relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 pb-24 border-b border-white/5">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl lg:text-7xl font-bold mb-8 leading-tight"
            >
              Let's <span className="text-cyan-400">Scale</span> Your Vision.
            </motion.h2>
            <p className="text-white/50 text-xl mb-12 max-w-md">
              Ready to engineer something powerful? Get in touch and let's start a conversation about your next project.
            </p>

            <div className="space-y-6 mb-16">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-cyan-400">
                        <Mail size={18} />
                    </div>
                    <span className="text-white/80 font-medium">hello@zaironx.dev</span>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-cyan-400">
                        <MapPin size={18} />
                    </div>
                    <span className="text-white/80 font-medium">Remote Worldwide</span>
                </div>
            </div>

            {/* Newsletter Module */}
            <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-3xl space-y-6 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Zap size={60} className="text-cyan-500" />
               </div>
               <div className="relative z-10">
                  <h4 className="text-lg font-bold text-white mb-2">Protocol Subscription</h4>
                  <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest mb-6">Receive architectural updates and system logs.</p>
                  
                  <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-3">
                     <input 
                       type="email" 
                       required
                       placeholder="node@cluster.ext"
                       className="flex-grow bg-black border border-zinc-800 rounded-xl px-5 py-3 text-sm text-white focus:border-cyan-500/50 outline-none transition-all"
                     />
                     <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl text-xs uppercase tracking-widest transition-all">
                        {subscribed ? 'SYNCED' : 'SUBSCRIBE'}
                     </button>
                  </form>
               </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass p-10 rounded-[3rem] border-white/5"
          >
            <form className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                  placeholder="john@company.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-1">Project Details</label>
                <textarea 
                  rows={4}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-400/50 transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              
              <button className="w-full py-5 bg-cyan-400 hover:bg-cyan-500 text-black font-bold rounded-2xl transition-all duration-300 flex items-center justify-center group">
                Send Message
                <Send size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer info */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">
          <div className="space-y-6">
             <div className="flex items-center gap-3">
               <div className="text-2xl font-black tracking-tighter">
                  Z<span className="text-cyan-400">X</span>
               </div>
               <span className="text-xl font-bold tracking-tighter text-white">Zaironx</span>
             </div>
             <p className="text-white/40 leading-relaxed">
               Engineering the future of immersive digital interfaces with precision and high-performance technology.
             </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">Navigation</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#home" className="hover:text-cyan-400 transition-colors">Home</a></li>
              <li><a href="#work" className="hover:text-cyan-400 transition-colors">Portfolio</a></li>
              <li><a href="#journal" className="hover:text-cyan-400 transition-colors">Journal</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">Connect</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><Facebook size={14} /> Facebook</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><Instagram size={14} /> Instagram</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><Linkedin size={14} /> LinkedIn</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">Developer</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><Github size={14} /> GitHub</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><Youtube size={14} /> YouTube</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center text-white/20 text-[9px] uppercase font-bold tracking-widest">
            <p>© 2024 Zaironx Studio. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
