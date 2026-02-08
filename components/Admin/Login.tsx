
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Fingerprint, Lock } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'scanning' | 'denied'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('scanning');
    
    // Simple simulated auth (Password: zaironx_admin)
    setTimeout(() => {
      if (password === 'admin' || password === 'zaironx_admin') {
        onLogin();
      } else {
        setStatus('denied');
        setTimeout(() => setStatus('idle'), 2000);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 rounded-3xl border border-zinc-800 bg-zinc-900/20 relative overflow-hidden"
      >
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-8">
            {status === 'scanning' ? (
               <Fingerprint className="text-cyan-400 animate-pulse" size={32} />
            ) : (
               <Shield className="text-cyan-400" size={32} />
            )}
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tighter mb-2">System Authentication</h2>
          <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-10">Restricted Access Module</p>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Access Key..."
                className="w-full bg-black/40 border border-zinc-800 rounded-xl px-12 py-4 text-white font-mono text-sm focus:border-cyan-500 outline-none transition-all"
                disabled={status === 'scanning'}
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
            </div>

            <button
              type="submit"
              disabled={status === 'scanning'}
              className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {status === 'scanning' ? 'VERIFYING...' : status === 'denied' ? 'ACCESS DENIED' : 'AUTHORIZE SESSION'}
            </button>
          </form>

          {status === 'scanning' && (
            <motion.div 
              initial={{ top: '0%' }}
              animate={{ top: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute left-0 right-0 h-[1px] bg-cyan-500/50 shadow-[0_0_10px_#06b6d4] z-20 pointer-events-none"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
