---
phase: 09-module-4-regulation
plan: 03
subsystem: ui
tags: [svg, motion, calculator, radar, basel, camels, ted-spread, crisis-timeline]

# Dependency graph
requires:
  - phase: 09-01
    provides: Module 4 lesson and concept data
provides:
  - TEDSpreadTimeline visualization for crisis interventions (Lesson 4-1.3)
  - CapitalRequirementsCalculator for Basel capital rules (Lesson 4-2.1)
  - CAMELSRadar for bank examination ratings (Lesson 4-2.2)
affects: [09-07, 09-08, 09-09]

# Tech tracking
tech-stack:
  added: []
  patterns: [animated-area-chart, risk-weight-calculator, hexagon-radar-chart]

key-files:
  created:
    - src/components/visualizations/diagrams/TEDSpreadTimeline.tsx
    - src/components/visualizations/diagrams/CapitalRequirementsCalculator.tsx
    - src/components/visualizations/diagrams/CAMELSRadar.tsx
  modified:
    - src/components/visualizations/diagrams/index.ts

key-decisions:
  - "Animated area chart with progressive line drawing for TED Spread"
  - "Basel version tabs (I/II/III) with dynamic minimum capital ratio"
  - "CAMELS scores 1-5 inverted on radar (larger polygon = worse bank)"

patterns-established:
  - "Area chart with gradient fill for time-series visualization"
  - "Tab-based version selector for evolving regulation standards"
  - "Hexagon radar chart with preset profiles for comparison"

issues-created: []

# Metrics
duration: 7min
completed: 2026-02-06
---

# Phase 9 Plan 3: Crisis Timeline, Capital Calculator, and CAMELS Radar Summary

**Three interactive regulation visualizations: TED Spread crisis timeline with animated area chart, Basel capital requirements calculator with risk-weighted assets, and CAMELS hexagon radar with bank presets**

## Performance

- **Duration:** 7 min
- **Started:** 2026-02-06T13:53:42Z
- **Completed:** 2026-02-06T14:01:11Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- TEDSpreadTimeline with animated SVG area chart, crisis event markers, and formula display
- CapitalRequirementsCalculator with asset sliders, RWA calculation, Basel I/II/III tabs, pass/fail indicator, and regulatory tradeoff visualization
- CAMELSRadar with hexagon radar chart, three bank presets (Healthy/Struggling/Problem), dimension details, and Problem Bank List warning

## Task Commits

Each task was committed atomically:

1. **Task 1: Create TEDSpreadTimeline component** - `8bf12ab` (feat)
2. **Task 2: Create CapitalRequirementsCalculator and CAMELSRadar** - `5a803e3` (feat)

## Files Created/Modified
- `src/components/visualizations/diagrams/TEDSpreadTimeline.tsx` - Animated TED Spread crisis timeline (2006-2010) with event markers and detail cards
- `src/components/visualizations/diagrams/CapitalRequirementsCalculator.tsx` - Interactive Basel capital calculator with risk weights, equity slider, and tradeoff display
- `src/components/visualizations/diagrams/CAMELSRadar.tsx` - CAMELS hexagon radar chart with three bank presets and dimension exploration
- `src/components/visualizations/diagrams/index.ts` - Added exports for all three new components

## Decisions Made
- Used animated area chart with progressive line drawing for TED Spread (vs static chart) for engagement
- Basel version tabs dynamically adjust minimum capital ratio (8% for Basel I/II, 10.5% for Basel III)
- CAMELS radar uses score-to-radius mapping where larger polygon = worse scores (1=best, 5=worst)
- Problem Bank List warning triggers when composite CAMELS score exceeds 3

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## Next Phase Readiness
- Three visualization components ready for Module 4 page integration
- Ready for 09-04-PLAN.md (StressTestSimulator + TBTFConcentration)

---
*Phase: 09-module-4-regulation*
*Completed: 2026-02-06*
