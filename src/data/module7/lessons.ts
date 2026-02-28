import { Lesson } from '@/types';

export const module7Lessons: Lesson[] = [
  {
    id: '7-0',
    title: 'Overview: Economic Impacts of Monetary Policy',
    description:
      'How monetary policy decisions flow through the economy to affect GDP, unemployment, and inflation — and where those effects break down.',
    order: 0,
  },
  {
    id: '7-1',
    title: 'The Link Between Inflation and Unemployment',
    description:
      'Economic growth, Okun\'s Law, the Phillips Curve, inflation expectations, and the policy rules that tie them together.',
    order: 1,
  },
  {
    id: '7-1.1',
    title: 'Economic Growth and Unemployment',
    description:
      'GDP measurement, the relationship between real GDP growth and unemployment changes (Okun\'s Law), and the concept of the natural rate of unemployment.',
    parentId: '7-1',
    order: 2,
  },
  {
    id: '7-1.2',
    title: 'Unemployment and Inflation',
    description:
      'The Phillips Curve tradeoff between unemployment and inflation, how inflation expectations shift the curve, and why anchored expectations matter.',
    parentId: '7-1',
    order: 3,
  },
  {
    id: '7-1.3',
    title: 'Monetary Policy Rules',
    description:
      'The output gap, the inflation gap, the Taylor Rule for setting interest rates, and the alternative K-rule for constant money growth.',
    parentId: '7-1',
    order: 4,
  },
  {
    id: '7-2',
    title: 'Transmission of Monetary Policy',
    description:
      'How Fed rate changes propagate through market rates, banks, businesses, and households to affect real economic activity.',
    order: 5,
  },
  {
    id: '7-2.1',
    title: 'Market Rates, Spending, and Lags',
    description:
      'From fed funds rate to long-term rates, spending channels (investment, housing, durables, exchange rate, equities), and the 6–18 month transmission lag.',
    parentId: '7-2',
    order: 6,
  },
  {
    id: '7-2.2',
    title: 'Transmission Through Banks',
    description:
      'Net interest margin compression, reserve reduction, deposit outflows — the three channels through which rate hikes squeeze bank lending.',
    parentId: '7-2',
    order: 7,
  },
  {
    id: '7-2.3',
    title: 'Transmission Through Businesses and Households',
    description:
      'How higher rates raise borrowing costs for firms and consumers, reduce asset values, and slow spending on investment, housing, and durable goods.',
    parentId: '7-2',
    order: 8,
  },
  {
    id: '7-3',
    title: 'Limits of Monetary Policy',
    description:
      'Where monetary policy fails: supply shocks and stagflation, jobless recoveries, and risk-taking channels that amplify instability.',
    order: 9,
  },
  {
    id: '7-3.1',
    title: 'Supply Shocks and Stagflation',
    description:
      'Oil price shocks (1973, 1979), the stagflation dilemma of rising inflation with rising unemployment, and the Volcker disinflation.',
    parentId: '7-3',
    order: 10,
  },
  {
    id: '7-3.2',
    title: 'Jobless Recoveries and Risk-Taking',
    description:
      'Why GDP can recover while unemployment stays high, how low rates encourage excessive risk-taking (HELOCs, housing bubble), and the limits of rate policy.',
    parentId: '7-3',
    order: 11,
  },
];
