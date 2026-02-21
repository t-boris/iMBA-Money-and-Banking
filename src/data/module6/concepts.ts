import { Concept } from '@/types';

export const module6Concepts: Concept[] = [
  // === Lesson 6-0: Overview ===
  {
    id: '6-central-bank',
    term: 'Central Bank',
    definition:
      'A public institution that manages a nation\'s currency, money supply, and interest rates. The Swedish Riksbank (1668) was the first; the U.S. Federal Reserve was established in 1913.',
    category: 'institutions',
    relatedConcepts: ['6-federal-reserve-act', '6-dual-mandate'],
    lessonId: '6-0',
  },
  {
    id: '6-dual-mandate',
    term: 'Dual Mandate',
    definition:
      'The Fed\'s two statutory goals: maximum employment and stable prices (targeting ~2% inflation as measured by PCE). Every policy tool connects back to these two objectives.',
    category: 'regulation',
    relatedConcepts: ['6-maximum-employment', '6-stable-prices'],
    lessonId: '6-0',
  },
  {
    id: '6-maximum-employment',
    term: 'Maximum Employment',
    definition:
      'The highest level of employment the economy can sustain without generating excessive inflation. One half of the Fed\'s Dual Mandate.',
    category: 'economy',
    relatedConcepts: ['6-dual-mandate', '6-stable-prices'],
    lessonId: '6-0',
  },
  {
    id: '6-stable-prices',
    term: 'Stable Prices',
    definition:
      'Low and predictable inflation, targeted at ~2% per year (PCE measure). The second half of the Fed\'s Dual Mandate.',
    category: 'economy',
    relatedConcepts: ['6-dual-mandate', '6-maximum-employment'],
    lessonId: '6-0',
  },
  {
    id: '6-money-supply',
    term: 'Money Supply',
    definition:
      'The total amount of money circulating in the economy, measured by aggregates like M1 (currency + demand deposits) and M2 (M1 + savings + small time deposits).',
    category: 'money',
    relatedConcepts: ['6-m1', '6-m2', '6-monetary-base'],
    lessonId: '6-0',
  },
  {
    id: '6-interest-rate-price-of-money',
    term: 'Interest Rate (Price of Money)',
    definition:
      'The cost of borrowing money, or equivalently, the return on lending it. The Fed influences the economy primarily by steering short-term interest rates.',
    category: 'financial-system',
    relatedConcepts: ['6-federal-funds-rate', '6-open-market-operations'],
    lessonId: '6-0',
  },
  {
    id: '6-federal-funds-rate',
    term: 'Federal Funds Rate',
    definition:
      'The interest rate at which depository institutions lend reserve balances to each other overnight. The FOMC sets a target range (e.g., 5.25%–5.50%) and uses tools to keep the effective rate within it.',
    category: 'institutions',
    relatedConcepts: ['6-open-market-operations', '6-iorb', '6-on-rrp'],
    lessonId: '6-0',
  },

  // === Lesson 6-1.1: History and Structure ===
  {
    id: '6-riksbank',
    term: 'Sveriges Riksbank',
    definition:
      'The world\'s first central bank, founded in 1668 in Sweden after the Stockholms Banco over-issued notes and collapsed. Established government control over the money supply.',
    category: 'institutions',
    relatedConcepts: ['6-central-bank', '6-redeemable-on-demand'],
    lessonId: '6-1.1',
  },
  {
    id: '6-redeemable-on-demand',
    term: 'Redeemable on Demand',
    definition:
      'The promise that paper bank notes can be exchanged for gold or silver coins at any time. When Stockholms Banco over-issued notes beyond its metal reserves, this promise was broken.',
    category: 'money',
    relatedConcepts: ['6-riksbank', '6-bank-run'],
    lessonId: '6-1.1',
  },
  {
    id: '6-bank-run',
    term: 'Bank Run',
    definition:
      'A rush by depositors to withdraw funds from a bank they fear is insolvent. The Panic of 1907 triggered massive bank runs that ultimately led to the creation of the Federal Reserve.',
    category: 'risk',
    relatedConcepts: ['6-lender-of-last-resort', '6-panic-of-1907'],
    lessonId: '6-1.1',
  },
  {
    id: '6-panic-of-1907',
    term: 'Panic of 1907',
    definition:
      'A financial crisis where bank runs and stock market collapse required J.P. Morgan to organize private bailouts. Demonstrated the need for a central bank and led directly to the Federal Reserve Act of 1913.',
    category: 'institutions',
    relatedConcepts: ['6-bank-run', '6-federal-reserve-act', '6-lender-of-last-resort'],
    lessonId: '6-1.1',
  },
  {
    id: '6-lender-of-last-resort',
    term: 'Lender of Last Resort',
    definition:
      'A central bank function to provide emergency liquidity to solvent banks facing temporary cash shortages, preventing bank runs from spreading.',
    category: 'institutions',
    relatedConcepts: ['6-bank-run', '6-discount-window'],
    lessonId: '6-1.1',
  },
  {
    id: '6-federal-reserve-act',
    term: 'Federal Reserve Act',
    definition:
      'Signed by President Wilson on December 24, 1913, creating the Federal Reserve System with a decentralized structure of 12 regional Reserve Banks overseen by the Board of Governors in Washington.',
    category: 'regulation',
    relatedConcepts: ['6-board-of-governors', '6-federal-reserve-banks', '6-panic-of-1907'],
    lessonId: '6-1.1',
  },
  {
    id: '6-board-of-governors',
    term: 'Board of Governors',
    definition:
      'Seven members appointed by the President and confirmed by the Senate for staggered 14-year terms. The Chair (currently Jerome Powell) serves a 4-year renewable term. Based in Washington, D.C.',
    category: 'institutions',
    relatedConcepts: ['6-fomc', '6-federal-reserve-banks'],
    lessonId: '6-1.1',
  },
  {
    id: '6-federal-reserve-banks',
    term: 'Federal Reserve Banks',
    definition:
      'Twelve regional banks located in Boston, New York, Philadelphia, Cleveland, Richmond, Atlanta, Chicago, St. Louis, Minneapolis, Kansas City, Dallas, and San Francisco. Each serves its district and has its own president.',
    category: 'institutions',
    relatedConcepts: ['6-board-of-governors', '6-fomc'],
    lessonId: '6-1.1',
  },
  {
    id: '6-fomc',
    term: 'FOMC (Federal Open Market Committee)',
    definition:
      'The 12-member committee that sets monetary policy: all 7 Board governors + the NY Fed president (permanent) + 4 rotating Reserve Bank presidents. Meets 8 times per year.',
    category: 'institutions',
    relatedConcepts: ['6-board-of-governors', '6-open-market-operations', '6-federal-reserve-banks'],
    lessonId: '6-1.1',
  },
  {
    id: '6-inflation',
    term: 'Inflation',
    definition:
      'A sustained increase in the general price level. Central banks were created partly because private banks over-issuing notes caused inflation — too much money chasing the same goods.',
    category: 'economy',
    relatedConcepts: ['6-stable-prices', '6-quantity-theory-of-money'],
    lessonId: '6-1.1',
  },

  // === Lesson 6-1.2: Purpose and Functions ===
  {
    id: '6-monetary-policy-function',
    term: 'Monetary Policy (Fed Function)',
    definition:
      'The first of five Fed functions: conducting monetary policy to promote maximum employment, stable prices, and moderate long-term interest rates.',
    category: 'regulation',
    relatedConcepts: ['6-dual-mandate', '6-financial-stability'],
    lessonId: '6-1.2',
  },
  {
    id: '6-financial-stability',
    term: 'Financial System Stability',
    definition:
      'The second Fed function: monitoring and addressing systemic risks to the stability of the financial system and containing potential disruptions.',
    category: 'regulation',
    relatedConcepts: ['6-monetary-policy-function', '6-macro-prudential'],
    lessonId: '6-1.2',
  },
  {
    id: '6-micro-prudential',
    term: 'Micro-prudential Supervision',
    definition:
      'Regulation focused on individual institution safety and soundness — ensuring each bank is well-capitalized, properly managed, and compliant with regulations.',
    category: 'regulation',
    relatedConcepts: ['6-macro-prudential', '6-supervision'],
    lessonId: '6-1.2',
  },
  {
    id: '6-macro-prudential',
    term: 'Macro-prudential Supervision',
    definition:
      'Regulation focused on the health of the entire financial system — identifying interconnected risks that could cause systemic failure even if individual banks appear sound.',
    category: 'regulation',
    relatedConcepts: ['6-micro-prudential', '6-financial-stability'],
    lessonId: '6-1.2',
  },
  {
    id: '6-supervision',
    term: 'Supervision and Regulation',
    definition:
      'The third Fed function: supervising and regulating banks to ensure safety, soundness, consumer protection (Truth in Lending Act, Community Reinvestment Act), and financial system stability.',
    category: 'regulation',
    relatedConcepts: ['6-micro-prudential', '6-macro-prudential'],
    lessonId: '6-1.2',
  },
  {
    id: '6-payment-system',
    term: 'Payment System Operation',
    definition:
      'The fourth Fed function: operating payment and settlement systems including ACH (Automated Clearing House), Fedwire, and FedNow for real-time payments.',
    category: 'payment',
    relatedConcepts: ['6-ach'],
    lessonId: '6-1.2',
  },
  {
    id: '6-ach',
    term: 'ACH (Automated Clearing House)',
    definition:
      'An electronic payment network operated by the Fed for batch processing of direct deposits, bill payments, and fund transfers between banks.',
    category: 'payment',
    relatedConcepts: ['6-payment-system'],
    lessonId: '6-1.2',
  },
  {
    id: '6-consumer-protection',
    term: 'Consumer Protection',
    definition:
      'The fifth Fed function: protecting consumers through laws like the Truth in Lending Act (full cost disclosure) and Community Reinvestment Act (lending to underserved communities).',
    category: 'regulation',
    relatedConcepts: ['6-supervision'],
    lessonId: '6-1.2',
  },

  // === Lesson 6-2.1: Money Supply ===
  {
    id: '6-monetary-base',
    term: 'Monetary Base (M0)',
    definition:
      'Currency in circulation plus bank reserves held at the Fed. Also called high-powered money because the money multiplier amplifies it into a larger money supply.',
    category: 'money',
    relatedConcepts: ['6-money-multiplier', '6-bank-reserves', '6-m1'],
    lessonId: '6-2.1',
  },
  {
    id: '6-bank-reserves',
    term: 'Bank Reserves',
    definition:
      'Deposits held by commercial banks at the Federal Reserve. Required reserves meet regulatory minimums; excess reserves exceed that requirement. Post-2008, reserves grew from ~$14B to over $3 trillion.',
    category: 'financial-system',
    relatedConcepts: ['6-monetary-base', '6-reserve-requirement', '6-iorb'],
    lessonId: '6-2.1',
  },
  {
    id: '6-m1',
    term: 'M1',
    definition:
      'The narrowest money supply measure: currency in circulation + demand deposits (checking accounts) + traveler\'s checks + other checkable deposits.',
    category: 'money',
    relatedConcepts: ['6-m2', '6-monetary-base'],
    lessonId: '6-2.1',
  },
  {
    id: '6-m2',
    term: 'M2',
    definition:
      'A broader money supply measure: M1 + savings deposits + small-denomination time deposits (under $100K) + retail money market mutual fund shares.',
    category: 'money',
    relatedConcepts: ['6-m1', '6-m3'],
    lessonId: '6-2.1',
  },
  {
    id: '6-m3',
    term: 'M3',
    definition:
      'The broadest money supply measure: M2 + large time deposits + institutional money market funds + short-term repos + Eurodollars. The Fed discontinued publishing M3 in March 2006.',
    category: 'money',
    relatedConcepts: ['6-m2'],
    lessonId: '6-2.1',
  },
  {
    id: '6-money-multiplier',
    term: 'Money Multiplier',
    definition:
      'The ratio 1/rr (where rr = reserve ratio) that shows how much the money supply expands from an initial deposit. With a 10% reserve ratio, $1,000 creates up to $10,000 in total deposits through repeated lending.',
    category: 'money',
    relatedConcepts: ['6-reserve-requirement', '6-monetary-base', '6-loanable-funds'],
    lessonId: '6-2.1',
  },
  {
    id: '6-loanable-funds',
    term: 'Loanable Funds',
    definition:
      'The portion of a deposit that a bank can lend out after setting aside required reserves. Each loan creates a new deposit at another bank, continuing the multiplier cycle.',
    category: 'money',
    relatedConcepts: ['6-money-multiplier', '6-reserve-requirement'],
    lessonId: '6-2.1',
  },
  {
    id: '6-reserve-requirement',
    term: 'Reserve Requirement',
    definition:
      'The fraction of deposits that banks must hold as reserves (at the Fed or as vault cash). The Fed reduced this to 0% in March 2020, relying on other tools to control rates.',
    category: 'regulation',
    relatedConcepts: ['6-money-multiplier', '6-bank-reserves'],
    lessonId: '6-2.1',
  },
  {
    id: '6-quantity-theory-of-money',
    term: 'Quantity Theory of Money',
    definition:
      'MV = PY — the money supply (M) times velocity (V) equals the price level (P) times real output (Y). If V is stable and Y is at potential, more money leads to higher prices.',
    category: 'economy',
    relatedConcepts: ['6-money-supply', '6-inflation'],
    lessonId: '6-2.1',
  },

  // === Lesson 6-2.2: Fed Balance Sheet ===
  {
    id: '6-fed-balance-sheet',
    term: 'Fed Balance Sheet',
    definition:
      'The Fed\'s statement of assets and liabilities. Assets include government securities and crisis facilities; liabilities include currency in circulation, bank reserves, and the Treasury General Account.',
    category: 'institutions',
    relatedConcepts: ['6-government-securities', '6-currency-in-circulation'],
    lessonId: '6-2.2',
  },
  {
    id: '6-government-securities',
    term: 'Government Securities (Fed Assets)',
    definition:
      'Treasury bonds and agency MBS held by the Fed. Pre-2008: ~$630B mostly Treasuries. By 2021: ~$7.3T including massive MBS purchases from QE programs.',
    category: 'financial-system',
    relatedConcepts: ['6-fed-balance-sheet', '6-quantitative-easing'],
    lessonId: '6-2.2',
  },
  {
    id: '6-currency-in-circulation',
    term: 'Currency in Circulation',
    definition:
      'Physical Federal Reserve Notes (paper money) held by the public. A liability on the Fed\'s balance sheet because the Fed must honor these notes.',
    category: 'money',
    relatedConcepts: ['6-fed-balance-sheet', '6-monetary-base'],
    lessonId: '6-2.2',
  },
  {
    id: '6-treasury-general-account',
    term: 'Treasury General Account (TGA)',
    definition:
      'The U.S. government\'s checking account at the Fed, used for tax receipts and government spending. A liability on the Fed\'s balance sheet.',
    category: 'institutions',
    relatedConcepts: ['6-fed-balance-sheet'],
    lessonId: '6-2.2',
  },
  {
    id: '6-crisis-facilities',
    term: 'Crisis Lending Facilities',
    definition:
      'Emergency programs the Fed creates during crises to provide liquidity to specific markets. Examples include the TALF (Term Asset-Backed Securities Loan Facility) and CPFF (Commercial Paper Funding Facility).',
    category: 'institutions',
    relatedConcepts: ['6-fed-balance-sheet', '6-lender-of-last-resort'],
    lessonId: '6-2.2',
  },
  {
    id: '6-unrealized-capital-gains',
    term: 'Unrealized Capital Gains/Losses',
    definition:
      'Changes in the market value of the Fed\'s bond holdings. When interest rates rise, bond prices fall and the Fed may have unrealized losses — but it holds to maturity, so losses are typically not realized.',
    category: 'risk',
    relatedConcepts: ['6-government-securities'],
    lessonId: '6-2.2',
  },

  // === Lesson 6-2.3: Open Market Operations ===
  {
    id: '6-open-market-operations',
    term: 'Open Market Operations (OMOs)',
    definition:
      'The Fed\'s primary traditional tool: buying or selling government securities to increase or decrease bank reserves, shifting the supply curve in the federal funds market to achieve the target rate.',
    category: 'institutions',
    relatedConcepts: ['6-federal-funds-rate', '6-soma', '6-primary-dealers'],
    lessonId: '6-2.3',
  },
  {
    id: '6-soma',
    term: 'SOMA (System Open Market Account)',
    definition:
      'The Fed\'s portfolio of securities acquired through open market operations. Managed by the Federal Reserve Bank of New York on behalf of the entire Federal Reserve System.',
    category: 'institutions',
    relatedConcepts: ['6-open-market-operations', '6-primary-dealers'],
    lessonId: '6-2.3',
  },
  {
    id: '6-primary-dealers',
    term: 'Primary Dealers',
    definition:
      'A group of ~24 securities firms (e.g., Goldman Sachs, J.P. Morgan) authorized to trade directly with the NY Fed. They serve as counterparties for open market operations.',
    category: 'institutions',
    relatedConcepts: ['6-soma', '6-open-market-operations'],
    lessonId: '6-2.3',
  },
  {
    id: '6-federal-funds-market',
    term: 'Federal Funds Market',
    definition:
      'The overnight interbank market where banks with excess reserves lend to banks needing reserves. The equilibrium rate in this market is the effective federal funds rate.',
    category: 'financial-system',
    relatedConcepts: ['6-federal-funds-rate', '6-open-market-operations'],
    lessonId: '6-2.3',
  },
  {
    id: '6-omo-purchase',
    term: 'Open Market Purchase',
    definition:
      'The Fed buys Treasuries from primary dealers → pays with newly created reserves → bank reserves increase → supply of reserves shifts right → fed funds rate falls toward target.',
    category: 'institutions',
    relatedConcepts: ['6-open-market-operations', '6-omo-sale'],
    lessonId: '6-2.3',
  },
  {
    id: '6-omo-sale',
    term: 'Open Market Sale',
    definition:
      'The Fed sells Treasuries to primary dealers → receives reserves → bank reserves decrease → supply of reserves shifts left → fed funds rate rises toward target.',
    category: 'institutions',
    relatedConcepts: ['6-open-market-operations', '6-omo-purchase'],
    lessonId: '6-2.3',
  },

  // === Lesson 6-2.4: Discount Window ===
  {
    id: '6-discount-window',
    term: 'Discount Window',
    definition:
      'A Fed lending facility where banks can borrow short-term funds against collateral. The discount rate is set above the fed funds target, creating an upper bound for the rate corridor.',
    category: 'institutions',
    relatedConcepts: ['6-discount-rate', '6-discount-loan', '6-lender-of-last-resort'],
    lessonId: '6-2.4',
  },
  {
    id: '6-discount-loan',
    term: 'Discount Loan',
    definition:
      'A loan from the Fed where the borrower receives less than face value upfront and repays the full face value at maturity. Cash received = Face Value × (1 - Discount Rate).',
    category: 'money',
    relatedConcepts: ['6-discount-window', '6-discount-rate'],
    lessonId: '6-2.4',
  },
  {
    id: '6-discount-rate',
    term: 'Discount Rate',
    definition:
      'The interest rate charged by the Fed for loans through the discount window. Since 2003, primary credit rate sits ~0.25% above the fed funds target range upper bound, acting as the rate corridor ceiling.',
    category: 'institutions',
    relatedConcepts: ['6-discount-window', '6-federal-funds-rate'],
    lessonId: '6-2.4',
  },
  {
    id: '6-collateral-fed',
    term: 'Collateral (Fed Lending)',
    definition:
      'Assets pledged by a bank to secure a discount window loan. Accepted collateral includes Treasuries (~99% borrowing power), agency MBS (~95%), commercial loans (~75%), and commercial real estate (~35-95%).',
    category: 'financial-system',
    relatedConcepts: ['6-discount-window', '6-margin-haircut'],
    lessonId: '6-2.4',
  },
  {
    id: '6-margin-haircut',
    term: 'Margin/Haircut',
    definition:
      'The difference between the market value of collateral and the loan amount. Higher haircuts for riskier or less liquid collateral protect the Fed against loss if the borrower defaults.',
    category: 'risk',
    relatedConcepts: ['6-collateral-fed', '6-discount-window'],
    lessonId: '6-2.4',
  },

  // === Lesson 6-3.1: Forward Guidance ===
  {
    id: '6-forward-guidance',
    term: 'Forward Guidance',
    definition:
      'A communication tool where the Fed signals its future policy intentions to shape market expectations. Became routine after 2009 when short-term rates hit near-zero and traditional tools lost effectiveness.',
    category: 'regulation',
    relatedConcepts: ['6-sep', '6-dot-plot', '6-expectations-channel'],
    lessonId: '6-3.1',
  },
  {
    id: '6-sep',
    term: 'Summary of Economic Projections (SEP)',
    definition:
      'Published quarterly by the Fed, showing each FOMC participant\'s projections for GDP growth, unemployment, inflation (PCE), and the federal funds rate over the next 3 years and the longer run.',
    category: 'institutions',
    relatedConcepts: ['6-forward-guidance', '6-dot-plot'],
    lessonId: '6-3.1',
  },
  {
    id: '6-dot-plot',
    term: 'Dot Plot',
    definition:
      'A chart showing where each of the 18 FOMC participants expects the fed funds rate to be in future years. In March 2021, all 18 dots were at 0.125% for 2021, but 9 expected increases by 2023.',
    category: 'institutions',
    relatedConcepts: ['6-sep', '6-forward-guidance'],
    lessonId: '6-3.1',
  },
  {
    id: '6-expectations-channel',
    term: 'Expectations Channel',
    definition:
      'The mechanism by which forward guidance works: Fed signals future rate path → market adjusts expectations → long-term rates and financial conditions change today, even before the Fed acts.',
    category: 'financial-system',
    relatedConcepts: ['6-forward-guidance', '6-policy-transmission'],
    lessonId: '6-3.1',
  },
  {
    id: '6-policy-transmission',
    term: 'Policy Transmission',
    definition:
      'The channels through which Fed actions affect the broader economy: interest rate channel, credit channel, expectations channel, asset price channel, and exchange rate channel.',
    category: 'economy',
    relatedConcepts: ['6-expectations-channel', '6-forward-guidance'],
    lessonId: '6-3.1',
  },

  // === Lesson 6-3.2: Large-Scale Asset Purchases ===
  {
    id: '6-quantitative-easing',
    term: 'Quantitative Easing (QE)',
    definition:
      'Large-scale Fed purchases of long-term securities to lower long-term interest rates when short-term rates are near zero. QE1 (2008-2010) bought $1.25T in MBS + $300B in Treasuries.',
    category: 'institutions',
    relatedConcepts: ['6-bond-yield-inverse', '6-mbs-purchases', '6-operation-twist'],
    lessonId: '6-3.2',
  },
  {
    id: '6-bond-yield-inverse',
    term: 'Bond Price-Yield Inverse Relationship',
    definition:
      'When the Fed buys bonds, demand increases → prices rise → yields fall. This is the core mechanism of QE: buying pushes yields down, reducing borrowing costs across the economy.',
    category: 'financial-system',
    relatedConcepts: ['6-quantitative-easing'],
    lessonId: '6-3.2',
  },
  {
    id: '6-mbs-purchases',
    term: 'MBS Purchases (Fed)',
    definition:
      'QE1 included $1.25 trillion in agency MBS purchases, directly targeting mortgage rates. The 30-year fixed mortgage rate fell from ~6.5% to ~4.85% as a result.',
    category: 'institutions',
    relatedConcepts: ['6-quantitative-easing', '6-government-securities'],
    lessonId: '6-3.2',
  },
  {
    id: '6-gse-debt',
    term: 'GSE Debt',
    definition:
      'Debt issued by Government-Sponsored Enterprises like Fannie Mae and Freddie Mac. QE1 included $175B in GSE debt purchases to support the housing market.',
    category: 'financial-system',
    relatedConcepts: ['6-quantitative-easing', '6-mbs-purchases'],
    lessonId: '6-3.2',
  },
  {
    id: '6-operation-twist',
    term: 'Operation Twist',
    definition:
      'A Fed program (Sep 2011 - Dec 2012) that sold short-term Treasuries and bought long-term Treasuries — flattening the yield curve without expanding the balance sheet. Pure maturity swap, no new money created.',
    category: 'institutions',
    relatedConcepts: ['6-quantitative-easing'],
    lessonId: '6-3.2',
  },

  // === Lesson 6-3.3: Abundant Reserves ===
  {
    id: '6-abundant-reserves',
    term: 'Abundant Reserves Regime',
    definition:
      'The post-2008 environment where bank reserves are so plentiful (~$3.2T+) that small open market operations cannot move the federal funds rate. The Fed uses administered rates (IORB, ON RRP) instead.',
    category: 'institutions',
    relatedConcepts: ['6-iorb', '6-on-rrp', '6-floor-system'],
    lessonId: '6-3.3',
  },
  {
    id: '6-iorb',
    term: 'IORB (Interest on Reserve Balances)',
    definition:
      'The rate the Fed pays banks on reserves held at the Fed. Creates a floor for the fed funds rate: banks won\'t lend to other banks below what they earn risk-free from the Fed. Set at or near the target range upper bound.',
    category: 'institutions',
    relatedConcepts: ['6-on-rrp', '6-floor-system', '6-abundant-reserves'],
    lessonId: '6-3.3',
  },
  {
    id: '6-on-rrp',
    term: 'ON RRP (Overnight Reverse Repo Facility)',
    definition:
      'A facility where non-bank institutions (money market funds, GSEs) can invest overnight with the Fed. Set at the target range lower bound, it prevents non-banks from pushing rates below the target.',
    category: 'institutions',
    relatedConcepts: ['6-iorb', '6-floor-system', '6-abundant-reserves'],
    lessonId: '6-3.3',
  },
  {
    id: '6-floor-system',
    term: 'Floor System',
    definition:
      'A monetary policy implementation framework where the Fed controls rates through administered rates (IORB as floor for banks, ON RRP as sub-floor for non-banks) rather than through scarce reserve supply adjustments.',
    category: 'institutions',
    relatedConcepts: ['6-iorb', '6-on-rrp', '6-abundant-reserves'],
    lessonId: '6-3.3',
  },
  {
    id: '6-arbitrage-floor',
    term: 'Arbitrage (Rate Floor)',
    definition:
      'If the fed funds rate dips below IORB, banks borrow in the fed funds market and deposit at the Fed to earn the difference risk-free. This arbitrage pushes the fed funds rate back up toward IORB.',
    category: 'financial-system',
    relatedConcepts: ['6-iorb', '6-floor-system'],
    lessonId: '6-3.3',
  },
  {
    id: '6-scarce-reserves',
    term: 'Scarce Reserves Regime',
    definition:
      'The pre-2008 framework where total bank reserves were ~$14B and the Fed could precisely control the fed funds rate by making small changes to the reserve supply through daily open market operations.',
    category: 'institutions',
    relatedConcepts: ['6-abundant-reserves', '6-open-market-operations'],
    lessonId: '6-3.3',
  },
];
