import { Module } from '@/types';

export const modules: Module[] = [
  {
    id: 1,
    title: 'Money and the Financial System',
    description:
      'Understanding money, its functions, and how the financial system facilitates economic activity.',
    icon: '💰',
    slug: 'money-financial-system',
  },
  {
    id: 2,
    title: 'History of Modern Banking',
    description:
      'From unit banks to financial supermarkets: the evolution of banking organization, regulation, and how banks earn profit.',
    icon: '🏦',
    slug: 'history-modern-banking',
  },
  {
    id: 3,
    title: 'Risk and Term Structure',
    description: 'Understanding risk premiums, default risk, and the yield curve.',
    icon: '📊',
    slug: 'risk-term-structure',
  },
  {
    id: 4,
    title: 'Regulation',
    description:
      'Why banks are regulated, the government safety net, supervision and stress testing, too big to fail, and shadow banking.',
    icon: '⚖️',
    slug: 'regulation',
  },
  {
    id: 5,
    title: 'Interest Rates and Funding Markets',
    description:
      'Federal funds, repo, LIBOR/SOFR transition, Treasury yield decomposition, money market funds, and securitization.',
    icon: '📈',
    slug: 'central-banking-fed',
  },
  {
    id: 6,
    title: 'Central Banks and Monetary Policy',
    description:
      'The Federal Reserve: history, structure, dual mandate, open market operations, discount window, forward guidance, QE, and the abundant reserves framework.',
    icon: '🏛️',
    slug: 'central-banking-monetary-policy',
  },
  {
    id: 7,
    title: 'Monetary Policy',
    description: 'Goals of monetary policy, transmission mechanisms, and policy implementation.',
    icon: '⚖️',
    slug: 'monetary-policy',
  },
  {
    id: 8,
    title: 'International Finance',
    description: 'Exchange rates, balance of payments, and international monetary systems.',
    icon: '🌍',
    slug: 'international-finance',
  },
];
