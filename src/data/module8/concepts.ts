import { Concept } from '@/types';

export const module8Concepts: Concept[] = [
  // === Lesson 8-0: Overview ===
  {
    id: '8-financial-crisis',
    term: 'Financial Crisis',
    definition:
      'A severe disruption in the financial system that impairs the flow of credit to households and businesses, typically triggered by a loss of confidence, asset price collapse, or funding run. Crises can freeze lending and cause deep recessions.',
    category: 'financial-system',
    relatedConcepts: ['8-bank-run', '8-lender-of-last-resort', '8-financial-contagion'],
    lessonId: '8-0',
  },
  {
    id: '8-financial-contagion',
    term: 'Financial Contagion',
    definition:
      'The spread of financial distress from one institution, market, or country to others through direct exposures (counterparty risk), fire sales (asset price channels), or panic (information channels). A single bank failure can cascade through the entire system.',
    category: 'risk',
    relatedConcepts: ['8-bank-run', '8-fire-sale', '8-financial-crisis'],
    lessonId: '8-0',
  },

  // === Lesson 8-1.1: Bank Runs and the Panic of 1907 ===
  {
    id: '8-bank-run',
    term: 'Bank Run',
    definition:
      'A self-fulfilling panic in which depositors rush to withdraw funds because they fear the bank will fail. Even a solvent bank can be destroyed if it cannot liquidate long-term assets fast enough to meet withdrawals.',
    category: 'risk',
    relatedConcepts: ['8-maturity-mismatch', '8-illiquidity', '8-deposit-insurance'],
    lessonId: '8-1.1',
  },
  {
    id: '8-maturity-mismatch',
    term: 'Maturity Mismatch',
    definition:
      'The fundamental vulnerability of banking: banks fund long-term, illiquid assets (loans, mortgages) with short-term, demandable liabilities (deposits). If all depositors withdraw at once, the bank cannot sell assets fast enough without massive losses.',
    category: 'risk',
    relatedConcepts: ['8-bank-run', '8-illiquidity', '8-fire-sale'],
    lessonId: '8-1.1',
  },
  {
    id: '8-illiquidity',
    term: 'Illiquidity',
    definition:
      'A temporary inability to meet short-term obligations despite having assets whose long-term value exceeds liabilities. An illiquid bank is solvent but cannot convert assets to cash fast enough. The lender of last resort exists to bridge this gap.',
    category: 'risk',
    relatedConcepts: ['8-insolvency', '8-bank-run', '8-lender-of-last-resort'],
    lessonId: '8-1.1',
  },
  {
    id: '8-insolvency',
    term: 'Insolvency',
    definition:
      'A permanent condition in which total liabilities exceed total assets — the institution is fundamentally broken and cannot repay all creditors even given unlimited time. Insolvent institutions should be closed, not rescued.',
    category: 'risk',
    relatedConcepts: ['8-illiquidity', '8-bagehots-dictum'],
    lessonId: '8-1.1',
  },
  {
    id: '8-fire-sale',
    term: 'Fire Sale',
    definition:
      'Forced selling of assets at steep discounts to raise cash quickly. Fire sales depress market prices, potentially triggering margin calls and forced sales by other institutions, creating a downward spiral.',
    category: 'risk',
    relatedConcepts: ['8-bank-run', '8-maturity-mismatch', '8-financial-contagion'],
    lessonId: '8-1.1',
  },
  {
    id: '8-panic-of-1907',
    term: 'Panic of 1907',
    definition:
      'A banking crisis triggered by the collapse of F. Augustus Heinze\'s copper speculation and his linked banks. J.P. Morgan organized private bailouts, but the crisis proved the U.S. needed a central bank, leading to the creation of the Federal Reserve in 1913.',
    category: 'financial-system',
    relatedConcepts: ['8-bank-run', '8-lender-of-last-resort'],
    lessonId: '8-1.1',
  },

  // === Lesson 8-1.2: The Great Depression ===
  {
    id: '8-gold-standard',
    term: 'Gold Standard',
    definition:
      'A monetary system where currency is backed by and convertible to gold at a fixed rate. During the Depression, the gold standard prevented central banks from expanding the money supply to fight deflation, forcing painful austerity.',
    category: 'economy',
    relatedConcepts: ['8-deflation', '8-real-debt-burden'],
    lessonId: '8-1.2',
  },
  {
    id: '8-deflation',
    term: 'Deflation',
    definition:
      'A sustained decline in the general price level. While lower prices sound good, deflation increases the real burden of debt (fixed dollar payments become harder to meet), discourages spending (why buy today if it\'s cheaper tomorrow), and can create a vicious spiral of falling prices, rising defaults, and economic contraction.',
    category: 'economy',
    relatedConcepts: ['8-real-debt-burden', '8-gold-standard'],
    lessonId: '8-1.2',
  },
  {
    id: '8-real-debt-burden',
    term: 'Real Debt Burden',
    definition:
      'The inflation-adjusted value of outstanding debt. During deflation, prices and incomes fall but nominal debt stays fixed, making each dollar of debt harder to repay. This caused mass bankruptcies during the Great Depression as farm prices fell 50%+ while mortgage payments stayed the same.',
    category: 'economy',
    relatedConcepts: ['8-deflation', '8-gold-standard'],
    lessonId: '8-1.2',
  },
  {
    id: '8-deposit-insurance',
    term: 'Deposit Insurance (FDIC)',
    definition:
      'Government guarantee of bank deposits (up to $250,000 per depositor) that eliminates the incentive to run. Created in 1933 after 9,000 bank failures during the Great Depression. The most effective anti-run tool ever invented.',
    category: 'regulation',
    relatedConcepts: ['8-bank-run', '8-glass-steagall', '8-bank-holiday'],
    lessonId: '8-1.2',
  },
  {
    id: '8-glass-steagall',
    term: 'Glass-Steagall Act (1933)',
    definition:
      'Depression-era law that separated commercial banking (deposits and loans) from investment banking (securities underwriting and trading). Aimed to prevent banks from gambling with depositor funds. Repealed in 1999 by Gramm-Leach-Bliley.',
    category: 'regulation',
    relatedConcepts: ['8-deposit-insurance', '8-bank-holiday'],
    lessonId: '8-1.2',
  },
  {
    id: '8-bank-holiday',
    term: 'Bank Holiday',
    definition:
      'A government-ordered closure of all banks, used by FDR in March 1933 to stop the cascade of bank runs. During the closure, examiners determined which banks were solvent enough to reopen. Only sound banks reopened, restoring public confidence.',
    category: 'regulation',
    relatedConcepts: ['8-deposit-insurance', '8-bank-run'],
    lessonId: '8-1.2',
  },

  // === Lesson 8-1.3: Common Features of Financial Crises ===
  {
    id: '8-credit-boom',
    term: 'Credit Boom',
    definition:
      'A period of rapid expansion in lending, often fueled by financial innovation, deregulation, or loose monetary policy. Credit booms fund speculative investments (railroads in 1873, real estate in 2008) and inevitably end when asset prices fall and borrowers default.',
    category: 'economy',
    relatedConcepts: ['8-financial-crisis', '8-maturity-mismatch'],
    lessonId: '8-1.3',
  },
  {
    id: '8-short-term-funding-run',
    term: 'Short-Term Funding Run',
    definition:
      'A modern version of a bank run where wholesale lenders (rather than retail depositors) refuse to roll over short-term funding like commercial paper or repo. Seen in the 2008 crisis when money market funds and ABCP investors fled.',
    category: 'risk',
    relatedConcepts: ['8-bank-run', '8-abcp', '8-maturity-mismatch'],
    lessonId: '8-1.3',
  },

  // === Lesson 8-1.4: Auto Loans During the 2008 Crisis ===
  {
    id: '8-captive-finance-company',
    term: 'Captive Finance Company',
    definition:
      'A financing subsidiary owned by a manufacturer (e.g., GMAC for General Motors, Ford Motor Credit) that provides loans to customers buying the parent\'s products. Captive finance companies fund themselves through capital markets rather than deposits.',
    category: 'institutions',
    relatedConcepts: ['8-abcp', '8-abs'],
    lessonId: '8-1.4',
  },
  {
    id: '8-abcp',
    term: 'Asset-Backed Commercial Paper (ABCP)',
    definition:
      'Short-term debt (typically 1-270 days) secured by pools of assets like auto loans, credit card receivables, or mortgages. ABCP issuance collapsed during the 2008 crisis when investors refused to roll over maturing paper, triggering a liquidity crisis.',
    category: 'financial-system',
    relatedConcepts: ['8-abs', '8-captive-finance-company', '8-short-term-funding-run'],
    lessonId: '8-1.4',
  },
  {
    id: '8-abs',
    term: 'Asset-Backed Securities (ABS)',
    definition:
      'Bonds backed by pools of loans (auto loans, student loans, credit cards). The loans are packaged into a trust, and the trust issues securities to investors. ABS allow lenders to transfer risk and recycle capital for new lending.',
    category: 'financial-system',
    relatedConcepts: ['8-abcp', '8-captive-finance-company'],
    lessonId: '8-1.4',
  },

  // === Lesson 8-2.1: The Fed as Lender of Last Resort ===
  {
    id: '8-lender-of-last-resort',
    term: 'Lender of Last Resort',
    definition:
      'A central bank function of providing emergency liquidity to solvent institutions facing temporary funding difficulties. The classic framework is Bagehot\'s Dictum: lend freely, against good collateral, at a penalty rate.',
    category: 'regulation',
    relatedConcepts: ['8-bagehots-dictum', '8-illiquidity', '8-insolvency'],
    lessonId: '8-2.1',
  },
  {
    id: '8-bagehots-dictum',
    term: "Bagehot's Dictum",
    definition:
      'The classical rule for central bank crisis lending, formulated by Walter Bagehot in 1873: (1) Lend freely to stop panic, (2) against good collateral to protect taxpayers, (3) at a penalty rate to discourage abuse and ensure borrowers return to private markets.',
    category: 'regulation',
    relatedConcepts: ['8-lender-of-last-resort', '8-illiquidity', '8-insolvency'],
    lessonId: '8-2.1',
  },

  // === Lesson 8-2.2: Fiscal Responses to Financial Crises ===
  {
    id: '8-gdp-identity',
    term: 'GDP Identity (Y = C + I + G + NX)',
    definition:
      'The accounting identity that GDP equals consumption (C) + investment (I) + government spending (G) + net exports (NX). During crises, C and I collapse; government can offset the shortfall by increasing G.',
    category: 'economy',
    relatedConcepts: ['8-government-spending-multiplier', '8-stimulus-checks'],
    lessonId: '8-2.2',
  },
  {
    id: '8-government-spending-multiplier',
    term: 'Government Spending Multiplier',
    definition:
      'The ratio of the change in GDP to a change in government spending. A multiplier of 1.5 means $1 billion in spending generates $1.5 billion in GDP. The multiplier is higher during recessions (idle resources) and lower during booms (crowding out).',
    category: 'economy',
    relatedConcepts: ['8-gdp-identity', '8-stimulus-checks'],
    lessonId: '8-2.2',
  },
  {
    id: '8-stimulus-checks',
    term: 'Stimulus Checks',
    definition:
      'Direct cash payments from the government to households during economic crises. Research shows roughly one-third is spent, one-third is saved, and one-third is used to pay down debt — making them less powerful than direct government purchases but faster to deploy.',
    category: 'economy',
    relatedConcepts: ['8-gdp-identity', '8-government-spending-multiplier', '8-unemployment-benefits'],
    lessonId: '8-2.2',
  },
  {
    id: '8-unemployment-benefits',
    term: 'Unemployment Benefits',
    definition:
      'Government payments to workers who have lost their jobs, serving as automatic stabilizers that sustain consumer spending during downturns. Extended benefits during 2008 and 2020 crises prevented deeper consumption collapses.',
    category: 'economy',
    relatedConcepts: ['8-stimulus-checks', '8-gdp-identity'],
    lessonId: '8-2.2',
  },
];
