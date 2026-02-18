import React from 'react';

interface QuestEntry {
  id: string;
  name: string;
  status: string;
  rank: string;
  category: string;
}

export function QuestTable({ title, quests }: { title: string, quests: QuestEntry[] }) {
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
              <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Status</th>
              <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Rank</th>
              <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Category</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {quests.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-neutral-600 italic">No quests discovered in this dungeon.</td>
              </tr>
            ) : quests.map((quest) => (
              <tr key={quest.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 text-sm font-bold text-gray-300">{quest.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-[10px] font-black rounded uppercase ${
                    quest.status === 'Mastered' || quest.status === 'Shipped' || quest.status === 'Dungeon Cleared'
                      ? 'text-green-400 bg-green-400/10' 
                      : quest.status === 'Learning' || quest.status === 'Building' || quest.status === 'Raid in Progress'
                      ? 'text-blue-400 bg-blue-400/10'
                      : 'text-neutral-500 bg-neutral-500/10'
                  }`}>
                    {quest.status}
                  </span>
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
                <td className="p-4 text-xs text-neutral-500 tracking-tighter uppercase font-medium">{quest.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
