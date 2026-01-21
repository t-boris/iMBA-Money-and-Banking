# Roadmap: iMBA Money and Banking

## Overview

Build an interactive study web application for the Money and Banking course. Foundation and design system are complete. Future phases will be defined based on actual course content provided by the user.

## Domain Expertise

Module 1: Money and Finance — course content provided

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [x] **Phase 1: Foundation** - Project setup with modern stack
- [x] **Phase 2: Design System** - Award-winning UI components and theming
- [x] **Phase 3: Module Navigation** - Card-based module selection for 8 modules
- [x] **Phase 4: Module 1 Content** - Interactive visualizations for Money and Finance

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

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 3/3 | Complete | 2026-01-18 |
| 2. Design System | 4/4 | Complete | 2026-01-18 |
| 3. Module Navigation | 3/3 | Complete | 2026-01-18 |
| 4. Module 1 Content | 7/7 | Complete | 2026-01-20 |

## Next Steps

Milestone 1 complete. All 4 phases finished.

To add content for Modules 2-8, provide course materials and run `/gsd:new-milestone`.
