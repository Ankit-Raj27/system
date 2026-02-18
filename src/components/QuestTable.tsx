'use client';

import React, { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface QuestEntry {
  id: string;
  name: string;
  status: string;
  rank: string;
  category: string;
}

export function QuestTable({ title, quests, type }: { title: string, quests: QuestEntry[], type: string }) {
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

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-black uppercase tracking-widest text-neutral-400 border-l-2 border-blue-500 pl-3">
        {title}
      </h3>
      <div className="overflow-x-auto rounded-xl border border-gray-800 bg-black/40 backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-white/5">
              <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Quest Name</th>
              <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Rank</th>
              <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {quests.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-8 text-center text-neutral-600 italic uppercase text-[10px]">No quests discovered in this dungeon.</td>
              </tr>
            ) : quests.map((quest) => (
              <tr key={quest.id} className="hover:bg-white/5 transition-colors group">
                <td className="p-4 text-sm font-bold text-gray-300">
                  <div className="flex flex-col">
                    <span>{quest.name}</span>
                    <span className="text-[9px] text-neutral-600 uppercase tracking-tighter">{quest.category}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`font-mono text-xs font-bold ${
                    quest.rank?.includes('S') ? 'text-orange-500' : 
                    quest.rank?.includes('A') ? 'text-purple-500' :
                    quest.rank?.includes('B') ? 'text-blue-500' : 'text-neutral-500'
                  }`}>
                    {quest.rank}
                  </span>
                </td>
                <td className="p-4">
                  {['Mastered', 'Shipped', 'Dungeon Cleared'].includes(quest.status) ? (
                    <div className="flex items-center gap-1 text-green-500">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase">Cleared</span>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleComplete(quest.id)}
                      disabled={!!loadingId}
                      className="flex items-center gap-2 px-3 py-1 rounded bg-blue-600/10 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase hover:bg-blue-600 hover:text-white transition-all"
                    >
                      {loadingId === quest.id ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Enter'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
