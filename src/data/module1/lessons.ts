import { Lesson } from '@/types';

export const module1Lessons: Lesson[] = [
  // Overview
  {
    id: '1-0',
    title: 'Overview',
    description: 'The big picture — what is money, how the financial system works, and how it connects to real economic activity.',
    order: 0,
  },
  // Lesson 1-1: Money and Payments
  {
    id: '1-1',
    title: 'Money and Payments',
    description: 'Understanding what money is and how it moves through the economy.',
    order: 1,
  },
  {
    id: '1-1.1',
    title: 'Money and Its Functions',
    description: 'What makes something "money" — means of payment, unit of account, store of value.',
    parentId: '1-1',
    order: 1,
  },
  {
    id: '1-1.2',
    title: 'The Payments System',
    description: 'How money actually moves — cash, checks, cards, digital wallets.',
    parentId: '1-1',
    order: 2,
  },
  {
    id: '1-1.3',
    title: 'Money and Inflation',
    description: 'Measuring money (M1, M2) and understanding inflation.',
    parentId: '1-1',
    order: 3,
  },
  // Lesson 1-2: The Financial System
  {
    id: '1-2',
    title: 'The Financial System',
    description: 'How the financial system connects savers to borrowers.',
    order: 2,
  },
  {
    id: '1-2.1',
    title: 'What Does the Financial System Do?',
    description: 'Connecting savers to borrowers through financial instruments.',
    parentId: '1-2',
    order: 1,
  },
  {
    id: '1-2.2',
    title: 'Financial Markets vs Financial Institutions',
    description: 'Direct finance through markets vs indirect finance through institutions.',
    parentId: '1-2',
    order: 2,
  },
  {
    id: '1-2.3',
    title: 'Banks vs Non-Banks',
    description: 'Different types of financial intermediaries and their roles.',
    parentId: '1-2',
    order: 3,
  },
  {
    id: '1-2.4',
    title: 'Overview of Non-Banks',
    description: 'Insurance, pension funds, investment banks, and other institutions.',
    parentId: '1-2',
    order: 4,
  },
  // Lesson 1-3: Finance and Real Economy
  {
    id: '1-3',
    title: 'Finance and the Real Economy',
    description: 'How financial development affects economic growth.',
    order: 3,
  },
  {
    id: '1-3.1',
    title: 'Financial Development and Economic Activity',
    description: 'Why finance matters for growth — and its dark side.',
    parentId: '1-3',
    order: 1,
  },
];
