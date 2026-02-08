
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Settings, 
  Plus, 
  Trash2, 
  ChevronRight,
  Sparkles,
  LogOut,
  Layers,
  BookOpen,
  Image as ImageIcon,
  Loader2,
  Globe,
  Tag,
  Search,
  CheckCircle2,
  LayoutGrid,
  Type,
  Link as LinkIcon
} from 'lucide-react';
import SystemStorage from '../../lib/store';
import { Project, Service, BlogPost, Skill } from '../../types';
import { GoogleGenAI } from "@google/genai";

const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'services' | 'skills' | 'journal'>('projects');
  const [data, setData] = useState<any>(null);
  const [isAILoading, setIsAILoading] = useState(false);
  const [isImageGenerating, setIsImageGenerating] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const initData = () => {
      const currentData = SystemStorage.getData();
      setData(currentData);
    };
    initData();
    window.addEventListener('system_data_updated', initData);
    return () => window.removeEventListener('system_data_updated', initData);
  }, []);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAISEO = async (postIndex: number) => {
    setIsAILoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const post = data.posts[postIndex];
      const prompt = `Generate a high-conversion, professional SEO meta description (max 155 chars) and 5 relevant keywords for this article titled "${post.title}". Content: "${post.content.substring(0, 300)}"`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      
      const resText = response.text || "";
      const meta = resText.split('\n')[0].replace('Meta Description:', '').trim();
      
      const updatedPosts = [...data.posts];
      updatedPosts[postIndex] = { ...updatedPosts[postIndex], metaDescription: meta };
      SystemStorage.updatePosts(updatedPosts);
      notify("SEO Data Optimized");
    } catch (e) {
      console.error(e);
    } finally {
      setIsAILoading(false);
    }
  };

  if (!data) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-cyan-500" size={32} />
      <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Hydrating Core Registry...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans flex flex-col lg:flex-row">
      <aside className="w-full lg:w-72 bg-black border-r border-zinc-900 flex flex-col p-6 space-y-8 z-30">
        <div className="flex items-center gap-3 mb-10">
          <div className="text-2xl font-black tracking-tighter text-white">Z<span className="text-cyan-400">X</span></div>
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-zinc-600">KERNEL_CMS_PRO</span>
        </div>

        <nav className="space-y-1 flex-grow">
          {[
            { id: 'projects', label: 'Work Registry', icon: Briefcase },
            { id: 'services', label: 'Arch Domains', icon: Layers },
            { id: 'skills', label: 'Tech Stack', icon: Settings },
            { id: 'journal', label: 'Journal SEO', icon: BookOpen },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                activeTab === tab.id ? 'bg-cyan-500/10 text-cyan-400' : 'hover:bg-zinc-900 text-zinc-500'
              }`}
            >
              <tab.icon size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{tab.label}</span>
              {activeTab === tab.id && <div className="ml-auto w-1 h-1 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />}
            </button>
          ))}
        </nav>

        <button onClick={onLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-zinc-700 hover:text-red-400 transition-all">
          <LogOut size={18} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Terminate Session</span>
        </button>
      </aside>

      <main className="flex-grow p-6 lg:p-12 overflow-y-auto max-h-screen custom-scrollbar relative">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight uppercase italic mb-1">
              {activeTab} <span className="text-zinc-700 font-normal tracking-normal not-italic">Terminal</span>
            </h1>
            <div className="flex items-center gap-3 font-mono text-[9px] text-zinc-600">
              <span className="text-green-500/50 flex items-center gap-1"><CheckCircle2 size={10}/> DEPLOYED</span>
              <span>•</span>
              <span className="text-cyan-500/50 flex items-center gap-1"><Sparkles size={10}/> AI_SYNCED</span>
            </div>
          </div>

          <button onClick={() => {
            if (activeTab === 'projects') {
              const newProj = { title: 'New Deployment', category: 'Dev', image: '', tags: [], link: '#' };
              SystemStorage.updateProjects([newProj, ...data.projects]);
            } else if (activeTab === 'journal') {
              const newPost = { id: Date.now().toString(), title: 'New Article', slug: '', excerpt: '', content: '', date: 'NOV 2024', author: 'Admin', image: '', tags: [], metaDescription: '', keywords: [] };
              SystemStorage.updatePosts([newPost, ...data.posts]);
            }
          }} className="px-5 py-2.5 bg-zinc-100 text-black rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors flex items-center gap-2">
            <Plus size={14} /> Add New Entry
          </button>
        </header>

        <AnimatePresence mode="wait">
          {/* --- PROJECTS REGISTRY --- */}
          {activeTab === 'projects' && (
            <motion.div key="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {data.projects.map((p: Project, i: number) => (
                <div key={i} className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2rem] space-y-6 group">
                  <div className="flex justify-between items-start">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border border-zinc-800 bg-black flex-shrink-0">
                      <img src={p.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b'} className="w-full h-full object-cover" />
                    </div>
                    <button onClick={() => {
                      const updated = data.projects.filter((_: any, idx: number) => idx !== i);
                      SystemStorage.updateProjects(updated);
                    }} className="p-3 text-zinc-700 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[8px] font-mono text-zinc-700 uppercase tracking-[0.2em]">Project_ID</label>
                      <input 
                        className="w-full bg-transparent border-none text-xl font-bold text-white focus:text-cyan-400 outline-none"
                        value={p.title}
                        onChange={(e) => {
                          const updated = [...data.projects]; updated[i].title = e.target.value;
                          SystemStorage.updateProjects(updated);
                        }}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1">
                          <label className="text-[8px] font-mono text-zinc-700 uppercase tracking-[0.2em]">Domain</label>
                          <input className="w-full bg-black/40 border border-zinc-800 rounded-lg px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase outline-none" value={p.category} onChange={(e) => {
                            const updated = [...data.projects]; updated[i].category = e.target.value; SystemStorage.updateProjects(updated);
                          }} />
                       </div>
                       <div className="space-y-1">
                          <label className="text-[8px] font-mono text-zinc-700 uppercase tracking-[0.2em]">Live_Link</label>
                          <input className="w-full bg-black/40 border border-zinc-800 rounded-lg px-3 py-2 text-[10px] font-mono text-zinc-500 outline-none" value={p.link} onChange={(e) => {
                            const updated = [...data.projects]; updated[i].link = e.target.value; SystemStorage.updateProjects(updated);
                          }} />
                       </div>
                    </div>

                    <div className="space-y-1">
                       <label className="text-[8px] font-mono text-zinc-700 uppercase tracking-[0.2em]">Asset_Inject_URL</label>
                       <input className="w-full bg-black/40 border border-zinc-800 rounded-lg px-3 py-2 text-[10px] font-mono text-zinc-600 outline-none focus:border-cyan-500/30" value={p.image} onChange={(e) => {
                         const updated = [...data.projects]; updated[i].image = e.target.value; SystemStorage.updateProjects(updated);
                       }} />
                    </div>

                    <div className="space-y-1">
                       <label className="text-[8px] font-mono text-zinc-700 uppercase tracking-[0.2em]">Protocol_Tags (Comma Separated)</label>
                       <input 
                         className="w-full bg-black/40 border border-zinc-800 rounded-lg px-3 py-2 text-[10px] font-mono text-zinc-600 outline-none" 
                         value={p.tags.join(', ')} 
                         onChange={(e) => {
                            const updated = [...data.projects]; updated[i].tags = e.target.value.split(',').map(s => s.trim()); 
                            SystemStorage.updateProjects(updated);
                         }} 
                       />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* --- JOURNAL SEO --- */}
          {activeTab === 'journal' && (
            <motion.div key="journal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
               {data.posts.map((post: BlogPost, i: number) => (
                 <div key={post.id} className="p-10 bg-zinc-900/30 border border-zinc-800 rounded-[3rem] space-y-10 group">
                    <div className="flex justify-between items-center border-b border-zinc-800 pb-8">
                       <div className="flex-grow max-w-2xl">
                          <input 
                            className="w-full bg-transparent border-none text-4xl font-black text-white outline-none focus:text-cyan-400"
                            value={post.title}
                            onChange={(e) => {
                              const updated = [...data.posts]; updated[i].title = e.target.value;
                              SystemStorage.updatePosts(updated);
                            }}
                          />
                          <div className="flex items-center gap-4 mt-4">
                             <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20 text-[8px] font-mono text-cyan-400 uppercase tracking-widest">
                               <Globe size={10} /> /{post.slug || 'no-slug'}
                             </div>
                             <div className="px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20 text-[8px] font-mono text-green-400 uppercase tracking-widest">
                               SEO_OPTIMIZED
                             </div>
                          </div>
                       </div>
                       <button onClick={() => {
                          const updated = data.posts.filter((p: BlogPost) => p.id !== post.id);
                          SystemStorage.updatePosts(updated);
                       }} className="p-4 text-zinc-800 hover:text-red-500 transition-colors">
                          <Trash2 size={24} />
                       </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                       {/* SEO COLUMN */}
                       <div className="lg:col-span-4 space-y-6 border-r border-zinc-800/50 pr-8">
                          <div className="space-y-2">
                             <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2"><Search size={12}/> Meta Description</label>
                             <textarea 
                               className="w-full bg-black/40 border border-zinc-800 rounded-xl p-4 text-xs text-zinc-400 outline-none h-24 focus:border-cyan-500/30"
                               value={post.metaDescription}
                               onChange={(e) => {
                                 const updated = [...data.posts]; updated[i].metaDescription = e.target.value;
                                 SystemStorage.updatePosts(updated);
                               }}
                             />
                             <button onClick={() => handleAISEO(i)} className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-[9px] font-bold rounded-lg flex items-center justify-center gap-2 uppercase tracking-widest">
                                <Sparkles size={12} className="text-cyan-400" /> Auto-Synthesize SEO
                             </button>
                          </div>
                          
                          <div className="space-y-2">
                             <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2"><LinkIcon size={12}/> Asset Injector</label>
                             <div className="aspect-video rounded-xl bg-black border border-zinc-800 overflow-hidden mb-2">
                                <img src={post.image} className="w-full h-full object-cover" />
                             </div>
                             <input className="w-full bg-black/40 border border-zinc-800 rounded-lg px-3 py-2 text-[10px] font-mono text-zinc-500 outline-none" value={post.image} onChange={(e) => {
                               const updated = [...data.posts]; updated[i].image = e.target.value; SystemStorage.updatePosts(updated);
                             }} />
                          </div>
                       </div>

                       {/* CONTENT COLUMN */}
                       <div className="lg:col-span-8 space-y-8">
                          <div className="space-y-2">
                             <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Journal Payload (Body Content)</label>
                             <textarea 
                               className="w-full bg-black/20 border border-zinc-800 rounded-3xl p-8 text-zinc-300 text-lg leading-relaxed outline-none h-[400px] focus:border-cyan-500/20"
                               value={post.content}
                               onChange={(e) => {
                                 const updated = [...data.posts]; updated[i].content = e.target.value;
                                 SystemStorage.updatePosts(updated);
                               }}
                             />
                          </div>
                       </div>
                    </div>
                 </div>
               ))}
            </motion.div>
          )}

          {/* --- TECH STACK --- */}
          {activeTab === 'skills' && (
             <motion.div key="skills" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                {data.skills.map((cat: any, cIdx: number) => (
                  <div key={cIdx} className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem]">
                     <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
                        <input className="bg-transparent border-none text-xl font-black text-white uppercase outline-none" value={cat.category} onChange={(e) => {
                          const updated = [...data.skills]; updated[cIdx].category = e.target.value; SystemStorage.updateSkills(updated);
                        }} />
                        <button onClick={() => {
                          const updated = [...data.skills];
                          updated[cIdx].items.push({ name: 'New Module', level: 80 });
                          SystemStorage.updateSkills(updated);
                        }} className="p-2 bg-zinc-800 text-cyan-400 rounded-lg"><Plus size={16}/></button>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {cat.items.map((skill: Skill, sIdx: number) => (
                          <div key={sIdx} className="p-4 bg-black/40 border border-zinc-800 rounded-xl space-y-3">
                             <div className="flex justify-between">
                                <input className="bg-transparent border-none text-[10px] font-bold text-zinc-400 outline-none" value={skill.name} onChange={(e) => {
                                  const updated = [...data.skills]; updated[cIdx].items[sIdx].name = e.target.value; SystemStorage.updateSkills(updated);
                                }} />
                                <button onClick={() => {
                                  const updated = [...data.skills];
                                  updated[cIdx].items = updated[cIdx].items.filter((_: any, idx: number) => idx !== sIdx);
                                  SystemStorage.updateSkills(updated);
                                }} className="text-zinc-800 hover:text-red-500"><Trash2 size={12}/></button>
                             </div>
                             <input type="range" min="0" max="100" className="w-full accent-cyan-500 bg-zinc-800 h-1 rounded-full appearance-none" value={skill.level} onChange={(e) => {
                               const updated = [...data.skills]; updated[cIdx].items[sIdx].level = parseInt(e.target.value); SystemStorage.updateSkills(updated);
                             }} />
                          </div>
                        ))}
                     </div>
                  </div>
                ))}
             </motion.div>
          )}

          {/* --- ARCH DOMAINS --- */}
          {activeTab === 'services' && (
             <motion.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {data.services.map((service: Service, sIdx: number) => (
                  <div key={sIdx} className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-3xl flex items-start gap-8">
                     <div className="w-16 h-16 bg-black border border-zinc-800 rounded-2xl flex items-center justify-center text-cyan-500"><Layers size={24}/></div>
                     <div className="flex-grow space-y-4">
                        <input className="w-full bg-transparent border-none text-2xl font-bold text-white outline-none" value={service.title} onChange={(e) => {
                           const updated = [...data.services]; updated[sIdx].title = e.target.value; SystemStorage.updateServices(updated);
                        }} />
                        <textarea className="w-full bg-black/20 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-500 outline-none h-20" value={service.description} onChange={(e) => {
                           const updated = [...data.services]; updated[sIdx].description = e.target.value; SystemStorage.updateServices(updated);
                        }} />
                     </div>
                     <button onClick={() => {
                        const updated = data.services.filter((_: any, idx: number) => idx !== sIdx);
                        SystemStorage.updateServices(updated);
                     }} className="p-4 text-zinc-800 hover:text-red-500"><Trash2 size={20}/></button>
                  </div>
                ))}
             </motion.div>
          )}
        </AnimatePresence>

        {/* Global Toast Notification */}
        <AnimatePresence>
           {toast && (
             <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 bg-cyan-500 text-black rounded-full font-bold text-[10px] uppercase tracking-widest shadow-2xl z-[100] flex items-center gap-3">
               <CheckCircle2 size={14} /> {toast}
             </motion.div>
           )}
        </AnimatePresence>

        {isAILoading && (
          <div className="fixed top-10 right-10 flex items-center gap-3 px-6 py-3 bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-full shadow-2xl z-[100]">
            <Loader2 className="animate-spin text-cyan-400" size={16} />
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Logic Engine: Processing...</span>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
