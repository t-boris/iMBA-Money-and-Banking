import { Concept } from '@/types';

export const module1Concepts: Concept[] = [
  // Money Basics (Lesson 1-1.1)
  {
    id: 'money',
    term: 'Money',
    definition:
      'A specialized asset that is generally accepted as a means of payment for goods and services and for the repayment of debts, including taxes.',
    category: 'money',
    relatedConcepts: ['means-of-payment', 'unit-of-account', 'store-of-value'],
    lessonId: '1-1.1',
  },
  {
    id: 'means-of-payment',
    term: 'Means of Payment',
    definition: 'An asset used to settle transactions and extinguish debts.',
    category: 'money',
    relatedConcepts: ['money'],
    lessonId: '1-1.1',
  },
  {
    id: 'unit-of-account',
    term: 'Unit of Account',
    definition: 'A common measure in which prices and debts are expressed.',
    category: 'money',
    relatedConcepts: ['money'],
    lessonId: '1-1.1',
  },
  {
    id: 'store-of-value',
    term: 'Store of Value',
    definition: 'An asset that preserves purchasing power over time.',
    category: 'money',
    relatedConcepts: ['money', 'inflation'],
    lessonId: '1-1.1',
  },
  {
    id: 'commodity-money',
    term: 'Commodity Money',
    definition:
      'Money that has intrinsic value because it is made from a physical good that is valuable in non-monetary uses.',
    category: 'money',
    relatedConcepts: ['representative-money', 'fiat-money'],
    lessonId: '1-1.1',
  },
  {
    id: 'representative-money',
    term: 'Representative Money',
    definition:
      'Money that is backed by a commodity and can be redeemed for that commodity on demand.',
    category: 'money',
    relatedConcepts: ['commodity-money', 'gold-standard'],
    lessonId: '1-1.1',
  },
  {
    id: 'fiat-money',
    term: 'Fiat Money',
    definition:
      'Money that has no intrinsic value and is not backed by any commodity; it is valuable because the government declares it legal tender.',
    category: 'money',
    relatedConcepts: ['commodity-money', 'representative-money'],
    lessonId: '1-1.1',
  },
  // Payment System (Lesson 1-1.2)
  {
    id: 'payment-system',
    term: 'Payment System',
    definition:
      'The network of arrangements that allows the transfer of money between individuals and institutions in exchange for goods, services, and assets.',
    category: 'payment',
    lessonId: '1-1.2',
  },
  // Monetary Measurement (Lesson 1-1.3)
  {
    id: 'money-supply',
    term: 'Money Supply',
    definition: 'The total amount of money available in an economy at a given time.',
    category: 'money',
    relatedConcepts: ['m1', 'm2'],
    lessonId: '1-1.3',
  },
  {
    id: 'liquidity',
    term: 'Liquidity',
    definition: 'How easily an asset can be converted into money without losing value.',
    category: 'money',
    lessonId: '1-1.3',
  },
  {
    id: 'm1',
    term: 'M1',
    definition:
      'The narrowest definition of money, including currency in circulation and checking account deposits.',
    category: 'money',
    relatedConcepts: ['m2', 'money-supply'],
    lessonId: '1-1.3',
  },
  {
    id: 'm2',
    term: 'M2',
    definition:
      'A broader measure of money that includes M1 plus savings accounts and money market funds.',
    category: 'money',
    relatedConcepts: ['m1', 'money-supply'],
    lessonId: '1-1.3',
  },
  {
    id: 'inflation',
    term: 'Inflation',
    definition:
      'The rate at which the general price level of goods and services rises, reducing the purchasing power of money.',
    category: 'money',
    relatedConcepts: ['cpi', 'store-of-value'],
    lessonId: '1-1.3',
  },
  {
    id: 'cpi',
    term: 'Consumer Price Index (CPI)',
    definition:
      'An index measuring the change in the price of a fixed basket of goods and services over time.',
    category: 'money',
    relatedConcepts: ['inflation'],
    lessonId: '1-1.3',
  },
  // Financial System (Lesson 1-2.1)
  {
    id: 'financial-system',
    term: 'Financial System',
    definition:
      'The set of markets, institutions, and instruments that channel funds from savers to borrowers.',
    category: 'financial-system',
    relatedConcepts: ['savers', 'borrowers'],
    lessonId: '1-2.1',
  },
  {
    id: 'savers',
    term: 'Savers',
    definition:
      'Economic agents that have income exceeding current consumption and are willing to defer spending into the future.',
    category: 'financial-system',
    relatedConcepts: ['borrowers', 'financial-system'],
    lessonId: '1-2.1',
  },
  {
    id: 'borrowers',
    term: 'Borrowers',
    definition:
      'Economic agents that need funds today in order to finance consumption or investment.',
    category: 'financial-system',
    relatedConcepts: ['savers', 'financial-system'],
    lessonId: '1-2.1',
  },
  {
    id: 'financial-instrument',
    term: 'Financial Instrument',
    definition: 'A legally binding contract that specifies future payments between parties.',
    category: 'financial-system',
    relatedConcepts: ['equity', 'debt'],
    lessonId: '1-2.1',
  },
  {
    id: 'equity',
    term: 'Equity',
    definition: 'Ownership in a firm and a claim on its future profits.',
    category: 'financial-system',
    relatedConcepts: ['debt', 'financial-instrument'],
    lessonId: '1-2.1',
  },
  {
    id: 'debt',
    term: 'Debt',
    definition: 'A financial instrument that promises fixed payments over time.',
    category: 'financial-system',
    relatedConcepts: ['equity', 'collateral'],
    lessonId: '1-2.1',
  },
  {
    id: 'collateral',
    term: 'Collateral',
    definition: "An asset pledged to secure a loan and reduce the lender's risk.",
    category: 'financial-system',
    relatedConcepts: ['debt'],
    lessonId: '1-2.1',
  },
  // Markets vs Institutions (Lesson 1-2.2)
  {
    id: 'financial-markets',
    term: 'Financial Markets',
    definition: 'Platforms where financial instruments are traded directly between investors.',
    category: 'financial-system',
    relatedConcepts: ['financial-institutions'],
    lessonId: '1-2.2',
  },
  {
    id: 'financial-institutions',
    term: 'Financial Institutions',
    definition:
      'Firms that collect funds from savers and invest them in financial instruments issued by borrowers.',
    category: 'institutions',
    relatedConcepts: ['financial-markets', 'bank'],
    lessonId: '1-2.2',
  },
  {
    id: 'maturity-mismatch',
    term: 'Maturity Mismatch',
    definition:
      'Mismatch between the short-term preferences of savers and the long-term needs of borrowers.',
    category: 'institutions',
    relatedConcepts: ['bank'],
    lessonId: '1-2.2',
  },
  {
    id: 'information-asymmetry',
    term: 'Information Asymmetry',
    definition: 'When borrowers know more about their risk than lenders.',
    category: 'institutions',
    relatedConcepts: ['bank'],
    lessonId: '1-2.2',
  },
  // Banks (Lesson 1-2.3)
  {
    id: 'bank',
    term: 'Bank',
    definition:
      'A financial institution that takes deposits from the public and uses them to make loans.',
    category: 'institutions',
    relatedConcepts: ['nbfi'],
    lessonId: '1-2.3',
  },
  {
    id: 'nbfi',
    term: 'Non-Bank Financial Institutions (NBFIs)',
    definition:
      'Financial institutions that do not take traditional deposits but perform financial intermediation.',
    category: 'institutions',
    relatedConcepts: ['bank', 'insurance', 'pension-funds'],
    lessonId: '1-2.3',
  },
  // Finance and Economy (Lesson 1-3.1)
  {
    id: 'financial-development',
    term: 'Financial Development',
    definition:
      'Improvements in the efficiency, depth, and stability of financial markets and institutions.',
    category: 'economy',
    lessonId: '1-3.1',
  },
  {
    id: 'financial-crisis',
    term: 'Financial Crisis',
    definition: 'A disruption in the financial system that severely impairs the flow of credit.',
    category: 'economy',
    relatedConcepts: ['bailout', 'moral-hazard'],
    lessonId: '1-3.1',
  },
  {
    id: 'bailout',
    term: 'Bailout',
    definition:
      'Government financial support given to failing financial institutions to prevent systemic collapse.',
    category: 'economy',
    relatedConcepts: ['financial-crisis', 'moral-hazard'],
    lessonId: '1-3.1',
  },
  {
    id: 'moral-hazard',
    term: 'Moral Hazard',
    definition:
      'When agents take more risk because they expect to be protected from the consequences.',
    category: 'economy',
    relatedConcepts: ['bailout'],
    lessonId: '1-3.1',
  },
];
