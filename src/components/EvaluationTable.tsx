import React from 'react';

interface LogEntry {
  id: string;
  date: string;
  verdict: string;
  work: number;
  learning: number;
  health: number;
  focus: string;
  reason: string;
}

export function EvaluationTable({ logs }: { logs: LogEntry[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-800 bg-black/40 backdrop-blur-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-800 bg-white/5">
            <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Date</th>
            <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Verdict</th>
            <th className="p-4 text-xs font-semibold text-gray-400 uppercase text-center">W</th>
            <th className="p-4 text-xs font-semibold text-gray-400 uppercase text-center">L</th>
            <th className="p-4 text-xs font-semibold text-gray-400 uppercase text-center">H</th>
            <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Focus</th>
            <th className="p-4 text-xs font-semibold text-gray-400 uppercase w-1/3">Reason</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-white/5 transition-colors">
              <td className="p-4 text-sm text-gray-300 whitespace-nowrap">{log.date}</td>
              <td className="p-4">
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                  log.verdict === 'SUCCESS' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
                }`}>
                  {log.verdict}
                </span>
              </td>
              <td className="p-4 text-sm text-gray-300 text-center font-mono">{log.work}</td>
              <td className="p-4 text-sm text-gray-300 text-center font-mono">{log.learning}</td>
              <td className="p-4 text-sm text-gray-300 text-center font-mono">{log.health}</td>
              <td className="p-4 text-sm text-gray-300">{log.focus}</td>
              <td className="p-4 text-sm text-gray-400 italic leading-relaxed">{log.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
