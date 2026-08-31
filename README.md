# 📈 AlphaEdge Financials — Exclusive Research & Advisory Portal

> **Institutional-Grade Financial Intelligence, Weekly Defined-Risk Options Strategies, Curated Model Portfolios, and IPO Radar.**  
> *SEBI Registered Research Analyst · Registration No. INH0000020358*

---

## 🌟 Overview

**AlphaEdge Financials** is an editorial, technical, and subscription-gated financial dashboard and advisory web platform built for high-conviction Indian equity and derivative investors.

The platform combines real-time financial market parameters, defined-risk weekly option selling strategies, a 10-stock long-term model portfolio (AD Active 10), IPO intelligence, an actionable research feed with urgent trade alerts, and comprehensive historical performance analytics.

---

## 🚀 Key Modules & Features

### 1. 🏠 Market Dashboard & Live Ticker
- **Live Market Marquee**: Real-time ticker with sparkline charts tracking NIFTY 50, BANK NIFTY, FINNIFTY, SENSEX, INDIA VIX, USD/INR, Gold, and Crude Oil.
- **Hero Performance Metrics**: Portfolio returns, annualised CAGR, strategy win rate, weekly P&L, and capital utilisation.
- **Market Bias Speedometer**: Technical gauge based on Put-Call Ratio (PCR), VIX index levels, and institutional (FII/DII) flows.
- **Comparative Benchmark Chart**: Interactive multi-line graph comparing AD Active 10 against NIFTY 50 benchmark performance.
- **Monthly P&L Combo Chart**: Dual-axis bar and cumulative profit trend visualization.

### 2. ⚡ Weekly Option Selling Hub
- **Defined-Risk Only**: Strict spread structures (Bull Put Spreads, Iron Condors, Bear Call Spreads) — capped maximum loss with zero naked option risk.
- **Strategy Detail Cards**: Strike prices, spot reference, net premium collected, margin required, capital utilisation, win rate, and profit targets.
- **Gated Strike Levels**: Exact option legs blurred for non-subscribers with seamless upgrade triggers.

### 3. 📈 Curated Model Portfolio (AD Active 10)
- **10-Stock Long-Term Wealth Portfolio**: Complete holdings table with allocation percentage, entry price, CMP, target levels, stop-loss, and unrealized return.
- **Asset Allocation Donut Chart**: Top holdings breakdown and visual sector distribution.
- **Live Rebalance Logs**: Timestamped rebalancing rationales (e.g., banking breakout setups, capital allocation shifts).

### 4. 🚀 IPO Radar & Intelligence
- **Filterable Status**: Active / Open Now, Upcoming, and Recently Listed IPOs.
- **Subscription Multiples**: Live breakdown across QIB, NII (HNI), and Retail investor categories.
- **Grey Market Premium (GMP)**: Real-time GMP estimates with percentage listing gain projections.
- **Editorial Analyst Verdict**: Actionable recommendations (*Subscribe for Listing Gains*, *Long-Term Apply*, *Avoid*, or *Watch*).

### 5. 🔔 Updates & Actionable Alerts Feed
- **Multi-Category Live Feed**: Categorized by Urgent Alerts, Option Strategies, Portfolio Rebalances, IPO Updates, and Macro Commentary.
- **Urgent Notification Flags**: Visual red-border indicators and timestamped trade signals.
- **Telegram & WhatsApp Advisory Sync**: Direct community integration previews for Premium and Elite VIP tiers.

### 6. 📊 Performance & Capital Analytics
- **Historical Returns Ledger**: Inception-to-date and month-by-month financial ledger with CAGR and IRR tracking.
- **Alpha Generation**: Explicit outperformance calculation versus index benchmarks.

### 7. 💎 Membership Tiers & Access Gateway
- **Simulated Role Switcher**: Instant live previewing across **Visitor**, **Basic (₹999/mo)**, **Premium (₹1,999/mo)**, and **Elite VIP (₹2,999/mo)**.
- **Dynamic Content Gating**: Real-time locking/unlocking of strikes, price targets, GMP, and research reports.

---

## 📁 Repository Structure

```
├── index.html           # Main Single-Page Application (All 7 views & modals)
├── handbook.html        # Comprehensive Client Handbook & User Guide (14 chapters)
├── styles.css           # Custom dark editorial design system & typography tokens
├── app.js               # Application state, Chart.js integrations & role auth logic
├── .gitignore           # Git ignore rules
└── README.md            # Project documentation and deployment guide
```

---

## 🛠️ Technology Stack

- **Core**: Semantic HTML5, Vanilla CSS3, Modern ES6+ JavaScript.
- **Charting**: [Chart.js](https://www.chartjs.org/) for responsive canvas-based financial charts and gauges.
- **Typography**: Google Fonts (`Outfit`, `Inter`, `JetBrains Mono`).
- **Architecture**: Zero-dependency frontend — runs directly in modern browsers without complex build steps or node modules.

---

## 💻 How to Run Locally

1. Clone or download this repository:
   ```bash
   git clone <REPO_URL>
   cd finance
   ```
2. Open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari):
   ```bash
   # On Windows PowerShell
   Start-Process index.html

   # On macOS
   open index.html

   # On Linux
   xdg-open index.html
   ```

---

## 🌐 Deploying to GitHub Pages (1-Click Hosting)

You can easily host this website live on GitHub Pages:

1. Push this repository to your GitHub account.
2. Go to **Settings** > **Pages** in your GitHub repository.
3. Under **Branch**, select `main` (or `master`) and `/ (root)` folder.
4. Click **Save**.
5. Your live URL will be ready at: `https://<YOUR_USERNAME>.github.io/<REPO_NAME>/`

---

## 📖 Client Handbook

A full 14-chapter interactive user guide is included in `handbook.html`. It covers:
- Portal login and navigation
- Step-by-step interpretation of option strategy cards
- Equity portfolio metrics and rebalancing rules
- IPO Grey Market Premium (GMP) interpretation
- Risk disclosures, FAQ, and glossary of 15+ financial terms

---

## ⚠️ Regulatory & Risk Disclaimer

*Securities market investments are subject to market risks. Read all related documents carefully before investing. Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.*

- **SEBI Registration No.**: `INH0000020358`
- **BASL Membership**: `2024001`
- **Contact**: `research@alphaedge.in`
- **Grievance Support**: `compliance@alphaedge.in`

© 2026 AlphaEdge Financials. All rights reserved.
