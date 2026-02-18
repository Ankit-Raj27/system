import { getMetrics, getLogs, getTrends } from '@/lib/notion';
import { StatsCard } from '@/components/StatsCard';
import { EvaluationTable } from '@/components/EvaluationTable';
import { ProgressChart } from '@/components/ProgressChart';
import { Flame, Trophy, Calendar, Target } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const [metricsRaw, logsRaw, trendsRaw] = await Promise.all([
    getMetrics(),
    getLogs(),
    getTrends()
  ]);

  // Extract metrics (assuming first row in the metrics DB)
  const metricRow = (metricsRaw[0] as any)?.properties || {};
  const stats = {
    streak: metricRow['Current Streak']?.number || 0,
    successRate: metricRow['Success %']?.formula?.number || 0,
    countdown: metricRow['Countdown']?.formula?.number || 0,
    totalSuccess: metricRow['Total Successes']?.number || 0
  };

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
    <main className="min-h-screen bg-neutral-950 text-white p-6 md:p-12 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Target className="w-3 h-3" /> System Operational
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">S-RANK ASCENSION</h1>
            <p className="text-neutral-500 mt-2 text-lg italic">The gap between intention and action is where rank is decided.</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-black text-orange-500 tracking-tighter">{stats.countdown}</div>
            <div className="text-xs font-bold text-neutral-600 uppercase tracking-widest">Days to Deadline</div>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard 
            title="Current Streak" 
            value={`${stats.streak} Days`} 
            icon={Flame} 
            color="orange" 
            description="Consecutive Successes"
          />
          <StatsCard 
            title="Success Rate" 
            value={`${stats.successRate}%`} 
            icon={Target} 
            color="green" 
            description="Overall Consistency"
          />
          <StatsCard 
            title="Total Successes" 
            value={stats.totalSuccess} 
            icon={Trophy} 
            color="blue" 
            description="Cleared Dungeons"
          />
          <StatsCard 
            title="Next Milestone" 
            value="S-Rank" 
            icon={Calendar} 
            color="red" 
            description="July 27, 2026"
          />
        </section>

        {/* Trends & Visualization */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-500 rounded-full" />
              Mastery Growth Trend
            </h2>
            <ProgressChart trends={trends} />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <div className="w-1 h-6 bg-orange-500 rounded-full" />
              System Status
            </h2>
            <div className="p-6 rounded-xl border border-white/10 bg-white/5 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-neutral-500 uppercase">
                  <span>Power Level</span>
                  <span>{stats.successRate}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${stats.successRate}%` }} />
                </div>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed italic">
                "Weakness is information. Discipline is freedom. You are currently tracked as an E-Rank hunter. Level up or remain obsolete."
              </p>
            </div>
          </div>
        </section>

        {/* Evaluation Table */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <div className="w-1 h-8 bg-white rounded-full" />
            BATTLE LOGS
          </h2>
          <EvaluationTable logs={logs} />
        </section>

        {/* Footer */}
        <footer className="text-center pt-12 text-neutral-700 text-xs font-mono uppercase tracking-[0.2em]">
          Automated System Dashboard v1.0 • Built by OpenClaw for Switch
        </footer>

      </div>
    </main>
  );
}
