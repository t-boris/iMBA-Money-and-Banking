import { Lesson } from '@/types';

export const module3Lessons: Lesson[] = [
  // Lesson 3.1: Bank Capital and Profitability
  {
    id: '3-0',
    title: 'Overview',
    description: 'Introduction to the risk-return tradeoff in banking.',
    order: 0,
  },
  {
    id: '3-1',
    title: 'Bank Capital and Profitability',
    description: 'How banks build capital cushions and measure performance.',
    order: 1,
  },
  {
    id: '3-1.1',
    title: 'Bank Equity Capital',
    description: 'Ownership, residual claim, and the role of equity as a loss absorber.',
    parentId: '3-1',
    order: 2,
  },
  {
    id: '3-1.2',
    title: 'Measuring Bank Performance',
    description: 'ROA, ROE, leverage, and how to evaluate bank profitability.',
    parentId: '3-1',
    order: 3,
  },
  // Lesson 3.2: Overview of Bank Risks
  {
    id: '3-2',
    title: 'Overview of Bank Risks',
    description: 'The five major risk categories that banks face.',
    order: 4,
  },
  {
    id: '3-2.1',
    title: 'Overview of Risk',
    description: 'Risk measurement, management, and the different types of bank risks.',
    parentId: '3-2',
    order: 5,
  },
  {
    id: '3-2.2',
    title: 'Credit Risk',
    description: 'Default probability, credit ratings, FICO scores, and loan covenants.',
    parentId: '3-2',
    order: 6,
  },
  {
    id: '3-2.3',
    title: 'Interest Rate Risk',
    description: 'Maturity mismatch, refinancing risk, and cash flow vs valuation effects.',
    parentId: '3-2',
    order: 7,
  },
  {
    id: '3-2.4',
    title: 'Liquidity Risk',
    description: 'Cash shortfalls, bank runs, and fire sales.',
    parentId: '3-2',
    order: 8,
  },
  {
    id: '3-2.5',
    title: 'Market Risk',
    description: 'Trading book exposure, Value at Risk, and fat tails.',
    parentId: '3-2',
    order: 9,
  },
  {
    id: '3-2.6',
    title: 'Operational Risk',
    description: 'Operational failures, fraud, compliance, and fintech risks.',
    parentId: '3-2',
    order: 10,
  },
];
