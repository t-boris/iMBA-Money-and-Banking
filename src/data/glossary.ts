import { GlossaryTerm } from '@/types';
import { module1Concepts } from './module1/concepts';
import { module2Concepts } from './module2/concepts';
import { module3Concepts } from './module3/concepts';

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
].sort((a, b) => a.term.localeCompare(b.term));

// Get unique first letters for A-Z index
export const glossaryLetters = [
  ...new Set(glossaryTerms.map((t) => t.term[0].toUpperCase())),
].sort();

// Get unique categories
export const glossaryCategories = [...new Set(glossaryTerms.map((t) => t.category))];

// Get unique types
export const glossaryTypes = [...new Set(glossaryTerms.map((t) => t.type))];
