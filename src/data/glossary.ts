import { GlossaryTerm } from '@/types';
import { module1Concepts } from './module1/concepts';
import { module2Concepts } from './module2/concepts';
import { module3Concepts } from './module3/concepts';
import { module4Concepts } from './module4/concepts';
import { module5Concepts } from './module5/concepts';
import { module6Concepts } from './module6/concepts';

// Examples for key terms to enhance understanding
const termExamples: Record<string, string> = {
  // Module 1 - Money and Finance
  money:
    'When you use a $20 bill to buy groceries, the bill serves as money because the store accepts it as payment.',
  'means-of-payment':
    'A credit card transaction where the bank settles the payment on your behalf is using the card as a means of payment.',
  'unit-of-account':
    'Prices in a US store are listed in dollars ($9.99) because the dollar is the unit of account.',
  'store-of-value':
    'Keeping savings in a bank account preserves your purchasing power, making money a store of value.',
  'commodity-money': 'Gold coins used in ancient Rome had intrinsic value as gold metal.',
  'fiat-money':
    'The US dollar today is fiat money - it has value because the government declares it legal tender, not because it is backed by gold.',
  m1: 'If you have $500 in checking and $200 in cash, your M1 contribution is $700.',
  m2: 'M2 includes your checking account ($500), cash ($200), plus your savings account ($3,000) = $3,700.',
  inflation:
    'If a coffee costs $3 this year but $3.15 next year, that 5% increase is inflation.',
  'money-multiplier':
    'With a 10% reserve requirement, a $1,000 deposit can create up to $10,000 in total money supply.',

  // Module 2 - Banking
  'commercial-bank':
    'Chase Bank accepts deposits from individuals and businesses and makes loans to homebuyers.',
  'investment-bank':
    'Goldman Sachs helps companies like Uber go public through IPOs and advises on mergers.',
  'retail-banking':
    'Opening a checking account, getting a mortgage, or using an ATM are retail banking services.',
  'wholesale-banking':
    'A bank providing a $50 million credit line to a manufacturing company is wholesale banking.',
  deposit: 'Putting $1,000 into your savings account creates a deposit liability for the bank.',
  loan: 'A bank lending $300,000 for a home mortgage creates a loan asset on its balance sheet.',
  'reserve-requirement':
    'If the reserve requirement is 10%, a bank with $1 million in deposits must keep $100,000 in reserves.',
  fdic: 'If your bank fails, FDIC insurance protects deposits up to $250,000 per depositor.',
  'net-interest-margin':
    'If a bank earns 5% on loans and pays 2% on deposits, its net interest margin is approximately 3%.',
  leverage:
    'A bank with $10 billion in assets and $500 million in equity has a leverage ratio of 20:1.',

  // Module 3 - Risk
  'credit-risk':
    'When a borrower defaults on their mortgage, the bank faces credit risk and may not recover the full loan amount.',
  'market-risk':
    'If interest rates rise, a bank holding long-term bonds at fixed rates will see their value decline.',
  'liquidity-risk':
    'During a bank run, depositors withdraw funds faster than the bank can sell assets to meet demands.',
  'operational-risk':
    'A cyber attack that compromises customer data is an example of operational risk.',
  var: "A 99% daily VaR of $10 million means there's only a 1% chance of losing more than $10 million in a day.",
  'tier-1-capital':
    "A bank's common stock and retained earnings are Tier 1 capital - the highest quality loss-absorbing buffer.",
  roe: 'If a bank earns $100 million in net income with $1 billion in equity, its ROE is 10%.',
  roa: 'Net income of $100 million divided by $50 billion in assets gives an ROA of 0.2%.',
  duration:
    'A bond with a duration of 5 years will lose approximately 5% in value if interest rates rise by 1%.',
  'capital-adequacy':
    'Basel III requires banks to maintain at least 8% total capital ratio to absorb potential losses.',

  // Module 4 - Regulation
  'bank-regulation':
    'Capital requirements forcing banks to hold at least 8% equity is an example of bank regulation constraining risk-taking.',
  'negative-externality':
    'When a bank fails, local businesses lose credit access and households lose savings — costs the bank did not consider when taking risks.',
  'moral-hazard':
    'After FDIC insurance was introduced, some banks took riskier bets knowing depositors would be made whole by the government.',
  'deposit-insurance':
    'If your bank fails, FDIC pays back your deposits up to $250,000 — so there is no reason to rush and withdraw.',
  'bank-run':
    'In 2008, customers lined up outside Northern Rock in the UK to withdraw deposits after hearing the bank had liquidity problems.',
  'financial-contagion':
    'When Lehman Brothers collapsed, money market funds, insurance companies, and other banks all suffered losses from their exposure.',
  'ted-spread':
    'The TED spread spiked from ~50 basis points to over 450 basis points during the peak of the 2008 crisis, signaling extreme interbank distrust.',
  'basel-accord':
    'Under Basel III, banks must hold at least 8% capital relative to their risk-weighted assets.',
  'risk-weighted-assets':
    'Government bonds carry 0% risk weight while corporate loans carry 100% — a $100M government bond portfolio adds $0 to RWA.',
  'camels-score':
    'A bank scoring poorly on the CAMELS exam may be placed on the confidential Problem Bank List and face restrictions.',
  'stress-testing':
    'In the annual CCAR test, banks must show their capital would survive a scenario with 10% unemployment and 25% drop in house prices.',
  'too-big-to-fail':
    'JPMorgan Chase holds over $3 trillion in assets — its failure would freeze credit markets and trigger a global crisis.',
  'shadow-banking':
    'Money market funds accept deposits and invest in debt securities, functioning like banks but without FDIC insurance or Fed oversight.',
  'regulatory-arbitrage':
    'By operating as a money market fund instead of a bank, firms avoid capital requirements while offering deposit-like products.',
  'systemic-risk-surcharge':
    'JPMorgan faces an additional 3.5% capital surcharge on top of Basel minimums due to its systemic importance.',

  // Module 6 - Central Banking & Monetary Policy
  '6-dual-mandate':
    'The Fed targets ~2% inflation and maximum employment — every policy tool connects back to these two goals',
  '6-central-bank':
    'The Swedish Riksbank (1668) was the world\'s first; the Fed was founded in 1913 after the Panic of 1907',
  '6-money-multiplier':
    'Deposit $1,000 with 10% reserve ratio → banks create ~$10,000 in total deposits through repeated lending',
  '6-open-market-operations':
    'FOMC decides target rate → NY Fed buys Treasuries from primary dealers → reserves increase → fed funds rate falls',
  '6-discount-window':
    'Banks can borrow from the Fed at the discount rate (~0.25% above target range) — acts as rate corridor ceiling',
  '6-iorb':
    'Fed pays banks interest on reserves, creating a floor for the fed funds rate even with $3T+ in reserves',
  '6-on-rrp':
    'Money market funds can invest overnight with the Fed — ensures non-banks don\'t push rates below target',
  '6-quantitative-easing':
    'QE1 bought $1.25T in MBS + $300B Treasuries; 30-year mortgage rate fell from 6.5% to 4.85%',
  '6-forward-guidance':
    'The Dot Plot shows where each FOMC member expects rates to go — markets pay close attention',
  '6-abundant-reserves':
    'After QE, reserves grew from $14B (2007) to $3.2T+ — traditional OMOs couldn\'t move rates anymore',
  '6-fomc':
    'The 12-member committee (7 governors + NY Fed + 4 rotating) that meets 8 times per year to set monetary policy',
  '6-federal-funds-rate':
    'The overnight rate banks charge each other for reserve lending — the Fed\'s primary policy target',
  '6-monetary-base':
    'Currency in circulation plus bank reserves — the "high-powered money" that gets multiplied through lending',
  '6-m1':
    'Currency + demand deposits + other checkable deposits — the narrowest measure of money in active circulation',
  '6-m2':
    'M1 + savings deposits + small time deposits + retail MMFs — the broader measure the Fed watches most closely',
  '6-fed-balance-sheet':
    'Grew from $630B (pre-2008) to $7.3T (2021) through massive purchases of Treasuries and MBS',
  '6-primary-dealers':
    'About 24 firms (Goldman Sachs, J.P. Morgan, etc.) authorized to trade directly with the NY Fed',
  '6-operation-twist':
    'Sold short-term Treasuries, bought long-term — flattened the yield curve without expanding the balance sheet',
  '6-floor-system':
    'IORB + ON RRP create rate boundaries even when reserves are abundant — no need for daily OMOs',
  '6-panic-of-1907':
    'J.P. Morgan organized private bailouts when banks failed — proved the U.S. needed a central bank',
};

// Helper to determine term type based on term content
function getTermType(term: string, definition: string): GlossaryTerm['type'] {
  const lowerTerm = term.toLowerCase();
  const lowerDef = definition.toLowerCase();

  // Formulas typically have mathematical notation or "formula" in name
  if (lowerTerm.includes('formula') || /[=×÷+\-]/.test(definition)) {
    return 'formula';
  }
  // Regulations are acts, laws, rules
  if (
    lowerTerm.includes('act') ||
    lowerTerm.includes('rule') ||
    lowerDef.includes('regulation') ||
    lowerDef.includes('legislation')
  ) {
    return 'regulation';
  }
  // Concepts are abstract ideas
  if (
    lowerDef.includes('concept') ||
    lowerDef.includes('principle') ||
    lowerDef.includes('theory')
  ) {
    return 'concept';
  }
  // Default to term
  return 'term';
}

// Convert Concept to GlossaryTerm
function conceptToGlossaryTerm(
  concept: (typeof module1Concepts)[0],
  moduleId: number
): GlossaryTerm {
  return {
    id: `${moduleId}-${concept.id}`,
    term: concept.term,
    definition: concept.definition,
    example: termExamples[concept.id],
    category: concept.category,
    type: getTermType(concept.term, concept.definition),
    moduleId,
    lessonId: concept.lessonId,
    relatedTerms: concept.relatedConcepts?.map((id) => `${moduleId}-${id}`),
  };
}

// Aggregate all glossary terms
export const glossaryTerms: GlossaryTerm[] = [
  ...module1Concepts.map((c) => conceptToGlossaryTerm(c, 1)),
  ...module2Concepts.map((c) => conceptToGlossaryTerm(c, 2)),
  ...module3Concepts.map((c) => conceptToGlossaryTerm(c, 3)),
  ...module4Concepts.map((c) => conceptToGlossaryTerm(c, 4)),
  ...module5Concepts.map((c) => conceptToGlossaryTerm(c, 5)),
  ...module6Concepts.map((c) => conceptToGlossaryTerm(c, 6)),
].sort((a, b) => a.term.localeCompare(b.term));

// Get unique first letters for A-Z index
export const glossaryLetters = [
  ...new Set(glossaryTerms.map((t) => t.term[0].toUpperCase())),
].sort();

// Get unique categories
export const glossaryCategories = [...new Set(glossaryTerms.map((t) => t.category))];

// Get unique types
export const glossaryTypes = [...new Set(glossaryTerms.map((t) => t.type))];
