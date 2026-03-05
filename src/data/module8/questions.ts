import { ExamQuestion } from '@/types';

export const module8ExamQuestions: ExamQuestion[] = [
  // Easy (5)
  {
    id: 'q8-1',
    question: 'A bank run occurs when:',
    options: [
      'Depositors rush to withdraw funds fearing the bank will fail',
      'A bank raises its interest rates',
      'The stock market declines',
      'The central bank lowers reserve requirements',
    ],
    correctIndex: 0,
    explanation:
      'A bank run is a self-fulfilling panic: depositors withdraw because they fear others will withdraw first, draining the bank of cash. Even a solvent bank can fail if it cannot liquidate long-term assets fast enough.',
    difficulty: 'easy',
    moduleId: 8,
    conceptId: '8-bank-run',
  },
  {
    id: 'q8-2',
    question: 'What is the fundamental vulnerability that makes banks susceptible to runs?',
    options: [
      'Maturity mismatch — short-term liabilities funding long-term assets',
      'Excessive executive compensation',
      'Foreign currency exposure',
      'Low interest rates',
    ],
    correctIndex: 0,
    explanation:
      'Banks borrow short (deposits can be withdrawn on demand) and lend long (mortgages, business loans). This maturity mismatch means a bank cannot pay all depositors at once without fire-selling assets at steep losses.',
    difficulty: 'easy',
    moduleId: 8,
    conceptId: '8-maturity-mismatch',
  },
  {
    id: 'q8-3',
    question: 'Deposit insurance (FDIC) prevents bank runs by:',
    options: [
      'Guaranteeing deposits so there is no reason to rush and withdraw',
      'Forcing banks to hold more reserves',
      'Setting interest rate caps on deposits',
      'Allowing the Fed to print unlimited money',
    ],
    correctIndex: 0,
    explanation:
      'When deposits are guaranteed up to $250,000, rational depositors have no incentive to run. FDIC insurance, created in 1933, is the most effective anti-run mechanism ever invented.',
    difficulty: 'easy',
    moduleId: 8,
    conceptId: '8-deposit-insurance',
  },
  {
    id: 'q8-4',
    question: 'During the Great Depression, how many U.S. banks failed?',
    options: [
      'About 100',
      'About 1,000',
      'About 9,000',
      'About 25,000',
    ],
    correctIndex: 2,
    explanation:
      'Approximately 9,000 banks failed between 1929 and 1933 — nearly half of all U.S. banks. This massive wave of failures wiped out savings and destroyed the credit system, deepening the Depression.',
    difficulty: 'easy',
    moduleId: 8,
    conceptId: '8-deposit-insurance',
  },
  {
    id: 'q8-5',
    question:
      'The GDP identity states that Y (GDP) equals:',
    options: [
      'C + I + G + NX (consumption + investment + government spending + net exports)',
      'M x V (money supply times velocity)',
      'Revenue minus costs',
      'Exports minus imports',
    ],
    correctIndex: 0,
    explanation:
      'The GDP identity Y = C + I + G + NX shows the four components of aggregate spending. During crises, C and I collapse, so government can increase G to partially offset the decline.',
    difficulty: 'easy',
    moduleId: 8,
    conceptId: '8-gdp-identity',
  },

  // Medium (5)
  {
    id: 'q8-6',
    question: 'What is the key difference between illiquidity and insolvency?',
    options: [
      'Illiquidity is a temporary cash shortage; insolvency means liabilities exceed assets permanently',
      'Illiquidity only affects small banks; insolvency affects large banks',
      'Illiquidity is caused by regulation; insolvency is caused by fraud',
      'There is no meaningful difference',
    ],
    correctIndex: 0,
    explanation:
      'An illiquid bank has valuable assets but cannot convert them to cash fast enough to meet withdrawals — it needs a bridge loan. An insolvent bank owes more than it owns — it needs to be closed. The lender of last resort should help the illiquid but not the insolvent.',
    difficulty: 'medium',
    moduleId: 8,
    conceptId: '8-illiquidity',
  },
  {
    id: 'q8-7',
    question: "Bagehot's Dictum prescribes that in a crisis, the central bank should:",
    options: [
      'Lend freely, against good collateral, at a penalty rate',
      'Lend only to the largest banks at zero interest',
      'Stop all lending until panic subsides',
      'Buy stocks to support market prices',
    ],
    correctIndex: 0,
    explanation:
      "Bagehot's three principles: (1) lend freely to stop the panic, (2) require good collateral to protect taxpayers, (3) charge a penalty rate to ensure borrowers return to private markets. This framework guided central banking for 150 years.",
    difficulty: 'medium',
    moduleId: 8,
    conceptId: '8-bagehots-dictum',
  },
  {
    id: 'q8-8',
    question: 'Why did deflation during the Great Depression worsen the economic collapse?',
    options: [
      'Falling prices increased the real burden of debt, causing mass defaults and bankruptcies',
      'Deflation caused exports to increase too rapidly',
      'Deflation led to excessive consumer spending',
      'Deflation reduced the money supply to zero',
    ],
    correctIndex: 0,
    explanation:
      'Deflation means prices fall but nominal debt stays fixed. Farmers who owed $1,000 saw crop prices drop 50%, making their debt twice as hard to repay in real terms. This debt-deflation spiral caused mass bankruptcies and deepened the Depression.',
    difficulty: 'medium',
    moduleId: 8,
    conceptId: '8-deflation',
  },
  {
    id: 'q8-9',
    question:
      'What common feature links the crises of 1873, 1907, 1930s, and 2008?',
    options: [
      'Each was preceded by a credit boom that funded speculative investments',
      'Each was caused by a natural disaster',
      'Each involved hyperinflation',
      'Each was limited to a single country',
    ],
    correctIndex: 0,
    explanation:
      'Across 140 years, financial crises share the same pattern: a credit boom funds speculative investments (railroads, copper, real estate), which turn sour. When short-term creditors run, fire sales and contagion spread the damage system-wide.',
    difficulty: 'medium',
    moduleId: 8,
    conceptId: '8-credit-boom',
  },
  {
    id: 'q8-10',
    question:
      'How did the 2008 auto loan crisis illustrate the dangers of short-term funding?',
    options: [
      'Captive finance companies relied on ABCP that investors refused to roll over, freezing auto lending',
      'Car manufacturers went bankrupt from low sales',
      'Auto loan interest rates rose above 50%',
      'The government banned auto loans during the crisis',
    ],
    correctIndex: 0,
    explanation:
      'Companies like GMAC funded long-term auto loans by issuing short-term ABCP. When investors panicked and refused to roll over the paper, these companies lost access to funding, could no longer originate loans, and auto sales collapsed.',
    difficulty: 'medium',
    moduleId: 8,
    conceptId: '8-abcp',
  },

  // Hard (5)
  {
    id: 'q8-11',
    question:
      "How did the Fed's 2008 and 2020 crisis responses go beyond Bagehot's Dictum?",
    options: [
      'The Fed lent to non-banks, bought corporate bonds, and accepted weaker collateral than Bagehot prescribed',
      'The Fed followed Bagehot exactly with no modifications',
      'The Fed refused to lend to anyone during both crises',
      "The Fed only lent to foreign central banks, ignoring Bagehot's focus on domestic banks",
    ],
    correctIndex: 0,
    explanation:
      "Bagehot envisioned lending only to solvent banks against good collateral. In 2008 and 2020, the Fed expanded lending to broker-dealers, money market funds, and corporations — and accepted weaker collateral — because the financial system had evolved far beyond traditional banking.",
    difficulty: 'hard',
    moduleId: 8,
    conceptId: '8-lender-of-last-resort',
  },
  {
    id: 'q8-12',
    question:
      'If the government spending multiplier is 1.5 and Congress authorizes $200 billion in new spending, the expected GDP impact is:',
    options: [
      '$200 billion',
      '$300 billion',
      '$133 billion',
      '$100 billion',
    ],
    correctIndex: 1,
    explanation:
      'GDP impact = multiplier x change in spending = 1.5 x $200B = $300B. The multiplier exceeds 1.0 because each dollar of government spending generates income that is partially re-spent, creating additional rounds of economic activity.',
    difficulty: 'hard',
    moduleId: 8,
    conceptId: '8-government-spending-multiplier',
  },
  {
    id: 'q8-13',
    question:
      "Why did FDR's bank holiday in March 1933 succeed in stopping the panic?",
    options: [
      'It allowed examiners to separate solvent from insolvent banks, so only sound banks reopened, restoring confidence',
      'It permanently closed all banks and created a government-only banking system',
      'It forced all depositors to convert their savings to gold',
      'It was combined with a 100% reserve requirement for all reopening banks',
    ],
    correctIndex: 0,
    explanation:
      'The bank holiday halted the cascade of runs. During the closure, examiners determined which banks were solvent. When only healthy banks reopened with a presidential seal of approval, deposits actually flowed back in — confidence was restored.',
    difficulty: 'hard',
    moduleId: 8,
    conceptId: '8-bank-holiday',
  },
  {
    id: 'q8-14',
    question:
      'Why is the gold standard considered to have worsened the Great Depression?',
    options: [
      'It prevented central banks from expanding the money supply to fight deflation and forced contractionary policy to defend gold reserves',
      'Gold prices were too high, causing inflation',
      'Countries abandoned the gold standard too early',
      'The gold standard caused stock market speculation',
    ],
    correctIndex: 0,
    explanation:
      'Under the gold standard, expanding the money supply risked gold outflows as holders demanded conversion. Central banks had to raise rates to defend gold reserves even as their economies collapsed — the exact opposite of what was needed.',
    difficulty: 'hard',
    moduleId: 8,
    conceptId: '8-gold-standard',
  },
  {
    id: 'q8-15',
    question:
      'Research on stimulus checks shows that recipients typically:',
    options: [
      'Spend roughly one-third, save one-third, and use one-third to pay down debt',
      'Spend 100% immediately on consumer goods',
      'Save 100% and do not stimulate the economy',
      'Invest the entire amount in the stock market',
    ],
    correctIndex: 0,
    explanation:
      'Empirical research finds the one-third rule: about a third of stimulus payments is spent (boosting GDP), a third is saved, and a third goes to debt repayment. This makes stimulus checks less potent per dollar than direct government purchases but faster to distribute.',
    difficulty: 'hard',
    moduleId: 8,
    conceptId: '8-stimulus-checks',
  },
];
