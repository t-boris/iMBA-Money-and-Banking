import { Concept } from '@/types';

export const module3Concepts: Concept[] = [
  // Lesson 3-0: Overview (Risk-Return Tradeoff intro)
  {
    id: 'risk-return-tradeoff',
    term: 'Risk-Return Tradeoff',
    definition: 'The principle that higher potential returns come with higher risk.',
    category: 'risk',
    relatedConcepts: ['risk-adjusted-return'],
    lessonId: '3-0',
  },
  {
    id: 'risk-adjusted-return',
    term: 'Risk-Adjusted Return',
    definition: 'A measure of return that accounts for the level of risk taken to achieve it.',
    category: 'risk',
    relatedConcepts: ['risk-return-tradeoff', 'roe'],
    lessonId: '3-0',
  },
  {
    id: 'bank-profit-sources',
    term: 'Bank Profit Sources',
    definition:
      'The main ways banks earn money: net interest income, fee income, and trading profits.',
    category: 'money',
    relatedConcepts: ['net-interest-income', 'fee-income'],
    lessonId: '3-0',
  },

  // Lesson 3-1.1: Bank Equity Capital
  {
    id: 'bank-equity',
    term: 'Bank Equity',
    definition:
      'The ownership stake in a bank, representing the residual claim after all liabilities are paid.',
    category: 'capital',
    relatedConcepts: ['shareholders', 'residual-claim', 'first-loss-piece'],
    lessonId: '3-1.1',
  },
  {
    id: 'shareholders',
    term: 'Shareholders',
    definition: 'The owners of a bank who hold equity shares and bear the ultimate risk of loss.',
    category: 'capital',
    relatedConcepts: ['bank-equity', 'residual-claim'],
    lessonId: '3-1.1',
  },
  {
    id: 'residual-claim',
    term: 'Residual Claim',
    definition:
      'The right of equity holders to receive whatever is left after all other claims are paid.',
    category: 'capital',
    relatedConcepts: ['bank-equity', 'first-loss-piece', 'senior-debt'],
    lessonId: '3-1.1',
  },
  {
    id: 'first-loss-piece',
    term: 'First Loss Piece',
    definition:
      'The portion of capital that absorbs losses first, protecting depositors and creditors.',
    category: 'capital',
    relatedConcepts: ['bank-equity', 'residual-claim'],
    lessonId: '3-1.1',
  },
  {
    id: 'retained-earnings',
    term: 'Retained Earnings',
    definition:
      'Profits that are kept in the bank rather than paid out as dividends, building capital over time.',
    category: 'capital',
    relatedConcepts: ['bank-equity'],
    lessonId: '3-1.1',
  },
  {
    id: 'preferred-stock',
    term: 'Preferred Stock',
    definition:
      'A hybrid security with features of both debt and equity, paying fixed dividends before common shareholders.',
    category: 'capital',
    relatedConcepts: ['bank-equity', 'shareholders'],
    lessonId: '3-1.1',
  },
  {
    id: 'capital-requirements',
    term: 'Capital Requirements',
    definition:
      'Regulatory rules specifying the minimum amount of equity a bank must hold relative to its risk.',
    category: 'capital',
    relatedConcepts: ['bank-equity', 'leverage'],
    lessonId: '3-1.1',
  },

  // Lesson 3-1.2: Measuring Bank Performance
  {
    id: 'stock-returns',
    term: 'Stock Returns',
    definition:
      'The gain or loss on a bank stock investment, including dividends and price appreciation.',
    category: 'capital',
    relatedConcepts: ['roe', 'shareholders'],
    lessonId: '3-1.2',
  },
  {
    id: 'roa',
    term: 'ROA (Return on Assets)',
    definition:
      'Net income divided by total assets, measuring how efficiently a bank uses its assets to generate profit.',
    category: 'capital',
    relatedConcepts: ['roe', 'leverage'],
    lessonId: '3-1.2',
  },
  {
    id: 'roe',
    term: 'ROE (Return on Equity)',
    definition:
      'Net income divided by equity, measuring the return earned on shareholder investment.',
    category: 'capital',
    relatedConcepts: ['roa', 'leverage', 'bank-equity'],
    lessonId: '3-1.2',
  },
  {
    id: 'leverage',
    term: 'Leverage',
    definition:
      'The ratio of assets to equity, showing how much a bank has borrowed relative to its capital.',
    category: 'capital',
    relatedConcepts: ['roa', 'roe', 'capital-requirements'],
    lessonId: '3-1.2',
  },
  {
    id: 'loan-loss-reserves',
    term: 'Loan Loss Reserves',
    definition: 'Funds set aside to cover expected losses from loans that may not be repaid.',
    category: 'capital',
    relatedConcepts: ['credit-risk', 'non-performing-loan'],
    lessonId: '3-1.2',
  },
  {
    id: 'net-interest-margin',
    term: 'Net Interest Margin',
    definition:
      'Net interest income divided by average earning assets, measuring the spread earned on lending.',
    category: 'money',
    relatedConcepts: ['roa', 'interest-rate-risk'],
    lessonId: '3-1.2',
  },

  // Lesson 3-2.1: Overview of Risk
  {
    id: 'risk',
    term: 'Risk',
    definition: 'The possibility of loss or adverse outcomes from uncertain future events.',
    category: 'risk',
    relatedConcepts: ['risk-measurement', 'risk-management'],
    lessonId: '3-2.1',
  },
  {
    id: 'risk-measurement',
    term: 'Risk Measurement',
    definition: 'Quantifying the likelihood and potential magnitude of adverse outcomes.',
    category: 'risk',
    relatedConcepts: ['risk', 'value-at-risk'],
    lessonId: '3-2.1',
  },
  {
    id: 'risk-management',
    term: 'Risk Management',
    definition:
      "The process of identifying, assessing, and controlling threats to a bank's capital and earnings.",
    category: 'risk',
    relatedConcepts: ['risk', 'hedging'],
    lessonId: '3-2.1',
  },
  {
    id: 'insolvency',
    term: 'Insolvency',
    definition:
      'A state where liabilities exceed assets, meaning the bank cannot pay all its debts.',
    category: 'risk',
    relatedConcepts: ['bank-equity', 'first-loss-piece'],
    lessonId: '3-2.1',
  },
  {
    id: 'hedging',
    term: 'Hedging',
    definition: 'Taking offsetting positions to reduce exposure to specific risks.',
    category: 'risk',
    relatedConcepts: ['risk-management', 'interest-rate-swap'],
    lessonId: '3-2.1',
  },

  // Lesson 3-2.2: Credit Risk
  {
    id: 'credit-risk',
    term: 'Credit Risk',
    definition:
      'The risk that a borrower will fail to repay a loan or meet contractual obligations.',
    category: 'risk',
    relatedConcepts: ['default', 'probability-of-default'],
    lessonId: '3-2.2',
  },
  {
    id: 'default',
    term: 'Default',
    definition: 'Failure to make required payments on a debt obligation.',
    category: 'risk',
    relatedConcepts: ['credit-risk', 'probability-of-default', 'recovery-rate'],
    lessonId: '3-2.2',
  },
  {
    id: 'probability-of-default',
    term: 'Probability of Default',
    definition: 'The likelihood that a borrower will fail to repay within a specified time period.',
    category: 'risk',
    relatedConcepts: ['default', 'credit-rating', 'fico-score'],
    lessonId: '3-2.2',
  },
  {
    id: 'credit-rating',
    term: 'Credit Rating',
    definition: "An assessment of creditworthiness by agencies like Moody's, S&P, and Fitch.",
    category: 'risk',
    relatedConcepts: ['probability-of-default', 'fico-score'],
    lessonId: '3-2.2',
  },
  {
    id: 'fico-score',
    term: 'FICO Score',
    definition:
      'A consumer credit score ranging from 300-850 that predicts the likelihood of repayment.',
    category: 'risk',
    relatedConcepts: ['credit-rating', 'probability-of-default'],
    lessonId: '3-2.2',
  },
  {
    id: 'non-performing-loan',
    term: 'Non-Performing Loan',
    definition: 'A loan where the borrower has stopped making payments for 90+ days.',
    category: 'risk',
    relatedConcepts: ['default', 'loan-loss-reserves'],
    lessonId: '3-2.2',
  },
  {
    id: 'loan-commitments',
    term: 'Loan Commitments',
    definition:
      'Promises to lend up to a specified amount, creating credit risk exposure before funds are disbursed.',
    category: 'risk',
    relatedConcepts: ['credit-risk'],
    lessonId: '3-2.2',
  },
  {
    id: 'covenants',
    term: 'Covenants',
    definition: 'Contractual restrictions on borrower behavior designed to reduce credit risk.',
    category: 'risk',
    relatedConcepts: ['credit-risk', 'secured-loan'],
    lessonId: '3-2.2',
  },
  {
    id: 'recovery-rate',
    term: 'Recovery Rate',
    definition: "The percentage of a loan's value recovered after a borrower defaults.",
    category: 'risk',
    relatedConcepts: ['default', 'secured-loan'],
    lessonId: '3-2.2',
  },
  {
    id: 'secured-loan',
    term: 'Secured Loan',
    definition: 'A loan backed by collateral that the lender can seize if the borrower defaults.',
    category: 'risk',
    relatedConcepts: ['recovery-rate', 'covenants'],
    lessonId: '3-2.2',
  },
  {
    id: 'senior-debt',
    term: 'Senior Debt',
    definition:
      'Debt that has priority over other obligations in bankruptcy, increasing recovery rates.',
    category: 'risk',
    relatedConcepts: ['recovery-rate', 'residual-claim'],
    lessonId: '3-2.2',
  },
  {
    id: 'credit-default-swap',
    term: 'Credit Default Swap (CDS)',
    definition:
      'A derivative that transfers credit risk from one party to another in exchange for periodic payments.',
    category: 'risk',
    relatedConcepts: ['credit-risk', 'hedging'],
    lessonId: '3-2.2',
  },
  {
    id: 'diversification',
    term: 'Diversification',
    definition:
      'Spreading investments across many borrowers or assets to reduce the impact of any single default.',
    category: 'risk',
    relatedConcepts: ['credit-risk', 'risk-management'],
    lessonId: '3-2.2',
  },

  // Lesson 3-2.3: Interest Rate Risk
  {
    id: 'interest-rate-risk',
    term: 'Interest Rate Risk',
    definition:
      'The risk that changes in interest rates will reduce the value of assets or income.',
    category: 'risk',
    relatedConcepts: ['maturity-mismatch', 'duration'],
    lessonId: '3-2.3',
  },
  {
    id: 'maturity-mismatch',
    term: 'Maturity Mismatch',
    definition:
      'The gap between short-term funding and long-term lending that exposes banks to rate changes.',
    category: 'risk',
    relatedConcepts: ['interest-rate-risk', 'refinancing-risk'],
    lessonId: '3-2.3',
  },
  {
    id: 'refinancing-risk',
    term: 'Refinancing Risk',
    definition: 'The risk that a bank cannot roll over maturing liabilities at favorable rates.',
    category: 'risk',
    relatedConcepts: ['maturity-mismatch', 'interest-rate-risk'],
    lessonId: '3-2.3',
  },
  {
    id: 'fixed-rate-loan',
    term: 'Fixed Rate Loan',
    definition: 'A loan with an interest rate that remains constant throughout its term.',
    category: 'money',
    relatedConcepts: ['variable-rate-loan', 'interest-rate-risk'],
    lessonId: '3-2.3',
  },
  {
    id: 'variable-rate-loan',
    term: 'Variable Rate Loan',
    definition: 'A loan with an interest rate that adjusts periodically based on market rates.',
    category: 'money',
    relatedConcepts: ['fixed-rate-loan', 'interest-rate-risk'],
    lessonId: '3-2.3',
  },
  {
    id: 'duration',
    term: 'Duration',
    definition:
      "A measure of how sensitive a bond or loan's price is to changes in interest rates.",
    category: 'risk',
    relatedConcepts: ['interest-rate-risk', 'maturity-mismatch'],
    lessonId: '3-2.3',
  },
  {
    id: 'interest-rate-swap',
    term: 'Interest Rate Swap',
    definition:
      'A derivative where two parties exchange fixed and floating interest payments to manage rate exposure.',
    category: 'risk',
    relatedConcepts: ['hedging', 'interest-rate-risk'],
    lessonId: '3-2.3',
  },
  {
    id: 'noninterest-income',
    term: 'Noninterest Income',
    definition: 'Revenue from fees and services that is not affected by interest rate changes.',
    category: 'money',
    relatedConcepts: ['interest-rate-risk', 'fee-income'],
    lessonId: '3-2.3',
  },

  // Lesson 3-2.4: Liquidity Risk
  {
    id: 'liquidity-risk',
    term: 'Liquidity Risk',
    definition:
      'The risk that a bank cannot meet its payment obligations without incurring unacceptable losses.',
    category: 'risk',
    relatedConcepts: ['cash-shortfall', 'bank-run'],
    lessonId: '3-2.4',
  },
  {
    id: 'cash-shortfall',
    term: 'Cash Shortfall',
    definition:
      'A situation where a bank does not have enough liquid assets to meet immediate demands.',
    category: 'risk',
    relatedConcepts: ['liquidity-risk', 'fire-sale'],
    lessonId: '3-2.4',
  },
  {
    id: 'asset-management',
    term: 'Asset Management',
    definition: 'Holding liquid assets like cash and securities to meet unexpected withdrawals.',
    category: 'risk',
    relatedConcepts: ['liquidity-risk', 'liability-management'],
    lessonId: '3-2.4',
  },
  {
    id: 'liability-management',
    term: 'Liability Management',
    definition: 'Acquiring funds quickly from money markets when cash is needed.',
    category: 'risk',
    relatedConcepts: ['asset-management', 'wholesale-funding'],
    lessonId: '3-2.4',
  },
  {
    id: 'wholesale-funding',
    term: 'Wholesale Funding',
    definition:
      'Short-term borrowing from other financial institutions rather than retail deposits.',
    category: 'risk',
    relatedConcepts: ['liability-management', 'rollover-risk'],
    lessonId: '3-2.4',
  },
  {
    id: 'rollover-risk',
    term: 'Rollover Risk',
    definition: 'The risk that short-term funding cannot be renewed when it matures.',
    category: 'risk',
    relatedConcepts: ['wholesale-funding', 'liquidity-risk'],
    lessonId: '3-2.4',
  },
  {
    id: 'bank-run',
    term: 'Bank Run',
    definition:
      'A rush of depositors withdrawing funds simultaneously due to fears of bank failure.',
    category: 'risk',
    relatedConcepts: ['liquidity-risk', 'fire-sale'],
    lessonId: '3-2.4',
  },
  {
    id: 'fire-sale',
    term: 'Fire Sale',
    definition: 'Selling assets quickly at steep discounts to raise cash in a crisis.',
    category: 'risk',
    relatedConcepts: ['bank-run', 'liquidity-risk'],
    lessonId: '3-2.4',
  },

  // Lesson 3-2.5: Market Risk
  {
    id: 'market-risk',
    term: 'Market Risk',
    definition:
      'The risk of losses from changes in market prices of securities in the trading book.',
    category: 'risk',
    relatedConcepts: ['trading-book', 'value-at-risk'],
    lessonId: '3-2.5',
  },
  {
    id: 'trading-book',
    term: 'Trading Book',
    definition:
      'Securities held for short-term trading, subject to daily mark-to-market valuation.',
    category: 'risk',
    relatedConcepts: ['market-risk', 'bank-book', 'mark-to-market'],
    lessonId: '3-2.5',
  },
  {
    id: 'bank-book',
    term: 'Bank Book',
    definition:
      'Loans and securities held to maturity, valued at historical cost rather than market price.',
    category: 'risk',
    relatedConcepts: ['trading-book'],
    lessonId: '3-2.5',
  },
  {
    id: 'mark-to-market',
    term: 'Mark-to-Market',
    definition:
      'Revaluing assets at current market prices, recognizing gains and losses immediately.',
    category: 'risk',
    relatedConcepts: ['trading-book', 'market-risk'],
    lessonId: '3-2.5',
  },
  {
    id: 'value-at-risk',
    term: 'Value at Risk (VaR)',
    definition:
      'A statistical measure of the maximum expected loss over a given time period at a confidence level.',
    category: 'risk',
    relatedConcepts: ['market-risk', 'risk-measurement', 'fat-tails'],
    lessonId: '3-2.5',
  },
  {
    id: 'fat-tails',
    term: 'Fat Tails',
    definition:
      'The tendency for extreme events to occur more frequently than normal distributions predict.',
    category: 'risk',
    relatedConcepts: ['value-at-risk', 'black-swan'],
    lessonId: '3-2.5',
  },
  {
    id: 'black-swan',
    term: 'Black Swan',
    definition: 'An extremely rare and unpredictable event with severe consequences.',
    category: 'risk',
    relatedConcepts: ['fat-tails', 'market-risk'],
    lessonId: '3-2.5',
  },

  // Lesson 3-2.6: Operational Risk
  {
    id: 'operational-risk',
    term: 'Operational Risk',
    definition:
      'The risk of loss from failed internal processes, people, systems, or external events.',
    category: 'risk',
    relatedConcepts: ['operational-failure', 'employee-fraud'],
    lessonId: '3-2.6',
  },
  {
    id: 'operational-failure',
    term: 'Operational Failure',
    definition: 'Breakdowns in internal controls, technology, or processes that lead to losses.',
    category: 'risk',
    relatedConcepts: ['operational-risk', 'cyber-risk'],
    lessonId: '3-2.6',
  },
  {
    id: 'employee-fraud',
    term: 'Employee Fraud',
    definition: 'Intentional deception by bank employees for personal gain.',
    category: 'risk',
    relatedConcepts: ['operational-risk'],
    lessonId: '3-2.6',
  },
  {
    id: 'compliance-fines',
    term: 'Compliance Fines',
    definition: 'Penalties imposed by regulators for violations of laws and regulations.',
    category: 'risk',
    relatedConcepts: ['operational-risk'],
    lessonId: '3-2.6',
  },
  {
    id: 'fintech-risk',
    term: 'Fintech Risk',
    definition:
      'Risks arising from new financial technology, including disruption and cyber threats.',
    category: 'risk',
    relatedConcepts: ['operational-risk', 'cyber-risk'],
    lessonId: '3-2.6',
  },
  {
    id: 'cyber-risk',
    term: 'Cyber Risk',
    definition:
      'The risk of financial loss from cyberattacks, data breaches, or IT system failures.',
    category: 'risk',
    relatedConcepts: ['operational-risk', 'fintech-risk', 'operational-failure'],
    lessonId: '3-2.6',
  },
];
