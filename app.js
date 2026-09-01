/* ============================================================
   ALPHA EDGE FINANCIALS — APPLICATION LOGIC
   ============================================================ */

'use strict';

/* ── APP STATE ────────────────────────────────────────────── */
const AppState = {
  user: null, // null = visitor
  role: 'visitor', // visitor | basic | premium | elite
  activeSection: 'dashboard',
  ipoFilter: 'open',
  notifFilter: 'all',
  optionsTab: 'active',
  chartInstances: {},
};

/* ── ROLE CONFIG ──────────────────────────────────────────── */
const ROLES = {
  visitor: { label: 'Visitor', color: '#8fa8c8', access: [] },
  basic:   { label: 'Basic Subscriber', color: '#10b981', access: ['portfolio_view', 'ipo_basic', 'notif_basic'] },
  premium: { label: 'Premium Member', color: '#06b6d4', access: ['portfolio_view', 'portfolio_full', 'options_basic', 'ipo_full', 'notif_full'] },
  elite:   { label: 'Elite VIP', color: '#eab308', access: ['portfolio_view', 'portfolio_full', 'options_basic', 'options_full', 'ipo_full', 'notif_full', 'whatsapp', 'oneonone'] },
};

function hasAccess(feature) {
  return ROLES[AppState.role].access.includes(feature);
}

/* ── MARKET DATA ─────────────────────────────────────────── */
const MARKET_DATA = [
  { name: 'NIFTY 50',   value: '24,850.15', change: '+118.60', pct: '+0.48%', pos: true },
  { name: 'BANK NIFTY', value: '51,125.40', change: '+245.10', pct: '+0.48%', pos: true },
  { name: 'FINNIFTY',   value: '23,401.75', change: '+112.35', pct: '+0.48%', pos: true },
  { name: 'SENSEX',     value: '81,422.55', change: '+384.25', pct: '+0.47%', pos: true },
  { name: 'INDIA VIX',  value: '12.61',     change: '-0.35',   pct: '-2.70%', pos: false },
  { name: 'USD/INR',    value: '83.42',     change: '+0.12',   pct: '+0.14%', pos: false },
  { name: 'GOLD (MCX)', value: '72,840',    change: '+245',    pct: '+0.34%', pos: true },
  { name: 'CRUDE OIL',  value: '6,820',     change: '-48',     pct: '-0.70%', pos: false },
];

/* ── OPTIONS STRATEGIES ──────────────────────────────────── */
const OPTIONS_STRATEGIES = [
  {
    id: 1,
    name: 'Nifty Bull Put Spread',
    type: 'Weekly Defined Risk',
    status: 'active',
    expiry: '05 Sep 2026',
    underlying: 'NIFTY 50',
    spot: '24,850',
    strategy: 'Sell 24,700 PE | Buy 24,500 PE',
    premium: '₹5,800',
    margin: '₹72,500',
    maxRisk: '₹14,200',
    maxProfit: '₹5,800',
    target: '₹4,640',
    stopLoss: '₹8,700',
    capitalUtil: 72.5,
    winRate: '68.75%',
    pnl: '+₹3,250',
    pnlPct: '+3.25%',
    locked: false,
  },
  {
    id: 2,
    name: 'Bank Nifty Iron Condor',
    type: 'Weekly Neutral',
    status: 'pending',
    expiry: '12 Sep 2026',
    underlying: 'BANK NIFTY',
    spot: '51,125',
    strategy: 'Sell 51,500 CE | Buy 52,000 CE | Sell 50,500 PE | Buy 50,000 PE',
    premium: '₹7,200',
    margin: '₹95,000',
    maxRisk: '₹42,800',
    maxProfit: '₹7,200',
    target: '₹5,760',
    stopLoss: '₹10,800',
    capitalUtil: 95.0,
    winRate: '62.50%',
    pnl: '₹0',
    pnlPct: '0.00%',
    locked: false,
  },
  {
    id: 3,
    name: 'Finnifty Bear Call Spread',
    type: 'Weekly Bearish Hedge',
    status: 'active',
    expiry: '05 Sep 2026',
    underlying: 'FINNIFTY',
    spot: '23,401',
    strategy: 'Sell 23,600 CE | Buy 23,800 CE',
    premium: '₹2,100',
    margin: '₹38,000',
    maxRisk: '₹17,900',
    maxProfit: '₹2,100',
    target: '₹1,680',
    stopLoss: '₹3,150',
    capitalUtil: 38.0,
    winRate: '71.43%',
    pnl: '+₹1,560',
    pnlPct: '+1.56%',
    locked: true, // Premium+
  },
];

/* ── PORTFOLIO HOLDINGS ──────────────────────────────────── */
const PORTFOLIO = [
  { ticker: 'RELIANCE', name: 'Reliance Industries', sector: 'Conglomerate', alloc: 14.2, entry: 2856, cmp: 3120, target: 3500, sl: 2650, pnl: 9.24, verdict: 'hold', locked: false },
  { ticker: 'HDFCBANK',  name: 'HDFC Bank',           sector: 'Banking',       alloc: 13.5, entry: 1642, cmp: 1798, target: 2100, sl: 1520, pnl: 9.50, verdict: 'buy', locked: false },
  { ticker: 'TCS',       name: 'Tata Consultancy',    sector: 'IT Services',   alloc: 12.8, entry: 4120, cmp: 4380, target: 4900, sl: 3820, pnl: 6.31, verdict: 'hold', locked: false },
  { ticker: 'LTIM',      name: 'LTIMindtree',         sector: 'IT Services',   alloc: 10.5, entry: 5480, cmp: 6120, target: 7200, sl: 5100, pnl: 11.68, verdict: 'buy', locked: true },
  { ticker: 'BHARTIARTL',name: 'Bharti Airtel',       sector: 'Telecom',       alloc: 10.0, entry: 1380, cmp: 1545, target: 1800, sl: 1260, pnl: 11.96, verdict: 'buy', locked: true },
  { ticker: 'AXISBANK',  name: 'Axis Bank',           sector: 'Banking',       alloc: 8.8,  entry: 1082, cmp: 1168, target: 1380, sl: 980,  pnl: 7.95, verdict: 'hold', locked: true },
  { ticker: 'POLYCAB',   name: 'Polycab India',       sector: 'Cables & Wire', alloc: 8.2,  entry: 4980, cmp: 5840, target: 7000, sl: 4600, pnl: 17.27, verdict: 'strong-buy', locked: true },
  { ticker: 'DMART',     name: 'Avenue Supermarts',   sector: 'Retail',        alloc: 7.5,  entry: 4560, cmp: 4220, target: 5500, sl: 4100, pnl: -7.46, verdict: 'hold', locked: true },
  { ticker: 'PIIND',     name: 'PI Industries',       sector: 'Agrochem',      alloc: 7.5,  entry: 3820, cmp: 4280, target: 5000, sl: 3500, pnl: 12.04, verdict: 'buy', locked: true },
  { ticker: 'DIXON',     name: 'Dixon Technologies',  sector: 'Electronics',   alloc: 7.0,  entry: 9800, cmp: 11200, target: 14000, sl: 9000, pnl: 14.29, verdict: 'buy', locked: true },
];

/* ── IPO DATA ─────────────────────────────────────────────── */
const IPO_DATA = [
  {
    company: 'NovaTech Systems', sector: 'B2B SaaS / Cloud', abbr: 'NT',
    status: 'open', priceBand: '₹380 – ₹400', issueSize: '₹3,200 Cr',
    openDate: '30 Aug 2026', closeDate: '03 Sep 2026',
    qib: '8.24x', nii: '6.45x', retail: '4.82x',
    gmp: '+₹88 (22%)',
    verdict: 'strong', verdictLabel: 'Subscribe (Listing Gains)',
    minInvest: '₹13,920', lotSize: '35 Shares',
  },
  {
    company: 'GreenPower Infra', sector: 'Renewable Energy', abbr: 'GP',
    status: 'open', priceBand: '₹540 – ₹580', issueSize: '₹5,800 Cr',
    openDate: '29 Aug 2026', closeDate: '02 Sep 2026',
    qib: '22.14x', nii: '18.67x', retail: '9.54x',
    gmp: '+₹145 (25%)',
    verdict: 'strong', verdictLabel: 'Subscribe (Strong)',
    minInvest: '₹14,500', lotSize: '25 Shares',
  },
  {
    company: 'FinEdge Capital', sector: 'NBFC / FinTech', abbr: 'FE',
    status: 'upcoming', priceBand: '₹210 – ₹225', issueSize: '₹1,850 Cr',
    openDate: '08 Sep 2026', closeDate: '12 Sep 2026',
    qib: '—', nii: '—', retail: '—',
    gmp: '+₹32 (14%)',
    verdict: 'long', verdictLabel: 'Apply (Long Term)',
    minInvest: '₹14,850', lotSize: '66 Shares',
  },
  {
    company: 'BharatMed Devices', sector: 'Medical Devices', abbr: 'BM',
    status: 'upcoming', priceBand: '₹720 – ₹760', issueSize: '₹2,400 Cr',
    openDate: '15 Sep 2026', closeDate: '18 Sep 2026',
    qib: '—', nii: '—', retail: '—',
    gmp: 'Not Available',
    verdict: 'watch', verdictLabel: 'Watch & Wait',
    minInvest: '₹14,440', lotSize: '19 Shares',
  },
  {
    company: 'SwiftLog Solutions', sector: 'Logistics Tech', abbr: 'SL',
    status: 'listed', priceBand: '₹490 – ₹520', issueSize: '₹2,100 Cr',
    openDate: '14 Aug 2026', closeDate: '16 Aug 2026',
    qib: '41.2x', nii: '28.5x', retail: '15.8x',
    gmp: '+₹188 (36%) — Listed ₹694',
    verdict: 'long', verdictLabel: 'Long Term Hold',
    minInvest: '₹14,600', lotSize: '28 Shares',
  },
  {
    company: 'KraftPack Industries', sector: 'Packaging / FMCG', abbr: 'KP',
    status: 'listed', priceBand: '₹120 – ₹130', issueSize: '₹680 Cr',
    openDate: '05 Aug 2026', closeDate: '07 Aug 2026',
    qib: '6.4x', nii: '4.2x', retail: '3.1x',
    gmp: 'Listed ₹128 (−1.5%)',
    verdict: 'avoid', verdictLabel: 'Avoid / Exit',
    minInvest: '₹14,300', lotSize: '110 Shares',
  },
];

/* ── NOTIFICATIONS DATA ──────────────────────────────────── */
const NOTIFICATIONS = [
  {
    id: 1, cat: 'alert', icon: '🚨', catLabel: 'URGENT ALERT',
    title: 'Nifty Bull Put Spread — Exit Signal Triggered',
    text: 'Nifty tested support at 24,680 briefly. Consider booking 60% profits on 24,700 PE sold position. Strategy target achieved at ₹4,640.',
    time: 'Today, 10:42 AM', unread: true, urgent: true, locked: false,
  },
  {
    id: 2, cat: 'options', icon: '📊', catLabel: 'OPTION STRATEGY',
    title: 'New Strategy Initiated — Bank Nifty Iron Condor',
    text: 'Bank Nifty Iron Condor initiated for 12 Sep expiry. Sell 51,500 CE | Buy 52,000 CE | Sell 50,500 PE | Buy 50,000 PE. Net premium: ₹7,200.',
    time: 'Today, 09:15 AM', unread: true, urgent: false, locked: false,
  },
  {
    id: 3, cat: 'portfolio', icon: '📈', catLabel: 'PORTFOLIO UPDATE',
    title: 'Rebalance Alert — HDFC Bank Position Increased',
    text: 'AD Active 10 portfolio rebalanced. HDFC Bank allocation increased from 11% to 13.5% citing strong Q2FY27 guidance and credit cost normalization.',
    time: 'Yesterday, 06:30 PM', unread: true, urgent: false, locked: false,
  },
  {
    id: 4, cat: 'ipo', icon: '🚀', catLabel: 'IPO RADAR',
    title: 'NovaTech Systems IPO — Subscribe Recommended',
    text: 'GMP surged to ₹88 (22% premium). QIB subscription hit 8.24x by Day 2. Strong valuation comfort at 32x FY27E EPS. Recommend Subscribe for Listing Gains.',
    time: 'Yesterday, 11:00 AM', unread: false, urgent: false, locked: false,
  },
  {
    id: 5, cat: 'macro', icon: '🌐', catLabel: 'MACRO UPDATE',
    title: 'Market Outlook — Neutral to Bullish; PCR at 1.42',
    text: 'PCR strengthened to 1.42. FII net buying ₹2,840 Cr in cash segment. Max Pain for Nifty weekly at 24,700. VIX cooled below 13 — supports selling volatility.',
    time: '30 Aug 2026, 08:45 AM', unread: false, urgent: false, locked: false,
  },
  {
    id: 6, cat: 'portfolio', icon: '🔍', catLabel: 'DEEP DIVE',
    title: 'Dixon Technologies — Technical Breakout above ₹11,000',
    text: 'Dixon broke out of a 6-week consolidation with above-average volume. PLI scheme tailwind, Apple supply chain entry on track. Revised target ₹14,000.',
    time: '29 Aug 2026, 03:15 PM', unread: false, urgent: false, locked: true,
  },
  {
    id: 7, cat: 'options', icon: '📐', catLabel: 'STRATEGY INSIGHT',
    title: 'Weekly P&L Report — +₹3,250 This Week',
    text: 'AD Nifty Weekly strategy delivered ₹3,250 this week (3.25% on capital). Cumulative since inception: ₹20,450 (20.45%). CAGR stands at 24.52%.',
    time: '29 Aug 2026, 06:00 PM', unread: false, urgent: false, locked: false,
  },
  {
    id: 8, cat: 'macro', icon: '🏦', catLabel: 'RBI WATCH',
    title: 'RBI MPC Meet — Rate Pause Expected; Liquidity Supportive',
    text: 'RBI MPC expected to hold repo rate at 6.25% in upcoming meeting. Easing liquidity and benign CPI (3.8%) support equity markets. Banking & NBFC sector positive.',
    time: '28 Aug 2026, 10:00 AM', unread: false, urgent: false, locked: true,
  },
];

/* ── PERFORMANCE DATA ─────────────────────────────────────── */
const PERF_TABLE = [
  { period: 'Since Inception', capital: '1,00,000', profit: '20,450', profitPct: '+20.45%', cagr: '24.52%', irr: '22.31%', pos: true },
  { period: 'FY 2025-26 (YTD)', capital: '1,00,000', profit: '12,850', profitPct: '+12.85%', cagr: '—', irr: '—', pos: true },
  { period: 'Jun 2026', capital: '1,00,000', profit: '4,700', profitPct: '+4.70%', cagr: '—', irr: '—', pos: true },
  { period: 'May 2026', capital: '1,00,000', profit: '4,950', profitPct: '+4.95%', cagr: '—', irr: '—', pos: true },
  { period: 'Apr 2026', capital: '1,00,000', profit: '-2,750', profitPct: '-2.75%', cagr: '—', irr: '—', pos: false },
  { period: 'Mar 2026', capital: '1,00,000', profit: '1,100', profitPct: '+1.10%', cagr: '—', irr: '—', pos: true },
  { period: 'Feb 2026', capital: '1,00,000', profit: '3,200', profitPct: '+3.20%', cagr: '—', irr: '—', pos: true },
  { period: 'Jan 2026', capital: '1,00,000', profit: '1,000', profitPct: '+1.00%', cagr: '—', irr: '—', pos: true },
];

/* ══════════════════════════════════════════════════════════════
   DOM HELPERS
══════════════════════════════════════════════════════════════ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ══════════════════════════════════════════════════════════════
   TICKER BAR
══════════════════════════════════════════════════════════════ */
function buildTicker() {
  const track = $('#tickerItems');
  if (!track) return;
  const items = [...MARKET_DATA, ...MARKET_DATA]; // duplicate for seamless loop
  track.innerHTML = items.map(d => `
    <div class="ticker-item">
      <span class="name">${d.name}</span>
      <span class="value">${d.value}</span>
      <span class="change ${d.pos ? 'pos' : 'neg'}">${d.pct}</span>
      <canvas class="spark" id="spark_${Math.random().toString(36).slice(2,7)}"></canvas>
    </div>
  `).join('');

  // Draw sparklines
  track.querySelectorAll('.spark').forEach(canvas => {
    const ctx = canvas.getContext('2d');
    const isPos = canvas.closest('.ticker-item').querySelector('.change').classList.contains('pos');
    const color = isPos ? '#10b981' : '#ef4444';
    const pts = Array.from({length: 14}, () => 50 + (Math.random() - 0.48) * 30);
    ctx.canvas.width = 52; ctx.canvas.height = 22;
    const min = Math.min(...pts), max = Math.max(...pts), range = max - min || 1;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.lineJoin = 'round';
    pts.forEach((v, i) => {
      const x = (i / (pts.length - 1)) * 52;
      const y = 22 - ((v - min) / range) * 18 - 2;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
  });
}

/* ══════════════════════════════════════════════════════════════
   SIDEBAR / NAVIGATION
══════════════════════════════════════════════════════════════ */
function initNavigation() {
  // Main nav links
  $$('.nav-link[data-section]').forEach(link => {
    link.addEventListener('click', () => {
      const sec = link.dataset.section;
      navigateTo(sec);
    });
  });

  // Sidebar items
  $$('.sidebar-item[data-section]').forEach(item => {
    item.addEventListener('click', () => {
      const sec = item.dataset.section;
      navigateTo(sec);
    });
  });

  // Mobile bottom nav items
  $$('.mobile-nav-item[data-section]').forEach(item => {
    item.addEventListener('click', () => {
      const sec = item.dataset.section;
      navigateTo(sec);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

function navigateTo(section) {
  AppState.activeSection = section;

  // Update nav active states
  $$('.nav-link[data-section]').forEach(l => l.classList.toggle('active', l.dataset.section === section));
  $$('.sidebar-item[data-section]').forEach(i => i.classList.toggle('active', i.dataset.section === section));
  $$('.mobile-nav-item[data-section]').forEach(m => m.classList.toggle('active', m.dataset.section === section));

  // Show/hide sections
  $$('.page-section').forEach(s => s.classList.toggle('active', s.id === `sec-${section}`));

  // Init section-specific charts / content
  if (section === 'analytics') initAnalyticsCharts();
  if (section === 'portfolio') initPortfolioDonut();
  if (section === 'dashboard') initDashboardCharts();
}

/* ══════════════════════════════════════════════════════════════
   CHARTS — DASHBOARD
══════════════════════════════════════════════════════════════ */
function initDashboardCharts() {
  initBenchmarkChart();
  initOptionsBarChart();
  initBiasGauge();
}

function initBenchmarkChart() {
  const canvas = $('#benchmarkChart');
  if (!canvas) return;
  if (AppState.chartInstances.benchmark) {
    AppState.chartInstances.benchmark.destroy();
  }

  const labels = ['01 Jun','08 Jun','15 Jun','22 Jun','30 Jun','07 Jul','15 Jul','22 Jul','31 Jul','08 Aug','15 Aug','22 Aug','30 Aug'];
  const portfolio = [0, 1.2, 2.4, 1.8, 3.0, 4.1, 3.5, 5.2, 6.0, 6.8, 7.4, 8.1, 8.45];
  const nifty    = [0, 0.6, 1.0, 0.8, 1.5, 2.0, 1.6, 2.8, 3.5, 4.0, 4.4, 4.9, 5.24];

  AppState.chartInstances.benchmark = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'AD Active 10',
          data: portfolio,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16,185,129,0.07)',
          borderWidth: 2.5,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#10b981',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'NIFTY 50 Benchmark',
          data: nifty,
          borderColor: '#f59e0b',
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderDash: [5, 4],
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#f59e0b',
          fill: false,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          labels: { color: '#8fa8c8', font: { family: 'JetBrains Mono', size: 11 }, boxWidth: 12, padding: 16 },
        },
        tooltip: {
          backgroundColor: '#0f1a2e',
          borderColor: 'rgba(99,155,255,0.2)',
          borderWidth: 1,
          titleColor: '#e8f0fe',
          bodyColor: '#8fa8c8',
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: +${ctx.parsed.y.toFixed(2)}%`,
          },
        },
      },
      scales: {
        x: {
          grid: { color: 'rgba(99,155,255,0.06)' },
          ticks: { color: '#4a6282', font: { family: 'JetBrains Mono', size: 10 } },
        },
        y: {
          grid: { color: 'rgba(99,155,255,0.06)' },
          ticks: {
            color: '#4a6282',
            font: { family: 'JetBrains Mono', size: 10 },
            callback: v => `${v}%`,
          },
        },
      },
    },
  });
}

function initOptionsBarChart() {
  const canvas = $('#optionsBarChart');
  if (!canvas) return;
  if (AppState.chartInstances.optBar) AppState.chartInstances.optBar.destroy();

  const months = ['Sep\'25','Oct\'25','Nov\'25','Dec\'25','Jan\'26','Feb\'26','Mar\'26','Apr\'26','May\'26','Jun\'26','Jul\'26','Aug\'26'];
  const monthly = [2100, 3200, -800, 4100, 1000, 3200, 1100, -2750, 4950, 4700, 1650, 3250];
  const cumulative = monthly.reduce((acc, v, i) => { acc.push((acc[i-1] || 0) + v); return acc; }, []);

  const barColors = monthly.map(v => v >= 0 ? 'rgba(16,185,129,0.7)' : 'rgba(239,68,68,0.7)');

  AppState.chartInstances.optBar = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        {
          type: 'bar',
          label: 'Monthly Net P&L (₹)',
          data: monthly,
          backgroundColor: barColors,
          borderColor: barColors,
          borderWidth: 0,
          borderRadius: 4,
          yAxisID: 'y',
        },
        {
          type: 'line',
          label: 'Cumulative P&L (₹)',
          data: cumulative,
          borderColor: '#06b6d4',
          backgroundColor: 'rgba(6,182,212,0.05)',
          borderWidth: 2.5,
          pointRadius: 3,
          pointBackgroundColor: '#06b6d4',
          fill: true,
          tension: 0.4,
          yAxisID: 'y2',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          labels: { color: '#8fa8c8', font: { family: 'JetBrains Mono', size: 11 }, boxWidth: 12, padding: 16 },
        },
        tooltip: {
          backgroundColor: '#0f1a2e',
          borderColor: 'rgba(99,155,255,0.2)',
          borderWidth: 1,
          titleColor: '#e8f0fe',
          bodyColor: '#8fa8c8',
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: ₹${ctx.parsed.y.toLocaleString('en-IN')}`,
          },
        },
      },
      scales: {
        x: { grid: { color: 'rgba(99,155,255,0.06)' }, ticks: { color: '#4a6282', font: { family: 'JetBrains Mono', size: 10 } } },
        y: {
          position: 'left',
          grid: { color: 'rgba(99,155,255,0.06)' },
          ticks: { color: '#4a6282', font: { family: 'JetBrains Mono', size: 10 }, callback: v => `₹${(v/1000).toFixed(0)}K` },
        },
        y2: {
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: { color: '#06b6d4', font: { family: 'JetBrains Mono', size: 10 }, callback: v => `₹${(v/1000).toFixed(0)}K` },
        },
      },
    },
  });
}

function initBiasGauge() {
  const canvas = $('#biasGaugeCanvas');
  if (!canvas) return;
  if (AppState.chartInstances.gauge) AppState.chartInstances.gauge.destroy();

  // Custom gauge using doughnut
  const val = 65; // 0-100 (65 = neutral-bullish)
  AppState.chartInstances.gauge = new Chart(canvas, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [val, 100 - val, 100],
        backgroundColor: ['#10b981', '#1a2748', 'transparent'],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
      }],
    },
    options: {
      responsive: false,
      cutout: '72%',
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
    },
  });
}

/* ── Portfolio Donut ──────────────────────────────────────── */
function initPortfolioDonut() {
  const canvas = $('#portfolioDonut');
  if (!canvas) return;
  if (AppState.chartInstances.donut) AppState.chartInstances.donut.destroy();

  const visible = PORTFOLIO.slice(0, 5);
  const colors = ['#10b981','#06b6d4','#6366f1','#f59e0b','#8b5cf6'];

  AppState.chartInstances.donut = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: visible.map(s => s.ticker),
      datasets: [{
        data: visible.map(s => s.alloc),
        backgroundColor: colors,
        borderColor: '#0c1424',
        borderWidth: 3,
        hoverOffset: 6,
      }],
    },
    options: {
      responsive: true,
      cutout: '68%',
      plugins: {
        legend: {
          position: 'right',
          labels: { color: '#8fa8c8', font: { family: 'JetBrains Mono', size: 10 }, boxWidth: 10, padding: 10 },
        },
        tooltip: {
          backgroundColor: '#0f1a2e',
          borderColor: 'rgba(99,155,255,0.2)',
          borderWidth: 1,
          titleColor: '#e8f0fe',
          bodyColor: '#8fa8c8',
          callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` },
        },
      },
    },
  });
}

/* ── Analytics Section Charts ─────────────────────────────── */
function initAnalyticsCharts() {
  initBenchmarkChart();
  initOptionsBarChart();
}

/* ══════════════════════════════════════════════════════════════
   RENDER — OPTIONS STRATEGIES
══════════════════════════════════════════════════════════════ */
function renderOptions() {
  const grid = $('#optionsGrid');
  if (!grid) return;

  const isPremium = hasAccess('options_basic');
  const isElite = hasAccess('options_full');

  grid.innerHTML = OPTIONS_STRATEGIES.map(s => {
    const shouldLock = s.locked && !isElite;
    const content = `
      <div class="strategy-card ${shouldLock ? 'locked-overlay' : ''}">
        ${shouldLock ? `
          <div class="strategy-card-body lock-blur">
            <div class="strategy-card-header">
              <div><div class="strategy-name">${s.name}</div><div class="strategy-type">${s.type}</div></div>
              <span class="strategy-status status-active">Active</span>
            </div>
            <div style="padding:14px 16px"><div class="strategy-metrics">
              <div class="sm-item"><div class="sm-label">Underlying</div><div class="sm-value">— —</div></div>
              <div class="sm-item"><div class="sm-label">Premium</div><div class="sm-value">₹X,XXX</div></div>
            </div></div>
          </div>
          <div class="lock-gate">
            <div class="lock-icon">🔒</div>
            <p>Elite subscribers can view all strategy details</p>
            <button class="btn-unlock" onclick="openModal()">Upgrade to Elite</button>
          </div>
        ` : `
          <div class="strategy-card-header">
            <div>
              <div class="strategy-name">${s.name}</div>
              <div class="strategy-type">${s.type} · Expiry: ${s.expiry}</div>
            </div>
            <span class="strategy-status ${s.status === 'active' ? 'status-active' : s.status === 'pending' ? 'status-pending' : 'status-closed'}">
              ${s.status.charAt(0).toUpperCase() + s.status.slice(1)}
            </span>
          </div>
          <div class="strategy-card-body">
            <div style="font-family:var(--font-mono);font-size:0.75rem;color:var(--cyan);background:rgba(6,182,212,0.08);padding:8px 10px;border-radius:6px;margin-bottom:12px;border:1px solid rgba(6,182,212,0.15)">
              ${isPremium ? s.strategy : '<span style="filter:blur(5px)">SELL XXXXX PE | BUY XXXXX PE</span>'}
            </div>
            <div class="strategy-metrics">
              <div class="sm-item"><div class="sm-label">Underlying</div><div class="sm-value">${s.underlying}</div></div>
              <div class="sm-item"><div class="sm-label">Spot Ref</div><div class="sm-value">${s.spot}</div></div>
              <div class="sm-item"><div class="sm-label">Net Premium</div><div class="sm-value green">${isPremium ? s.premium : '₹X,XXX'}</div></div>
              <div class="sm-item"><div class="sm-label">Margin Req.</div><div class="sm-value">${isPremium ? s.margin : '₹XX,XXX'}</div></div>
              <div class="sm-item"><div class="sm-label">Max Risk</div><div class="sm-value red">${isPremium ? s.maxRisk : '₹XX,XXX'}</div></div>
              <div class="sm-item"><div class="sm-label">Max Profit</div><div class="sm-value green">${isPremium ? s.maxProfit : '₹X,XXX'}</div></div>
              <div class="sm-item"><div class="sm-label">Target Exit</div><div class="sm-value amber">${isPremium ? s.target : '₹X,XXX'}</div></div>
              <div class="sm-item"><div class="sm-label">Win Rate</div><div class="sm-value">${s.winRate}</div></div>
            </div>
          </div>
          <div class="strategy-card-footer">
            <div class="progress-bar-wrap">
              <div class="pb-label">Capital Utilisation — ${s.capitalUtil}%</div>
              <div class="pb-track"><div class="pb-fill" style="width:${s.capitalUtil}%"></div></div>
            </div>
            <div style="text-align:right">
              <div style="font-family:var(--font-mono);font-size:1rem;font-weight:700;color:${s.pnl.startsWith('+') ? 'var(--emerald)' : s.pnl === '₹0' ? 'var(--text-secondary)' : 'var(--crimson)'}">
                ${isPremium ? s.pnl : '—'}
              </div>
              <div style="font-family:var(--font-mono);font-size:0.68rem;color:var(--text-muted)">This Week P&L</div>
            </div>
          </div>
        `}
      </div>
    `;
    return content;
  }).join('');
}

/* ══════════════════════════════════════════════════════════════
   RENDER — PORTFOLIO
══════════════════════════════════════════════════════════════ */
function renderPortfolio() {
  const tbody = $('#holdingsBody');
  if (!tbody) return;

  const canView = hasAccess('portfolio_view');
  const canFull = hasAccess('portfolio_full');

  tbody.innerHTML = PORTFOLIO.map(s => {
    const locked = s.locked && !canFull;
    const pnlClass = s.pnl > 0 ? 'text-green' : 'text-red';
    const verdictMap = { hold: 'verdict-hold HOLD', buy: 'verdict-buy BUY', 'strong-buy': 'verdict-strong-buy STRONG BUY' };
    const [vClass, vLabel] = verdictMap[s.verdict].split(' ');

    return `<tr>
      <td>
        <div class="stock-name-cell">
          <span class="stock-ticker">${s.ticker}</span>
          <span class="stock-name">${locked ? '— — — — —' : s.name}</span>
          <span class="stock-sector">${s.sector}</span>
        </div>
      </td>
      <td>
        <div class="alloc-bar-wrap">
          <div class="alloc-bar" style="width:${s.alloc * 4}px"></div>
          <span class="font-mono" style="font-size:0.8rem">${s.alloc}%</span>
        </div>
      </td>
      <td class="font-mono">₹${locked ? 'X,XXX' : s.entry.toLocaleString('en-IN')}</td>
      <td class="font-mono font-bold">₹${s.cmp.toLocaleString('en-IN')}</td>
      <td class="font-mono">${locked ? '₹X,XXX' : '₹' + s.target.toLocaleString('en-IN')}</td>
      <td class="font-mono">${locked ? '₹X,XXX' : '₹' + s.sl.toLocaleString('en-IN')}</td>
      <td class="font-mono ${pnlClass} fw-700">${s.pnl > 0 ? '+' : ''}${s.pnl}%</td>
      <td>
        ${locked
          ? `<button class="verdict-badge verdict-hold" onclick="openModal()" title="Upgrade to view">🔒 Locked</button>`
          : `<span class="verdict-badge ${verdictMap[s.verdict].split(' ')[0]}">${verdictMap[s.verdict].split(' ').slice(1).join(' ')}</span>`
        }
      </td>
    </tr>`;
  }).join('');
}

/* ══════════════════════════════════════════════════════════════
   RENDER — IPO
══════════════════════════════════════════════════════════════ */
function renderIPO() {
  const container = $('#ipoCards');
  if (!container) return;

  const filtered = AppState.ipoFilter === 'all' ? IPO_DATA : IPO_DATA.filter(i => i.status === AppState.ipoFilter);
  const canFull = hasAccess('ipo_full');

  const verdictMap = {
    strong: ['verdict-strong', 'Subscribe'],
    long:   ['verdict-long', 'Long Term'],
    avoid:  ['verdict-avoid', 'Avoid'],
    watch:  ['verdict-watch', 'Watch'],
  };

  container.innerHTML = filtered.map(ipo => {
    const [vc, vl] = verdictMap[ipo.verdict];
    const isListed = ipo.status === 'listed';
    const isUpcoming = ipo.status === 'upcoming';

    return `
      <div class="ipo-card">
        <div class="ipo-card-top">
          <div class="ipo-company-row">
            <div class="ipo-logo">${ipo.abbr}</div>
            <div class="ipo-company-info">
              <div class="ipo-company-name">${ipo.company}</div>
              <div class="ipo-company-sector">${ipo.sector}</div>
            </div>
            <span class="ipo-verdict ${vc}">${vl}</span>
          </div>
          <div class="ipo-meta">
            <div class="ipo-meta-item"><div class="ipo-meta-label">Price Band</div><div class="ipo-meta-val">${ipo.priceBand}</div></div>
            <div class="ipo-meta-item"><div class="ipo-meta-label">Issue Size</div><div class="ipo-meta-val">${ipo.issueSize}</div></div>
            <div class="ipo-meta-item"><div class="ipo-meta-label">${isListed ? 'Listed' : isUpcoming ? 'Opens' : 'Closes'}</div><div class="ipo-meta-val">${isListed ? ipo.openDate : isUpcoming ? ipo.openDate : ipo.closeDate}</div></div>
            <div class="ipo-meta-item"><div class="ipo-meta-label">Min. Invest</div><div class="ipo-meta-val">${ipo.minInvest}</div></div>
          </div>
        </div>
        <div class="ipo-card-body">
          <div class="ipo-subs-row">
            <div class="ipo-sub-badge">
              <div class="ipo-sub-label">QIB</div>
              <div class="ipo-sub-val" style="color:var(--emerald)">${ipo.qib}</div>
            </div>
            <div class="ipo-sub-badge">
              <div class="ipo-sub-label">NII</div>
              <div class="ipo-sub-val" style="color:var(--cyan)">${ipo.nii}</div>
            </div>
            <div class="ipo-sub-badge">
              <div class="ipo-sub-label">Retail</div>
              <div class="ipo-sub-val" style="color:var(--amber)">${ipo.retail}</div>
            </div>
          </div>
          <div class="ipo-gmp">
            <div class="ipo-gmp-label">📈 GMP / Listing Estimate</div>
            <div class="ipo-gmp-val">${canFull ? ipo.gmp : '🔒 Premium'}</div>
          </div>
          <div style="margin-top:12px;padding:10px;background:var(--bg-secondary);border-radius:var(--radius);border:1px solid var(--border)">
            <div style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;margin-bottom:4px">Analyst Verdict</div>
            <div style="font-size:0.8rem;color:var(--text-secondary)">${canFull ? ipo.verdictLabel : '<span style="filter:blur(4px)">Upgrade to Premium to view full analyst verdict and rationale</span>'}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* ══════════════════════════════════════════════════════════════
   RENDER — NOTIFICATIONS
══════════════════════════════════════════════════════════════ */
function renderNotifications() {
  const feed = $('#notifFeed');
  if (!feed) return;

  const f = AppState.notifFilter;
  const filtered = f === 'all' ? NOTIFICATIONS : NOTIFICATIONS.filter(n => n.cat === f);
  const canFull = hasAccess('notif_full');

  const catColorMap = { options: 'nc-options', portfolio: 'nc-portfolio', ipo: 'nc-ipo', macro: 'nc-macro', alert: 'nc-alert' };
  const iconBgMap = { options: 'ni-options', portfolio: 'ni-portfolio', ipo: 'ni-ipo', macro: 'ni-macro', alert: 'ni-alert' };

  feed.innerHTML = filtered.map(n => {
    const shouldLock = n.locked && !canFull;
    return `
      <div class="notif-item ${n.unread ? 'unread' : ''} ${n.urgent ? 'urgent' : ''}">
        <div class="notif-icon ${iconBgMap[n.cat]}">${n.icon}</div>
        <div class="notif-body">
          <div class="notif-meta">
            <span class="notif-cat ${catColorMap[n.cat]}">${n.catLabel}</span>
            ${n.urgent ? '<span style="font-family:var(--font-mono);font-size:0.6rem;background:rgba(239,68,68,0.15);color:var(--crimson);padding:2px 7px;border-radius:99px;font-weight:700">URGENT</span>' : ''}
          </div>
          <div class="notif-title">${shouldLock ? '<span style="filter:blur(4px)">Premium subscriber exclusive alert</span>' : n.title}</div>
          <div class="notif-text">${shouldLock ? '<span style="filter:blur(4px)">Upgrade to premium to unlock this research update and exclusive advisory.</span>' : n.text}</div>
          <div class="notif-time">${n.time}</div>
        </div>
        ${n.unread ? '<div class="unread-dot"></div>' : ''}
        ${shouldLock ? `<button class="verdict-badge verdict-hold" onclick="openModal()" style="margin-left:auto;flex-shrink:0">🔒 Unlock</button>` : ''}
      </div>
    `;
  }).join('');
}

/* ══════════════════════════════════════════════════════════════
   RENDER — PERFORMANCE TABLE
══════════════════════════════════════════════════════════════ */
function renderPerformanceTable() {
  const tbody = $('#perfTableBody');
  if (!tbody) return;

  tbody.innerHTML = PERF_TABLE.map(r => `
    <tr>
      <td class="period-col">${r.period}</td>
      <td class="neutral-val">₹${r.capital}</td>
      <td class="${r.pos ? 'pos-val' : 'neg-val'}">₹${r.profit}</td>
      <td class="${r.pos ? 'pos-val' : 'neg-val'}">${r.profitPct}</td>
      <td class="neutral-val">${r.cagr}</td>
      <td class="neutral-val">${r.irr}</td>
    </tr>
  `).join('');
}

/* ══════════════════════════════════════════════════════════════
   LOGIN / MODAL
══════════════════════════════════════════════════════════════ */
function openModal() {
  const modal = $('#loginModal');
  if (modal) modal.classList.add('open');
}
function closeModal() {
  const modal = $('#loginModal');
  if (modal) modal.classList.remove('open');
}

function initModal() {
  const modal = $('#loginModal');
  if (!modal) return;

  // Close on overlay click
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  $('#modalClose')?.addEventListener('click', closeModal);

  // Role selector
  $$('.role-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      $$('.role-opt').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      AppState.role = opt.dataset.role;
    });
  });

  // Submit
  $('#modalSubmitBtn')?.addEventListener('click', () => {
    const selectedRole = AppState.role;
    closeModal();
    updateUserUI(selectedRole);
    reRenderAll();
    showToast(
      selectedRole === 'visitor' ? 'Browsing as Visitor' : `Logged in as ${ROLES[selectedRole].label}`,
      selectedRole === 'visitor' ? 'Some content is gated. Upgrade to unlock.' : 'All your exclusive tips & research are now unlocked.',
      selectedRole === 'visitor' ? 'toast-warning' : 'toast-success'
    );
  });
}

function updateUserUI(role) {
  const userEl = $('#userRoleDisplay');
  const avatarEl = $('#userAvatar');
  const loginBtnEl = $('#loginBtn');
  if (userEl) userEl.textContent = ROLES[role].label;
  if (avatarEl) {
    avatarEl.style.display = role === 'visitor' ? 'none' : 'flex';
    avatarEl.textContent = role[0].toUpperCase();
  }
  if (loginBtnEl) {
    loginBtnEl.textContent = role === 'visitor' ? 'Login' : 'My Account';
  }

  // Show/hide visitor banner
  const banner = $('#subBanner');
  if (banner) banner.style.display = role === 'visitor' ? 'flex' : 'none';
}

function reRenderAll() {
  renderOptions();
  renderPortfolio();
  renderIPO();
  renderNotifications();
}

/* ══════════════════════════════════════════════════════════════
   TOAST NOTIFICATIONS
══════════════════════════════════════════════════════════════ */
function showToast(title, msg, type = 'toast-success') {
  const container = $('#toastContainer');
  if (!container) return;

  const icons = { 'toast-success': '✅', 'toast-warning': '⚠️', 'toast-alert': '🚨' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icons[type] || '💬'}</div>
    <div>
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${msg}</div>
    </div>
  `;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

/* ══════════════════════════════════════════════════════════════
   LIVE NOTIFICATION SIMULATION
══════════════════════════════════════════════════════════════ */
function startLiveAlerts() {
  const alerts = [
    ['🚨 NIFTY Alert', 'Nifty approaching 24,900 resistance. Monitor exits.', 'toast-alert'],
    ['📊 Strategy Update', 'Bank Nifty Iron Condor — premium at 80% decay.', 'toast-success'],
    ['🚀 IPO Subscription', 'GreenPower Infra IPO fully subscribed (Day 3).', 'toast-success'],
    ['📈 Portfolio Signal', 'Polycab touching 52-week high ₹5,840.', 'toast-success'],
  ];
  let i = 0;
  setTimeout(() => {
    const interval = setInterval(() => {
      if (i >= alerts.length) { clearInterval(interval); return; }
      showToast(...alerts[i++]);
    }, 8000);
    showToast(...alerts[i++]);
  }, 3000);
}

/* ══════════════════════════════════════════════════════════════
   IPO FILTER TABS
══════════════════════════════════════════════════════════════ */
function initIPOFilters() {
  $$('.ipo-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.ipo-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      AppState.ipoFilter = tab.dataset.filter;
      renderIPO();
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   NOTIFICATION FILTERS
══════════════════════════════════════════════════════════════ */
function initNotifFilters() {
  $$('.notif-filter').forEach(f => {
    f.addEventListener('click', () => {
      $$('.notif-filter').forEach(x => x.classList.remove('active'));
      f.classList.add('active');
      AppState.notifFilter = f.dataset.filter;
      renderNotifications();
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   OPTIONS TAB FILTERS
══════════════════════════════════════════════════════════════ */
function initOptionsTabFilters() {
  $$('.stab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.stab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   LOGIN BUTTON
══════════════════════════════════════════════════════════════ */
function initLoginBtn() {
  $('#loginBtn')?.addEventListener('click', openModal);
  $('#joinBtn')?.addEventListener('click', openModal);
  $$('.btn-unlock, .btn-plan').forEach(btn => {
    btn.addEventListener('click', openModal);
  });
}

/* ══════════════════════════════════════════════════════════════
   BOOT
══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  buildTicker();
  initNavigation();
  initModal();
  initIPOFilters();
  initNotifFilters();
  initOptionsTabFilters();
  initLoginBtn();

  // Render all sections initially
  renderOptions();
  renderPortfolio();
  renderIPO();
  renderNotifications();
  renderPerformanceTable();

  // Activate dashboard by default
  navigateTo('dashboard');

  // Start live toast alerts simulation
  startLiveAlerts();
});

// Expose for inline HTML onclick handlers
window.openModal = openModal;
window.closeModal = closeModal;
