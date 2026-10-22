import { useEffect, useState } from "react";
import { ArrowUpRight, Bell, CheckCircle2, ChevronRight, CloudSun, Leaf, Pause, Play, RefreshCw, Sprout, Sun, Wallet } from "lucide-react";

import { getCameroonDay, getDemoForecast } from "../../lib/dashboardDate";

const snapshots = [
  { health: "0.71", temperature: 30, balance: 185000, share: 312500, alert: "Coffee rust reported on plot B3", time: "Just updated" },
  { health: "0.72", temperature: 29, balance: 185000, share: 312500, alert: "Agronomist guidance available for plot B3", time: "Advice received" },
  { health: "0.73", temperature: 28, balance: 230000, share: 357500, alert: "Plantain harvest advance recorded", time: "Finances updated" },
  { health: "0.72", temperature: 29, balance: 210000, share: 357500, alert: "Cooperative input purchase recorded", time: "Purchase recorded" },
];
const tabs = [
  { id: "overview", label: "Overview", icon: Sprout },
  { id: "plot", label: "My plot", icon: Leaf },
  { id: "alerts", label: "Alerts", icon: Bell },
  { id: "finances", label: "Finances", icon: Wallet },
] as const;
type Tab = typeof tabs[number]["id"];
const money = (value: number) => `${new Intl.NumberFormat("fr-FR").format(value)} FCFA`;
// Set VITE_DASHBOARD_REVEAL=false to restore the static entrance.
const revealEnabled = import.meta.env.VITE_DASHBOARD_REVEAL !== "false";

export default function FarmerDashboard() {
  const [revealing, setRevealing] = useState(revealEnabled);
  useEffect(() => {
    if (!revealEnabled) return;
    const timer = window.setTimeout(() => setRevealing(false), 1500);
    return () => window.clearTimeout(timer);
  }, []);
  const [today, setToday] = useState(() => getCameroonDay());
  useEffect(() => {
    const sync = () => {
      const next = getCameroonDay();
      setToday((previous) => previous.key === next.key ? previous : next);
    };
    const timer = window.setInterval(sync, 30000);
    document.addEventListener("visibilitychange", sync);
    return () => { window.clearInterval(timer); document.removeEventListener("visibilitychange", sync); };
  }, []);
  const forecast = getDemoForecast(today.date);
  const [tab, setTab] = useState<Tab>("overview");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    if (!playing || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setStep((value) => (value + 1) % snapshots.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [playing, reducedMotion]);
  const data = snapshots[(step + today.weekday + 5) % snapshots.length];
  const liveValue = (value: string) => <span key={`${step}-${value}`} className="dashboard-value inline-block tabular-nums" translate="no">{value}</span>;

  return (
    <div className={revealing ? "dashboard-reveal" : undefined}>
    <div className="dashboard-stack"><aside className="farmer-dashboard w-full max-w-[390px] mx-auto rounded-[28px] border border-border overflow-hidden shadow-2xl" aria-label="Interactive farmer dashboard demonstration">
      <div className="dashboard-header p-4 pb-3">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-white/80">Si-Tcha • Farmer dashboard</span>
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold text-white">Interactive demo</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center"><Sprout className="w-6 h-6 text-[#F3A261]" /></div>
          <div><p className="font-bold text-white text-base">Hello, Fonkou</p><p className="text-[10px] uppercase tracking-wider text-[#F3A261]">GIC Avenir Mbouda • Producer</p></div>
        </div>
        <div className="flex items-center justify-between gap-2 bg-white/10 rounded-xl px-3 py-2.5 text-xs text-white/90">
          <span className="flex items-center gap-2"><RefreshCw className={`w-3.5 h-3.5 ${playing && !reducedMotion ? "dashboard-sync" : ""}`} />Local sync • <time dateTime={today.key} translate="no">{today.key}</time></span>
          <span className="text-[10px] text-white/70">Offline ready</span>
        </div>
        <div className="grid grid-cols-5 gap-1 mt-3 text-center">
          {forecast.map((day, index) => {
            const Weather = index === 1 || index === 4 ? CloudSun : Sun;
            const temperature = day.temperature + (day.today ? data.temperature - 30 : 0);
            return <div key={day.key} aria-current={day.today ? "date" : undefined} className={`rounded-xl py-1.5 ${day.today ? "bg-[#D97732] text-white" : "text-white/80"}`}>
              <p className="text-[9px] font-semibold uppercase" translate="no">{day.label}</p>
              <p className="text-[8px] opacity-80 mb-1" translate="no">{day.dateLabel}</p>
              <Weather className="w-3.5 h-3.5 mx-auto mb-1" />
              <p className="text-xs font-bold">{day.today ? liveValue(`${temperature}°`) : `${temperature}°`}</p>
            </div>;
          })}
        </div>
      </div>
      <div className="p-3 bg-card text-card-foreground">
        <div className="flex items-center justify-between mb-3 gap-2">
          <p className="font-bold text-sm">{tabs.find((item) => item.id === tab)?.label}</p>
          <button type="button" onClick={() => setStep((value) => (value + 1) % snapshots.length)} className="text-[10px] font-semibold text-primary flex items-center gap-1 rounded-md p-1 focus-visible:outline-2 focus-visible:outline-ring"><RefreshCw className="w-3 h-3" />Refresh demo</button>
        </div>
        <div id="farmer-demo-panel" role="tabpanel" aria-labelledby={`farmer-tab-${tab}`} className="dashboard-content min-h-[200px]" key={tab}>
          {(tab === "overview" || tab === "plot") && <button type="button" onClick={() => setTab(tab === "plot" ? "overview" : "plot")} className="w-full text-left rounded-2xl border border-border bg-background p-3 mb-2 hover:border-primary/50 transition-colors focus-visible:outline-2 focus-visible:outline-ring">
            <div className="flex justify-between items-center"><h3 className="text-sm font-bold">My active plot • B3</h3><ChevronRight className="w-4 h-4 text-muted-foreground" /></div>
            <p className={`${tab === "overview" ? "hidden" : ""} text-[11px] text-muted-foreground mt-0.5 mb-2`}>1.8 ha • Plantain / mixed coffee</p>
            <div className="grid grid-cols-2 gap-2 mt-2"><div><p className="text-[9px] uppercase text-muted-foreground mb-1">Current phase</p><p className="text-xs font-bold text-primary flex gap-1 items-center"><Sprout className="w-3.5 h-3.5" />Growth</p></div><div><p className="text-[9px] uppercase text-muted-foreground mb-1">Crop health • NDVI</p><p className="text-xs font-bold text-foreground">Good ({liveValue(data.health)})</p></div></div>
          </button>}
          {tab === "plot" && <div className="dashboard-cycle rounded-2xl bg-muted p-3"><p className="font-semibold text-xs mb-3">Crop cycle • Mbouda West</p>{["Preparation complete", "Planting complete", "Growth — active monitoring"].map((label, index) => <div key={label} className="flex items-center gap-2 text-[11px] py-1.5"><CheckCircle2 className={`w-3.5 h-3.5 ${index === 2 ? "text-primary" : "text-secondary"}`} />{label}</div>)}</div>}
          {(tab === "overview" || tab === "finances") && <button type="button" onClick={() => setTab(tab === "finances" ? "overview" : "finances")} className="w-full text-left rounded-2xl border border-border bg-background p-3 hover:border-primary/50 transition-colors focus-visible:outline-2 focus-visible:outline-ring">
            <div className="flex justify-between items-center"><h3 className="text-sm font-bold">My personal finances</h3><ChevronRight className="w-4 h-4 text-muted-foreground" /></div>
            <p className={`${tab === "overview" ? "hidden" : ""} text-[11px] text-muted-foreground mt-0.5 mb-2`}>Contributions & harvest share</p>
            <div className="grid grid-cols-2 gap-2"><div><p className="text-[9px] uppercase text-muted-foreground mb-1">Estimated share</p><p className="text-xs font-bold text-primary">{liveValue(money(data.share))}</p></div><div><p className="text-[9px] uppercase text-muted-foreground mb-1">Account balance</p><p className="text-xs font-bold">{liveValue(money(data.balance))}</p></div></div>
          </button>}
          {tab === "finances" && <div className="mt-2 space-y-1">{[{name:"Certified coffee sale B3",amount:"+150 000 FCFA"},{name:"Cooperative input purchase",amount:"−20 000 FCFA"},{name:"Plantain harvest advance",amount:"+45 000 FCFA"}].map((transaction) => <div key={transaction.name} className="flex items-center justify-between gap-3 border-b border-border py-1.5 text-[10px]"><span>{transaction.name}</span><span className="font-bold whitespace-nowrap" translate="no">{transaction.amount}</span></div>)}</div>}
          {tab === "alerts" && <div className="space-y-2"><div className="rounded-2xl border border-primary/30 bg-accent p-3"><p className="text-[10px] uppercase font-bold text-primary mb-2">Plot B3 • Monitoring alert</p><h3 className="text-sm font-bold mb-2">Coffee rust reported</h3><p className="text-xs text-muted-foreground leading-relaxed">Agronomist guidance is available for Jean-Paul.</p></div><div className="rounded-2xl border border-border p-3"><p className="text-xs font-bold mb-2">Agronomist follow-up</p><p className="text-xs text-muted-foreground leading-relaxed">Review the affected plot and care protocol.</p><a href="#contact" className="inline-flex gap-1 items-center mt-3 text-xs text-primary font-semibold">Learn more <ArrowUpRight className="w-3 h-3" /></a></div></div>}
        </div>
        <div className="mt-2 rounded-xl border border-primary/25 bg-accent px-3 py-2 flex items-center gap-2"><Bell className="w-3.5 h-3.5 text-primary shrink-0" /><p className="text-[10px] font-medium text-accent-foreground">{data.alert}</p></div>
        <div role="tablist" aria-label="Dashboard views" className="grid grid-cols-4 gap-1 border-t border-border mt-2 pt-2">
          {tabs.map(({id,label,icon:Icon}) => <button key={id} id={`farmer-tab-${id}`} role="tab" type="button" aria-selected={tab === id} aria-controls="farmer-demo-panel" onClick={() => setTab(id)} onKeyDown={(event) => { const index=tabs.findIndex((item)=>item.id===id); const next=event.key==="ArrowRight"?(index+1)%tabs.length:event.key==="ArrowLeft"?(index+tabs.length-1)%tabs.length:event.key==="Home"?0:event.key==="End"?tabs.length-1:null; if(next!==null){event.preventDefault();setTab(tabs[next].id);document.getElementById(`farmer-tab-${tabs[next].id}`)?.focus();} }} tabIndex={tab===id?0:-1} className={`flex flex-col items-center gap-1 p-1.5 rounded-xl text-[10px] font-semibold focus-visible:outline-2 focus-visible:outline-ring ${tab===id?"bg-accent text-primary":"text-muted-foreground hover:bg-muted"}`}><Icon className="w-4 h-4" />{label}</button>)}
        </div>
      </div>
      <div className="px-3 py-2 bg-muted flex items-center justify-between gap-2 text-[10px] text-muted-foreground"><span>Simulated data • {data.time}</span><button type="button" onClick={() => setPlaying((value)=>!value)} aria-pressed={!playing} className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-ring">{playing?<Pause className="w-3 h-3" />:<Play className="w-3 h-3" />}{playing?"Pause":"Resume"}</button></div>
    </aside></div>
    </div>
  );
}



