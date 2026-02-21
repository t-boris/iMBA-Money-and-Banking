# Phase 11: Module 6 Content - Research

**Researched:** 2026-02-21
**Domain:** Interactive monetary policy visualizations (Next.js + Tailwind + Motion)
**Confidence:** HIGH

<research_summary>
## Summary

Researched the existing codebase patterns, Module 5 overlap, and dashboard-style visualization approaches for Module 6 (Central Banks and Monetary Policy).

Key finding: **Module 5 already covers the Federal Funds market** (ShortTermFundingDashboard includes supply/demand curves with IOR floor, reserve supply slider, and rate equilibrium). Module 6 must extend — not duplicate — this foundation. The ShortTermFundingDashboard's Federal Funds view already implements reserve supply/demand mechanics but does NOT cover: ON RRP ceiling, IORB vs discount rate corridor, the abundant reserves regime, QE balance sheet mechanics, or forward guidance.

The user's vision calls for **dashboard-style panels** grouped by Fed function (structure & mandate, traditional toolkit, crisis toolkit) — a departure from the lesson-by-lesson navigation in Modules 1-5. However, the underlying lesson/concept data structure should remain identical for glossary and exam integration.

**Primary recommendation:** Build 10 focused visualization components organized into 3 conceptual clusters. Reuse all existing primitives (Slider, Entity, AnimatedValue, FlowArrow). Follow the Module5Content pattern for lesson mapping but present visualizations as dashboard-style panels within each lesson. Extend ShortTermFundingDashboard's IOR floor concept to a full corridor/floor-system visualization.

</research_summary>

<standard_stack>
## Standard Stack

### Core (Already in Project)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.3 | App framework | Already configured with Turbopack |
| Tailwind CSS | v4 | Styling | CSS-first with @theme directive |
| motion/react | latest | Animations | Spring physics, AnimatePresence |
| TypeScript | latest | Type safety | Used throughout |

### Visualization Primitives (Already Built)
| Component | Location | Purpose | Reuse in Module 6 |
|-----------|----------|---------|-------------------|
| Slider | src/components/visualizations/Slider.tsx | Range inputs with animated fill | Money multiplier reserve ratio, OMO slider, discount rate, QE amount |
| AnimatedValue | src/components/visualizations/AnimatedValue.tsx | Spring-animated numbers | All computed values (rates, aggregates, reserves) |
| Entity | src/components/visualizations/Entity.tsx | Glass card with icon/label/value | Fed structure nodes, bank entities, policy tools |
| FlowArrow | src/components/visualizations/FlowArrow.tsx | Directional arrows with flowing dots | OMO flows, monetary transmission, lending chains |

### Chart Patterns (Already Established)
| Pattern | Example Component | Reuse For |
|---------|-------------------|-----------|
| SVG line/area chart | TEDSpreadTimeline | Balance sheet growth timeline, yield impact charts |
| Radar/hexagon | CAMELSRadar | Five Functions pentagon (if used) |
| Supply/demand curves | ShortTermFundingDashboard | OMO supply/demand, corridor diagram |
| Waterfall chart | IncomeStatementWaterfall | QE yield impact cascade |
| Stacked bars | InterestRateLab | Money supply aggregates (M0→M1→M2→M3) |
| Scenario selector | StressTestSimulator | Pre-2008 vs post-2008 regime toggle |

### No New Libraries Needed
The existing stack covers all Module 6 requirements. No external charting library needed — all visualizations are inline SVG with motion animations, matching the established pattern.

</standard_stack>

<architecture_patterns>
## Architecture Patterns

### Module Content Structure (Follow Module5Content Pattern)
```
src/
├── data/module6/
│   ├── index.ts          # Re-exports lessons + concepts
│   ├── lessons.ts        # ~12 lessons with hierarchy
│   └── concepts.ts       # ~50+ concepts
├── components/modules/
│   └── Module6Content.tsx # Lesson→visualization mapping
└── components/visualizations/diagrams/
    ├── CentralBankTimeline.tsx         # Origins & history
    ├── FedStructureOrgChart.tsx        # Board/Banks/FOMC
    ├── FedFunctionsPentagon.tsx        # Five functions
    ├── MoneySupplyCalculator.tsx       # M0→M1→M2→M3 + multiplier
    ├── FedBalanceSheetExplorer.tsx     # Pre/post 2008 comparison
    ├── OpenMarketOperationsFlow.tsx    # Supply/demand + implementation
    ├── DiscountWindowCalculator.tsx    # Loan mechanics + corridor
    ├── ForwardGuidanceDashboard.tsx    # SEP + Dot Plot
    ├── QEProgramsTimeline.tsx          # QE1-3 + yields
    └── AbundantReservesFloor.tsx       # IORB + ON RRP floor system
```

### Lesson Hierarchy (Matching Source Document)
```
6-0:   Overview (Dual Mandate, traditional vs unconventional tools)
6-1:   The Federal Reserve (parent)
  6-1.1: History and Structure (Riksbank, Panic 1907, Fed Act, organization)
  6-1.2: Purpose and Functions (five functions, micro/macro prudential)
6-2:   Traditional Monetary Policy (parent)
  6-2.1: Money Supply and Monetary Policy (aggregates, multiplier, QTM)
  6-2.2: The Federal Reserve's Balance Sheet (assets/liabilities, growth)
  6-2.3: Open Market Operations (supply/demand, FOMC→SOMA→dealers)
  6-2.4: The Discount Window (discount loan, primary credit, corridor)
6-3:   Non-traditional Monetary Policy (parent)
  6-3.1: Forward Guidance (SEP, Dot Plot, expectations channel)
  6-3.2: Large-Scale Asset Purchases (QE1-3, Operation Twist, yields)
  6-3.3: Abundant Reserves (IORB floor, ON RRP floor, floor system)
```

### Dashboard-Style Panel Pattern (New for This Module)
The user wants "dashboard-style panels with dials, charts, and controls." Within the existing lesson navigation framework, each lesson's visualization should feel like a control panel:

```typescript
// Pattern: Glass panel with header + controls + output display
<div className="rounded-2xl bg-glass-light backdrop-blur-md border border-glass-border p-6">
  {/* Panel header with metric indicators */}
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-semibold">{title}</h3>
    <div className="flex gap-2">
      {/* Status indicators / computed metrics */}
      <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-sm font-mono">
        {metric}
      </span>
    </div>
  </div>

  {/* Controls section (sliders, toggles) */}
  <div className="grid grid-cols-2 gap-4 mb-6">
    <Slider label="..." value={...} onChange={...} />
    <Slider label="..." value={...} onChange={...} />
  </div>

  {/* Output visualization (SVG chart, computed values) */}
  <div className="bg-surface-0 dark:bg-surface-0 rounded-xl p-4">
    {/* Chart or computed display */}
  </div>
</div>
```

### Anti-Patterns to Avoid
- **Don't duplicate Module 5 Federal Funds visualization**: Module 5's ShortTermFundingDashboard already has supply/demand curves with IOR floor. Module 6 should focus on the corridor framework (discount rate upper bound + IORB/ON RRP lower bound) and the pre-2008 vs abundant-reserves regime shift.
- **Don't create a mega-dashboard component**: ShortTermFundingDashboard (32K+ lines) and InterestRateLab (30K+ lines) are hard to maintain. Prefer focused single-purpose components (~500-1000 lines each).
- **Don't break lesson navigation**: Keep the existing LessonNav sidebar pattern. Dashboard styling applies within each lesson's visualization, not as a replacement for lesson structure.

</architecture_patterns>

<dont_hand_roll>
## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Supply/demand curve rendering | Custom curve math | Existing ShortTermFundingDashboard pattern (quadratic/exponential curves with xScale/yScale) | Already proven, tested SVG approach |
| Spring-animated numbers | Manual requestAnimationFrame | AnimatedValue component with useSpring | Handles interpolation, formatting, sizing |
| Glass morphism cards | Custom CSS each time | Entity component + glass utility classes | Consistent look, already themed |
| Slider inputs | HTML range with custom styling | Slider component | Animated fill, formatted display, spring physics |
| SVG chart axes/grid | Manual positioning | Existing padding/scale pattern from charts | Consistent spacing, responsive viewBox |
| Lesson data structure | New types | Existing Lesson/Concept types from src/types/index.ts | Integrates with glossary and exam systems |
| Tab switching animation | Manual opacity transitions | motion.div with initial/animate pattern | Consistent with all other modules |

**Key insight:** Every visualization pattern needed for Module 6 already exists somewhere in the codebase. The job is composing existing patterns into new configurations, not inventing new rendering approaches.

</dont_hand_roll>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: Module 5 Content Overlap
**What goes wrong:** Building a Federal Funds market visualization that duplicates ShortTermFundingDashboard
**Why it happens:** Module 6 course content covers Federal Funds market, OMOs, and reserves — all topics in Module 5's dashboard
**How to avoid:** Module 6 should focus on the POLICY perspective (how the Fed uses tools to control rates) vs Module 5's MARKET perspective (how the market determines rates). Specific differentiators:
- Module 5: Supply/demand equilibrium, IOR as floor, market mechanics
- Module 6: FOMC decision → OMO execution → balance sheet impact → rate outcome; discount rate as ceiling; abundant reserves regime shift; IORB + ON RRP dual floor system
**Warning signs:** If a Module 6 visualization has the same sliders as ShortTermFundingDashboard

### Pitfall 2: Oversized Multi-Tab Components
**What goes wrong:** A single component grows to 30K+ lines (like ShortTermFundingDashboard/InterestRateLab)
**Why it happens:** Combining multiple visualizations into one tabbed component
**How to avoid:** Keep each visualization as a separate focused component (500-1000 lines). If the user's three clusters suggest tabs, implement them at the Module6Content level, not as mega-components.
**Warning signs:** Any single .tsx file exceeding 1500 lines

### Pitfall 3: Too Many Sliders Without Clear Causation
**What goes wrong:** Dashboard has 6+ sliders but the student doesn't understand which causes what
**Why it happens:** Monetary policy has many interacting variables
**How to avoid:** Each panel should have a clear input→output story. Label sliders as "Fed Action" vs computed "Market Outcome." Use color coding (blue for Fed controls, green for market outcomes).
**Warning signs:** Student can't answer "what happens when I move this slider?"

### Pitfall 4: Missing the Pre-2008 vs Post-2008 Narrative
**What goes wrong:** All tools shown as equally current, missing the historical evolution
**Why it happens:** Course content covers both eras but they get flattened into one visualization
**How to avoid:** Use era toggles or before/after comparisons. The "aha moment" is that abundant reserves changed everything. Existing pattern: Good/Bad times toggle from Module 3.
**Warning signs:** Forward guidance and QE appear without context of why traditional tools failed

### Pitfall 5: Glossary/Exam Integration Forgotten
**What goes wrong:** Module 6 content built but glossary and exam questions not updated
**Why it happens:** Focus on visualizations, forget study tools integration
**How to avoid:** Include glossary terms and exam questions as a dedicated plan step (like 09-08 did for Module 4)
**Warning signs:** Running the app shows Module 6 content but glossary still shows 236 terms and exam has no Module 6 questions

</common_pitfalls>

<code_examples>
## Code Examples

### Module Content Component Pattern (from Module5Content.tsx)
```typescript
// Source: src/components/modules/Module5Content.tsx
const lessonContent: Record<string, LessonContentConfig> = {
  '6-1.1': {
    id: '6-1.1',
    title: 'History and Structure of the Federal Reserve',
    description: 'From the Swedish Riksbank to the Federal Reserve Act...',
    visualizations: [
      <CentralBankTimeline key="cbt" />,
      <FedStructureOrgChart key="fso" />,
    ],
  },
  // ... more lessons
};
```

### Dashboard Panel with Computed Metrics (from ShortTermFundingDashboard)
```typescript
// Source: src/components/visualizations/diagrams/ShortTermFundingDashboard.tsx
const fedFundsRate = useMemo(() => {
  const raw = 6.8 - reserveSupply * 0.04 + reserveDemand * 0.03 + (ior - 4) * 0.6;
  return clamp(raw, 0.5, 8.5);
}, [reserveSupply, reserveDemand, ior]);

// Status indicator pattern
<span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-sm font-mono">
  Fed Funds Rate: {fedFundsRate.toFixed(2)}%
</span>
```

### SVG Supply/Demand Curve Pattern (from ShortTermFundingDashboard)
```typescript
// Source: src/components/visualizations/diagrams/ShortTermFundingDashboard.tsx
const supplyCurve = useMemo(() => {
  const points: string[] = [];
  for (let i = 0; i <= 100; i += 2) {
    const x = xScale(i);
    const y = yScale(supplyFn(i));
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
  }
  return points.join(' ');
}, [xScale, yScale, supplyFn]);

<motion.path
  d={supplyCurve}
  fill="none"
  stroke="var(--color-primary-500)"
  strokeWidth={2.5}
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ duration: 1.2, ease: 'easeOut' }}
/>
```

### Scenario Toggle Pattern (from Module 3 Risk visualizations)
```typescript
// Pattern for pre-2008 vs post-2008 toggle
const [regime, setRegime] = useState<'scarce' | 'abundant'>('scarce');

<div className="flex gap-2">
  {(['scarce', 'abundant'] as const).map((r) => (
    <motion.button
      key={r}
      onClick={() => setRegime(r)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        regime === r
          ? 'bg-primary-500 text-white'
          : 'bg-surface-2 text-text-secondary hover:bg-surface-1'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {r === 'scarce' ? 'Pre-2008 (Scarce Reserves)' : 'Post-2008 (Abundant Reserves)'}
    </motion.button>
  ))}
</div>
```

### Lesson Data Pattern (from Module 4/5)
```typescript
// Source: src/data/module5/lessons.ts
export const module6Lessons: Lesson[] = [
  { id: '6-0', title: 'Overview', description: '...', order: 0 },
  { id: '6-1', title: 'The Federal Reserve', description: '...', order: 1 },
  { id: '6-1.1', title: 'History and Structure', description: '...', parentId: '6-1', order: 2 },
  { id: '6-1.2', title: 'Purpose and Functions', description: '...', parentId: '6-1', order: 3 },
  // ...
];
```

### Concept Data Pattern (from existing modules)
```typescript
// Source: src/data/module4/concepts.ts
export const module6Concepts: Concept[] = [
  {
    id: '6-dual-mandate',
    term: 'Dual Mandate',
    definition: "The Federal Reserve's twin policy goals of maximum employment and stable prices.",
    category: 'regulation',
    relatedConcepts: ['6-maximum-employment', '6-stable-prices'],
    lessonId: '6-0',
  },
  // ...
];
```

</code_examples>

<sota_updates>
## State of the Art (2025-2026)

No external ecosystem changes affect this phase. The project uses a stable, well-established stack:

| Aspect | Status | Impact |
|--------|--------|--------|
| Next.js 16 | Stable, already configured | No changes needed |
| Tailwind v4 | Stable, @theme directive in use | No changes needed |
| motion/react | Stable, v12+ | No changes needed |
| SVG visualizations | Inline SVG remains standard | No charting library needed |

**New internal patterns to consider:**
- Module 5 introduced `singleView` prop for multi-view components (shows only one tab per lesson) — useful if any Module 6 visualization has multiple views
- Module 5 introduced `SectionOverview` component for section-level introductions — could use for cluster introductions

**No deprecated patterns** — all existing approaches remain valid.

</sota_updates>

<module5_overlap>
## Module 5 Overlap Analysis

### What Module 5 Already Covers
| Topic | Module 5 Component | What It Does |
|-------|-------------------|--------------|
| Federal Funds Market | ShortTermFundingDashboard (Federal Funds tab) | Supply/demand curves, reserve supply slider, IOR floor line, equilibrium rate |
| Repo Market | ShortTermFundingDashboard (Repo tab) | Collateral, haircuts, price shock simulation |
| Reference Rates | ShortTermFundingDashboard (LIBOR vs SOFR tab) | EFFR, SOFR, LIBOR comparison, funding stress |
| Fisher Equation | InterestRateLab (Fisher tab) | Real rate + inflation → nominal rate |
| Yield Curve | InterestRateLab (Yield Curve tab) | Policy rate → expected path → term premium → curve shape |
| TED Spread | TEDSpreadTimeline | 2006-2010 crisis timeline with events |
| Money Market Runs | MoneyMarketRunChart | Reserve Primary Fund breaking the buck |
| Securitization | SecuritizationPipeline | Tranche waterfall, origination capacity |

### What Module 6 Should NOT Duplicate
- Federal funds supply/demand equilibrium mechanics (already done well)
- IOR as a floor concept (already shown as green dashed line)
- TED Spread timeline (already built)
- Money market fund run narrative (already covered)

### What Module 6 Should BUILD NEW
| Module 6 Topic | Why It's Different from Module 5 |
|----------------|----------------------------------|
| **Fed History & Structure** | Entirely new — Riksbank story, Panic of 1907, org chart |
| **Five Fed Functions** | Entirely new — monetary policy, stability, regulation, payments, consumer protection |
| **Money Supply Aggregates** | New perspective — M0/M1/M2/M3 nesting + money multiplier deposit cycle |
| **Fed Balance Sheet** | New — pre-2008 vs 2021 composition, growth timeline, asset/liability breakdown |
| **OMO Implementation Chain** | New policy angle — FOMC → NY Fed → SOMA → Primary Dealers (4-step chain) |
| **Discount Window** | Entirely new — discount loan mechanics, collateral haircuts, rate corridor upper bound |
| **Forward Guidance** | New — SEP projections with range fans, Dot Plot with participant expectations |
| **QE Programs** | Entirely new — QE1-3 + Operation Twist timeline, yield impact evidence |
| **Abundant Reserves Floor** | Extends M5 — adds ON RRP ceiling, shows full corridor (discount rate → IORB/ON RRP), regime comparison |

### Key Design Principle
Module 5 = **market mechanics** (how rates are determined in markets)
Module 6 = **policy mechanics** (how the Fed uses tools to influence those markets)

</module5_overlap>

<open_questions>
## Open Questions

1. **Module numbering in data: "6" or different?**
   - What we know: The roadmap calls this "Module 6 Content" and the source doc is titled "Module 6 - Monetary Policy"
   - What's unclear: The modules.ts registry already defines 8 modules. Module 6 slot has id: 6, title: 'Central Banks and Monetary Policy', slug: 'central-banking-monetary-policy'
   - Recommendation: Verify the existing module 6 entry in modules.ts matches the course content; use module ID 6 for all data (lesson IDs like "6-1.1", concept IDs like "6-dual-mandate")

2. **Dashboard clustering vs lesson navigation**
   - What we know: User wants tools-centric clusters (structure, traditional, crisis), but the codebase uses lesson-based navigation
   - What's unclear: Should clusters replace lesson nav, or should clusters be a visual grouping within lesson nav?
   - Recommendation: Keep lesson nav (consistency + glossary/exam integration requires lesson IDs). The "dashboard feel" should come from visualization styling (panel layout, dials, metrics), not from restructuring navigation. Lessons naturally map to clusters: 6-0/6-1.x = Structure, 6-2.x = Traditional, 6-3.x = Crisis.

3. **How many exam questions for Module 6?**
   - What we know: Modules 1-4 have ~10 questions each, Module 5 has ~12
   - What's unclear: How many questions the user expects for Module 6
   - Recommendation: Generate ~12-15 questions covering all lesson topics, matching existing difficulty distribution (40% hard, 40% medium, 20% easy)

</open_questions>

<sources>
## Sources

### Primary (HIGH confidence)
- Codebase exploration: src/components/modules/Module5Content.tsx — lesson mapping pattern
- Codebase exploration: src/components/visualizations/diagrams/ShortTermFundingDashboard.tsx — Federal Funds tab with IOR floor
- Codebase exploration: src/components/visualizations/diagrams/InterestRateLab.tsx — yield curve with expectations
- Codebase exploration: src/types/index.ts — Lesson, Concept, GlossaryTerm, ExamQuestion types
- Codebase exploration: src/data/module5/ — lessons, concepts, questions data structure
- Codebase exploration: src/data/glossary.ts — aggregation and type detection pattern
- Codebase exploration: src/data/examQuestions.ts — question pool with module filtering

### Secondary (MEDIUM confidence)
- Phase context: .planning/phases/11-module-6-content/11-CONTEXT.md — user vision (dashboard panels, tools-centric clusters)
- Course content: Module 6 - Monetary Policy.md — all lesson topics and concepts

### Tertiary (LOW confidence)
- None — all findings verified against codebase
</sources>

<metadata>
## Metadata

**Research scope:**
- Core technology: Next.js + Tailwind + Motion (existing stack)
- Ecosystem: No new libraries needed
- Patterns: Dashboard-style panels, lesson navigation, SVG charts
- Pitfalls: Module 5 overlap, component size, narrative coherence

**Confidence breakdown:**
- Standard stack: HIGH — already built and proven across 5 modules
- Architecture: HIGH — follows established ModuleXContent pattern
- Pitfalls: HIGH — informed by actual Module 5 codebase analysis
- Code examples: HIGH — extracted from existing codebase

**Research date:** 2026-02-21
**Valid until:** 2026-03-21 (30 days — stable internal patterns)
</metadata>

---

*Phase: 11-module-6-content*
*Research completed: 2026-02-21*
*Ready for planning: yes*
