import { Lesson } from '@/types';

export const module5Lessons: Lesson[] = [
  {
    id: '5-1',
    title: 'Short-term Funding Markets',
    description:
      'Federal funds, repo, and reference rates that anchor monetary policy implementation.',
    order: 0,
  },
  {
    id: '5-1.1',
    title: 'The Market for Federal Funds',
    description:
      'Bank reserves, required vs excess reserves, and the federal funds rate as the core policy operating target.',
    parentId: '5-1',
    order: 1,
  },
  {
    id: '5-1.2',
    title: 'The Repo Market',
    description:
      'Secured overnight funding, collateral mechanics, and haircut-based risk protection.',
    parentId: '5-1',
    order: 2,
  },
  {
    id: '5-1.3',
    title: 'Short-term Interest Rates',
    description:
      'LIBOR, SOFR, secured vs unsecured benchmarks, and the post-crisis reference-rate transition.',
    parentId: '5-1',
    order: 3,
  },
  {
    id: '5-2',
    title: 'Treasury Rates and Yield Decomposition',
    description:
      'Nominal vs real rates, risk-free benchmarks, and term structure signals.',
    order: 4,
  },
  {
    id: '5-2.1',
    title: 'Nominal and Real Interest Rates',
    description:
      'Fisher equation, inflation expectations, and TIPS-based real yield interpretation.',
    parentId: '5-2',
    order: 5,
  },
  {
    id: '5-2.2',
    title: 'Treasury Securities and the Risk-Free Rate',
    description:
      'Treasury market structure, risk-free benchmarking, and decomposition of long-term nominal yields.',
    parentId: '5-2',
    order: 6,
  },
  {
    id: '5-2.3',
    title: 'Term Structure of Interest Rates',
    description:
      'Yield-curve shapes, 10Y-2Y spread, and recession signaling through term premia and expectations.',
    parentId: '5-2',
    order: 7,
  },
  {
    id: '5-3',
    title: 'Nonbank Funding and Securitization',
    description:
      'How money market funds and securitization expand credit and transmit funding stress.',
    order: 8,
  },
  {
    id: '5-3.1',
    title: 'Money Market Mutual Funds',
    description:
      'Fund structure, run dynamics, reserve-breaking episodes, and systemic short-term funding linkages.',
    parentId: '5-3',
    order: 9,
  },
  {
    id: '5-3.2',
    title: 'Securitization',
    description:
      'Loan pooling, tranche waterfall design, and short-term funding dependence of credit intermediation.',
    parentId: '5-3',
    order: 10,
  },
];
