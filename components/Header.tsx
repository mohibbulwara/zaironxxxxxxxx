import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Header: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    }).replace(' AM', ' AM').replace(' PM', ' PM');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 lg:px-10 py-6 flex items-center text-[10px] font-bold uppercase tracking-widest text-white transition-all duration-500">
      
      {/* Left Section: Brand Name & Time */}
      <div className="flex-1 flex items-center space-x-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="cursor-pointer whitespace-nowrap"
        >
          Zaironx Studio
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="hidden md:block text-white/40 font-medium tabular-nums"
        >
          {formatTime(time)}
        </motion.div>
      </div>

      {/* Center Section: ZX Text Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-auto cursor-pointer"
      >
        <div className="text-2xl font-black tracking-tighter">
          Z<span className="text-cyan-400">X</span>
        </div>
      </motion.div>

      {/* Right Section: Email, Nav & CTA */}
      <div className="flex-1 flex items-center justify-end space-x-12">
        <motion.a 
          href="mailto:hello@zaironx.dev"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="hidden lg:block text-white/60 hover:text-white transition-colors"
        >
          hello@zaironx.dev
        </motion.a>

        <motion.nav 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="hidden xl:flex items-center space-x-6 text-white/40"
        >
          {['Work', 'Services', 'About'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="hover:text-white transition-colors"
            >
              {item}.
            </a>
          ))}
        </motion.nav>

        <motion.a 
          href="#contact"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center space-x-1 text-white group"
        >
          <span>Inquiries</span>
          <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.a>
      </div>

      {/* Bottom Border/Separator */}
      <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-white/5" />
    </header>
  );
};

export default Header;