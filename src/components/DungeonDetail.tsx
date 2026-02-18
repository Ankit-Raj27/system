'use client';

import React, { useState } from 'react';
import { Search, Filter, Sword, CheckCircle2, Loader2, ExternalLink } from 'lucide-react';

interface DungeonDetailProps {
  title: string;
  quests: any[];
  type: string;
}

export function DungeonDetail({ title, quests, type }: DungeonDetailProps) {
  const [search, setSearch] = useState('');
  const [filterRank, setFilterRank] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleComplete = async (notionPageId: string) => {
    setLoadingId(notionPageId);
    try {
      const res = await fetch('/api/system/complete-quest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notionPageId, type })
      });
      if (res.ok) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  const filteredQuests = quests.filter(q => {
    const matchesSearch = q.name.toLowerCase().includes(search.toLowerCase()) || 
                         q.category.toLowerCase().includes(search.toLowerCase());
    const matchesRank = filterRank === 'All' || q.rank.includes(filterRank);
    const matchesStatus = filterStatus === 'All' || 
                         (filterStatus === 'Cleared' && ['Mastered', 'Shipped', 'Dungeon Cleared'].includes(q.status)) ||
                         (filterStatus === 'Pending' && !['Mastered', 'Shipped', 'Dungeon Cleared'].includes(q.status));
    
    return matchesSearch && matchesRank && matchesStatus;
  });

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-2">[ Active Dungeon ]</div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">{title}</h1>
        </div>
        <div className="text-right">
          <div className="text-5xl font-black text-white tracking-tighter">{quests.length}</div>
          <div className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest text-right">Registered Quests</div>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-white/5 p-4 rounded-lg border border-white/5">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Quest or Category..."
            className="w-full bg-neutral-900 border border-white/5 rounded-md py-2 pl-10 pr-4 text-sm focus:border-blue-500 outline-none transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-neutral-500" />
          <select 
            value={filterRank}
            onChange={(e) => setFilterRank(e.target.value)}
            className="bg-neutral-900 border border-white/5 rounded-md py-2 px-3 text-xs font-bold uppercase outline-none focus:border-blue-500"
          >
            <option value="All">All Ranks</option>
            <option value="S-Rank">S-Rank</option>
            <option value="A-Rank">A-Rank</option>
            <option value="C-Rank">C-Rank</option>
            <option value="E-Rank">E-Rank</option>
          </select>

          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-neutral-900 border border-white/5 rounded-md py-2 px-3 text-xs font-bold uppercase outline-none focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Cleared">Cleared</option>
          </select>
        </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredQuests.map((quest) => (
          <div key={quest.id} className="p-6 rounded-lg border border-white/5 bg-neutral-900/40 hover:border-white/10 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[9px] font-black uppercase text-neutral-500 tracking-widest">{quest.category}</span>
              <span className={`font-mono text-xs font-bold ${
                quest.rank.includes('S') ? 'text-orange-500' : 
                quest.rank.includes('A') ? 'text-purple-500' : 'text-blue-500'
              }`}>
                {quest.rank}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-6 leading-tight">{quest.name}</h3>
            
            <div className="flex gap-2">
              {quest.url && (
                <a 
                  href={quest.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-neutral-800 border border-white/5 text-xs font-black uppercase hover:bg-neutral-700 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" /> Portal
                </a>
              )}
              {['Mastered', 'Shipped', 'Dungeon Cleared'].includes(quest.status) ? (
                <div className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-black uppercase">
                  <CheckCircle2 className="w-3 h-3" /> Cleared
                </div>
              ) : (
                <button 
                  onClick={() => handleComplete(quest.id)}
                  disabled={!!loadingId}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-blue-600 border border-blue-500 text-white text-xs font-black uppercase hover:bg-blue-700 transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)]"
                >
                  {loadingId === quest.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <><Sword className="w-3 h-3" /> Clear</>}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {filteredQuests.length === 0 && (
        <div className="text-center py-20 text-neutral-600 uppercase font-black tracking-widest italic border border-dashed border-white/5 rounded-lg">
          No quests found in this sector.
        </div>
      )}
    </div>
  );
}
