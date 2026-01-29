
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col items-end space-y-6">
        {NAV_ITEMS.map((item, idx) => (
          <motion.a
            key={item.href}
            href={item.href}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative flex items-center"
          >
            <span className="mr-4 text-xs font-medium uppercase tracking-widest text-white/50 group-hover:text-cyan-400 transition-colors opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
              {item.label}
            </span>
            <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-cyan-400 group-hover:scale-150 transition-all duration-300 border border-white/10 group-hover:border-cyan-400/50" />
          </motion.a>
        ))}
      </div>
    </nav>
  );
};

export const MobileNavbar: React.FC = () => {
    return (
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] glass rounded-full px-6 py-4 flex justify-between items-center overflow-x-auto space-x-6 no-scrollbar">
            {NAV_ITEMS.slice(0, 4).map((item) => (
                <a key={item.href} href={item.href} className="text-[10px] uppercase font-bold tracking-tighter text-white/70 whitespace-nowrap">
                    {item.label}
                </a>
            ))}
        </div>
    );
};

export default Navbar;
