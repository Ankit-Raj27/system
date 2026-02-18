import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  color?: string;
}

export function StatsCard({ title, value, icon: Icon, description, color = 'blue' }: StatsCardProps) {
  const colorMap: Record<string, string> = {
    blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    green: 'text-green-500 bg-green-500/10 border-green-500/20',
    orange: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
    red: 'text-red-500 bg-red-500/10 border-red-500/20',
  };

  return (
    <div className={`p-6 rounded-xl border ${colorMap[color] || colorMap.blue} bg-black/40 backdrop-blur-sm`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      {description && <p className="mt-2 text-xs text-gray-500">{description}</p>}
    </div>
  );
}
