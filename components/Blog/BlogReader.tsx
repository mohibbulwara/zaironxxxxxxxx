
import React from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '../../types';
import { ArrowLeft, User, Calendar, Share2 } from 'lucide-react';

const BlogReader: React.FC<{ post: BlogPost; onBack: () => void }> = ({ post, onBack }) => {
  return (
    <div className="min-h-screen bg-black text-zinc-300">
      <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center backdrop-blur-xl bg-black/50 border-b border-zinc-900">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-900 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft size={16} /> Return to Feed
        </button>
        <div className="flex items-center gap-6">
           <button className="text-zinc-500 hover:text-white transition-colors"><Share2 size={18} /></button>
           <div className="h-4 w-[1px] bg-zinc-800" />
           <div className="text-[10px] font-mono font-bold text-cyan-500 uppercase tracking-[0.3em]">READER_MODE: ON</div>
        </div>
      </nav>

      <main className="pt-40 pb-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <header className="mb-16 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 text-xs font-mono text-zinc-500 uppercase tracking-[0.3em]"
            >
              <span className="text-cyan-500 font-bold">Journal</span>
              <div className="w-1 h-1 rounded-full bg-zinc-800" />
              <span>{post.date}</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-[1.1]"
            >
              {post.title}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                  <User size={18} className="text-zinc-400" />
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-bold text-white uppercase tracking-widest">{post.author}</span>
                   <span className="text-[9px] text-zinc-600 font-mono">System Architect</span>
                </div>
              </div>
            </motion.div>
          </header>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-[3rem] overflow-hidden mb-20 border border-zinc-800 aspect-[21/9]"
          >
            <img src={post.image} alt="" className="w-full h-full object-cover" />
          </motion.div>

          <article className="prose prose-invert prose-cyan max-w-none text-zinc-400 text-lg md:text-xl leading-relaxed font-light space-y-8">
            {post.content.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </article>

          <div className="mt-24 pt-12 border-t border-zinc-900 flex flex-wrap gap-4">
             {post.tags.map(tag => (
               <span key={tag} className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-500 rounded-full uppercase tracking-widest">
                 #{tag}
               </span>
             ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogReader;
