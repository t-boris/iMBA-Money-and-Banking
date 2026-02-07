---
phase: 09-module-4-regulation
plan: 04
subsystem: ui
tags: [react, motion, svg, stress-testing, tbtf, gsib, regulation, visualization]

# Dependency graph
requires:
  - phase: 09-01
    provides: Module 4 data types and lesson structure
provides:
  - StressTestSimulator interactive component for lesson 4-2.3
  - TBTFConcentration visualization for lesson 4-3.1
  - Both exported from diagrams barrel file
affects: [09-07, 09-09]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Scenario-driven stress test waterfall with spring animations
    - Toggle view pattern for efficiency vs subsidy perspectives
    - G-SIB bucket ladder with expandable details

key-files:
  created:
    - src/components/visualizations/diagrams/StressTestSimulator.tsx
    - src/components/visualizations/diagrams/TBTFConcentration.tsx
  modified:
    - src/components/visualizations/diagrams/index.ts

key-decisions:
  - "Three-step layout for StressTestSimulator (scenario -> waterfall -> results)"
  - "Efficiency vs Subsidy toggle for TBTF explanation with opposing visual metaphors"
  - "G-SIB buckets displayed as narrowing ladder (wider = lower bucket)"

patterns-established:
  - "Multi-step interactive simulation with scenario selection driving waterfall chart"
  - "Animated subsidy chain flow with alternating color emphasis"

issues-created: []

# Metrics
duration: 4min
completed: 2026-02-06
---

# Phase 9 Plan 4: StressTestSimulator + TBTFConcentration Summary

**Interactive stress test simulator with scenario-driven capital waterfall and TBTF bank concentration visualization with G-SIB bucket system**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-07T00:03:22Z
- **Completed:** 2026-02-07T00:07:28Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- StressTestSimulator with three scenarios (Baseline/Adverse/Severely Adverse), animated capital waterfall, pass/fail for three banks, and SCAP vs CCAR comparison
- TBTFConcentration with horizontal stacked bar for bank asset concentration, efficiency/subsidy toggle views, and G-SIB bucket ladder with five assessment factors
- Both components exported from diagrams barrel file

## Task Commits

Each task was committed atomically:

1. **Task 1: Create StressTestSimulator component** - `c5c9e5a` (feat)
2. **Task 2: Create TBTFConcentration component + update index.ts** - `786a973` (feat)

## Files Created/Modified
- `src/components/visualizations/diagrams/StressTestSimulator.tsx` - Interactive stress test with scenario selection, capital waterfall chart, pass/fail results, SCAP/CCAR comparison
- `src/components/visualizations/diagrams/TBTFConcentration.tsx` - Bank concentration bar, efficiency/subsidy toggle, G-SIB bucket system with assessment factors
- `src/components/visualizations/diagrams/index.ts` - Added exports for StressTestSimulator and TBTFConcentration

## Decisions Made
- Three-step layout for StressTestSimulator (scenario selection -> capital waterfall -> results) follows progressive disclosure pattern
- Efficiency vs Subsidy toggle uses opposing visual metaphors (cost curve vs chain flow) to highlight the debate about megabank existence
- G-SIB buckets displayed as narrowing ladder (wider at bottom, narrower at top) to visually represent increasing systemic importance

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## Next Phase Readiness
- StressTestSimulator and TBTFConcentration ready for Module 4 page integration (plan 09-07)
- Ready for plan 09-05 (ShadowBankingComparison + MoneyMarketRunChart)

---
*Phase: 09-module-4-regulation*
*Completed: 2026-02-06*
