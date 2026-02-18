'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { SOLO_LEVELING_QUOTES } from '@/lib/constants';

export function QuoteScroller() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SOLO_LEVELING_QUOTES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const currentQuote = SOLO_LEVELING_QUOTES[index];

  return (
    <div className="relative overflow-hidden p-8 rounded-xl bg-gradient-to-br from-neutral-900 to-black border border-white/5 group">
      <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Quote className="w-24 h-24 rotate-12" />
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="relative space-y-4"
        >
          <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-neutral-300">
            &quot;{currentQuote.text}&quot;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-blue-500/50" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">
              {currentQuote.author}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Background Pulse Effect */}
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] group-hover:bg-blue-500/10 transition-colors duration-1000" />
    </div>
  );
}
