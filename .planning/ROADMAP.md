# Roadmap: iMBA Money and Banking

## Overview

Build an interactive study web application for the Money and Banking course. Foundation and design system are complete. Future phases will be defined based on actual course content provided by the user.

## Domain Expertise

Module 1: Money and Finance — course content provided
Module 2: Modern Banking — course content provided

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [x] **Phase 1: Foundation** - Project setup with modern stack
- [x] **Phase 2: Design System** - Award-winning UI components and theming
- [x] **Phase 3: Module Navigation** - Card-based module selection for 8 modules
- [x] **Phase 4: Module 1 Content** - Interactive visualizations for Money and Finance
- [x] **Phase 5.1: Module 2 Content** - Interactive visualizations for Modern Banking (INSERTED)
- [ ] **Phase 6: Module 2 Complete** - Bank organization, lending, investment banking, and financial statements

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
- [ ] 06-01: Module 2 data extension (lessons 2-6 to 2-13, concepts)
- [ ] 06-02: Bank Types Pyramid + Funding Sources Comparison
- [ ] 06-03: Lending Process Flow + Investment Bank Structure
- [ ] 06-04: Bank Balance Sheet Detailed
- [ ] 06-05: Off-Balance Sheet Iceberg + Income Statement Waterfall
- [ ] 06-06: Module page integration + visual verification

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

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 3/3 | Complete | 2026-01-18 |
| 2. Design System | 4/4 | Complete | 2026-01-18 |
| 3. Module Navigation | 3/3 | Complete | 2026-01-18 |
| 4. Module 1 Content | 7/7 | Complete | 2026-01-20 |
| 5.1. Module 2 Content | 7/7 | Complete | 2026-01-21 |
| 6. Module 2 Complete | 0/6 | Planned | — |

## Next Steps

Phase 6 planned with 6 plans in 4 waves.

Run `/gsd:execute-phase 6` to build remaining Module 2 visualizations.
