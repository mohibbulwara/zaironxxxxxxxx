
import React, { useEffect, useState, useRef } from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Header from './components/Header';
import CursorTrail from './components/CursorTrail';
import Login from './components/Admin/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import BlogSection from './components/Blog/BlogSection';
import BlogReader from './components/Blog/BlogReader';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPost } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'login' | 'admin' | 'reader'>('landing');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setView('login');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleReadPost = (post: BlogPost) => {
    setSelectedPost(post);
    setView('reader');
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-black min-h-screen relative selection:bg-cyan-500/30 overflow-x-hidden">
      <CursorTrail />
      
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Header />
            <main>
              <Hero />
              <Services />
              <Skills />
              <Experience />
              <Portfolio />
              <BlogSection onReadPost={handleReadPost} />
              <Contact />
            </main>
            <footer className="py-12 border-t border-white/5 bg-black flex flex-col items-center">
               <button 
                 onClick={() => setView('login')}
                 className="text-[9px] font-mono text-zinc-800 uppercase tracking-[0.5em] hover:text-cyan-500/40 transition-colors"
               >
                 Terminal_Auth_Access
               </button>
            </footer>
          </motion.div>
        )}

        {view === 'reader' && selectedPost && (
          <motion.div key="reader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <BlogReader post={selectedPost} onBack={() => setView('landing')} />
          </motion.div>
        )}

        {view === 'login' && (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Login onLogin={() => setView('admin')} />
          </motion.div>
        )}

        {view === 'admin' && (
          <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AdminDashboard onLogout={() => setView('landing')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
