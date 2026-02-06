import { Lesson } from '@/types';

export const module4Lessons: Lesson[] = [
  // Overview
  {
    id: '4-0',
    title: 'Overview',
    description:
      'Why banks are regulated and how regulation works.',
    order: 0,
  },

  // Lesson 4-1: Understanding Bank Regulation
  {
    id: '4-1',
    title: 'Understanding Bank Regulation',
    description:
      'General regulation theory and bank-specific rationale.',
    order: 1,
  },
  {
    id: '4-1.1',
    title: 'Goals of Financial Regulation',
    description:
      'Market failure, negative externalities, microprudential vs macroprudential regulation, and moral hazard.',
    parentId: '4-1',
    order: 2,
  },
  {
    id: '4-1.2',
    title: 'Government Safety Net',
    description:
      'Bank fragility, bank runs, deposit insurance, and the lender of last resort.',
    parentId: '4-1',
    order: 3,
  },
  {
    id: '4-1.3',
    title: 'Crisis Interventions 2007-2009',
    description:
      'TED spread, safety net expansion, and moral hazard during the financial crisis.',
    parentId: '4-1',
    order: 4,
  },

  // Lesson 4-2: Regulation and Supervision in Practice
  {
    id: '4-2',
    title: 'Regulation and Supervision in Practice',
    description: 'Rules vs oversight: the distinction between regulation and supervision.',
    order: 5,
  },
  {
    id: '4-2.1',
    title: 'Bank Regulation Rules',
    description:
      'Entry and competition, activities, funding, disclosure, Basel Accord, and capital requirements.',
    parentId: '4-2',
    order: 6,
  },
  {
    id: '4-2.2',
    title: 'Supervisory Process',
    description:
      'Enforcement actions, bank examination, CAMELS ratings, and the problem bank list.',
    parentId: '4-2',
    order: 7,
  },
  {
    id: '4-2.3',
    title: 'Stress Testing',
    description:
      'SCAP, CCAR, scenario design, and the stressed capital ratio.',
    parentId: '4-2',
    order: 8,
  },

  // Lesson 4-3: 21st Century Challenges
  {
    id: '4-3',
    title: '21st Century Challenges',
    description: 'Modern regulatory challenges in banking.',
    order: 9,
  },
  {
    id: '4-3.1',
    title: 'Too Big to Fail',
    description:
      'Bank concentration, systemic risk, FSOC, SIFI designation, G-SIB surcharges, and resolution.',
    parentId: '4-3',
    order: 10,
  },
  {
    id: '4-3.2',
    title: 'Shadow Banking',
    description:
      'Definition, regulatory arbitrage, repurchase agreements, and mortgage-backed securities.',
    parentId: '4-3',
    order: 11,
  },
  {
    id: '4-3.3',
    title: 'Money Market Funds',
    description:
      'The 2008 run, floating NAV, gates and fees, and the 2020 COVID repeat.',
    parentId: '4-3',
    order: 12,
  },
];
