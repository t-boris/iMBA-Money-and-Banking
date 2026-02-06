import { Concept } from '@/types';

export const module4Concepts: Concept[] = [
  // ============================================================
  // Lesson 4-0: Overview
  // ============================================================
  {
    id: 'bank-regulation',
    term: 'Bank Regulation',
    definition:
      'The framework of laws, rules, and supervisory practices designed to ensure the safety, soundness, and stability of the banking system.',
    category: 'regulation',
    relatedConcepts: ['regulation', 'bank-supervision'],
    lessonId: '4-0',
  },

  // ============================================================
  // Lesson 4-1: Understanding Bank Regulation
  // ============================================================
  {
    id: 'regulation',
    term: 'Regulation',
    definition:
      'Government rules and oversight imposed on private economic activity to correct market failures and protect the public interest.',
    category: 'regulation',
    relatedConcepts: ['bank-regulation', 'market-failure', 'moral-hazard'],
    lessonId: '4-1',
  },

  // ============================================================
  // Lesson 4-1.1: Goals of Financial Regulation
  // ============================================================
  {
    id: 'market-failure',
    term: 'Market Failure',
    definition:
      'A situation where free markets fail to allocate resources efficiently, often due to externalities, information asymmetry, or public goods problems.',
    category: 'regulation',
    relatedConcepts: ['negative-externality', 'regulation'],
    lessonId: '4-1.1',
  },
  {
    id: 'negative-externality',
    term: 'Negative Externality',
    definition:
      'A cost imposed on third parties who are not involved in a transaction, such as the broader economic damage caused by a bank failure.',
    category: 'regulation',
    relatedConcepts: ['market-failure', 'bank-failure', 'systemic-failure'],
    lessonId: '4-1.1',
  },
  {
    id: 'bank-failure',
    term: 'Bank Failure',
    definition:
      'When a bank is unable to meet its obligations to depositors and creditors, often resulting in closure by regulators.',
    category: 'regulation',
    relatedConcepts: ['negative-externality', 'systemic-failure', 'bank-fragility'],
    lessonId: '4-1.1',
  },
  {
    id: 'systemic-failure',
    term: 'Systemic Failure',
    definition:
      'The collapse or severe disruption of the entire financial system, as opposed to the failure of a single institution.',
    category: 'regulation',
    relatedConcepts: ['bank-failure', 'negative-externality', 'financial-stability'],
    lessonId: '4-1.1',
  },
  {
    id: 'microprudential-regulation',
    term: 'Microprudential Regulation',
    definition:
      'Regulation focused on the safety and soundness of individual financial institutions, ensuring each bank is well-managed and solvent.',
    category: 'regulation',
    relatedConcepts: ['macroprudential-regulation', 'customer-protection'],
    lessonId: '4-1.1',
  },
  {
    id: 'macroprudential-regulation',
    term: 'Macroprudential Regulation',
    definition:
      'Regulation focused on the stability of the financial system as a whole, addressing systemic risks that arise from interconnectedness.',
    category: 'regulation',
    relatedConcepts: ['microprudential-regulation', 'financial-stability', 'systemic-risk'],
    lessonId: '4-1.1',
  },
  {
    id: 'financial-stability',
    term: 'Financial Stability',
    definition:
      'A state in which the financial system can withstand shocks and continue to provide essential services like credit intermediation and payments.',
    category: 'financial-system',
    relatedConcepts: ['macroprudential-regulation', 'systemic-failure'],
    lessonId: '4-1.1',
  },
  {
    id: 'customer-protection',
    term: 'Customer Protection',
    definition:
      'Regulations designed to protect consumers from unfair, deceptive, or abusive practices by financial institutions.',
    category: 'regulation',
    relatedConcepts: ['microprudential-regulation', 'redlining'],
    lessonId: '4-1.1',
  },
  {
    id: 'redlining',
    term: 'Redlining',
    definition:
      'The discriminatory practice of denying financial services to residents of certain neighborhoods based on race or ethnicity.',
    category: 'regulation',
    relatedConcepts: ['customer-protection'],
    lessonId: '4-1.1',
  },
  {
    id: 'moral-hazard',
    term: 'Moral Hazard',
    definition:
      'The tendency of a party insulated from risk to behave differently than if fully exposed to the risk, such as banks taking excessive risks because of government guarantees.',
    category: 'risk',
    relatedConcepts: ['regulation', 'government-safety-net', 'tarp'],
    lessonId: '4-1.1',
  },
  {
    id: 'tarp',
    term: 'TARP (Troubled Asset Relief Program)',
    definition:
      'A 2008 US government program that authorized $700 billion to purchase troubled assets and inject capital into banks during the financial crisis.',
    category: 'regulation',
    relatedConcepts: ['moral-hazard', 'safety-net-moral-hazard'],
    lessonId: '4-1.1',
  },
  {
    id: 'cost-benefit-analysis',
    term: 'Cost-Benefit Analysis',
    definition:
      'A systematic process for comparing the costs and benefits of a regulation to determine whether it produces a net positive outcome.',
    category: 'regulation',
    relatedConcepts: ['regulation', 'unintended-consequences'],
    lessonId: '4-1.1',
  },
  {
    id: 'unintended-consequences',
    term: 'Unintended Consequences',
    definition:
      'Unexpected outcomes of regulation, such as regulatory arbitrage or shadow banking growth in response to tighter bank rules.',
    category: 'regulation',
    relatedConcepts: ['cost-benefit-analysis', 'regulatory-arbitrage', 'shadow-banking'],
    lessonId: '4-1.1',
  },

  // ============================================================
  // Lesson 4-1.2: Government Safety Net
  // ============================================================
  {
    id: 'banking-panic',
    term: 'Banking Panic',
    definition:
      'A sudden, widespread fear that banks are insolvent, causing mass withdrawals and potential collapse of the banking system.',
    category: 'risk',
    relatedConcepts: ['bank-run', 'financial-contagion', 'government-safety-net'],
    lessonId: '4-1.2',
  },
  {
    id: 'government-safety-net',
    term: 'Government Safety Net',
    definition:
      'The combination of deposit insurance and lender-of-last-resort facilities designed to prevent bank runs and maintain financial stability.',
    category: 'regulation',
    relatedConcepts: ['deposit-insurance', 'lender-of-last-resort', 'moral-hazard'],
    lessonId: '4-1.2',
  },
  {
    id: 'deposit-insurance',
    term: 'Deposit Insurance',
    definition:
      'Government guarantee that depositors will be repaid up to a specified limit if their bank fails, reducing incentives to run.',
    category: 'regulation',
    relatedConcepts: ['fdic-deposit-insurance', 'government-safety-net', 'ex-ante-run-prevention'],
    lessonId: '4-1.2',
  },
  {
    id: 'lender-of-last-resort',
    term: 'Lender of Last Resort',
    definition:
      'A central bank function providing emergency liquidity to solvent but illiquid banks to prevent panic-driven failures.',
    category: 'regulation',
    relatedConcepts: ['federal-reserve-lolr', 'government-safety-net', 'bank-fragility'],
    lessonId: '4-1.2',
  },
  {
    id: 'bank-fragility',
    term: 'Bank Fragility',
    definition:
      'The inherent vulnerability of banks due to their business model of funding long-term illiquid assets with short-term liquid liabilities.',
    category: 'risk',
    relatedConcepts: ['liquidity-mismatch', 'bank-run', 'lender-of-last-resort'],
    lessonId: '4-1.2',
  },
  {
    id: 'liquidity-mismatch',
    term: 'Liquidity Mismatch',
    definition:
      'The gap between the liquidity of a bank\'s assets (long-term, illiquid loans) and liabilities (short-term, liquid deposits).',
    category: 'risk',
    relatedConcepts: ['bank-fragility', 'fire-sale-prices', 'bank-run'],
    lessonId: '4-1.2',
  },
  {
    id: 'fire-sale-prices',
    term: 'Fire Sale Prices',
    definition:
      'Deeply discounted prices received when assets must be sold quickly under distress, often well below their fundamental value.',
    category: 'risk',
    relatedConcepts: ['liquidity-mismatch', 'bank-run'],
    lessonId: '4-1.2',
  },
  {
    id: 'bank-run',
    term: 'Bank Run',
    definition:
      'A rush of depositors withdrawing funds simultaneously due to fears of bank failure, which can become self-fulfilling.',
    category: 'risk',
    relatedConcepts: ['bank-fragility', 'deposit-insurance', 'financial-contagion'],
    lessonId: '4-1.2',
  },
  {
    id: 'financial-contagion',
    term: 'Financial Contagion',
    definition:
      'The spread of financial distress from one institution to others through direct exposures, common asset holdings, or panic.',
    category: 'risk',
    relatedConcepts: ['bank-run', 'counterparty-risk', 'systemic-failure'],
    lessonId: '4-1.2',
  },
  {
    id: 'information-asymmetry',
    term: 'Information Asymmetry',
    definition:
      'A situation where one party in a transaction has more or better information than the other, making it hard for depositors to assess bank health.',
    category: 'regulation',
    relatedConcepts: ['bank-run', 'disclosure-requirements'],
    lessonId: '4-1.2',
  },
  {
    id: 'counterparty-risk',
    term: 'Counterparty Risk',
    definition:
      'The risk that the other party in a financial transaction will fail to meet its obligations, creating interconnected chains of default.',
    category: 'risk',
    relatedConcepts: ['financial-contagion', 'systemic-risk'],
    lessonId: '4-1.2',
  },
  {
    id: 'fdic-deposit-insurance',
    term: 'FDIC Deposit Insurance',
    definition:
      'The Federal Deposit Insurance Corporation program guaranteeing deposits up to $250,000 per depositor per bank, funded by bank-paid premiums.',
    category: 'institutions',
    relatedConcepts: ['deposit-insurance', 'ex-ante-run-prevention'],
    lessonId: '4-1.2',
  },
  {
    id: 'ex-ante-run-prevention',
    term: 'Ex-Ante Run Prevention',
    definition:
      'The idea that deposit insurance prevents runs before they start by removing the incentive for depositors to withdraw preemptively.',
    category: 'regulation',
    relatedConcepts: ['deposit-insurance', 'fdic-deposit-insurance', 'bank-run'],
    lessonId: '4-1.2',
  },
  {
    id: 'federal-reserve-lolr',
    term: 'Federal Reserve as LOLR',
    definition:
      'The Federal Reserve\'s role as lender of last resort, providing emergency loans through the discount window to solvent but illiquid banks.',
    category: 'institutions',
    relatedConcepts: ['lender-of-last-resort', 'liquidity-facilities'],
    lessonId: '4-1.2',
  },

  // ============================================================
  // Lesson 4-1.3: Crisis Interventions 2007-2009
  // ============================================================
  {
    id: 'ted-spread',
    term: 'TED Spread',
    definition:
      'The difference between 3-month LIBOR and 3-month Treasury bill rates, used as a measure of credit risk and financial stress in the banking system.',
    category: 'risk',
    relatedConcepts: ['liquidity-facilities', 'financial-contagion'],
    lessonId: '4-1.3',
  },
  {
    id: 'liquidity-facilities',
    term: 'Liquidity Facilities',
    definition:
      'Emergency lending programs created by the Federal Reserve during the 2007-2009 crisis to provide liquidity beyond the traditional discount window.',
    category: 'regulation',
    relatedConcepts: ['ted-spread', 'federal-reserve-lolr', 'safety-net-moral-hazard'],
    lessonId: '4-1.3',
  },
  {
    id: 'safety-net-moral-hazard',
    term: 'Safety Net Moral Hazard',
    definition:
      'The risk that government bailouts and safety net expansion encourage banks to take excessive risks, expecting to be rescued in a crisis.',
    category: 'risk',
    relatedConcepts: ['moral-hazard', 'government-safety-net', 'tarp'],
    lessonId: '4-1.3',
  },

  // ============================================================
  // Lesson 4-2: Regulation and Supervision in Practice
  // ============================================================
  {
    id: 'bank-supervision',
    term: 'Bank Supervision',
    definition:
      'The ongoing oversight of banks by regulatory agencies, including monitoring, examination, and enforcement to ensure compliance with regulations.',
    category: 'regulation',
    relatedConcepts: ['bank-regulation', 'bank-examination', 'enforcement-action'],
    lessonId: '4-2',
  },

  // ============================================================
  // Lesson 4-2.1: Bank Regulation Rules
  // ============================================================
  {
    id: 'safety-and-soundness',
    term: 'Safety and Soundness',
    definition:
      'The regulatory objective of ensuring banks operate in a financially healthy manner and do not take excessive risks that could lead to failure.',
    category: 'regulation',
    relatedConcepts: ['capital-requirement', 'bank-supervision'],
    lessonId: '4-2.1',
  },
  {
    id: 'gambling-for-survival',
    term: 'Gambling for Survival',
    definition:
      'A dangerous behavior where financially distressed banks take on extremely high-risk bets in hopes of recovering, knowing they have nothing left to lose.',
    category: 'risk',
    relatedConcepts: ['moral-hazard', 'safety-and-soundness'],
    lessonId: '4-2.1',
  },
  {
    id: 'proprietary-trading',
    term: 'Proprietary Trading',
    definition:
      'Trading financial instruments with a bank\'s own money for profit rather than on behalf of clients, restricted by the Volcker Rule.',
    category: 'regulation',
    relatedConcepts: ['glass-steagall-act', 'gambling-for-survival'],
    lessonId: '4-2.1',
  },
  {
    id: 'leverage-cap',
    term: 'Leverage Cap',
    definition:
      'A regulatory limit on the ratio of a bank\'s total assets to its equity capital, preventing excessive borrowing.',
    category: 'regulation',
    relatedConcepts: ['capital-requirement', 'basel-iii'],
    lessonId: '4-2.1',
  },
  {
    id: 'capital-requirement',
    term: 'Capital Requirement',
    definition:
      'The minimum amount of equity capital a bank must hold as a percentage of its risk-weighted assets to absorb potential losses.',
    category: 'regulation',
    relatedConcepts: ['risk-weighted-assets', 'risk-based-capital-ratio', 'basel-accord'],
    lessonId: '4-2.1',
  },
  {
    id: 'wholesale-funding',
    term: 'Wholesale Funding',
    definition:
      'Short-term borrowing from financial markets and other banks rather than retail deposits, subject to regulatory limits due to its volatility.',
    category: 'regulation',
    relatedConcepts: ['capital-requirement', 'bank-fragility'],
    lessonId: '4-2.1',
  },
  {
    id: 'disclosure-requirements',
    term: 'Disclosure Requirements',
    definition:
      'Regulations requiring banks to publicly report financial information, enabling market discipline and informed decision-making by investors and depositors.',
    category: 'regulation',
    relatedConcepts: ['information-asymmetry', 'safety-and-soundness'],
    lessonId: '4-2.1',
  },
  {
    id: 'occ',
    term: 'OCC (Office of the Comptroller of the Currency)',
    definition:
      'The federal agency that charters and supervises national banks, ensuring they operate safely and soundly.',
    category: 'institutions',
    relatedConcepts: ['bank-supervision', 'safety-and-soundness'],
    lessonId: '4-2.1',
  },
  {
    id: 'basel-accord',
    term: 'Basel Accord',
    definition:
      'An international agreement setting minimum capital standards for banks, developed by the Basel Committee on Banking Supervision to promote global financial stability.',
    category: 'regulation',
    relatedConcepts: ['capital-requirement', 'risk-weighted-assets', 'regulatory-race-to-bottom'],
    lessonId: '4-2.1',
  },
  {
    id: 'regulatory-race-to-bottom',
    term: 'Regulatory Race to the Bottom',
    definition:
      'Competition between jurisdictions to attract banks by lowering regulatory standards, which the Basel Accord aims to prevent.',
    category: 'regulation',
    relatedConcepts: ['basel-accord', 'regulatory-arbitrage'],
    lessonId: '4-2.1',
  },
  {
    id: 'risk-weighted-assets',
    term: 'Risk-Weighted Assets',
    definition:
      'Total assets adjusted by risk weights assigned to each asset class, with riskier assets receiving higher weights in capital calculations.',
    category: 'regulation',
    relatedConcepts: ['capital-requirement', 'risk-based-capital-ratio', 'basel-accord'],
    lessonId: '4-2.1',
  },
  {
    id: 'risk-based-capital-ratio',
    term: 'Risk-Based Capital Ratio',
    definition:
      'Capital divided by risk-weighted assets, the primary measure of whether a bank meets regulatory capital requirements.',
    category: 'regulation',
    relatedConcepts: ['risk-weighted-assets', 'capital-requirement', 'basel-iii'],
    lessonId: '4-2.1',
  },
  {
    id: 'basel-iii',
    term: 'Basel III',
    definition:
      'The third iteration of the Basel Accord, strengthening capital requirements with higher quality capital, a leverage ratio, and liquidity standards after the 2008 crisis.',
    category: 'regulation',
    relatedConcepts: ['basel-accord', 'loss-bearing-capacity', 'leverage-cap'],
    lessonId: '4-2.1',
  },
  {
    id: 'loss-bearing-capacity',
    term: 'Loss-Bearing Capacity',
    definition:
      'The total amount of losses a bank can absorb before becoming insolvent, determined by its capital levels and asset quality.',
    category: 'regulation',
    relatedConcepts: ['capital-requirement', 'basel-iii'],
    lessonId: '4-2.1',
  },
  {
    id: 'glass-steagall-act',
    term: 'Glass-Steagall Act',
    definition:
      'The 1933 law that separated commercial banking from investment banking, repealed in 1999 by the Gramm-Leach-Bliley Act.',
    category: 'regulation',
    relatedConcepts: ['proprietary-trading', 'regulatory-arbitrage'],
    lessonId: '4-2.1',
  },

  // ============================================================
  // Lesson 4-2.2: Supervisory Process
  // ============================================================
  {
    id: 'enforcement-action',
    term: 'Enforcement Action',
    definition:
      'Formal regulatory measures taken against banks that violate laws or operate unsafely, ranging from cease-and-desist orders to charter revocation.',
    category: 'regulation',
    relatedConcepts: ['bank-supervision', 'bank-examination'],
    lessonId: '4-2.2',
  },
  {
    id: 'bank-examination',
    term: 'Bank Examination',
    definition:
      'On-site inspections conducted by regulatory agencies to assess a bank\'s financial condition, risk management, and compliance with regulations.',
    category: 'regulation',
    relatedConcepts: ['camels-score', 'onsite-examination', 'quarterly-financial-reports'],
    lessonId: '4-2.2',
  },
  {
    id: 'quarterly-financial-reports',
    term: 'Quarterly Financial Reports',
    definition:
      'Periodic financial statements (Call Reports) that banks must file with regulators, providing off-site surveillance data between examinations.',
    category: 'regulation',
    relatedConcepts: ['bank-examination', 'disclosure-requirements'],
    lessonId: '4-2.2',
  },
  {
    id: 'onsite-examination',
    term: 'On-Site Examination',
    definition:
      'Physical inspection of a bank by regulatory examiners who review loan files, interview management, and assess internal controls firsthand.',
    category: 'regulation',
    relatedConcepts: ['bank-examination', 'camels-score'],
    lessonId: '4-2.2',
  },
  {
    id: 'camels-score',
    term: 'CAMELS Score',
    definition:
      'A supervisory rating system assessing banks on six components: Capital adequacy, Asset quality, Management, Earnings, Liquidity, and Sensitivity to market risk.',
    category: 'regulation',
    relatedConcepts: [
      'capital-adequacy-camels',
      'asset-quality',
      'management-quality',
      'earnings-camels',
      'liquidity-camels',
      'sensitivity-market-risk',
    ],
    lessonId: '4-2.2',
  },
  {
    id: 'capital-adequacy-camels',
    term: 'Capital Adequacy (CAMELS)',
    definition:
      'The C in CAMELS: assessing whether a bank holds enough capital to absorb potential losses and support ongoing operations.',
    category: 'regulation',
    relatedConcepts: ['camels-score', 'capital-requirement'],
    lessonId: '4-2.2',
  },
  {
    id: 'asset-quality',
    term: 'Asset Quality',
    definition:
      'The A in CAMELS: evaluating the credit quality of a bank\'s loan portfolio and investment holdings, including non-performing loan levels.',
    category: 'regulation',
    relatedConcepts: ['camels-score'],
    lessonId: '4-2.2',
  },
  {
    id: 'management-quality',
    term: 'Management Quality',
    definition:
      'The M in CAMELS: assessing the competence, integrity, and effectiveness of bank leadership and governance.',
    category: 'regulation',
    relatedConcepts: ['camels-score', 'risk-management'],
    lessonId: '4-2.2',
  },
  {
    id: 'earnings-camels',
    term: 'Earnings (CAMELS)',
    definition:
      'The E in CAMELS: evaluating the sustainability and quality of a bank\'s earnings, including trends, composition, and adequacy to support growth.',
    category: 'regulation',
    relatedConcepts: ['camels-score'],
    lessonId: '4-2.2',
  },
  {
    id: 'liquidity-camels',
    term: 'Liquidity (CAMELS)',
    definition:
      'The L in CAMELS: assessing whether a bank has adequate liquid assets and funding sources to meet its obligations without distress.',
    category: 'regulation',
    relatedConcepts: ['camels-score'],
    lessonId: '4-2.2',
  },
  {
    id: 'sensitivity-market-risk',
    term: 'Sensitivity to Market Risk',
    definition:
      'The S in CAMELS: evaluating how changes in interest rates, exchange rates, and asset prices could affect a bank\'s earnings and capital.',
    category: 'regulation',
    relatedConcepts: ['camels-score'],
    lessonId: '4-2.2',
  },
  {
    id: 'problem-bank-list',
    term: 'Problem Bank List',
    definition:
      'A confidential list maintained by the FDIC of banks with CAMELS ratings of 4 or 5, indicating significant financial or operational weaknesses.',
    category: 'regulation',
    relatedConcepts: ['camels-score', 'enforcement-action'],
    lessonId: '4-2.2',
  },
  {
    id: 'risk-management',
    term: 'Risk Management',
    definition:
      'The process of identifying, assessing, and controlling threats to a bank\'s capital and earnings, a key component of supervisory evaluation.',
    category: 'risk',
    relatedConcepts: ['management-quality', 'camels-score'],
    lessonId: '4-2.2',
  },

  // ============================================================
  // Lesson 4-2.3: Stress Testing
  // ============================================================
  {
    id: 'stress-testing',
    term: 'Stress Testing',
    definition:
      'A regulatory exercise that simulates severe economic scenarios to determine whether banks have enough capital to survive adverse conditions.',
    category: 'regulation',
    relatedConcepts: ['scap', 'ccar', 'stressed-capital-ratio'],
    lessonId: '4-2.3',
  },
  {
    id: 'scap',
    term: 'SCAP (Supervisory Capital Assessment Program)',
    definition:
      'The first US bank stress test in 2009, which assessed the 19 largest bank holding companies and restored market confidence during the financial crisis.',
    category: 'regulation',
    relatedConcepts: ['stress-testing', 'ccar'],
    lessonId: '4-2.3',
  },
  {
    id: 'ccar',
    term: 'CCAR (Comprehensive Capital Analysis and Review)',
    definition:
      'The Federal Reserve\'s annual stress testing framework that evaluates large banks\' capital adequacy and capital distribution plans under stress scenarios.',
    category: 'regulation',
    relatedConcepts: ['stress-testing', 'scap', 'capital-plan'],
    lessonId: '4-2.3',
  },
  {
    id: 'capital-plan',
    term: 'Capital Plan',
    definition:
      'A bank\'s strategy for maintaining adequate capital, including planned dividends, share buybacks, and actions to be taken under stress conditions.',
    category: 'regulation',
    relatedConcepts: ['ccar', 'stressed-capital-ratio'],
    lessonId: '4-2.3',
  },
  {
    id: 'stressed-capital-ratio',
    term: 'Stressed Capital Ratio',
    definition:
      'The projected capital ratio of a bank under an adverse stress scenario, which must remain above regulatory minimums to pass the stress test.',
    category: 'regulation',
    relatedConcepts: ['stress-testing', 'capital-plan', 'capital-requirement'],
    lessonId: '4-2.3',
  },

  // ============================================================
  // Lesson 4-3.1: Too Big to Fail
  // ============================================================
  {
    id: 'too-big-to-fail',
    term: 'Too Big to Fail',
    definition:
      'The concept that certain financial institutions are so large and interconnected that their failure would cause catastrophic damage to the broader economy, necessitating government intervention.',
    category: 'regulation',
    relatedConcepts: ['bank-concentration', 'systemic-risk', 'implicit-government-guarantee'],
    lessonId: '4-3.1',
  },
  {
    id: 'bank-concentration',
    term: 'Bank Concentration',
    definition:
      'The degree to which banking assets are held by a small number of very large institutions, which has increased significantly since the 1990s.',
    category: 'regulation',
    relatedConcepts: ['too-big-to-fail', 'economies-of-scale', 'economies-of-scope'],
    lessonId: '4-3.1',
  },
  {
    id: 'economies-of-scale',
    term: 'Economies of Scale',
    definition:
      'Cost advantages that large banks achieve due to their size, such as lower per-unit costs for technology, compliance, and operations.',
    category: 'financial-system',
    relatedConcepts: ['bank-concentration', 'economies-of-scope'],
    lessonId: '4-3.1',
  },
  {
    id: 'economies-of-scope',
    term: 'Economies of Scope',
    definition:
      'Cost advantages gained when a bank offers multiple products and services, sharing infrastructure across business lines.',
    category: 'financial-system',
    relatedConcepts: ['bank-concentration', 'economies-of-scale'],
    lessonId: '4-3.1',
  },
  {
    id: 'implicit-government-guarantee',
    term: 'Implicit Government Guarantee',
    definition:
      'The unspoken expectation that the government will bail out a too-big-to-fail institution, giving it a funding advantage and encouraging excessive risk-taking.',
    category: 'regulation',
    relatedConcepts: ['too-big-to-fail', 'moral-hazard', 'systemic-risk-surcharge'],
    lessonId: '4-3.1',
  },
  {
    id: 'systemic-risk',
    term: 'Systemic Risk',
    definition:
      'The risk that the failure of one financial institution or market could trigger a cascading collapse across the entire financial system.',
    category: 'risk',
    relatedConcepts: ['too-big-to-fail', 'fsoc', 'macroprudential-regulation'],
    lessonId: '4-3.1',
  },
  {
    id: 'fsoc',
    term: 'FSOC (Financial Stability Oversight Council)',
    definition:
      'A US government body created by the Dodd-Frank Act to identify and respond to threats to financial stability, with authority to designate systemically important institutions.',
    category: 'institutions',
    relatedConcepts: ['sifi', 'systemic-risk', 'too-big-to-fail'],
    lessonId: '4-3.1',
  },
  {
    id: 'sifi',
    term: 'SIFI (Systemically Important Financial Institution)',
    definition:
      'A financial institution designated by FSOC as posing a risk to financial stability, subject to enhanced supervision and stricter capital requirements.',
    category: 'regulation',
    relatedConcepts: ['fsoc', 'g-sib', 'systemic-risk'],
    lessonId: '4-3.1',
  },
  {
    id: 'g-sib',
    term: 'G-SIB (Global Systemically Important Bank)',
    definition:
      'An internationally active bank identified as systemically important by the Financial Stability Board, subject to additional capital surcharges based on its systemic footprint.',
    category: 'regulation',
    relatedConcepts: ['sifi', 'systemic-risk-surcharge', 'too-big-to-fail'],
    lessonId: '4-3.1',
  },
  {
    id: 'systemic-risk-surcharge',
    term: 'Systemic Risk Surcharge',
    definition:
      'An additional capital requirement imposed on G-SIBs above standard minimums, ranging from 1% to 3.5% of risk-weighted assets based on the bank\'s systemic importance.',
    category: 'regulation',
    relatedConcepts: ['g-sib', 'capital-requirement', 'implicit-government-guarantee'],
    lessonId: '4-3.1',
  },

  // ============================================================
  // Lesson 4-3.2: Shadow Banking
  // ============================================================
  {
    id: 'shadow-banking',
    term: 'Shadow Banking',
    definition:
      'Financial intermediation conducted outside the regulated banking system, performing bank-like functions such as credit transformation and maturity transformation without access to the government safety net.',
    category: 'financial-system',
    relatedConcepts: ['regulatory-arbitrage', 'commercial-bank-definition', 'repurchase-agreement'],
    lessonId: '4-3.2',
  },
  {
    id: 'commercial-bank-definition',
    term: 'Commercial Bank (Regulatory Definition)',
    definition:
      'An institution that accepts deposits and makes loans, subject to comprehensive regulation including capital requirements, deposit insurance, and examinations.',
    category: 'institutions',
    relatedConcepts: ['shadow-banking', 'bank-regulation'],
    lessonId: '4-3.2',
  },
  {
    id: 'mbs',
    term: 'MBS (Mortgage-Backed Securities)',
    definition:
      'Securities created by pooling mortgage loans and selling claims on the cash flows to investors, a key product of shadow banking that contributed to the 2008 crisis.',
    category: 'financial-system',
    relatedConcepts: ['shadow-banking', 'repurchase-agreement'],
    lessonId: '4-3.2',
  },
  {
    id: 'repurchase-agreement',
    term: 'Repurchase Agreement (Repo)',
    definition:
      'A short-term borrowing arrangement where securities are sold with an agreement to repurchase them at a slightly higher price, functioning as collateralized lending in shadow banking.',
    category: 'financial-system',
    relatedConcepts: ['shadow-banking', 'money-market-mutual-fund', 'mbs'],
    lessonId: '4-3.2',
  },
  {
    id: 'money-market-mutual-fund',
    term: 'Money Market Mutual Fund',
    definition:
      'An investment fund that holds short-term, high-quality debt instruments and offers deposit-like features, operating in the shadow banking system without deposit insurance.',
    category: 'financial-system',
    relatedConcepts: ['shadow-banking', 'repurchase-agreement', 'floating-nav'],
    lessonId: '4-3.2',
  },
  {
    id: 'regulatory-arbitrage',
    term: 'Regulatory Arbitrage',
    definition:
      'The practice of structuring financial activities to circumvent regulatory requirements, often by moving activities to less regulated shadow banking entities.',
    category: 'regulation',
    relatedConcepts: ['shadow-banking', 'unintended-consequences', 'regulatory-race-to-bottom'],
    lessonId: '4-3.2',
  },
  {
    id: 'limited-regulatory-authority',
    term: 'Limited Regulatory Authority',
    definition:
      'The jurisdictional gap where shadow banking activities fall outside the authority of traditional bank regulators, limiting oversight and consumer protection.',
    category: 'regulation',
    relatedConcepts: ['shadow-banking', 'regulatory-arbitrage'],
    lessonId: '4-3.2',
  },

  // ============================================================
  // Lesson 4-3.3: Money Market Funds
  // ============================================================
  {
    id: 'industry-run',
    term: 'Industry Run',
    definition:
      'A mass withdrawal from money market funds across the entire industry, as occurred in September 2008 after the Reserve Primary Fund broke the buck.',
    category: 'risk',
    relatedConcepts: ['money-market-mutual-fund', 'floating-nav', 'preemptive-run-incentive'],
    lessonId: '4-3.3',
  },
  {
    id: 'floating-nav',
    term: 'Floating NAV',
    definition:
      'A post-crisis reform requiring certain money market funds to price shares at actual market value rather than a fixed $1, making losses visible to investors.',
    category: 'regulation',
    relatedConcepts: ['money-market-mutual-fund', 'liquidity-fees', 'redemption-gates'],
    lessonId: '4-3.3',
  },
  {
    id: 'liquidity-fees',
    term: 'Liquidity Fees',
    definition:
      'Charges imposed on money market fund redemptions when a fund\'s liquid assets fall below a threshold, designed to discourage runs.',
    category: 'regulation',
    relatedConcepts: ['floating-nav', 'redemption-gates', 'preemptive-run-incentive'],
    lessonId: '4-3.3',
  },
  {
    id: 'redemption-gates',
    term: 'Redemption Gates',
    definition:
      'Temporary restrictions on investor withdrawals from money market funds during periods of stress, intended to halt panic but potentially accelerating it.',
    category: 'regulation',
    relatedConcepts: ['liquidity-fees', 'floating-nav', 'preemptive-run-incentive'],
    lessonId: '4-3.3',
  },
  {
    id: 'preemptive-run-incentive',
    term: 'Preemptive Run Incentive',
    definition:
      'The paradox that gates and fees can actually encourage runs, as investors rush to withdraw before restrictions are imposed.',
    category: 'risk',
    relatedConcepts: ['redemption-gates', 'liquidity-fees', 'industry-run'],
    lessonId: '4-3.3',
  },
];
