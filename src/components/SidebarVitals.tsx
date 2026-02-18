'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, ShieldAlert, Target } from 'lucide-react';

export function SidebarVitals({ hunter, stats }: { hunter: any, stats: any }) {
  return (
    <aside className="w-full md:w-80 bg-[#0a0a0a] border-b md:border-b-0 md:border-r border-white/5 p-6 space-y-8 relative z-20 flex-shrink-0">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-blue-500/10 border-l-2 border-blue-500 text-blue-400 text-[9px] font-black uppercase tracking-[0.2em]">
          <Zap className="w-3 h-3 fill-current" /> System v1.3.2
        </div>
        <div>
          <h2 className="text-xs font-black text-neutral-500 uppercase tracking-widest mb-1">Hunter Identity</h2>
          <div className="text-2xl font-black tracking-tighter uppercase leading-none">switchengeek</div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex-1 px-3 py-2 rounded bg-orange-500/5 border border-orange-500/20">
            <div className="text-[8px] font-black text-orange-500/50 uppercase tracking-widest">Level</div>
            <div className="text-xl font-black font-mono leading-none">{hunter?.level || '??'}</div>
          </div>
          <div className="flex-1 px-3 py-2 rounded bg-blue-500/5 border border-blue-500/20">
            <div className="text-[8px] font-black text-blue-500/50 uppercase tracking-widest">Rank</div>
            <div className="text-xl font-black font-mono leading-none">{hunter?.rank || 'E'}</div>
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-4 border-t border-white/5">
        {!hunter ? (
          <div className="p-4 rounded border border-red-500/20 bg-red-500/5 text-red-400/50 text-[9px] font-mono flex items-center gap-2 uppercase tracking-widest">
            <ShieldAlert className="w-4 h-4" /> [ DB Offline ]
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-black text-neutral-500 uppercase tracking-widest">
                <span>Health / Fatigue</span>
                <span className="text-red-400">{100 - (hunter?.fatigue || 0)}%</span>
              </div>
              <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${100 - (hunter?.fatigue || 0)}%` }}
                  className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-1000" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-black text-neutral-500 uppercase tracking-widest">
                <span>Mana Points</span>
                <span className="text-blue-400">{hunter?.mana || 100}%</span>
              </div>
              <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${hunter?.mana || 100}%` }}
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-1000" 
                />
              </div>
            </div>
          </>
        )}

        <div className="space-y-2">
          <div className="flex justify-between text-[9px] font-black text-neutral-500 uppercase tracking-widest">
            <span>Ascension Counter</span>
            <span className="text-orange-400">{stats.countdown} Days</span>
          </div>
          <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)] transition-all duration-1000" 
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-white/5 space-y-4">
        <h3 className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em]">Attributes</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'STR', val: hunter?.strength },
            { label: 'INT', val: hunter?.intelligence },
            { label: 'END', val: hunter?.endurance },
            { label: 'FOC', val: hunter?.focus },
            { label: 'DIS', val: hunter?.discipline },
          ].map((attr) => (
            <div key={attr.label} className="p-2 rounded bg-white/5 border border-white/5 flex flex-col">
              <span className="text-[8px] font-bold text-neutral-500">{attr.label}</span>
              <span className="text-sm font-black font-mono">{attr.val || '--'}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
