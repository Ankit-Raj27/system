import { getMetrics, getLogs, getTrends, getDSAQuests, getLLDQuests, getHLDQuests, getCohortModules } from '@/lib/notion';
import { getOrCreateHunter } from '@/lib/engine/hunter';
import { SidebarVitals } from '@/components/SidebarVitals';
import { DashboardHome } from '@/components/DashboardHome';
import { DungeonDetail } from '@/components/DungeonDetail';
import { SystemNotification } from '@/components/SystemNotification';
import { MOTIVATION_REMINDERS } from '@/lib/constants';
import { AddQuestModal } from '@/components/AddQuestModal';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const safeFetch = async (fn: () => Promise<any>, fallback: any, name: string) => {
    try {
      return await fn();
    } catch (err) {
      console.error(`[System Error] ${name} Fetch Failure:`, err);
      return fallback;
    }
  };

  const [
    metricsRaw,
    logsRaw,
    trendsRaw,
    dsaRaw,
    lldRaw,
    hldRaw,
    cohortRaw,
    hunter
  ] = await Promise.all([
    safeFetch(getMetrics, [], "Metrics"),
    safeFetch(getLogs, [], "Logs"),
    safeFetch(getTrends, [], "Trends"),
    safeFetch(getDSAQuests, [], "DSA"),
    safeFetch(getLLDQuests, [], "LLD"),
    safeFetch(getHLDQuests, [], "HLD"),
    safeFetch(getCohortModules, [], "Cohort"),
    safeFetch(getOrCreateHunter, null, "Hunter")
  ]);

  const metricRow = (metricsRaw[0] as any)?.properties || {};
  const stats = {
    streak: metricRow['Current Streak']?.number || 0,
    successRate: metricRow['Success %']?.formula?.number || 0,
    countdown: metricRow['Countdown']?.formula?.number || 0,
    totalSuccess: metricRow['Total Successes']?.number || 0
  };

  const mapQuest = (page: any, nameKey: string, categoryKey: string) => ({
    id: page.id,
    name: page.properties[nameKey]?.title?.[0]?.plain_text || 'Unknown',
    status: page.properties.Status?.select?.name || 'N/A',
    rank: page.properties.Rank?.select?.name || 'N/A',
    category: page.properties[categoryKey]?.select?.name || page.properties[categoryKey]?.rich_text?.[0]?.plain_text || 'N/A',
    url: page.properties.Portal?.url || null
  });

  const dsaQuests = dsaRaw.map(p => mapQuest(p, 'Quest', 'Dungeon'));
  const lldQuests = lldRaw.map(p => mapQuest(p, 'Quest', 'Category'));
  const hldQuests = hldRaw.map(p => mapQuest(p, 'Concept', 'Topic'));
  const cohortQuests = cohortRaw.map(p => mapQuest(p, 'Module', 'Track'));

  const logs = (logsRaw || []).map((page: any) => ({
    id: page.id,
    date: page.properties.Date?.title?.[0]?.plain_text || 'N/A',
    verdict: page.properties['Overall Verdict']?.select?.name || 'FAILED',
    work: page.properties['Work Output']?.number || 0,
    learning: page.properties['Learning Progress']?.number || 0,
    health: page.properties['Health Discipline']?.number || 0,
    focus: page.properties['Focus Level']?.select?.name || 'N/A',
    reason: page.properties.Reason?.rich_text?.[0]?.plain_text || 'No reason provided.'
  }));

  const trends = (trendsRaw || []).map((page: any) => ({
    week: page.properties.Week?.title?.[0]?.plain_text || 'W00',
    score: page.properties['Avg Score']?.number || 0
  }));

  return (
    <main className="relative min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30 overflow-hidden flex flex-col md:flex-row">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      
      {/* PERSISTENT SIDEBAR VITALS */}
      <SidebarVitals hunter={hunter} stats={stats} />

      {/* DYNAMIC CONTENT AREA */}
      <div className="flex-1 h-screen overflow-y-auto p-6 md:p-12 relative">
        <div className="fixed top-6 right-6 w-80 z-50 pointer-events-auto hidden md:block">
          <SystemNotification messages={MOTIVATION_REMINDERS} type="quest" />
        </div>

        <DashboardHome 
          stats={stats} 
          hunter={hunter} 
          trends={trends} 
          dsaQuests={dsaQuests}
          lldQuests={lldQuests}
          hldQuests={hldQuests}
          cohortQuests={cohortQuests}
          logs={logs}
        />

        <AddQuestModal />
      </div>
    </main>
  );
}
