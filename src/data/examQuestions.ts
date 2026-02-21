import { ExamQuestion } from '@/types';
import { module5ExamQuestions } from './module5/questions';

export const examQuestions: ExamQuestion[] = [
  // Module 1 - Money and Finance (10 questions)
  {
    id: 'q1-1',
    question: 'What are the three functions of money?',
    options: [
      'Means of payment, unit of account, store of value',
      'Lending, borrowing, investing',
      'Saving, spending, donating',
      'Currency, credit, debit',
    ],
    correctIndex: 0,
    explanation:
      'Money serves three key functions: (1) means of payment to settle transactions, (2) unit of account to measure value, and (3) store of value to preserve purchasing power over time.',
    difficulty: 'easy',
    moduleId: 1,
    conceptId: '1-money',
  },
  {
    id: 'q1-2',
    question: 'Which type of money has intrinsic value from its physical composition?',
    options: ['Fiat money', 'Commodity money', 'Representative money', 'Digital money'],
    correctIndex: 1,
    explanation:
      'Commodity money (like gold coins) has intrinsic value because the material itself is valuable. Fiat money has no intrinsic value; representative money is backed by commodities but not made of them.',
    difficulty: 'easy',
    moduleId: 1,
    conceptId: '1-commodity-money',
  },
  {
    id: 'q1-3',
    question: 'M2 includes all of the following EXCEPT:',
    options: [
      'Currency in circulation',
      'Checking account deposits',
      'Corporate bonds',
      'Money market funds',
    ],
    correctIndex: 2,
    explanation:
      'M2 includes M1 (currency + checking deposits) plus savings accounts and money market funds. Corporate bonds are NOT part of M2 as they are not liquid enough to function as money.',
    difficulty: 'medium',
    moduleId: 1,
    conceptId: '1-m2',
  },
  {
    id: 'q1-4',
    question: 'What problem do financial intermediaries solve that direct finance cannot?',
    options: [
      'Eliminating all risk',
      'Maturity mismatch and information asymmetry',
      'Guaranteeing high returns',
      'Avoiding government regulation',
    ],
    correctIndex: 1,
    explanation:
      'Banks solve the maturity mismatch (savers want short-term, borrowers need long-term) and information asymmetry (borrowers know more about their risk than lenders) through professional screening and monitoring.',
    difficulty: 'medium',
    moduleId: 1,
    conceptId: '1-maturity-mismatch',
  },
  {
    id: 'q1-5',
    question: 'A financial crisis is most accurately described as:',
    options: [
      'A drop in stock prices',
      'A disruption that severely impairs the flow of credit',
      'High inflation',
      'A government budget deficit',
    ],
    correctIndex: 1,
    explanation:
      'A financial crisis is specifically a disruption in the financial system that impairs credit flow, potentially freezing lending and causing broader economic damage.',
    difficulty: 'hard',
    moduleId: 1,
    conceptId: '1-financial-crisis',
  },

  // Module 2 - Modern Banking (10 questions)
  {
    id: 'q2-1',
    question: 'What was the "3-6-3 rule" in traditional banking?',
    options: [
      'Pay 3% on deposits, lend at 6%, be on the golf course by 3pm',
      'Maintain 3% reserves, 6% equity, 3% cash',
      'Open 3 branches, hire 6 tellers, serve 3 markets',
      'Process 3 loans, take 6 deposits, review 3 applications daily',
    ],
    correctIndex: 0,
    explanation:
      'The 3-6-3 rule described simple traditional banking: pay depositors 3%, lend at 6%, and enjoy an easy lifestyle (golf by 3pm). This model dominated before deregulation.',
    difficulty: 'easy',
    moduleId: 2,
  },
  {
    id: 'q2-2',
    question: 'The Glass-Steagall Act of 1933 primarily:',
    options: [
      'Created the Federal Reserve',
      'Separated commercial and investment banking',
      'Deregulated interest rates',
      'Allowed interstate banking',
    ],
    correctIndex: 1,
    explanation:
      'Glass-Steagall separated commercial banking (deposits/loans) from investment banking (securities underwriting/trading) to reduce risk after the 1929 crash. It was repealed in 1999 by Gramm-Leach-Bliley.',
    difficulty: 'medium',
    moduleId: 2,
  },
  {
    id: 'q2-3',
    question: 'What distinguishes "Originate-and-Distribute" from "Originate-and-Hold"?',
    options: [
      'O&D keeps loans on balance sheet; O&H sells them',
      'O&D sells/securitizes loans; O&H keeps them on balance sheet',
      'O&D is for retail; O&H is for commercial',
      'O&D requires collateral; O&H does not',
    ],
    correctIndex: 1,
    explanation:
      'In Originate-and-Distribute, banks create loans then sell or securitize them (transferring risk). In Originate-and-Hold, banks keep loans on their balance sheet (retaining risk). O&D became dominant before 2008.',
    difficulty: 'hard',
    moduleId: 2,
  },
  {
    id: 'q2-4',
    question: 'Money center banks differ from community banks primarily in:',
    options: [
      'They only serve local customers',
      'Their reliance on wholesale funding vs. deposits',
      'They cannot make commercial loans',
      'They are not FDIC insured',
    ],
    correctIndex: 1,
    explanation:
      'Money center banks (like JPMorgan) rely heavily on wholesale funding markets, while community banks depend primarily on local deposits. This funding difference affects their risk profiles.',
    difficulty: 'hard',
    moduleId: 2,
  },
  {
    id: 'q2-5',
    question: 'Off-balance sheet items include all EXCEPT:',
    options: [
      'Loan commitments',
      'Standby letters of credit',
      'Treasury securities held',
      'Derivative positions (notional value)',
    ],
    correctIndex: 2,
    explanation:
      'Treasury securities held are ON the balance sheet as assets. Loan commitments, letters of credit, and derivatives (notional amounts) are off-balance sheet contingent obligations.',
    difficulty: 'hard',
    moduleId: 2,
  },

  // Module 3 - Risk and Return (10 questions)
  {
    id: 'q3-1',
    question: 'Bank equity capital serves primarily as:',
    options: [
      'A source of lending funds',
      'A loss-absorbing buffer',
      'Customer deposits',
      'Required reserves',
    ],
    correctIndex: 1,
    explanation:
      "Equity capital is the bank's loss-absorbing buffer. When assets decline in value, equity takes the first hit, protecting depositors and the deposit insurance fund.",
    difficulty: 'easy',
    moduleId: 3,
    conceptId: '3-equity-capital',
  },
  {
    id: 'q3-2',
    question: 'ROE = ROA × Leverage. If a bank has ROA of 1% and leverage of 12x, its ROE is:',
    options: ['1%', '6%', '12%', '13%'],
    correctIndex: 2,
    explanation:
      'ROE = ROA × Leverage = 1% × 12 = 12%. Higher leverage amplifies ROA to produce higher ROE, but also amplifies risk.',
    difficulty: 'medium',
    moduleId: 3,
    conceptId: '3-roe',
  },
  {
    id: 'q3-3',
    question: 'Credit risk is best defined as:',
    options: [
      'The risk of interest rate changes',
      'The risk that a borrower fails to repay',
      'The risk of bank runs',
      'The risk of fraud',
    ],
    correctIndex: 1,
    explanation:
      'Credit risk (default risk) is the risk that a borrower fails to meet their payment obligations. Banks manage this through credit analysis, diversification, and pricing.',
    difficulty: 'easy',
    moduleId: 3,
    conceptId: '3-credit-risk',
  },
  {
    id: 'q3-4',
    question: 'Interest rate risk arises primarily from:',
    options: [
      'Holding too many loans',
      'Maturity mismatch between assets and liabilities',
      'Customer fraud',
      'Operational failures',
    ],
    correctIndex: 1,
    explanation:
      'Interest rate risk comes from maturity mismatch: banks borrow short (deposits) and lend long (loans). When rates rise, funding costs increase faster than asset yields.',
    difficulty: 'medium',
    moduleId: 3,
    conceptId: '3-interest-rate-risk',
  },
  {
    id: 'q3-5',
    question: 'A "fire sale" in the context of liquidity risk refers to:',
    options: [
      'Selling branches at a discount',
      'Forced asset sales at depressed prices',
      'Closing accounts quickly',
      'Reducing staff rapidly',
    ],
    correctIndex: 1,
    explanation:
      'A fire sale occurs when a bank must sell assets quickly to meet obligations, accepting prices below fair value. This can trigger a downward spiral if many banks sell simultaneously.',
    difficulty: 'hard',
    moduleId: 3,
    conceptId: '3-fire-sale',
  },
  {
    id: 'q3-6',
    question: 'Value at Risk (VaR) measures:',
    options: [
      'The expected profit from trading',
      'The maximum loss over a time horizon at a given confidence level',
      'The average daily return',
      'The total value of assets',
    ],
    correctIndex: 1,
    explanation:
      "VaR estimates the maximum loss that should not be exceeded with a given probability (e.g., 99%) over a specific time horizon (e.g., 1 day). It's a standard market risk measure.",
    difficulty: 'hard',
    moduleId: 3,
    conceptId: '3-var',
  },

  // Additional questions for balance
  {
    id: 'q1-6',
    question: 'Liquidity refers to:',
    options: [
      'How much cash a bank holds',
      'How easily an asset can be converted to money without losing value',
      'The total amount of deposits',
      'The interest rate on loans',
    ],
    correctIndex: 1,
    explanation:
      'Liquidity measures how easily and quickly an asset can be converted into cash without significant loss of value. Cash is the most liquid; real estate is illiquid.',
    difficulty: 'easy',
    moduleId: 1,
    conceptId: '1-liquidity',
  },
  {
    id: 'q2-6',
    question: 'A Financial Holding Company (FHC) can engage in:',
    options: [
      'Only traditional banking',
      'Banking, securities, and insurance activities',
      'Only insurance',
      'Only investment banking',
    ],
    correctIndex: 1,
    explanation:
      'FHCs, created by Gramm-Leach-Bliley (1999), can engage in commercial banking, investment banking, and insurance under one corporate umbrella.',
    difficulty: 'medium',
    moduleId: 2,
  },
  {
    id: 'q3-7',
    question: 'Operational risk includes:',
    options: [
      'Only cyber attacks',
      'System failures, fraud, and legal/compliance failures',
      'Only interest rate changes',
      'Only credit defaults',
    ],
    correctIndex: 1,
    explanation:
      'Operational risk covers losses from inadequate internal processes, people, systems, or external events—including fraud, IT failures, legal issues, and natural disasters.',
    difficulty: 'medium',
    moduleId: 3,
    conceptId: '3-operational-risk',
  },
  {
    id: 'q1-7',
    question: 'Moral hazard in banking occurs when:',
    options: [
      'Banks charge high interest rates',
      'Agents take more risk expecting protection from consequences',
      'Depositors withdraw money',
      'Regulators increase requirements',
    ],
    correctIndex: 1,
    explanation:
      'Moral hazard arises when protection (like deposit insurance or bailout expectations) encourages excessive risk-taking. Banks may take more risks knowing they might be "too big to fail."',
    difficulty: 'hard',
    moduleId: 1,
    conceptId: '1-moral-hazard',
  },

  // Module 4 - Regulation (10 questions)
  {
    id: 'q4-1',
    question: 'Why are banks more regulated than most industries?',
    options: [
      'Because they are more profitable',
      'Because their failure creates systemic spillovers',
      'Because they are government-owned',
      'Because they have monopoly power',
    ],
    correctIndex: 1,
    explanation:
      'Bank failures create negative externalities — lost credit, lost savings, taxpayer costs, and contagion to other institutions — that justify government intervention.',
    difficulty: 'easy',
    moduleId: 4,
    conceptId: '4-negative-externality',
  },
  {
    id: 'q4-2',
    question: 'What is the primary purpose of FDIC deposit insurance?',
    options: [
      'To increase bank profits',
      'To prevent bank runs by guaranteeing deposits',
      'To replace bank regulation',
      'To fund government spending',
    ],
    correctIndex: 1,
    explanation:
      'Deposit insurance removes the incentive for depositors to rush and withdraw funds, preventing self-fulfilling bank runs.',
    difficulty: 'easy',
    moduleId: 4,
    conceptId: '4-deposit-insurance',
  },
  {
    id: 'q4-3',
    question:
      'What is the difference between microprudential and macroprudential regulation?',
    options: [
      'Domestic vs international',
      'Individual bank risk vs system-wide risk',
      'Small vs large banks',
      'Short-term vs long-term regulation',
    ],
    correctIndex: 1,
    explanation:
      'Microprudential focuses on the safety of individual banks. Macroprudential addresses system-wide risk and spillovers, with stricter requirements for systemically important institutions.',
    difficulty: 'medium',
    moduleId: 4,
    conceptId: '4-macroprudential-regulation',
  },
  {
    id: 'q4-4',
    question: 'What does the TED Spread measure?',
    options: [
      'The difference between stock and bond returns',
      'The gap between interbank lending rate and Treasury bill rate',
      'The spread between mortgage rates and deposit rates',
      'The inflation rate minus GDP growth',
    ],
    correctIndex: 1,
    explanation:
      'TED = Interbank Rate - Treasury Rate. A wide spread indicates banks distrust each other, signaling financial system stress.',
    difficulty: 'medium',
    moduleId: 4,
    conceptId: '4-ted-spread',
  },
  {
    id: 'q4-5',
    question:
      'Why does the Basel Accord use risk-weighted assets instead of total assets?',
    options: [
      'To simplify calculations',
      'To recognize that different assets carry different risk levels',
      'To reduce bank profitability',
      'To standardize accounting rules',
    ],
    correctIndex: 1,
    explanation:
      'Risk-weighting ensures banks hold more capital against risky assets (like corporate loans at 100%) and less against safe assets (government bonds at 0%), making capital requirements proportional to actual risk.',
    difficulty: 'medium',
    moduleId: 4,
    conceptId: '4-risk-weighted-assets',
  },
  {
    id: 'q4-6',
    question: 'What are the six dimensions of the CAMELS rating system?',
    options: [
      'Cost, Assets, Management, Efficiency, Loans, Safety',
      'Capital, Assets, Management, Earnings, Liquidity, Sensitivity',
      'Credit, Auditing, Monitoring, Equity, Leverage, Stability',
      'Capital, Activities, Markets, Exposure, Losses, Solvency',
    ],
    correctIndex: 1,
    explanation:
      'CAMELS rates banks on: Capital adequacy, Asset quality, Management quality, Earnings sustainability, Liquidity position, and Sensitivity to market risk.',
    difficulty: 'medium',
    moduleId: 4,
    conceptId: '4-camels-score',
  },
  {
    id: 'q4-7',
    question: "What problem does the 'Too Big To Fail' doctrine create?",
    options: [
      'It makes small banks more competitive',
      'It creates moral hazard by encouraging risk-taking in large banks',
      'It reduces banking system efficiency',
      'It increases interest rates for consumers',
    ],
    correctIndex: 1,
    explanation:
      'If large banks expect government rescue, they take excessive risks — keeping profits in good times while shifting losses to taxpayers in bad times. This implicit guarantee also gives them cheaper funding.',
    difficulty: 'hard',
    moduleId: 4,
    conceptId: '4-too-big-to-fail',
  },
  {
    id: 'q4-8',
    question: 'What is shadow banking and why is it a regulatory concern?',
    options: [
      'Illegal banking operations',
      'Bank-like intermediation outside traditional regulation, creating hidden systemic risk',
      'Online-only banking without branches',
      'Foreign banks operating without local licenses',
    ],
    correctIndex: 1,
    explanation:
      'Shadow banks (like money market funds, repo markets) perform bank-like functions — illiquid assets funded by demand-like liabilities — but operate with weaker regulation and no safety net, creating fragility.',
    difficulty: 'hard',
    moduleId: 4,
    conceptId: '4-shadow-banking',
  },
  {
    id: 'q4-9',
    question:
      'Why might redemption gates on money market funds actually increase run risk?',
    options: [
      'They are too expensive to implement',
      'Investors run earlier to avoid being locked out',
      'They reduce fund profitability',
      'Regulators cannot enforce them',
    ],
    correctIndex: 1,
    explanation:
      'The preemptive run incentive: if investors expect gates may be imposed, they rationally withdraw earlier to avoid being trapped. The tool designed to stop runs paradoxically accelerates them.',
    difficulty: 'hard',
    moduleId: 4,
    conceptId: '4-preemptive-run-incentive',
  },
  {
    id: 'q4-10',
    question: 'What is the purpose of a systemic risk surcharge for G-SIBs?',
    options: [
      'To punish large banks',
      'To make large banks hold extra capital proportional to their systemic footprint',
      'To fund deposit insurance',
      'To prevent banks from growing',
    ],
    correctIndex: 1,
    explanation:
      "The surcharge works like a 'pollution tax' — the more systemic risk a bank creates, the more capital it must hold. This reduces failure probability for banks whose collapse would damage the entire system.",
    difficulty: 'hard',
    moduleId: 4,
    conceptId: '4-systemic-risk-surcharge',
  },
  ...module5ExamQuestions,

  // Module 6 - Central Banking & Monetary Policy (15 questions)
  {
    id: 'q6-1',
    question: "What are the two goals of the Fed's Dual Mandate?",
    options: [
      'Maximum employment and stable prices',
      'Low inflation and balanced budget',
      'Economic growth and trade surplus',
      'Financial stability and full employment',
    ],
    correctIndex: 0,
    explanation:
      'The Federal Reserve Act mandates maximum employment and stable prices (interpreted as ~2% inflation). Every Fed policy tool is designed to advance one or both of these goals.',
    difficulty: 'easy',
    moduleId: 6,
    conceptId: '6-dual-mandate',
  },
  {
    id: 'q6-2',
    question: 'How many voting members serve on the FOMC?',
    options: ['7', '12', '18', '24'],
    correctIndex: 1,
    explanation:
      'The FOMC has 12 voting members: all 7 Board governors, the NY Fed president, and 4 rotating Reserve Bank presidents.',
    difficulty: 'easy',
    moduleId: 6,
    conceptId: '6-fomc',
  },
  {
    id: 'q6-3',
    question: 'What is the money multiplier formula?',
    options: [
      'M × V = P × Y',
      '1 / reserve ratio',
      'Deposits × Interest Rate',
      'Reserves / Currency',
    ],
    correctIndex: 1,
    explanation:
      'The money multiplier is 1 / reserve ratio. With a 10% reserve requirement, the multiplier is 10, meaning $1,000 in reserves can support up to $10,000 in deposits.',
    difficulty: 'easy',
    moduleId: 6,
    conceptId: '6-money-multiplier',
  },
  {
    id: 'q6-4',
    question: 'Why was the Swedish Riksbank founded in 1668?',
    options: [
      'To fund wars against Denmark',
      'To control money supply after a private bank over-issued notes and collapsed',
      'To establish a gold standard',
      'To regulate international trade',
    ],
    correctIndex: 1,
    explanation:
      'Stockholms Banco, a private bank, over-issued banknotes beyond its metal reserves and collapsed. The Swedish government created the Riksbank to bring note issuance under public control.',
    difficulty: 'medium',
    moduleId: 6,
    conceptId: '6-riksbank',
  },
  {
    id: 'q6-5',
    question: 'What happens to the money supply when the Fed conducts an open market purchase?',
    options: [
      'Money supply decreases as banks hold more reserves',
      'Money supply stays the same',
      'Reserves increase, banks lend more, money supply expands',
      'Only currency in circulation changes',
    ],
    correctIndex: 2,
    explanation:
      'When the Fed buys securities, it credits bank reserves. Banks then lend out excess reserves, which get redeposited and re-lent, expanding the money supply through the multiplier process.',
    difficulty: 'medium',
    moduleId: 6,
    conceptId: '6-open-market-operations',
  },
  {
    id: 'q6-6',
    question: 'What is the primary purpose of the discount window?',
    options: [
      'To set the federal funds rate directly',
      'To provide short-term cash to banks against collateral, acting as a rate corridor ceiling',
      'To handle consumer complaints',
      'To manage the Treasury General Account',
    ],
    correctIndex: 1,
    explanation:
      'The discount window lets banks borrow directly from the Fed against collateral at a rate above the target range, creating a ceiling for short-term rates since no bank would pay more in the market.',
    difficulty: 'medium',
    moduleId: 6,
    conceptId: '6-discount-window',
  },
  {
    id: 'q6-7',
    question: "What does a 'dot' in the Dot Plot represent?",
    options: [
      'The current federal funds rate',
      "An individual FOMC participant's rate expectation for a future period",
      'The inflation target',
      "A bank's reserve balance",
    ],
    correctIndex: 1,
    explanation:
      'Each dot represents one FOMC participant\'s anonymous projection of where the fed funds rate should be at each future date. Markets use the median dot to gauge the expected rate path.',
    difficulty: 'medium',
    moduleId: 6,
    conceptId: '6-dot-plot',
  },
  {
    id: 'q6-8',
    question: 'How did QE1 affect mortgage rates?',
    options: [
      'Rates increased due to higher inflation expectations',
      'Rates were unchanged because QE only affects short-term rates',
      '30-year fixed fell from ~6.5% to ~4.85% as MBS purchases drove down yields',
      'Rates fell briefly then returned to pre-QE levels',
    ],
    correctIndex: 2,
    explanation:
      'QE1 purchased $1.25 trillion in MBS, directly reducing mortgage-backed security yields and pulling 30-year fixed mortgage rates down from roughly 6.5% to 4.85%.',
    difficulty: 'medium',
    moduleId: 6,
    conceptId: '6-quantitative-easing',
  },
  {
    id: 'q6-9',
    question: 'What is the key difference between M1 and M2?',
    options: [
      'M2 includes foreign currency deposits',
      'M2 adds savings deposits, small time deposits, and retail MMMF shares to M1',
      'M1 includes institutional money market funds',
      'M2 excludes currency in circulation',
    ],
    correctIndex: 1,
    explanation:
      'M1 captures the most liquid money (currency + demand deposits). M2 broadens this by adding savings deposits, small time deposits, and retail money market mutual fund shares — near-money that can be quickly converted to M1.',
    difficulty: 'medium',
    moduleId: 6,
    conceptId: '6-m2',
  },
  {
    id: 'q6-10',
    question: 'Why did the relationship between money supply growth and GDP growth become unreliable after 2008?',
    options: [
      'The Fed stopped publishing money supply data',
      'QE flooded the system with reserves but velocity declined; banks held excess reserves rather than lending',
      'GDP measurement methodology changed',
      'International capital flows distorted domestic money supply',
    ],
    correctIndex: 1,
    explanation:
      'After QE massively expanded reserves, velocity (V in MV = PY) dropped sharply as banks hoarded reserves rather than lending. The traditional quantity-theory link between money growth and nominal GDP broke down.',
    difficulty: 'hard',
    moduleId: 6,
    conceptId: '6-quantity-theory-of-money',
  },
  {
    id: 'q6-11',
    question: 'How does IORB create a floor for the federal funds rate?',
    options: [
      'The Fed mandates banks cannot lend below IORB',
      'Banks won\'t lend below IORB because they earn that rate risk-free at the Fed; arbitrage ensures convergence',
      'IORB automatically adjusts to match the fed funds rate',
      'Non-bank institutions set their rates based on IORB',
    ],
    correctIndex: 1,
    explanation:
      'No rational bank would lend reserves at a rate below what the Fed pays risk-free on reserve balances. This arbitrage logic establishes IORB as an effective floor for the fed funds rate.',
    difficulty: 'hard',
    moduleId: 6,
    conceptId: '6-iorb',
  },
  {
    id: 'q6-12',
    question: 'Why is ON RRP needed in addition to IORB?',
    options: [
      'To replace open market operations entirely',
      "Non-banks like money market funds can't access IORB; without ON RRP they might lend below IORB, pulling rates down",
      'To increase the money supply during recessions',
      'To provide foreign central banks access to dollar liquidity',
    ],
    correctIndex: 1,
    explanation:
      'Money market funds and GSEs cannot earn IORB because they are not banks. The ON RRP facility gives these non-bank participants a floor rate, preventing them from driving overnight rates below the target range.',
    difficulty: 'hard',
    moduleId: 6,
    conceptId: '6-on-rrp',
  },
  {
    id: 'q6-13',
    question: 'What is the key difference between Operation Twist and QE?',
    options: [
      'Operation Twist only buys corporate bonds while QE buys Treasuries',
      'Twist sells short-term and buys long-term with no net balance sheet expansion; QE creates new reserves to buy securities',
      'QE is limited to specific dollar amounts while Twist is open-ended',
      'Operation Twist targets the federal funds rate while QE targets long-term rates',
    ],
    correctIndex: 1,
    explanation:
      'Operation Twist is balance-sheet neutral: selling short-term and buying long-term Treasuries flattens the yield curve without adding reserves. QE expands the balance sheet by creating new reserves to fund purchases.',
    difficulty: 'hard',
    moduleId: 6,
    conceptId: '6-operation-twist',
  },
  {
    id: 'q6-14',
    question: 'In the abundant reserves regime, why are traditional OMOs less effective?',
    options: [
      'Primary dealers refuse to trade with the Fed',
      "With massive reserves, small supply changes don't shift the equilibrium enough to move the fed funds rate",
      'The discount window rate prevents any rate changes',
      'Banks prefer to borrow from foreign central banks',
    ],
    correctIndex: 1,
    explanation:
      'When the system holds trillions in excess reserves, the reserve demand curve is nearly flat. Small open market operations barely shift the supply curve, making traditional quantity-based rate control ineffective.',
    difficulty: 'hard',
    moduleId: 6,
    conceptId: '6-abundant-reserves',
  },
  {
    id: 'q6-15',
    question: "How does the Fed's balance sheet expansion mechanically work?",
    options: [
      'The Fed prints paper money and distributes it to banks',
      'Congress authorizes spending which the Fed distributes',
      "The Fed credits banks' reserve accounts digitally; reserves grow on the liability side while purchased securities grow on the asset side",
      'The Fed borrows from foreign central banks to fund purchases',
    ],
    correctIndex: 2,
    explanation:
      'When the Fed buys securities, it electronically credits the selling bank\'s reserve account. On the Fed\'s balance sheet, the purchased securities appear as assets and the new reserves as liabilities.',
    difficulty: 'hard',
    moduleId: 6,
    conceptId: '6-fed-balance-sheet',
  },
];

// Helper to get unique sorted module IDs that have questions
export function getModulesWithQuestions(): number[] {
  const moduleIds = new Set(examQuestions.map((q) => q.moduleId));
  return Array.from(moduleIds).sort((a, b) => a - b);
}

// Helper to get question count for a set of modules
export function getQuestionCountForModules(moduleIds: number[]): number {
  return examQuestions.filter((q) => moduleIds.includes(q.moduleId)).length;
}

// Helper to get questions by difficulty
export function getQuestionsByDifficulty(difficulty: ExamQuestion['difficulty']): ExamQuestion[] {
  return examQuestions.filter((q) => q.difficulty === difficulty);
}

// Helper to get random exam with proper difficulty distribution
export function generateExam(count: 5 | 10 | 15 | 20, moduleIds?: number[]): ExamQuestion[] {
  // Filter by modules if provided
  const pool =
    moduleIds && moduleIds.length > 0
      ? examQuestions.filter((q) => moduleIds.includes(q.moduleId))
      : examQuestions;

  const hardCount = Math.round(count * 0.4);
  const mediumCount = Math.round(count * 0.4);
  const easyCount = count - hardCount - mediumCount;

  const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const hardQuestions = shuffleArray(pool.filter((q) => q.difficulty === 'hard')).slice(
    0,
    hardCount,
  );
  const mediumQuestions = shuffleArray(pool.filter((q) => q.difficulty === 'medium')).slice(
    0,
    mediumCount,
  );
  const easyQuestions = shuffleArray(pool.filter((q) => q.difficulty === 'easy')).slice(
    0,
    easyCount,
  );

  return shuffleArray([...hardQuestions, ...mediumQuestions, ...easyQuestions]);
}
