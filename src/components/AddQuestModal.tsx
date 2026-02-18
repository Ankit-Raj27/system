'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Loader2 } from 'lucide-react';

export function AddQuestModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'DSA',
    name: '',
    category: 'Arrays',
    rank: 'C-Rank (Medium)',
    url: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/quest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsOpen(false);
        setFormData({ ...formData, name: '', url: '' });
        window.location.reload(); // Refresh to see new data
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 right-10 p-4 rounded-full bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:scale-110 transition-transform z-40 group"
      >
        <Plus className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[#0a0a0a] border-2 border-blue-500/50 rounded-xl p-8 shadow-[0_0_50px_rgba(59,130,246,0.3)]"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black uppercase tracking-widest text-blue-400">[ New Quest Entry ]</h2>
                <button onClick={() => setIsOpen(false)} className="text-neutral-500 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-neutral-500 tracking-widest">Type</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-sm focus:border-blue-500 outline-none"
                  >
                    <option value="DSA">DSA Dungeon</option>
                    <option value="LLD">LLD Blueprint</option>
                    <option value="HLD">HLD System</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-neutral-500 tracking-widest">Name</label>
                  <input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Quest Title"
                    className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-sm focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-neutral-500 tracking-widest">Category / Dungeon</label>
                  <input 
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="e.g. Arrays, Scalability"
                    className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-sm focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-neutral-500 tracking-widest">Rank</label>
                  <select 
                    value={formData.rank}
                    onChange={(e) => setFormData({...formData, rank: e.target.value})}
                    className="w-full bg-neutral-900 border border-white/10 rounded p-2 text-sm focus:border-blue-500 outline-none"
                  >
                    <option value="E-Rank (Easy)">E-Rank (Easy)</option>
                    <option value="C-Rank (Medium)">C-Rank (Medium)</option>
                    <option value="S-Rank (Hard)">S-Rank (Hard)</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button 
                    disabled={loading}
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white font-black uppercase tracking-widest rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Accept Quest'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
