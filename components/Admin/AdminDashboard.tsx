
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Settings, 
  Plus, 
  Trash2, 
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
  ExternalLink,
  Zap,
  Share2,
  Eye,
  // Fix: Added LayoutGrid to imports from lucide-react
  LayoutGrid
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
      if (currentData) setData(currentData);
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
      const prompt = `Act as an SEO Specialist. For the article titled "${post.title}", generate:
1. A professional SEO Meta Description (max 155 characters).
2. A list of 5 high-ranking focus keywords.
3. A clean URL slug.
Provide response in a structured format. Content for reference: "${post.content.substring(0, 400)}"`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      
      const resText = response.text || "";
      // Simple parsing logic
      const lines = resText.split('\n').filter(l => l.trim().length > 0);
      const metaDesc = lines.find(l => l.toLowerCase().includes('description'))?.split(':')[1]?.trim() || post.metaDescription;
      
      const updatedPosts = [...data.posts];
      updatedPosts[postIndex] = { 
        ...updatedPosts[postIndex], 
        metaDescription: metaDesc 
      };
      SystemStorage.updatePosts(updatedPosts);
      notify("SEO Intelligence Applied");
    } catch (e) {
      console.error(e);
      notify("AI Sync Failed");
    } finally {
      setIsAILoading(false);
    }
  };

  const updateSlug = (title: string, index: number) => {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const updatedPosts = [...data.posts];
    updatedPosts[index].slug = slug;
    SystemStorage.updatePosts(updatedPosts);
  };

  if (!data) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
      <div className="relative">
         <Loader2 className="animate-spin text-cyan-500" size={48} />
         <div className="absolute inset-0 blur-xl bg-cyan-500/20 animate-pulse rounded-full" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-white font-black uppercase tracking-tighter text-xl italic">Authenticating Kernel</h3>
        <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Verifying Storage Nodes... 0%</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans flex flex-col lg:flex-row">
      <aside className="w-full lg:w-72 bg-black border-r border-zinc-900 flex flex-col p-6 space-y-8 z-30">
        <div className="flex items-center gap-3 mb-10">
          <div className="text-2xl font-black tracking-tighter text-white">Z<span className="text-cyan-400">X</span></div>
          <div className="flex flex-col">
             <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-white">KERNEL_STUDIO</span>
             <span className="text-[8px] font-mono text-zinc-700 tracking-[0.1em]">VERSION 4.2.0 STABLE</span>
          </div>
        </div>

        <nav className="space-y-1 flex-grow">
          {[
            { id: 'projects', label: 'Works Registry', icon: Briefcase },
            { id: 'services', label: 'Arch Domains', icon: Layers },
            { id: 'skills', label: 'Tech Stack', icon: Settings },
            { id: 'journal', label: 'Journal Studio', icon: BookOpen },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                activeTab === tab.id ? 'bg-cyan-500/10 text-cyan-400' : 'hover:bg-zinc-900 text-zinc-500'
              }`}
            >
              <tab.icon size={18} className={activeTab === tab.id ? 'text-cyan-400' : 'group-hover:text-zinc-300'} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{tab.label}</span>
              {activeTab === tab.id && <div className="ml-auto w-1 h-1 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />}
            </button>
          ))}
        </nav>

        <div className="p-4 bg-zinc-900/40 rounded-2xl border border-zinc-800/50 mb-4">
           <div className="flex items-center gap-3 mb-2">
              <Zap size={14} className="text-cyan-400" />
              <span className="text-[9px] font-bold text-white uppercase tracking-widest">Active Server</span>
           </div>
           <p className="text-[8px] font-mono text-zinc-600 uppercase">Node: zx-alpha-v4</p>
           <p className="text-[8px] font-mono text-zinc-600 uppercase">Uptime: 99.99%</p>
        </div>

        <button onClick={onLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-zinc-700 hover:text-red-400 transition-all">
          <LogOut size={18} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Terminate Session</span>
        </button>
      </aside>

      <main className="flex-grow p-6 lg:p-12 overflow-y-auto max-h-screen custom-scrollbar relative">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight uppercase italic mb-1">
              {activeTab} <span className="text-zinc-700 font-normal tracking-normal not-italic underline decoration-cyan-500/30">Management</span>
            </h1>
            <div className="flex items-center gap-3 font-mono text-[9px] text-zinc-600">
              <span className="text-green-500/50 flex items-center gap-1"><CheckCircle2 size={10}/> SEO_SYNCED</span>
              <span>•</span>
              <span className="text-cyan-500/50 flex items-center gap-1 uppercase tracking-widest">Authorized_Terminal</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => {
              if (activeTab === 'projects') {
                SystemStorage.updateProjects([{ title: 'New Work', category: 'General', image: '', tags: [], link: '#' }, ...data.projects]);
              } else if (activeTab === 'journal') {
                SystemStorage.updatePosts([{ id: Date.now().toString(), title: 'Untilted Article', slug: '', excerpt: '', content: '', date: 'NOV 2024', author: 'Zaironx Admin', image: '', tags: [], metaDescription: '', keywords: [] }, ...data.posts]);
              }
            }} className="px-6 py-3 bg-zinc-100 text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-cyan-400 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              <Plus size={16} strokeWidth={3} /> Add New {activeTab === 'projects' ? 'Work' : 'Entry'}
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {/* --- PROJECTS MANAGEMENT --- */}
          {activeTab === 'projects' && (
            <motion.div key="projects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {data.projects.map((p: Project, i: number) => (
                <div key={i} className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] space-y-6 group hover:border-cyan-500/20 transition-all">
                  <div className="flex justify-between items-start">
                    <div className="w-32 h-32 rounded-3xl overflow-hidden border border-zinc-800 bg-black flex-shrink-0 relative group/img">
                      <img src={p.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b'} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-all">
                         <ImageIcon className="text-cyan-400" size={24} />
                      </div>
                    </div>
                    <button onClick={() => {
                      const updated = data.projects.filter((_: any, idx: number) => idx !== i);
                      SystemStorage.updateProjects(updated);
                      notify("Registry Item Purged");
                    }} className="p-3 text-zinc-700 hover:text-red-500 transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-1">
                      <label className="text-[8px] font-mono text-zinc-600 uppercase tracking-[0.2em]">Work_Identity</label>
                      <input 
                        className="w-full bg-black/40 border border-zinc-800 rounded-xl px-5 py-3 text-xl font-bold text-white focus:border-cyan-500/50 outline-none transition-all"
                        value={p.title}
                        onChange={(e) => {
                          const updated = [...data.projects]; updated[i].title = e.target.value;
                          SystemStorage.updateProjects(updated);
                        }}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-5">
                       <div className="space-y-1">
                          <label className="text-[8px] font-mono text-zinc-600 uppercase tracking-[0.2em]">Domain_Sector</label>
                          <input className="w-full bg-black/40 border border-zinc-800 rounded-xl px-5 py-3 text-[10px] font-bold text-zinc-500 uppercase outline-none focus:border-cyan-500/50" value={p.category} onChange={(e) => {
                            const updated = [...data.projects]; updated[i].category = e.target.value; SystemStorage.updateProjects(updated);
                          }} />
                       </div>
                       <div className="space-y-1">
                          <label className="text-[8px] font-mono text-zinc-600 uppercase tracking-[0.2em]">Live_Endpoint</label>
                          <input className="w-full bg-black/40 border border-zinc-800 rounded-xl px-5 py-3 text-[10px] font-mono text-zinc-500 outline-none focus:border-cyan-500/50" value={p.link} onChange={(e) => {
                            const updated = [...data.projects]; updated[i].link = e.target.value; SystemStorage.updateProjects(updated);
                          }} />
                       </div>
                    </div>

                    <div className="space-y-1">
                       <label className="text-[8px] font-mono text-zinc-600 uppercase tracking-[0.2em]">Asset_Injection_Link</label>
                       <input className="w-full bg-black/40 border border-zinc-800 rounded-xl px-5 py-3 text-[10px] font-mono text-zinc-600 outline-none focus:border-cyan-500/50" value={p.image} onChange={(e) => {
                         const updated = [...data.projects]; updated[i].image = e.target.value; SystemStorage.updateProjects(updated);
                       }} />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* --- JOURNAL STUDIO (SEO FOCUS) --- */}
          {activeTab === 'journal' && (
            <motion.div key="journal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-16">
               {data.posts.map((post: BlogPost, i: number) => (
                 <div key={post.id} className="p-12 bg-zinc-900/30 border border-zinc-800 rounded-[3rem] space-y-12 group relative">
                    <div className="absolute top-0 right-0 p-12 flex gap-4">
                        <button onClick={() => notify("Article Preview Generated")} className="p-3 bg-zinc-800 text-zinc-400 rounded-2xl hover:text-cyan-400 transition-colors">
                            <Eye size={20} />
                        </button>
                        <button onClick={() => {
                          const updated = data.posts.filter((p: BlogPost) => p.id !== post.id);
                          SystemStorage.updatePosts(updated);
                          notify("Entry Permanently Purged");
                       }} className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-black transition-all">
                          <Trash2 size={20} />
                       </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                       {/* SEO & GOOGLE PREVIEW COLUMN */}
                       <div className="lg:col-span-5 space-y-10">
                          <div className="space-y-4">
                             <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em] flex items-center gap-2">
                                <Search size={14} /> Google_SERP_Preview
                             </h4>
                             <div className="p-6 bg-white rounded-2xl shadow-xl space-y-2">
                                <div className="text-xs text-[#202124] flex items-center gap-1">
                                   https://zaironx.dev › journal › <span className="font-medium">{post.slug || 'untitled-slug'}</span>
                                </div>
                                <div className="text-xl text-[#1a0dab] hover:underline cursor-pointer font-medium leading-tight line-clamp-1">
                                   {post.title || 'Untitled Article'} | Zaironx Studio
                                </div>
                                <div className="text-sm text-[#4d5156] line-clamp-2 leading-relaxed">
                                   {post.metaDescription || 'No meta description configured for this entry. SEO performance will be degraded.'}
                                </div>
                             </div>
                          </div>

                          <div className="space-y-6 p-8 bg-black/40 border border-zinc-800 rounded-3xl">
                             <div className="space-y-2">
                                <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2"><Globe size={12}/> Clean URL Slug</label>
                                <input 
                                  className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-3 text-[11px] font-mono text-cyan-400 outline-none focus:border-cyan-500/40" 
                                  value={post.slug}
                                  onChange={(e) => {
                                      const updated = [...data.posts]; updated[i].slug = e.target.value; SystemStorage.updatePosts(updated);
                                  }}
                                  placeholder="e-g-digital-architecture-future" 
                                />
                             </div>

                             <div className="space-y-2">
                                <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2"><Tag size={12}/> Focus Keywords</label>
                                <input 
                                  className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-3 text-[10px] font-mono text-zinc-400 outline-none focus:border-cyan-500/40" 
                                  value={post.keywords?.join(', ')}
                                  onChange={(e) => {
                                      const updated = [...data.posts]; updated[i].keywords = e.target.value.split(',').map(k => k.trim()); SystemStorage.updatePosts(updated);
                                  }}
                                  placeholder="react, engineering, architecture" 
                                />
                             </div>

                             <div className="space-y-2">
                                <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Meta Description</label>
                                <textarea 
                                  className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-500 outline-none h-24 focus:border-cyan-500/30 resize-none"
                                  value={post.metaDescription}
                                  onChange={(e) => {
                                    const updated = [...data.posts]; updated[i].metaDescription = e.target.value;
                                    SystemStorage.updatePosts(updated);
                                  }}
                                />
                                <button onClick={() => handleAISEO(i)} className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-[10px] font-black rounded-xl flex items-center justify-center gap-3 uppercase tracking-widest transition-all">
                                   <Sparkles size={14} className="text-cyan-400" /> Optimize via AI Engine
                                </button>
                             </div>
                          </div>
                       </div>

                       {/* ARTICLE COMPOSER COLUMN */}
                       <div className="lg:col-span-7 space-y-8">
                          <div className="space-y-3">
                             <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">Journal_Heading</label>
                             <input 
                               className="w-full bg-transparent border-none text-5xl font-black text-white outline-none focus:text-cyan-400 transition-colors"
                               value={post.title}
                               onChange={(e) => {
                                 const updated = [...data.posts]; updated[i].title = e.target.value;
                                 SystemStorage.updatePosts(updated);
                                 updateSlug(e.target.value, i);
                               }}
                             />
                          </div>

                          <div className="grid grid-cols-2 gap-8">
                             <div className="space-y-2">
                                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">Cover_Asset_Link</label>
                                <div className="aspect-video rounded-[2rem] bg-black border border-zinc-800 overflow-hidden mb-4 relative group/img">
                                   <img src={post.image} className="w-full h-full object-cover" />
                                   <div className="absolute bottom-4 left-4 right-4 p-4 glass rounded-xl opacity-0 group-hover/img:opacity-100 transition-all">
                                      <p className="text-[8px] font-mono text-zinc-400 uppercase truncate">{post.image}</p>
                                   </div>
                                </div>
                                <input className="w-full bg-black/40 border border-zinc-800 rounded-xl px-5 py-3 text-[10px] font-mono text-zinc-500 outline-none focus:border-cyan-500/50" value={post.image} onChange={(e) => {
                                  const updated = [...data.posts]; updated[i].image = e.target.value; SystemStorage.updatePosts(updated);
                                }} placeholder="https://unsplash.com/..." />
                             </div>

                             <div className="space-y-4">
                                <div className="space-y-2">
                                   <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">Author_ID</label>
                                   <input className="w-full bg-black/40 border border-zinc-800 rounded-xl px-5 py-3 text-[10px] font-bold text-white uppercase outline-none focus:border-cyan-500/50" value={post.author} onChange={(e) => {
                                     const updated = [...data.posts]; updated[i].author = e.target.value; SystemStorage.updatePosts(updated);
                                   }} />
                                </div>
                                <div className="space-y-2">
                                   <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">Internal_Tags</label>
                                   <input className="w-full bg-black/40 border border-zinc-800 rounded-xl px-5 py-3 text-[10px] font-mono text-zinc-500 outline-none focus:border-cyan-500/50" value={post.tags?.join(', ')} onChange={(e) => {
                                      const updated = [...data.posts]; updated[i].tags = e.target.value.split(',').map(t => t.trim()); SystemStorage.updatePosts(updated);
                                   }} placeholder="Tech, Cloud, AI" />
                                </div>
                                <div className="p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl flex items-center justify-between">
                                   <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Article_Score</span>
                                   <span className="text-xl font-black text-cyan-400">98%</span>
                                </div>
                             </div>
                          </div>

                          <div className="space-y-3">
                             <div className="flex justify-between items-center">
                                <label className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">Primary_Payload (Article Body)</label>
                                <div className="flex gap-2">
                                   <button className="p-2 text-zinc-600 hover:text-cyan-400"><Share2 size={14} /></button>
                                   <button className="p-2 text-zinc-600 hover:text-cyan-400"><LayoutGrid size={14} /></button>
                                </div>
                             </div>
                             <textarea 
                               className="w-full bg-black/30 border border-zinc-800 rounded-[2.5rem] p-10 text-zinc-300 text-lg md:text-xl leading-relaxed outline-none min-h-[600px] focus:border-cyan-500/20 custom-scrollbar"
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

          {/* --- TECH STACK EDITOR --- */}
          {activeTab === 'skills' && (
             <motion.div key="skills" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                {data.skills.map((cat: any, cIdx: number) => (
                  <div key={cIdx} className="p-10 bg-zinc-900/30 border border-zinc-800 rounded-[3rem]">
                     <div className="flex justify-between items-center mb-10 border-b border-zinc-800 pb-6">
                        <input className="bg-transparent border-none text-2xl font-black text-white uppercase outline-none tracking-tighter" value={cat.category} onChange={(e) => {
                          const updated = [...data.skills]; updated[cIdx].category = e.target.value; SystemStorage.updateSkills(updated);
                        }} />
                        <button onClick={() => {
                          const updated = [...data.skills];
                          updated[cIdx].items.push({ name: 'New Module', level: 85 });
                          SystemStorage.updateSkills(updated);
                          notify("Matrix Expansion Ready");
                        }} className="px-4 py-2 bg-zinc-800 text-cyan-400 rounded-xl hover:bg-zinc-700 transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                           <Plus size={16}/> New Module
                        </button>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cat.items.map((skill: Skill, sIdx: number) => (
                          <div key={sIdx} className="p-6 bg-black/40 border border-zinc-800 rounded-2xl space-y-4 group hover:border-zinc-700 transition-all">
                             <div className="flex justify-between items-center">
                                <input className="bg-transparent border-none text-[10px] font-black text-zinc-400 uppercase outline-none focus:text-white" value={skill.name} onChange={(e) => {
                                  const updated = [...data.skills]; updated[cIdx].items[sIdx].name = e.target.value; SystemStorage.updateSkills(updated);
                                }} />
                                <button onClick={() => {
                                  const updated = [...data.skills];
                                  updated[cIdx].items = updated[cIdx].items.filter((_: any, idx: number) => idx !== sIdx);
                                  SystemStorage.updateSkills(updated);
                                }} className="text-zinc-800 hover:text-red-500 transition-colors"><Trash2 size={14}/></button>
                             </div>
                             <div className="space-y-2">
                                <div className="flex justify-between text-[8px] font-mono text-zinc-600">
                                   <span>Optimization_Level</span>
                                   <span>{skill.level}%</span>
                                </div>
                                <input type="range" min="0" max="100" className="w-full accent-cyan-500 bg-zinc-900 h-1.5 rounded-full appearance-none cursor-pointer" value={skill.level} onChange={(e) => {
                                  const updated = [...data.skills]; updated[cIdx].items[sIdx].level = parseInt(e.target.value); SystemStorage.updateSkills(updated);
                                }} />
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>
                ))}
             </motion.div>
          )}

          {/* --- ARCH DOMAINS EDITOR --- */}
          {activeTab === 'services' && (
             <motion.div key="services" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                {data.services.map((service: Service, sIdx: number) => (
                  <div key={sIdx} className="p-10 bg-zinc-900/30 border border-zinc-800 rounded-[3rem] flex items-start gap-10 group hover:border-cyan-500/20 transition-all">
                     <div className="w-20 h-20 bg-black border border-zinc-800 rounded-3xl flex items-center justify-center text-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.1)]"><Layers size={32}/></div>
                     <div className="flex-grow space-y-6">
                        <input className="w-full bg-transparent border-none text-3xl font-black text-white outline-none tracking-tight focus:text-cyan-400 transition-colors" value={service.title} onChange={(e) => {
                           const updated = [...data.services]; updated[sIdx].title = e.target.value; SystemStorage.updateServices(updated);
                        }} />
                        <textarea className="w-full bg-black/20 border border-zinc-800 rounded-2xl p-6 text-base text-zinc-500 outline-none h-24 focus:text-zinc-300 transition-colors" value={service.description} onChange={(e) => {
                           const updated = [...data.services]; updated[sIdx].description = e.target.value; SystemStorage.updateServices(updated);
                        }} />
                     </div>
                     <button onClick={() => {
                        const updated = data.services.filter((_: any, idx: number) => idx !== sIdx);
                        SystemStorage.updateServices(updated);
                        notify("Domain Architecture Updated");
                     }} className="p-4 text-zinc-800 hover:text-red-500 transition-colors"><Trash2 size={24} /></button>
                  </div>
                ))}
             </motion.div>
          )}
        </AnimatePresence>

        {/* Global Success Toast */}
        <AnimatePresence>
           {toast && (
             <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 bg-cyan-500 text-black rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-[0_10px_40px_rgba(6,182,212,0.4)] z-[100] flex items-center gap-4">
               <CheckCircle2 size={18} strokeWidth={3} /> {toast}
             </motion.div>
           )}
        </AnimatePresence>

        {isAILoading && (
          <div className="fixed top-12 right-12 flex items-center gap-4 px-8 py-4 bg-black/80 backdrop-blur-xl border border-cyan-500/30 rounded-full shadow-[0_0_50px_rgba(6,182,212,0.2)] z-[100]">
            <Loader2 className="animate-spin text-cyan-400" size={20} />
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">AI Synthesis Active</span>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
