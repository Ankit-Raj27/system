'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, Shield, Target, Zap } from 'lucide-react';

interface StatusWindowProps {
  label: string;
  value: string | number;
  iconType: 'flame' | 'trophy' | 'shield' | 'target' | 'zap';
  color?: 'cyan' | 'red' | 'orange' | 'green';
  description?: string;
  onClick?: () => void;
}

export function StatusWindow({ label, value, iconType, color = 'cyan', description, onClick }: StatusWindowProps) {
  const icons = {
    flame: Flame,
    trophy: Trophy,
    shield: Shield,
    target: Target,
    zap: Zap,
  };

  const Icon = icons[iconType];

  const colorStyles = {
    cyan: 'border-cyan-500/30 text-cyan-400 shadow-[0_0_20px_-10px_rgba(6,182,212,0.5)]',
    red: 'border-red-500/30 text-red-400 shadow-[0_0_20px_-10px_rgba(239,68,68,0.5)]',
    orange: 'border-orange-500/30 text-orange-400 shadow-[0_0_20px_-10px_rgba(249,115,22,0.5)]',
    green: 'border-green-500/30 text-green-400 shadow-[0_0_20px_-10px_rgba(34,197,94,0.5)]',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative p-6 rounded-lg border bg-neutral-900/60 backdrop-blur-xl transition-all duration-300 cursor-pointer ${colorStyles[color]}`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-black uppercase tracking-[0.25em] opacity-60 font-mono text-current">
          {label}
        </span>
        <div className="p-2 rounded-md bg-white/5 border border-white/10 group-hover:border-current transition-colors">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="text-3xl font-black tracking-tight text-white font-mono uppercase">
          {value}
        </div>
        {description && (
          <p className="text-[10px] font-medium opacity-50 uppercase tracking-widest leading-relaxed text-current">
            {description}
          </p>
        )}
      </div>

      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current rounded-tl-sm opacity-20" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-current rounded-tr-sm opacity-20" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-current rounded-bl-sm opacity-20" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current rounded-br-sm opacity-20" />
    </motion.div>
  );
}
