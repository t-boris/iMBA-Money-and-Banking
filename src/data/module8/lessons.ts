import { Lesson } from '@/types';

export const module8Lessons: Lesson[] = [
  {
    id: '8-0',
    title: 'Overview: Financial Crises',
    description:
      'Why financial crises happen, how they spread, and what governments do to stop them — from the Panic of 1907 to the 2008 meltdown and COVID-19 response.',
    order: 0,
  },
  {
    id: '8-1',
    title: 'Understanding Financial Crises',
    description:
      'Bank runs, the Great Depression, common crisis patterns, and how the 2008 auto loan crisis illustrates modern financial fragility.',
    order: 1,
  },
  {
    id: '8-1.1',
    title: 'Bank Runs and the Panic of 1907',
    description:
      'How maturity mismatch makes banks vulnerable to runs, the difference between illiquidity and insolvency, and how J.P. Morgan organized a private rescue before the Fed existed.',
    parentId: '8-1',
    order: 2,
  },
  {
    id: '8-1.2',
    title: 'The Great Depression',
    description:
      'The stock market crash, 9,000 bank failures, deflation spirals, and the policy responses — bank holidays, the Emergency Banking Act, Glass-Steagall, FDIC, and the New Deal.',
    parentId: '8-1',
    order: 3,
  },
  {
    id: '8-1.3',
    title: 'Common Features of Financial Crises',
    description:
      'Five crises across 140 years share the same DNA: excessive debt, short-term funding runs, bad long-term investments, and international contagion.',
    parentId: '8-1',
    order: 4,
  },
  {
    id: '8-1.4',
    title: 'Auto Loans During the 2008 Crisis',
    description:
      'How captive finance companies funded auto loans through ABCP and ABS, why investors ran, and how the credit crunch crushed auto sales.',
    parentId: '8-1',
    order: 5,
  },
  {
    id: '8-2',
    title: 'Policy Responses',
    description:
      'How the Fed acts as lender of last resort and how fiscal policy — stimulus checks, unemployment benefits, government spending — fights financial crises.',
    order: 6,
  },
  {
    id: '8-2.1',
    title: 'The Fed as Lender of Last Resort',
    description:
      "Bagehot's Dictum (lend freely, against good collateral, at a penalty rate), how the Fed expanded its safety net in 2008 and 2020, and the evolving scope of emergency lending.",
    parentId: '8-2',
    order: 7,
  },
  {
    id: '8-2.2',
    title: 'Fiscal Responses to Financial Crises',
    description:
      'The GDP identity (Y = C + I + G + NX), government spending multipliers, stimulus checks and their spending patterns, unemployment benefits, and how fiscal and monetary policy interact.',
    parentId: '8-2',
    order: 8,
  },
];
