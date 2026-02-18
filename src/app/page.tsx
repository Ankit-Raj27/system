import { getMetrics, getLogs, getTrends } from '@/lib/notion';
import { StatusWindow } from '@/components/StatusWindow';
import { EvaluationTable } from '@/components/EvaluationTable';
import { ProgressChart } from '@/components/ProgressChart';
import { SystemNotification } from '@/components/SystemNotification';
import { QuoteScroller } from '@/components/QuoteScroller';
import { MOTIVATION_REMINDERS } from '@/lib/constants';
import { Zap } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  let metricsRaw: any[] = [];
  let logsRaw: any[] = [];
  let trendsRaw: any[] = [];
  let error: string | null = null;

  try {
    const results = await Promise.all([
      getMetrics(),
      getLogs(),
      getTrends()
    ]);
    metricsRaw = results[0];
    logsRaw = results[1];
    trendsRaw = results[2];
  } catch (err: any) {
    console.error("Notion Sync Failure:", err);
    error = err.message || "Failed to synchronize with Notion.";
  }

  // Extract metrics
  const metricRow = (metricsRaw[0] as any)?.properties || {};
  const stats = {
    streak: metricRow['Current Streak']?.number || 0,
    successRate: metricRow['Success %']?.formula?.number || 0,
    countdown: metricRow['Countdown']?.formula?.number || 0,
    totalSuccess: metricRow['Total Successes']?.number || 0
  };

  // Extract logs
  const logs = (logsRaw || []).map((page: any) => ({
    id: page.id,
    date: page.properties.Date?.title[0]?.plain_text || 'N/A',
    verdict: page.properties['Overall Verdict']?.select?.name || 'FAILED',
    work: page.properties['Work Output']?.number || 0,
    learning: page.properties['Learning Progress']?.number || 0,
    health: page.properties['Health Discipline']?.number || 0,
    focus: page.properties['Focus Level']?.select?.name || 'N/A',
    reason: page.properties.Reason?.rich_text[0]?.plain_text || 'No reason provided.'
  }));

  // Extract trends
  const trends = (trendsRaw || []).map((page: any) => ({
    week: page.properties.Week?.title[0]?.plain_text || 'W00',
    score: page.properties['Avg Score']?.number || 0
  }));

  return (
    <main className="relative min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      
      <div className="relative max-w-7xl mx-auto space-y-12">
        
        <div className="fixed top-6 right-6 w-80 z-50 pointer-events-auto">
          <SystemNotification messages={MOTIVATION_REMINDERS} type="quest" />
        </div>

        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-blue-500/10 border-l-4 border-blue-500 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">
              <Zap className="w-3 h-3 fill-current" /> [ System v1.0.6 Online ]
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600">
              ASCENSION
            </h1>
            <p className="text-neutral-500 text-lg font-medium italic border-l-2 border-neutral-800 pl-4 max-w-md">
              "You are being evaluated. Every action consumes mana. Only those who level up will survive."
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-sm font-black uppercase tracking-[0.4em] text-neutral-600">Time Until Reset</div>
            <div className="text-7xl font-black text-orange-500 tabular-nums tracking-tighter shadow-orange-500/20 drop-shadow-2xl">
              {stats.countdown}
            </div>
            <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Days to S-Rank Deadline</div>
          </div>
        </header>

        {error && (
          <div className="p-4 rounded border border-red-500/50 bg-red-500/10 text-red-400 text-sm font-mono">
            [ SYSTEM ERROR ]: {error}
            <br/>
            Check Vercel Environment Variables and Notion Integrations.
          </div>
        )}

        <QuoteScroller />

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatusWindow 
            label="Current Streak" 
            value={`${stats.streak} DAYS`} 
            iconType="flame" 
            color="orange" 
            description="Consecutive Successes"
          />
          <StatusWindow 
            label="Power Level" 
            value={`${stats.successRate}%`} 
            iconType="target" 
            color="cyan" 
            description="Overall Consistency"
          />
          <StatusWindow 
            label="Dungeons Cleared" 
            value={stats.totalSuccess} 
            iconType="trophy" 
            color="green" 
            description="Total Successful Days"
          />
          <StatusWindow 
            label="Current Rank" 
            value="E-RANK" 
            iconType="shield" 
            color="red" 
            description="Promotion Pending"
          />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <div className="w-1.5 h-6 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                MASTERY TREND
              </h2>
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Growth Analytics</span>
            </div>
            <ProgressChart trends={trends} />
          </div>
          
          <div className="space-y-6">
            <div className="border-b border-white/5 pb-4">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <div className="w-1.5 h-6 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                SYSTEM LOG
              </h2>
            </div>
            <div className="p-8 rounded-lg border border-white/5 bg-gradient-to-b from-neutral-900 to-black space-y-8 relative overflow-hidden">
              <div className="space-y-4 relative z-10">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                    <span>Soul Sync Rate</span>
                    <span className="text-blue-400 font-mono">{stats.successRate}%</span>
                  </div>
                  <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-1000" 
                      style={{ width: `${stats.successRate}%` }} 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                    <span>Rank Progression</span>
                    <span className="text-orange-400 font-mono">15%</span>
                  </div>
                  <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-600 to-yellow-400 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)] transition-all duration-1000" 
                      style={{ width: `15%` }} 
                    />
                  </div>
                </div>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed font-medium italic border-t border-white/5 pt-6">
                "The System tracks every breath. Your power level is calculated based on discipline, focus, and output. Do not disappoint the Monarch."
              </p>
              
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent h-[200%] w-full animate-scan pointer-events-none" />
            </div>
          </div>
        </section>

        <section className="space-y-8 pb-20">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-3xl font-black tracking-tighter flex items-center gap-4">
              <div className="w-1.5 h-10 bg-white" />
              BATTLE LOGS
            </h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-neutral-500 uppercase">Live Feed</span>
              </div>
            </div>
          </div>
          <EvaluationTable logs={logs} />
        </section>

        <footer className="text-center pt-20 pb-10 space-y-4">
          <div className="text-neutral-800 text-[10px] font-black uppercase tracking-[1em]">
            Shadow Monarch Control Terminal
          </div>
          <p className="text-neutral-700 text-xs font-mono uppercase tracking-widest">
            Level up or be forgotten • v1.0.6 build-ascension
          </p>
        </footer>

      </div>
    </main>
  );
}
