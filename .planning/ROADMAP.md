# Roadmap: iMBA Money and Banking

## Overview

Build an interactive study web application for the Money and Banking course. Foundation and design system are complete. Future phases will be defined based on actual course content provided by the user.

## Domain Expertise

Module 1: Money and Finance — course content provided
Module 2: Modern Banking — course content provided
Module 3: Risk and Return — course content provided

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [x] **Phase 1: Foundation** - Project setup with modern stack
- [x] **Phase 2: Design System** - Award-winning UI components and theming
- [x] **Phase 3: Module Navigation** - Card-based module selection for 8 modules
- [x] **Phase 4: Module 1 Content** - Interactive visualizations for Money and Finance
- [x] **Phase 5.1: Module 2 Content** - Interactive visualizations for Modern Banking (INSERTED)
- [x] **Phase 6: Module 2 Complete** - Bank organization, lending, investment banking, and financial statements
- [x] **Phase 7: Module 3 Content** - Risk and return: bank capital, profitability metrics, and risk management
- [x] **Phase 8: Study Tools** - Cross-module glossary and exam practice system
- [ ] **Phase 9: Module 4 Content** - Regulation: goals, safety net, supervision, stress testing, TBTF, shadow banking

*Future modules to be added as course content is provided*

## Phase Details

### Phase 1: Foundation
**Goal**: Set up project with Next.js, Tailwind CSS, and animation library. Establish folder structure, linting, and development workflow.
**Depends on**: Nothing (first phase)
**Research**: Likely (tech stack decision)
**Research topics**: Next.js 14+ App Router patterns, Tailwind v4 setup, animation library comparison (Framer Motion vs GSAP vs Motion One)
**Plans**: 3 plans

Plans:
- [x] 01-01: Initialize Next.js project with TypeScript and Tailwind
- [x] 01-02: Configure animation library and development tooling
- [x] 01-03: Create base layout and folder structure

### Phase 2: Design System
**Goal**: Create reusable UI components with modern, minimalist aesthetic. Implement theming, typography, and responsive foundations.
**Depends on**: Phase 1
**Research**: Unlikely (internal UI patterns using chosen stack)
**Plans**: 4 plans

Plans:
- [x] 02-01: Define design tokens (colors, spacing, typography)
- [x] 02-02: Build core UI components (buttons, cards, containers)
- [x] 02-03: Create layout components and responsive grid
- [x] 02-04: Implement theme system and global styles

### Phase 3: Module Navigation
**Goal**: Build card-based home page with 8 module cards. Implement routing and module page structure.
**Depends on**: Phase 2
**Research**: Unlikely (standard routing and component patterns)
**Plans**: 3 plans

Plans:
- [x] 03-01: Create module card component with hover animations
- [x] 03-02: Build home page with module grid layout
- [x] 03-03: Implement module page template and routing

### Phase 4: Module 1 Content
**Goal**: Build interactive visualizations, concept exploration, and calculation tools for Module 1 (Money and Finance).
**Depends on**: Phase 3
**Research**: Unlikely (course content provided, implementation patterns established)
**Plans**: 7 plans in 4 waves

Plans:
- [x] 04-01: Visualization primitives (Slider, AnimatedValue, FlowArrow, Entity)
- [x] 04-02: Module 1 data & types (lessons, concepts)
- [x] 04-03: Financial System Flow diagram (Savers → Borrowers)
- [x] 04-04: Money Functions Triangle + Evolution Timeline
- [x] 04-05: Payment Methods Flow + M1/M2 Calculator
- [x] 04-06: Direct/Indirect Finance + Bank Balance Sheet
- [x] 04-07: Module page integration + visual verification

Wave structure:
- Wave 1 (parallel): 04-01, 04-02
- Wave 2 (parallel): 04-03, 04-04
- Wave 3 (parallel): 04-05, 04-06
- Wave 4: 04-07 (integration + checkpoint)

Style: Playful animations, money particles flowing, pulsing entities, engaging micro-interactions.

### Phase 5.1: Module 2 Content (INSERTED)
**Goal**: Build interactive visualizations for Module 2 (History of Modern Banking) - banking evolution timeline, organization comparisons, interest spread calculator, and regulation impact flows.
**Depends on**: Phase 4
**Research**: Unlikely (course content provided, reuse existing visualization patterns)
**Plans**: 7 plans in 4 waves

Plans:
- [x] 05.1-01: Module 2 data & types (lessons, concepts)
- [x] 05.1-02: Banking Evolution Timeline (1870-2008)
- [x] 05.1-03: Bank Organization Comparison (Unit → FHC)
- [x] 05.1-04: Interest Spread Calculator
- [x] 05.1-05: Regulation Impact Flow (Glass-Steagall → GLB)
- [x] 05.1-06: Bank Consolidation Chart
- [x] 05.1-07: Module page integration + visual verification

Wave structure:
- Wave 1: 05.1-01 (data foundation)
- Wave 2 (parallel): 05.1-02, 05.1-03, 05.1-04
- Wave 3 (parallel): 05.1-05, 05.1-06
- Wave 4: 05.1-07 (integration + checkpoint)

**Key Content Areas:**
- Lesson 2-0: Overview (Business Model, Commercial vs Investment Banking)
- Lesson 2-1.1: Early Banking (Unit Bank, Branch Network, Glass-Steagall)
- Lesson 2-1.2: Bank Holding Companies (3-6-3 Rule, Consolidation)
- Lesson 2-1.3: Deregulation (Riegle-Neal, Gramm-Leach-Bliley, Too Big To Fail)

**Visualization Ideas:**
- Banking Evolution Timeline (1870-2008)
- Bank Organization Comparison (Unit → Branch → BHC → FHC)
- Interest Spread Calculator
- Regulation Impact Flow
- Consolidation Chart (animated bank count decline)
- Modern Bank Structure (Financial Holding Company org chart)
- Revenue Mix Comparison (then vs now)

Style: Consistent with Module 1 - playful animations, interactive exploration.

### Phase 6: Module 2 Complete
**Goal**: Complete Module 2 content with Lessons 2.2 (Organization and Functions) and 2.3 (Financial Statement Analysis). Build interactive visualizations for bank types, lending process, investment banking, and financial statement analysis.
**Depends on**: Phase 5.1
**Research**: Unlikely (course content provided, reuse existing visualization patterns)
**Plans**: 6 plans in 4 waves

Plans:
- [x] 06-01: Module 2 data extension (lessons 2-6 to 2-13, concepts)
- [x] 06-02: Bank Types Pyramid + Funding Sources Comparison
- [x] 06-03: Lending Process Flow + Investment Bank Structure
- [x] 06-04: Bank Balance Sheet Detailed
- [x] 06-05: Off-Balance Sheet Iceberg + Income Statement Waterfall
- [x] 06-06: Module page integration + visual verification

Wave structure:
- Wave 1: 06-01 (data foundation)
- Wave 2 (parallel): 06-02, 06-03
- Wave 3 (parallel): 06-04, 06-05
- Wave 4: 06-06 (integration + checkpoint)

**Key Content Areas:**

*Lesson 2.2: Organization and Functions of Modern Banks*
- 2-2.1: Bank Types and Borrowing (Community, Regional, Money Center banks; funding sources: deposits, wholesale, capital)
- 2-2.2: Bank Lending (loan characteristics, consumer credit, C&I lending, relationship lending)
- 2-2.3: Changes in Lending Process (Originate-and-Hold vs Originate-and-Distribute, securitization, fintech)
- 2-2.4: Investment Bank Organization (financing, trading, advisory divisions)
- 2-2.5: Investment Banking Activities (underwriting, M&A advisory, securities trading)

*Lesson 2.3: Financial Statement Analysis*
- 2-3.1: Balance Sheet (banking book vs trading book, assets and liabilities structure)
- 2-3.2: Off-Balance Sheet (loan commitments, derivatives, notional vs market value)
- 2-3.3: Income Statement (NII, non-interest income, loan loss provisions)

**Visualization Ideas:**
- Bank Types Pyramid (Community → Regional → Money Center)
- Funding Sources Comparison (deposits vs wholesale vs capital)
- Lending Process Flow (Originate-and-Hold vs Originate-and-Distribute)
- Loan Types Explorer (consumer credit, C&I lending categories)
- Investment Bank Structure (divisions and activities)
- Underwriting Process Flow (IPO book building)
- Bank Balance Sheet Visualizer (interactive assets/liabilities)
- Off-Balance Sheet Iceberg (visible vs hidden risks)
- Income Statement Waterfall (revenue → profit)

Style: Consistent with existing modules - playful animations, interactive exploration, clear visual hierarchy.

### Phase 7: Module 3 Content
**Goal**: Build interactive visualizations for Module 3 (Risk and Return) - bank capital structure, profitability metrics (ROA, ROE, Leverage), risk types (credit, interest rate, liquidity, market, operational), and risk management tools.
**Depends on**: Phase 6
**Research**: Unlikely (course content provided, reuse existing visualization patterns)
**Plans**: 7 plans in 4 waves

Plans:
- [x] 07-01: Module 3 data & types (lessons 3-0 to 3-2.6, concepts)
- [x] 07-02: Risk-Return Tradeoff Curve + Bank Capital Structure
- [x] 07-03: ROA/ROE/Leverage Calculator + Performance Decomposition
- [x] 07-04: Credit Risk Flow (Rating → PD → Pricing) + FICO Scale
- [x] 07-05: Interest Rate Risk (Maturity Mismatch + Duration Gap)
- [x] 07-06: Liquidity Crisis Flow (Bank Run → Fire Sale) + VaR Distribution
- [x] 07-07: Module page integration + visual verification

Wave structure:
- Wave 1: 07-01 (data foundation)
- Wave 2 (parallel): 07-02, 07-03
- Wave 3 (parallel): 07-04, 07-05
- Wave 4 (parallel): 07-06, 07-07

**Key Content Areas:**

*Lesson 3-0: Overview*
- Risk–Return Tradeoff
- Risk-Adjusted Return
- Bank Performance ≠ Profit Only

*Lesson 3-1: Bank Capital and Profitability*
- 3-1.1: Bank Equity Capital (ownership, residual claim, loss absorber)
- 3-1.2: Measuring Performance (ROA, ROE, Leverage, Stock Returns)

*Lesson 3-2: Bank Risks and Risk Management*
- 3-2.1: Overview of Risk (measurement, management, insolvency threshold)
- 3-2.2: Credit Risk (default, PD, credit ratings, FICO, covenants, CDS)
- 3-2.3: Interest Rate Risk (maturity mismatch, cash flow vs valuation channel, swaps)
- 3-2.4: Liquidity Risk (cash shortfall, bank run, fire sale, asset/liability management)
- 3-2.5: Market Risk (trading book, mark-to-market, VaR, fat tails, black swan)
- 3-2.6: Operational Risk (system failures, fraud, fines, fintech disruption)

**Visualization Ideas:**
- Risk-Return Tradeoff Curve (interactive slider showing risk vs expected return)
- Bank Capital Structure (equity as loss absorber, waterfall of claims)
- ROA/ROE/Leverage Calculator (interactive with real bank examples)
- Performance Decomposition (ROE = ROA × Leverage breakdown)
- Credit Risk Flow (loan application → rating → PD → pricing → monitoring)
- FICO Score Scale (with default probability overlay)
- Interest Rate Sensitivity (bond price vs rate, duration visualization)
- Maturity Mismatch Diagram (short liabilities vs long assets)
- Liquidity Crisis Flow (deposit run → cash shortfall → fire sale → equity loss)
- VaR Distribution (P&L histogram with confidence interval cutoff)
- Five Risk Types Pentagon (credit, interest rate, liquidity, market, operational)
- Hedging Before/After (unhedged vs hedged profit line)

Style: Consistent with existing modules - playful animations, interactive calculators, clear visual hierarchy. Emphasis on formulas and quantitative relationships.

### Phase 8: Study Tools
**Goal**: Build cross-module study tools: searchable glossary with filtering and exam practice system with difficulty levels.
**Depends on**: Phase 7 (all module content complete)
**Research**: Unlikely (standard UI patterns)
**Plans**: 5 plans in 4 waves

Plans:
- [x] 08-01: Study tools types & data (glossary aggregation, exam questions)
- [x] 08-02: Header navigation + Study Tools landing page
- [x] 08-03: Glossary page with card grid, filters, and detail modal
- [x] 08-04: Exam practice with setup, quiz mode, timer, and gamification
- [x] 08-05: Integration + visual verification

Wave structure:
- Wave 1: 08-01 (data foundation)
- Wave 2 (parallel): 08-02, 08-03
- Wave 3: 08-04 (exam depends on types from 01)
- Wave 4: 08-05 (integration + checkpoint)

**Key Features:**

*Glossary*
- Card grid with 90+ terms from all modules
- Filter by definition type (term, concept, formula, regulation)
- Filter by first letter (A-Z index)
- Search functionality
- Modal popup with full definition and source link

*Exam Practice*
- Question count selection: 5, 10, 15, or 20
- Focused quiz mode (one question, full screen, 30s timer)
- Immediate feedback with explanation after each answer
- Difficulty distribution: Hard (40%), Medium (40%), Easy (20%)
- Gamification: points, streaks, badges
- LocalStorage progress persistence

Style: Consistent with existing modules - glass morphism, playful animations, engaging micro-interactions.

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 3/3 | Complete | 2026-01-18 |
| 2. Design System | 4/4 | Complete | 2026-01-18 |
| 3. Module Navigation | 3/3 | Complete | 2026-01-18 |
| 4. Module 1 Content | 7/7 | Complete | 2026-01-20 |
| 5.1. Module 2 Content | 7/7 | Complete | 2026-01-21 |
| 6. Module 2 Complete | 6/6 | Complete | 2026-02-01 |
| 7. Module 3 Content | 7/7 | Complete | 2026-02-01 |
| 8. Study Tools | 5/5 | Complete | 2026-02-01 |

### Phase 9: Module 4 Content
**Goal**: Build interactive visualizations for Module 4 (Regulation) — regulation goals, government safety net, bank supervision, stress testing, too big to fail, shadow banking, and money market funds.
**Depends on**: Phase 8
**Research**: Unlikely (course content provided, reuse existing visualization patterns)
**Plans**: 9 plans in 6 waves

Plans:
- [ ] 09-01: Module 4 data & types (lessons, concepts)
- [ ] 09-02: ExternalityDiagram + SafetyNetFlow + ContagionNetwork
- [ ] 09-03: TEDSpreadTimeline + CapitalRequirementsCalculator + CAMELSRadar
- [ ] 09-04: StressTestSimulator + TBTFConcentration
- [ ] 09-05: ShadowBankingComparison + MoneyMarketRunChart
- [ ] 09-06: RegulationOverviewFlow + SupervisoryProcessFlow
- [ ] 09-07: Module page integration (Module4Content + routing)
- [ ] 09-08: Glossary + exam questions update
- [ ] 09-09: Visual verification

Wave structure:
- Wave 1: 09-01 (data foundation)
- Wave 2 (parallel): 09-02, 09-03
- Wave 3 (parallel): 09-04, 09-05
- Wave 4: 09-06
- Wave 5 (parallel): 09-07, 09-08
- Wave 6: 09-09 (integration + checkpoint)

**Key Content Areas:**

*Lesson 4-1: Goals of Financial Regulation*
- 4-1.1: Goals (market failure, externalities, microprudential vs macroprudential, moral hazard)
- 4-1.2: Government Safety Net (bank fragility, runs, deposit insurance, LOLR)
- 4-1.3: 2007-2009 Crisis Interventions (TED spread, TARP, facility expansion)

*Lesson 4-2: Regulation and Supervision in Practice*
- 4-2.1: Bank Regulation Rules (competition, activities, capital, Basel Accord, risk-weighted assets)
- 4-2.2: Supervisory Process (examination, CAMELS, enforcement actions, problem bank list)
- 4-2.3: Stress Testing (SCAP, CCAR, scenario design, stressed capital ratio)

*Lesson 4-3: 21st Century Challenges*
- 4-3.1: Too Big to Fail (bank concentration, systemic risk, G-SIB, surcharges, FSOC/SIFI)
- 4-3.2: Shadow Banking (definition, regulatory arbitrage, repos, MBS)
- 4-3.3: Money Market Funds Case Study (2008 run, floating NAV, gates, 2020 repeat)

**Visualization Ideas:**
- Externality Diagram (private vs social cost, micro/macro prudential)
- Safety Net Flow (FDIC + LOLR before/after crisis)
- Contagion Network (animated bank failure spread)
- TED Spread Crisis Timeline (2006-2010)
- Capital Requirements Calculator (Basel risk-weighted assets)
- CAMELS Radar (hexagon rating with bank presets)
- Stress Test Simulator (scenario selection + capital waterfall)
- TBTF Bank Concentration (G-SIB buckets + surcharge ladder)
- Shadow Banking Comparison (bank vs shadow side-by-side)
- Money Market Run Chart (crisis narrative + reform paradox)
- Regulation Overview Flow (three pillars + US structure)
- Supervisory Process Flow (examination → CAMELS → enforcement)

Style: Consistent with existing modules — playful animations, interactive exploration, clear visual hierarchy.

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 3/3 | Complete | 2026-01-18 |
| 2. Design System | 4/4 | Complete | 2026-01-18 |
| 3. Module Navigation | 3/3 | Complete | 2026-01-18 |
| 4. Module 1 Content | 7/7 | Complete | 2026-01-20 |
| 5.1. Module 2 Content | 7/7 | Complete | 2026-01-21 |
| 6. Module 2 Complete | 6/6 | Complete | 2026-02-01 |
| 7. Module 3 Content | 7/7 | Complete | 2026-02-01 |
| 8. Study Tools | 5/5 | Complete | 2026-02-01 |
| 9. Module 4 Content | 0/9 | Planned | — |

Run `npm run dev` to start the development server.
