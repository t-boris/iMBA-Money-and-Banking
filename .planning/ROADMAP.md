# Roadmap: iMBA Money and Banking

## Overview

Build an interactive study web application for the Money and Banking course. Start with a solid foundation using modern web technologies, establish an award-winning design system, then progressively add interactive features: module navigation, animated visualizations, financial calculators, and learning tools. Deploy as a static site for easy access.

## Domain Expertise

None

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [x] **Phase 1: Foundation** - Project setup with modern stack
- [x] **Phase 2: Design System** - Award-winning UI components and theming
- [ ] **Phase 3: Module Navigation** - Card-based module selection for 8 modules
- [ ] **Phase 4: Interactive Visualizations** - Animated diagrams for financial concepts
- [ ] **Phase 5: Calculators** - Interactive finance calculators
- [ ] **Phase 6: Learning Tools** - Quizzes, flashcards, progress tracking
- [ ] **Phase 7: Polish & Deploy** - Performance, accessibility, deployment

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
- [ ] 03-01: Create module card component with hover animations
- [ ] 03-02: Build home page with module grid layout
- [ ] 03-03: Implement module page template and routing

### Phase 4: Interactive Visualizations
**Goal**: Create animated diagrams showing money flows, banking processes, and interest rate mechanics. Build reusable visualization components.
**Depends on**: Phase 3
**Research**: Likely (animation techniques for financial diagrams)
**Research topics**: SVG animation patterns, interactive diagram best practices, data flow visualization techniques
**Plans**: 4 plans

Plans:
- [ ] 04-01: Build base animation components and utilities
- [ ] 04-02: Create money flow diagram component
- [ ] 04-03: Create banking process visualization component
- [ ] 04-04: Create interest rate mechanics visualization

### Phase 5: Calculators
**Goal**: Build interactive financial calculators for compound interest, loan payments, present value, and other key concepts.
**Depends on**: Phase 3
**Research**: Unlikely (standard calculation logic, form handling)
**Plans**: 3 plans

Plans:
- [ ] 05-01: Create calculator UI component framework
- [ ] 05-02: Implement compound interest and present value calculators
- [ ] 05-03: Implement loan payment and amortization calculators

### Phase 6: Learning Tools
**Goal**: Build quiz system, flashcard component, and local progress tracking using localStorage.
**Depends on**: Phase 3
**Research**: Unlikely (localStorage patterns, quiz/flashcard UI)
**Plans**: 4 plans

Plans:
- [ ] 06-01: Create progress tracking system with localStorage
- [ ] 06-02: Build quiz component with multiple question types
- [ ] 06-03: Build flashcard component with flip animation
- [ ] 06-04: Implement progress dashboard and statistics

### Phase 7: Polish & Deploy
**Goal**: Optimize performance, ensure accessibility, configure static deployment to Vercel or Netlify.
**Depends on**: Phases 4, 5, 6
**Research**: Likely (deployment configuration)
**Research topics**: Vercel/Netlify static deployment, performance optimization, SEO for static sites
**Plans**: 3 plans

Plans:
- [ ] 07-01: Performance optimization (code splitting, image optimization)
- [ ] 07-02: Accessibility audit and fixes
- [ ] 07-03: Configure deployment and CI/CD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4/5/6 (parallel possible) → 7

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 3/3 | Complete | 2026-01-18 |
| 2. Design System | 4/4 | Complete | 2026-01-18 |
| 3. Module Navigation | 0/3 | Not started | - |
| 4. Interactive Visualizations | 0/4 | Not started | - |
| 5. Calculators | 0/3 | Not started | - |
| 6. Learning Tools | 0/4 | Not started | - |
| 7. Polish & Deploy | 0/3 | Not started | - |
