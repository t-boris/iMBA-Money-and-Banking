---
phase: 07-module-3-content
plan: 02
subsystem: visualizations
tags: [react, motion, svg, risk, capital]

# Dependency graph
requires:
  - phase: 07-01
    provides: Module 3 data foundation (lessons, concepts)
provides:
  - RiskReturnTradeoff interactive curve visualization
  - BankCapitalStructure loss absorber visualization
affects: [07-03, 07-04, 07-05, 07-06, 07-07]

# Tech tracking
tech-stack:
  added: []
  patterns: [SVG-based interactive charts, scenario simulation, animated curve]

key-files:
  created:
    - src/components/visualizations/diagrams/RiskReturnTradeoff.tsx
    - src/components/visualizations/diagrams/BankCapitalStructure.tsx
  modified:
    - src/components/visualizations/diagrams/index.ts

key-decisions:
  - "SVG viewBox for responsive curve rendering (600x350)"
  - "Spring physics for smooth slider-driven animation"
  - "Color gradient on curve (green to red) representing risk spectrum"
  - "4 loss scenarios to demonstrate capital buffer depletion"
  - "Pulsing animation on Bank Loans point to show where banks operate"

patterns-established:
  - "Scenario selector with state-driven visualization updates"
  - "Expandable waterfall pattern for liquidation priority"
  - "Risk zone categorization with example investments"

issues-created: []

# Metrics
duration: 8min
completed: 2026-02-01
---

# Phase 7 Plan 2: Risk-Return Tradeoff and Bank Capital Structure Summary

**Created two interactive visualization components for Module 3: Risk-Return Tradeoff curve with slider control, and Bank Capital Structure showing equity as loss absorber with scenario simulation.**

## Performance

- **Duration:** 8 min
- **Started:** 2026-02-01
- **Completed:** 2026-02-01
- **Tasks:** 2
- **Files created:** 2
- **Files modified:** 1

## Accomplishments

1. **RiskReturnTradeoff Visualization**
   - SVG-based interactive curve chart
   - Risk tolerance slider with animated dot on curve
   - Labeled investment points (T-Bills through Equities)
   - Risk zones with example investments at each level
   - Info panels showing risk level, expected return, risk premium
   - Pulsing animation on Bank Loans point
   - Click-to-reveal investment descriptions

2. **BankCapitalStructure Visualization**
   - Animated stacked bar chart (Assets = Liabilities + Equity)
   - 4 scenarios: Normal, Small Loss (2%), Large Loss (7%), Insolvency (12%)
   - Color transitions (green to yellow to red) as losses mount
   - Insolvency threshold line appearing at critical levels
   - Status cards showing equity ratio, loss absorbed, bank status
   - Expandable liquidation waterfall showing payment priority
   - Key concepts panel explaining capital requirements

## Task Commits

Each task was committed atomically:

1. **Task 1: RiskReturnTradeoff** - `e58906f` (feat)
2. **Task 2: BankCapitalStructure** - `9cc881f` (feat)
3. **Exports update** - `10b1760` (feat)

## Files Created/Modified

- `src/components/visualizations/diagrams/RiskReturnTradeoff.tsx` - Interactive risk-return curve (621 lines)
- `src/components/visualizations/diagrams/BankCapitalStructure.tsx` - Capital loss absorber visualization (634 lines)
- `src/components/visualizations/diagrams/index.ts` - Added exports

## Decisions Made

- Used SVG viewBox (600x350) for responsive curve rendering
- Employed spring physics (stiffness: 80-100, damping: 20) for smooth animations
- Color gradient on curve represents risk spectrum (emerald -> red)
- Created 4 discrete scenarios rather than continuous slider for capital structure to clearly demonstrate the concepts
- Added liquidation waterfall as expandable section to explain residual claim concept

## Deviations from Plan

None - plan executed as specified.

## Issues Encountered

None

## Verification Checklist

- [x] npm run build succeeds
- [x] Both components created and exported
- [x] RiskReturnTradeoff has working slider and curve
- [x] BankCapitalStructure shows loss absorption scenarios
- [x] Animations smooth using spring physics
- [x] No TypeScript errors

## Next Phase Readiness

- Visualizations ready for Module 3 content integration
- Ready for 07-03-PLAN.md: Additional risk visualization components

---
*Phase: 07-module-3-content*
*Completed: 2026-02-01*
