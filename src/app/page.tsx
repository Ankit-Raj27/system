import { getMetrics, getLogs, getTrends, getDSAQuests, getLLDQuests, getHLDQuests, getCohortModules } from '@/lib/notion';
import { StatusWindow } from '@/components/StatusWindow';
import { EvaluationTable } from '@/components/EvaluationTable';
import { ProgressChart } from '@/components/ProgressChart';
import { SystemNotification } from '@/components/SystemNotification';
import { QuoteScroller } from '@/components/QuoteScroller';
import { QuestTable } from '@/components/QuestTable';
import { MasteryRadar } from '@/components/MasteryRadar';
import { MOTIVATION_REMINDERS } from '@/lib/constants';
import { Zap } from 'lucide-react';

export default async function DashboardPage() {
  let metricsRaw: any[] = [];
  let logsRaw: any[] = [];
  let trendsRaw: any[] = [];
  let dsaRaw: any[] = [];
  let lldRaw: any[] = [];
  let hldRaw: any[] = [];
  let cohortRaw: any[] = [];
  let error: string | null = null;

  try {
    const results = await Promise.all([
      getMetrics(),
      getLogs(),
      getTrends(),
      getDSAQuests(),
      getLLDQuests(),
      getHLDQuests(),
      getCohortModules()
    ]);
    metricsRaw = results[0] || [];
    logsRaw = results[1] || [];
    trendsRaw = results[2] || [];
    dsaRaw = results[3] || [];
    lldRaw = results[4] || [];
    hldRaw = results[5] || [];
    cohortRaw = results[6] || [];
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
              <Zap className="w-3 h-3 fill-current" /> [ System v1.1.1 Online ]
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600">
              ASCENSION
            </h1>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-sm font-black uppercase tracking-[0.4em] text-neutral-600">Time Until Reset</div>
            <div className="text-7xl font-black text-orange-500 tabular-nums tracking-tighter shadow-orange-500/20 drop-shadow-2xl">
              {stats.countdown}
            </div>
          </div>
        </header>

        {error && (
          <div className="p-4 rounded border border-red-500/50 bg-red-500/10 text-red-400 text-sm font-mono">
            [ SYSTEM ERROR ]: {error}
          </div>
        )}

        <QuoteScroller />

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatusWindow label="Streak" value={stats.streak} iconType="flame" color="orange" />
          <StatusWindow label="Power" value={`${stats.successRate}%`} iconType="target" color="cyan" />
          <StatusWindow label="Clears" value={stats.totalSuccess} iconType="trophy" color="green" />
          <StatusWindow label="Rank" value="E-RANK" iconType="shield" color="red" />
        </section>

        {/* Global Mastery Radar */}
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
            <div className="border-b border-white/5 pb-4">
              <h2 className="text-xl font-black tracking-tight flex items-center gap-3">
                <div className="w-1 h-6 bg-orange-500" />
                MASTERY TREND
              </h2>
            </div>
            <ProgressChart trends={trends} />
          </div>
        </section>

        {/* Dungeon Sections (Quests) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-10">
             <QuestTable title="DSA DUNGEON" quests={dsaQuests.slice(0, 5)} />
             <QuestTable title="LLD BLUEPRINTS" quests={lldQuests.slice(0, 5)} />
          </div>
          <div className="space-y-10">
             <QuestTable title="HLD SYSTEMS" quests={hldQuests.slice(0, 5)} />
             <QuestTable title="COHORT MODULES" quests={cohortQuests.slice(0, 5)} />
          </div>
        </section>

        <section className="space-y-8">
          <div className="border-b border-white/5 pb-4">
            <h2 className="text-2xl font-black tracking-tighter">BATTLE LOGS</h2>
          </div>
          <EvaluationTable logs={logs} />
        </section>

        <footer className="text-center pt-20 pb-10 text-neutral-800 text-[10px] font-black uppercase tracking-[1em]">
          Shadow Monarch Control Terminal v1.1.1
        </footer>
      </div>
    </main>
  );
}
