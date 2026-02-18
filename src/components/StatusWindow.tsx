'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatusWindowProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: 'cyan' | 'red' | 'orange' | 'green';
  description?: string;
}

export function StatusWindow({ label, value, icon: Icon, color = 'cyan', description }: StatusWindowProps) {
  const colorStyles = {
    cyan: 'border-cyan-500/30 text-cyan-400 shadow-[0_0_20px_-10px_rgba(6,182,212,0.5)]',
    red: 'border-red-500/30 text-red-400 shadow-[0_0_20px_-10px_rgba(239,68,68,0.5)]',
    orange: 'border-orange-500/30 text-orange-400 shadow-[0_0_20px_-10px_rgba(249,115,22,0.5)]',
    green: 'border-green-500/30 text-green-400 shadow-[0_0_20px_-10px_rgba(34,197,94,0.5)]',
  };

  const glowStyles = {
    cyan: 'group-hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]',
    red: 'group-hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]',
    orange: 'group-hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.3)]',
    green: 'group-hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className={`group relative p-6 rounded-lg border bg-neutral-900/60 backdrop-blur-xl transition-all duration-300 ${colorStyles[color]} ${glowStyles[color]}`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-black uppercase tracking-[0.25em] opacity-60 font-mono">
          {label}
        </span>
        <div className={`p-2 rounded-md bg-white/5 border border-white/10 group-hover:border-${color}-500/40 transition-colors`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="text-3xl font-black tracking-tight text-white font-mono uppercase">
          {value}
        </div>
        {description && (
          <p className="text-[10px] font-medium opacity-50 uppercase tracking-widest leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Futuristic Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current rounded-tl-sm opacity-20" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-current rounded-tr-sm opacity-20" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-current rounded-bl-sm opacity-20" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current rounded-br-sm opacity-20" />
    </motion.div>
  );
}
