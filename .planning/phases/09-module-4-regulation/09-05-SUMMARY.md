---
phase: 09-module-4-regulation
plan: 05
subsystem: ui
tags: [react, motion, svg, shadow-banking, money-market, crisis, visualization]

# Dependency graph
requires:
  - phase: 09-01
    provides: Module 4 data foundation with lesson and concept definitions
provides:
  - ShadowBankingComparison component for Lesson 4-3.2
  - MoneyMarketRunChart component for Lesson 4-3.3
affects: [09-07, 09-09]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Side-by-side comparison panel with regulatory status indicators
    - Toggle view pattern for alternative explanations (efficiency vs arbitrage)
    - Animated SVG area chart with event markers
    - Staggered step-by-step narrative with expandable details
    - Reform effectiveness toggle with backfire indicators

key-files:
  created:
    - src/components/visualizations/diagrams/ShadowBankingComparison.tsx
    - src/components/visualizations/diagrams/MoneyMarketRunChart.tsx
  modified:
    - src/components/visualizations/diagrams/index.ts

key-decisions:
  - "Used HTML entities for checkmark/cross icons instead of emoji for consistent cross-platform rendering"
  - "Approximate MMF asset data for 2008 crisis chart (no exact data needed for educational visualization)"

patterns-established:
  - "Reform effectiveness cards with backfired/partially-effective labels"
  - "Preemptive run paradox as key insight card with multi-panel explanation"

issues-created: []

# Metrics
duration: 8min
completed: 2026-02-06
---

# Phase 9 Plan 5: Shadow Banking Comparison + Money Market Run Chart Summary

**Interactive visualizations for shadow banking regulatory gap (ShadowBankingComparison) and 2008/2020 money market fund crisis narrative (MoneyMarketRunChart)**

## Performance

- **Duration:** 8 min
- **Started:** 2026-02-07T00:03:38Z
- **Completed:** 2026-02-07T00:11:47Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Side-by-side traditional bank vs shadow bank comparison with regulatory status indicators and balance sheet visuals
- Toggle view explaining why shadow banks exist (efficiency vs regulatory arbitrage)
- Expandable institution cards for MMFs, repo market, and MBS vehicles
- Animated SVG area chart showing the 2008 MMF crisis asset cliff
- 7-step crisis narrative with clickable detail panels
- Post-crisis reform cards showing how reforms backfired in 2020
- Preemptive run paradox insight card explaining the self-defeating nature of gates and fees

## Task Commits

Each task was committed atomically:

1. **Task 1: Create ShadowBankingComparison** - `1172a48` (feat)
2. **Task 2: Create MoneyMarketRunChart + update index.ts** - `b0c172c` (feat)

## Files Created/Modified
- `src/components/visualizations/diagrams/ShadowBankingComparison.tsx` - Traditional bank vs shadow bank comparison with regulatory gap visualization
- `src/components/visualizations/diagrams/MoneyMarketRunChart.tsx` - 2008/2020 money market fund crisis narrative with chart, steps, reforms, and paradox
- `src/components/visualizations/diagrams/index.ts` - Added exports for both new components

## Decisions Made
- Used HTML entities for checkmark/cross icons instead of emoji for cross-platform consistency
- Approximate MMF asset data points for the 2008 crisis chart (educational visualization does not require exact data)
- Structured the MoneyMarketRunChart as four distinct sections (chart, narrative, reforms, 2020 repeat) for clear educational flow

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## Next Phase Readiness
- Both shadow banking visualization components complete and exported
- Ready for 09-06 (RegulationOverviewFlow + SupervisoryProcessFlow)
- All Module 4 diagram components building successfully

---
*Phase: 09-module-4-regulation*
*Completed: 2026-02-06*
