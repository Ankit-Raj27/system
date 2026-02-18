'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Bell, X } from 'lucide-react';

interface SystemNotificationProps {
  messages: string[];
  type?: 'info' | 'warning' | 'quest';
}

export function SystemNotification({ messages, type = 'info' }: SystemNotificationProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [messages.length]);

  const typeStyles = {
    info: 'border-blue-500 bg-blue-500/10 text-blue-400',
    warning: 'border-red-500 bg-red-500/10 text-red-400',
    quest: 'border-orange-500 bg-orange-500/10 text-orange-400',
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`relative p-4 rounded-lg border-2 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] ${typeStyles[type]}`}
        >
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-md bg-white/5 border border-white/10">
              <Bell className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="text-xs font-black uppercase tracking-widest opacity-70">
                [ System Notification ]
              </h4>
              <motion.p
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm font-medium leading-relaxed"
              >
                {messages[index]}
              </motion.p>
            </div>
            <button 
              onClick={() => setVisible(false)}
              className="p-1 hover:bg-white/5 rounded-md transition-colors"
            >
              <X className="w-4 h-4 opacity-50" />
            </button>
          </div>
          
          {/* Mana Bar/Progress Indicator */}
          <div className="absolute bottom-0 left-0 h-0.5 bg-current opacity-30" 
               style={{ width: '100%' }}>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="h-full bg-current origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
