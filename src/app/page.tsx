import { getMetrics, getLogs, getTrends, getDSAQuests, getLLDQuests, getHLDQuests, getCohortModules } from '@/lib/notion';
import { getOrCreateHunter } from '@/lib/engine/hunter';
import { StatusWindow } from '@/components/StatusWindow';
import { EvaluationTable } from '@/components/EvaluationTable';
import { ProgressChart } from '@/components/ProgressChart';
import { SystemNotification } from '@/components/SystemNotification';
import { QuoteScroller } from '@/components/QuoteScroller';
import { QuestTable } from '@/components/QuestTable';
import { MasteryRadar } from '@/components/MasteryRadar';
import { AddQuestModal } from '@/components/AddQuestModal';
import { MOTIVATION_REMINDERS } from '@/lib/constants';
import { Zap, Shield, Activity, Brain, Dumbbell, Timer, Target, Trophy, Flame } from 'lucide-react';


export default async function DashboardPage() {
  let metricsRaw: any[] = [];
  let logsRaw: any[] = [];
  let trendsRaw: any[] = [];
  let dsaRaw: any[] = [];
  let lldRaw: any[] = [];
  let hldRaw: any[] = [];
  let cohortRaw: any[] = [];
  let hunter: any = null;
  let error: string | null = null;

  try {
    const results = await Promise.all([
      getMetrics(),
      getLogs(),
      getTrends(),
      getDSAQuests(),
      getLLDQuests(),
      getHLDQuests(),
      getCohortModules(),
      getOrCreateHunter()
    ]);
    metricsRaw = results[0] || [];
    logsRaw = results[1] || [];
    trendsRaw = results[2] || [];
    dsaRaw = results[3] || [];
    lldRaw = results[4] || [];
    hldRaw = results[5] || [];
    cohortRaw = results[6] || [];
    hunter = results[7];
  } catch (err: any) {
    console.error("System Sync Failure:", err);
    error = err.message || "Failed to synchronize with the System.";
  }

  // Extract Notion Metrics
  const metricRow = (metricsRaw[0] as any)?.properties || {};
  const stats = {
    streak: metricRow['Current Streak']?.number || 0,
    successRate: metricRow['Success %']?.formula?.number || 0,
    countdown: metricRow['Countdown']?.formula?.number || 0,
    totalSuccess: metricRow['Total Successes']?.number || 0
  };

  // Transform Quests
  const mapQuest = (page: any, nameKey: string, categoryKey: string) => ({
    id: page.id,
    name: page.properties[nameKey]?.title[0]?.plain_text || 'Unknown',
    status: page.properties.Status?.select?.name || 'N/A',
    rank: page.properties.Rank?.select?.name || 'N/A',
    category: page.properties[categoryKey]?.select?.name || page.properties[categoryKey]?.rich_text?.[0]?.plain_text || 'N/A'
  });

  const dsaQuests = dsaRaw.map(p => mapQuest(p, 'Quest', 'Dungeon'));
  const lldQuests = lldRaw.map(p => mapQuest(p, 'Quest', 'Category'));
  const hldQuests = hldRaw.map(p => mapQuest(p, 'Concept', 'Topic'));
  const cohortQuests = cohortRaw.map(p => mapQuest(p, 'Module', 'Track'));

  // Calculate radar data
  const getCompletion = (list: any[]) => {
    if (list.length === 0) return 0;
    const completed = list.filter(q => ['Mastered', 'Shipped', 'Dungeon Cleared'].includes(q.status)).length;
    return (completed / list.length) * 10;
  };

  const radarData = [
    { label: 'DSA', value: getCompletion(dsaQuests) },
    { label: 'LLD', value: getCompletion(lldQuests) },
    { label: 'HLD', value: getCompletion(hldQuests) },
    { label: 'COHORT', value: getCompletion(cohortQuests) },
    { label: 'SYSTEM', value: stats.successRate / 10 }
  ];

  // Extract logs
  const logs = logsRaw.map((page: any) => ({
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
  const trends = trendsRaw.map((page: any) => ({
    week: page.properties.Week?.title[0]?.plain_text || 'W00',
    score: page.properties['Avg Score']?.number || 0
  }));

  return (
    <main className="relative min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      
      <div className="relative max-w-7xl mx-auto space-y-12 pb-24">
        <div className="fixed top-6 right-6 w-80 z-50 pointer-events-auto">
          <SystemNotification messages={MOTIVATION_REMINDERS} type="quest" />
        </div>

        {/* Top Header Grid */}
        <header className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-b border-white/5 pb-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-blue-500/10 border-l-4 border-blue-500 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">
              <Zap className="w-3 h-3 fill-current" /> [ System v1.2.5 Online ]
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-700 leading-none">
              ASCENSION
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <div className="px-3 py-1 rounded border border-orange-500/30 bg-orange-500/5 text-orange-400 text-[10px] font-black tracking-widest uppercase">
                LVL. {hunter?.level || 1}
              </div>
              <div className="px-3 py-1 rounded border border-blue-500/30 bg-blue-500/5 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                RANK {hunter?.rank || 'E'}
              </div>
            </div>
          </div>

          {/* Hunter Vitals */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                <span>Health / Fatigue</span>
                <span className="text-red-400">{100 - (hunter?.fatigue || 0)}/100</span>
              </div>
              <div className="h-2 w-full bg-neutral-900 rounded-sm overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-1000" style={{ width: `${100 - (hunter?.fatigue || 0)}%` }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                <span>Mana Points</span>
                <span className="text-blue-400">{hunter?.mana || 100}/100</span>
              </div>
              <div className="h-2 w-full bg-neutral-900 rounded-sm overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-1000" style={{ width: `${hunter?.mana || 100}%` }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                <span>Experience</span>
                <span className="text-yellow-400">{hunter?.exp || 0} XP</span>
              </div>
              <div className="h-1 w-full bg-neutral-900 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)] transition-all duration-1000" style={{ width: '45%' }} />
              </div>
            </div>
          </div>
        </header>

        {error && (
          <div className="p-4 rounded border border-red-500/50 bg-red-500/10 text-red-400 text-xs font-mono uppercase tracking-tighter">
            [ SYSTEM ERROR ]: {error}
          </div>
        )}

        <QuoteScroller />

        {/* Hunter Attributes Window */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-4 rounded border border-white/5 bg-white/5 flex flex-col items-center justify-center gap-2 group hover:border-blue-500/50 transition-colors">
            <Dumbbell className="w-4 h-4 text-blue-400 opacity-50 group-hover:opacity-100" />
            <div className="text-[10px] font-black text-neutral-500 uppercase tracking-tighter">Strength</div>
            <div className="text-xl font-black font-mono">{hunter?.strength || 10}</div>
          </div>
          <div className="p-4 rounded border border-white/5 bg-white/5 flex flex-col items-center justify-center gap-2 group hover:border-cyan-500/50 transition-colors">
            <Brain className="w-4 h-4 text-cyan-400 opacity-50 group-hover:opacity-100" />
            <div className="text-[10px] font-black text-neutral-500 uppercase tracking-tighter">Intelligence</div>
            <div className="text-xl font-black font-mono">{hunter?.intelligence || 10}</div>
          </div>
          <div className="p-4 rounded border border-white/5 bg-white/5 flex flex-col items-center justify-center gap-2 group hover:border-green-500/50 transition-colors">
            <Activity className="w-4 h-4 text-green-400 opacity-50 group-hover:opacity-100" />
            <div className="text-[10px] font-black text-neutral-500 uppercase tracking-tighter">Endurance</div>
            <div className="text-xl font-black font-mono">{hunter?.endurance || 10}</div>
          </div>
          <div className="p-4 rounded border border-white/5 bg-white/5 flex flex-col items-center justify-center gap-2 group hover:border-orange-500/50 transition-colors">
            <Target className="w-4 h-4 text-orange-400 opacity-50 group-hover:opacity-100" />
            <div className="text-[10px] font-black text-neutral-500 uppercase tracking-tighter">Focus</div>
            <div className="text-xl font-black font-mono">{hunter?.focus || 10}</div>
          </div>
          <div className="p-4 rounded border border-white/5 bg-white/5 flex flex-col items-center justify-center gap-2 group hover:border-purple-500/50 transition-colors">
            <Timer className="w-4 h-4 text-purple-400 opacity-50 group-hover:opacity-100" />
            <div className="text-[10px] font-black text-neutral-500 uppercase tracking-tighter">Discipline</div>
            <div className="text-xl font-black font-mono">{hunter?.discipline || 10}</div>
          </div>
        </section>

        {/* Metrics Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatusWindow label="Streak" value={stats.streak} iconType="flame" color="orange" />
          <StatusWindow label="Success Rate" value={`${stats.successRate}%`} iconType="target" color="cyan" />
          <StatusWindow label="Dungeons Cleared" value={stats.totalSuccess} iconType="trophy" color="green" />
          <StatusWindow label="Deadline" value={stats.countdown} iconType="shield" color="red" description="Days to reset" />
        </section>

        {/* Progress Visuals */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-6">
            <div className="border-b border-white/5 pb-4">
              <h2 className="text-xl font-black tracking-tight flex items-center gap-3">
                <div className="w-1 h-6 bg-blue-500" />
                COMPETENCE RADAR
              </h2>
            </div>
            <MasteryRadar data={radarData} />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="border-b border-white/5 pb-4 flex justify-between items-center">
              <h2 className="text-xl font-black tracking-tight flex items-center gap-3">
                <div className="w-1 h-6 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                MASTERY TREND
              </h2>
              <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Real-time Telemetry</span>
            </div>
            <ProgressChart trends={trends} />
          </div>
        </section>

        {/* Tables Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-12">
             <QuestTable title="DSA DUNGEON" quests={dsaQuests.slice(0, 5)} />
             <QuestTable title="LLD BLUEPRINTS" quests={lldQuests.slice(0, 5)} />
          </div>
          <div className="space-y-12">
             <QuestTable title="HLD SYSTEMS" quests={hldQuests.slice(0, 5)} />
             <QuestTable title="BATTLE LOG" quests={logs.slice(0, 5).map(l => ({ id: l.id, name: l.date, status: l.verdict, rank: l.focus, category: l.reason.substring(0, 30) + '...' }))} />
          </div>
        </section>

        {/* Active Penalty Warning */}
        {hunter?.penalties?.length > 0 && (
          <div className="p-6 rounded-lg border-2 border-red-600/50 bg-red-600/10 shadow-[0_0_30px_rgba(220,38,38,0.2)] animate-pulse">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-600 rounded text-white font-black uppercase text-xs tracking-widest">
                Penalty Warning
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-black uppercase tracking-tight text-red-500">System Restriction Imposed</h4>
                <p className="text-xs text-red-400 font-medium">{hunter.penalties[0].reason}</p>
              </div>
            </div>
          </div>
        )}

        <footer className="text-center pt-20 text-neutral-800 text-[10px] font-black uppercase tracking-[1.5em] opacity-30">
          Shadow Monarch Control Terminal v1.2.5
        </footer>

        <AddQuestModal />
      </div>
    </main>
  );
}
