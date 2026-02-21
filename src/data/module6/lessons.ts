import { Lesson } from '@/types';

export const module6Lessons: Lesson[] = [
  {
    id: '6-0',
    title: 'Overview: Central Banks and Monetary Policy',
    description:
      'The Dual Mandate, traditional vs unconventional policy tools, and how the Fed steers the economy.',
    order: 0,
  },
  {
    id: '6-1',
    title: 'The Federal Reserve',
    description:
      'Structure & Mandate — Why central banks exist, how the Fed is organized, and its five key functions.',
    order: 1,
  },
  {
    id: '6-1.1',
    title: 'History and Structure',
    description:
      'From the Riksbank (1668) to the Panic of 1907 and the Federal Reserve Act of 1913. Board of Governors, 12 Reserve Banks, and the FOMC.',
    parentId: '6-1',
    order: 2,
  },
  {
    id: '6-1.2',
    title: 'Purpose and Functions',
    description:
      'The five functions of the Fed: monetary policy, financial stability, micro/macro-prudential supervision, payment system operation, and consumer protection.',
    parentId: '6-1',
    order: 3,
  },
  {
    id: '6-2',
    title: 'Traditional Monetary Policy',
    description:
      'Traditional Toolkit — How the Fed controls rates: money supply, balance sheet mechanics, open market operations, and the discount window.',
    order: 4,
  },
  {
    id: '6-2.1',
    title: 'Money Supply and Monetary Policy',
    description:
      'Monetary base, M1/M2/M3, the money multiplier, reserve requirements, and the Quantity Theory of Money.',
    parentId: '6-2',
    order: 5,
  },
  {
    id: '6-2.2',
    title: "The Federal Reserve's Balance Sheet",
    description:
      'Assets (government securities, crisis facilities) and liabilities (currency, reserves). Pre-2008 $630B vs 2021 $7.3T expansion.',
    parentId: '6-2',
    order: 6,
  },
  {
    id: '6-2.3',
    title: 'Open Market Operations',
    description:
      'FOMC directives, the SOMA portfolio, primary dealers, and how buying/selling Treasuries shifts the federal funds rate.',
    parentId: '6-2',
    order: 7,
  },
  {
    id: '6-2.4',
    title: 'The Discount Window',
    description:
      'Discount loans, primary credit (max 90 days), collateral haircuts, and the discount rate as the rate corridor upper bound.',
    parentId: '6-2',
    order: 8,
  },
  {
    id: '6-3',
    title: 'Non-traditional Monetary Policy',
    description:
      'Crisis Toolkit — When traditional tools aren\'t enough: forward guidance, quantitative easing, and the abundant reserves framework.',
    order: 9,
  },
  {
    id: '6-3.1',
    title: 'Forward Guidance',
    description:
      'Summary of Economic Projections (SEP), the Dot Plot, expectations channel, and how communication shapes market behavior.',
    parentId: '6-3',
    order: 10,
  },
  {
    id: '6-3.2',
    title: 'Large-Scale Asset Purchases',
    description:
      'QE1 ($1.25T MBS), QE2, Operation Twist, QE3, and COVID-era purchases. Yield impact evidence and the demand-shock mechanism.',
    parentId: '6-3',
    order: 11,
  },
  {
    id: '6-3.3',
    title: 'Monetary Policy with Abundant Reserves',
    description:
      'The floor system: IORB as the bank floor, ON RRP as the non-bank sub-floor, and how administered rates replace open market operations.',
    parentId: '6-3',
    order: 12,
  },
];
