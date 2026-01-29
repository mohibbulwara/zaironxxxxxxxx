
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Github, Twitter, Linkedin, Facebook, Instagram, Youtube } from 'lucide-react';

const Contact: React.FC = () => {
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

            <div className="space-y-6">
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

        {/* Extended Footer Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">
          <div className="space-y-6">
             <span className="text-xl font-bold tracking-tighter text-white">z<span className="text-cyan-400">x</span></span>
             <p className="text-white/40 leading-relaxed">
               Engineering the future of immersive digital interfaces with precision and high-performance technology.
             </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">Navigation</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="#home" className="hover:text-cyan-400 transition-colors">Home</a></li>
              <li><a href="#work" className="hover:text-cyan-400 transition-colors">Portfolio</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">About Studio</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">Connect</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="https://facebook.com" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><Facebook size={14} /> Facebook</a></li>
              <li><a href="https://instagram.com" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><Instagram size={14} /> Instagram</a></li>
              <li><a href="https://linkedin.com" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><Linkedin size={14} /> LinkedIn</a></li>
              <li><a href="https://twitter.com" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><Twitter size={14} /> X (Twitter)</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">Developer</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="https://github.com" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><Github size={14} /> GitHub</a></li>
              <li><a href="https://youtube.com" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><Youtube size={14} /> YouTube</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><Mail size={14} /> Hire Me</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center text-white/20 text-[9px] uppercase font-bold tracking-widest">
            <p>© 2024 Zaironx Studio. All rights reserved.</p>
            <div className="flex space-x-8 mt-4 lg:mt-0">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full -z-10" />
    </section>
  );
};

export default Contact;
