
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from '../../types';
import SystemStorage from '../../lib/store';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';

const BlogSection: React.FC<{ onReadPost: (post: BlogPost) => void }> = ({ onReadPost }) => {
  const [posts, setPosts] = useState<BlogPost[]>(SystemStorage.getData().posts);

  useEffect(() => {
    const handleUpdate = () => setPosts(SystemStorage.getData().posts);
    window.addEventListener('system_data_updated', handleUpdate);
    return () => window.removeEventListener('system_data_updated', handleUpdate);
  }, []);

  return (
    <section id="journal" className="py-48 bg-black relative">
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.6em]">System Journal v1.0</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-zinc-100 tracking-tighter">
              The <span className="text-cyan-500 italic">Feed.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm max-w-sm lg:text-right leading-relaxed font-mono uppercase">
            Technical insights, architectural deep-dives, and system updates from the kernel team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onReadPost(post)}
              className="group cursor-pointer bg-zinc-900/20 border border-zinc-900 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                <div className="absolute top-4 left-4 flex gap-2">
                   {post.tags.map(tag => (
                     <span key={tag} className="px-2 py-1 bg-black/60 border border-white/10 text-[8px] font-bold text-zinc-400 rounded-sm backdrop-blur-md uppercase tracking-widest">
                       {tag}
                     </span>
                   ))}
                </div>
              </div>

              <div className="p-8 space-y-4">
                <div className="flex items-center gap-4 text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-zinc-800" />
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} />
                    <span>5 MIN READ</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="pt-4 flex items-center gap-3 text-cyan-400 font-bold text-[10px] uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
                  Access Data <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
