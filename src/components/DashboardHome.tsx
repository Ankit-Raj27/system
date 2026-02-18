'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuoteScroller } from '@/components/QuoteScroller';
import { StatusWindow } from '@/components/StatusWindow';
import { MasteryRadar } from '@/components/MasteryRadar';
import { ProgressChart } from '@/components/ProgressChart';
import { QuestTable } from '@/components/QuestTable';
import { EvaluationTable } from '@/components/EvaluationTable';
import { DungeonDetail } from '@/components/DungeonDetail';
import { Flame, Target, Trophy, Shield, Maximize2, ChevronLeft } from 'lucide-react';

export function DashboardHome({ 
  stats, 
  hunter, 
  trends, 
  dsaQuests, 
  lldQuests, 
  hldQuests, 
  cohortQuests,
  logs 
}: any) {
  const [view, setView] = useState('home');
  const [activeDungeon, setActiveDungeon] = useState<any>(null);

  const radarData = [
    { label: 'DSA', value: dsaQuests.filter((q: any) => ['Mastered', 'Dungeon Cleared'].includes(q.status)).length / 5 },
    { label: 'LLD', value: lldQuests.filter((q: any) => ['Mastered'].includes(q.status)).length / 2 },
    { label: 'HLD', value: hldQuests.filter((q: any) => ['Mastered'].includes(q.status)).length / 2 },
    { label: 'COHORT', value: cohortQuests.filter((q: any) => ['Shipped'].includes(q.status)).length / 2 },
    { label: 'SYSTEM', value: stats.successRate / 10 }
  ];

  if (view === 'dungeon') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
        <button 
          onClick={() => setView('home')}
          className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest mb-4 group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Exit Dungeon
        </button>
        <DungeonDetail {...activeDungeon} />
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="space-y-4 border-b border-white/5 pb-10">
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-700 leading-none uppercase">
          Ascension
        </h1>
        <p className="text-neutral-500 text-lg font-medium italic border-l-2 border-neutral-800 pl-4 max-w-md">
          "Surpass the limits set by the System."
        </p>
      </header>

      <QuoteScroller />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusWindow label="Streak" value={stats.streak} iconType="flame" color="orange" />
        <StatusWindow label="Sync" value={`${stats.successRate}%`} iconType="target" color="cyan" />
        <StatusWindow label="Clears" value={stats.totalSuccess} iconType="trophy" color="green" />
        <StatusWindow label="Rank" value="E-RANK" iconType="shield" color="red" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 space-y-6">
          <div className="border-b border-white/5 pb-4">
            <h2 className="text-xl font-black tracking-tight uppercase">Competence</h2>
          </div>
          <MasteryRadar data={radarData} />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="border-b border-white/5 pb-4 flex justify-between items-center">
            <h2 className="text-xl font-black tracking-tight uppercase">Mastery Trend</h2>
            <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Live Telemetry</span>
          </div>
          <ProgressChart trends={trends} />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {[
          { title: "DSA DUNGEON", quests: dsaQuests, type: "DSA" },
          { title: "LLD BLUEPRINTS", quests: lldQuests, type: "LLD" },
          { title: "HLD SYSTEMS", quests: hldQuests, type: "HLD" },
          { title: "COHORT TRACKS", quests: cohortQuests, type: "COHORT" },
        ].map((dungeon) => (
          <div key={dungeon.title} className="relative group">
            <button 
              onClick={() => {
                setActiveDungeon(dungeon);
                setView('dungeon');
              }}
              className="absolute top-0 right-0 p-2 text-neutral-600 hover:text-blue-400 transition-colors z-10"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <QuestTable title={dungeon.title} quests={dungeon.quests.slice(0, 5)} type={dungeon.type} />
          </div>
        ))}
      </section>

      <section className="space-y-8">
        <div className="border-b border-white/5 pb-4 flex justify-between items-center">
          <h2 className="text-2xl font-black tracking-tighter uppercase opacity-80 leading-none">Battle Log</h2>
          <div className="px-3 py-1 rounded bg-green-500/5 border border-green-500/20 text-green-500 text-[9px] font-black uppercase tracking-widest animate-pulse">
            System Judge Active
          </div>
        </div>
        <EvaluationTable logs={logs} />
      </section>
    </div>
  );
}
