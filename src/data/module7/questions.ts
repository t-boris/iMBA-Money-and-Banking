import { ExamQuestion } from '@/types';

export const module7ExamQuestions: ExamQuestion[] = [
  {
    id: 'q7-1',
    question:
      'According to Okun\'s Law, if real GDP grows 1 percentage point above trend, unemployment falls by approximately:',
    options: [
      '0.5 percentage points',
      '1.0 percentage point',
      '2.0 percentage points',
      '0.25 percentage points',
    ],
    correctIndex: 0,
    explanation:
      'Okun\'s Law estimates that each 1 percentage point of above-trend GDP growth reduces unemployment by roughly 0.5 points. Equivalently, a 2% GDP shortfall raises unemployment by ~1 point.',
    difficulty: 'easy',
    moduleId: 7,
    conceptId: '7-okuns-law',
  },
  {
    id: 'q7-2',
    question: 'The Phillips Curve illustrates the short-run tradeoff between:',
    options: [
      'Unemployment and inflation',
      'GDP growth and interest rates',
      'Money supply and velocity',
      'Government spending and tax revenue',
    ],
    correctIndex: 0,
    explanation:
      'The Phillips Curve shows an inverse relationship between unemployment and inflation in the short run: as unemployment falls below the natural rate, inflation tends to rise.',
    difficulty: 'easy',
    moduleId: 7,
    conceptId: '7-phillips-curve',
  },
  {
    id: 'q7-3',
    question:
      'What happens to the Phillips Curve when inflation expectations increase?',
    options: [
      'It shifts upward (outward)',
      'It shifts downward (inward)',
      'It becomes vertical',
      'It becomes horizontal',
    ],
    correctIndex: 0,
    explanation:
      'When people expect higher inflation, they demand higher wages and set higher prices, which shifts the entire Phillips Curve upward. Any given unemployment rate is now associated with higher inflation.',
    difficulty: 'medium',
    moduleId: 7,
    conceptId: '7-inflation-expectations',
  },
  {
    id: 'q7-4',
    question:
      'In the Taylor Rule (i = r* + π + 0.5(π − π*) + 0.5(y − y*)), what does a positive output gap (y > y*) suggest the Fed should do?',
    options: [
      'Raise the federal funds rate',
      'Lower the federal funds rate',
      'Keep rates unchanged',
      'Increase the money supply',
    ],
    correctIndex: 0,
    explanation:
      'A positive output gap means actual GDP exceeds potential, signaling overheating. The Taylor Rule prescribes a higher rate to cool demand and prevent inflation from rising above target.',
    difficulty: 'medium',
    moduleId: 7,
    conceptId: '7-taylor-rule',
  },
  {
    id: 'q7-5',
    question:
      'The natural rate of unemployment includes which types of unemployment?',
    options: [
      'Frictional and structural',
      'Cyclical and frictional',
      'Structural and cyclical',
      'Only cyclical',
    ],
    correctIndex: 0,
    explanation:
      'The natural rate includes frictional unemployment (job search between positions) and structural unemployment (skills mismatch), but not cyclical unemployment, which fluctuates with the business cycle.',
    difficulty: 'easy',
    moduleId: 7,
    conceptId: '7-natural-rate-unemployment',
  },
  {
    id: 'q7-6',
    question:
      'Approximately how long does it take for a Fed rate change to fully affect inflation?',
    options: [
      '12 to 18 months',
      '1 to 3 months',
      '3 to 6 months',
      '3 to 5 years',
    ],
    correctIndex: 0,
    explanation:
      'Monetary policy operates with long lags. Short-term market rates adjust quickly, real GDP effects appear in about 6 months, but the full impact on inflation takes 12 to 18 months. This makes policy inherently forward-looking.',
    difficulty: 'medium',
    moduleId: 7,
    conceptId: '7-transmission-lag',
  },
  {
    id: 'q7-7',
    question:
      'Which of the following is NOT a direct transmission channel from the Fed to the real economy?',
    options: [
      'Congressional fiscal appropriations',
      'Business investment spending',
      'Residential housing demand',
      'Exchange rate and net exports',
    ],
    correctIndex: 0,
    explanation:
      'Congressional fiscal appropriations are a fiscal policy tool, not a monetary policy transmission channel. The Fed transmits policy through interest-rate-sensitive channels like business investment, housing, consumer durables, exchange rates, and equity prices.',
    difficulty: 'medium',
    moduleId: 7,
    conceptId: '7-transmission-mechanism',
  },
  {
    id: 'q7-8',
    question:
      'How does a rate hike squeeze bank profitability through the NIM (Net Interest Margin) channel?',
    options: [
      'Deposit rates rise while loan yields are locked in at lower fixed rates',
      'Loan demand increases but deposit supply decreases',
      'Banks must hold more reserves at the Fed',
      'The discount window becomes cheaper, reducing lending incentive',
    ],
    correctIndex: 0,
    explanation:
      'When rates rise, banks must pay higher rates on deposits and short-term funding, but many existing loans are fixed-rate and cannot be repriced immediately. This compresses the net interest margin — the spread between lending income and funding costs.',
    difficulty: 'hard',
    moduleId: 7,
    conceptId: '7-net-interest-margin',
  },
  {
    id: 'q7-9',
    question: 'Stagflation refers to a combination of:',
    options: [
      'High inflation and high unemployment (stagnant growth)',
      'Low inflation and low unemployment',
      'High growth and high inflation',
      'Deflation and rising GDP',
    ],
    correctIndex: 0,
    explanation:
      'Stagflation — stagnation plus inflation — is the nightmare scenario for central banks. Raising rates fights inflation but worsens unemployment; lowering rates fights unemployment but fuels inflation. The 1970s oil shocks produced classic stagflation.',
    difficulty: 'easy',
    moduleId: 7,
    conceptId: '7-stagflation',
  },
  {
    id: 'q7-10',
    question:
      'The Volcker disinflation of the early 1980s demonstrates that:',
    options: [
      'Aggressive rate hikes can break inflation expectations, but at the cost of severe recession',
      'Gradual rate increases are always more effective than sharp hikes',
      'Supply shocks can be cured by increasing the money supply',
      'The Phillips Curve is always vertical in the short run',
    ],
    correctIndex: 0,
    explanation:
      'Fed Chair Volcker raised the fed funds rate above 19% in 1981, triggering a deep recession (10.8% unemployment) but successfully bringing inflation from ~13% down to ~3%. This proved that credible commitment to price stability could re-anchor expectations.',
    difficulty: 'hard',
    moduleId: 7,
    conceptId: '7-stagflation',
  },
  {
    id: 'q7-11',
    question:
      'The K-rule proposed by Milton Friedman calls for:',
    options: [
      'A constant annual growth rate of the money supply regardless of economic conditions',
      'Setting interest rates according to a formula based on inflation and GDP',
      'Unlimited quantitative easing during recessions',
      'Pegging the exchange rate to gold',
    ],
    correctIndex: 0,
    explanation:
      'Friedman\'s K-rule advocates growing the money supply at a fixed rate (k%) each year, eliminating discretionary policy. Critics argue it fails when money demand shifts unpredictably, making the Taylor Rule a more practical alternative.',
    difficulty: 'medium',
    moduleId: 7,
    conceptId: '7-k-rule',
  },
  {
    id: 'q7-12',
    question:
      'A "jobless recovery" occurs when:',
    options: [
      'GDP growth resumes but unemployment stays elevated because firms boost productivity instead of hiring',
      'Unemployment falls but GDP contracts',
      'Both GDP and employment grow rapidly',
      'The government creates public jobs to offset private-sector layoffs',
    ],
    correctIndex: 0,
    explanation:
      'In a jobless recovery, output expands through automation, efficiency gains, and longer hours for existing workers rather than new hiring. This was prominent after the 2001 and 2008 recessions, leaving monetary policy unable to fully close the employment gap.',
    difficulty: 'medium',
    moduleId: 7,
    conceptId: '7-jobless-recovery',
  },
  {
    id: 'q7-13',
    question:
      'The "risk-taking channel" of monetary policy suggests that prolonged low rates can:',
    options: [
      'Encourage excessive leverage and asset bubbles as investors reach for yield',
      'Reduce risk in the banking system by lowering default rates',
      'Eliminate moral hazard in lending decisions',
      'Cause deflation through reduced money supply',
    ],
    correctIndex: 0,
    explanation:
      'When rates stay low for extended periods, investors and banks seek higher returns in riskier assets, households over-leverage through cheap borrowing (e.g., HELOCs), and asset prices can inflate beyond fundamentals — as seen in the mid-2000s housing bubble.',
    difficulty: 'hard',
    moduleId: 7,
    conceptId: '7-risk-taking-channel',
  },
  {
    id: 'q7-14',
    question:
      'What is the output gap?',
    options: [
      'The difference between actual GDP and potential GDP',
      'The spread between short-term and long-term interest rates',
      'The difference between imports and exports',
      'The gap between government revenue and spending',
    ],
    correctIndex: 0,
    explanation:
      'The output gap is the percentage difference between actual GDP and potential GDP. A negative gap (actual < potential) signals economic slack and recessionary pressure; a positive gap signals overheating and inflationary pressure.',
    difficulty: 'easy',
    moduleId: 7,
    conceptId: '7-output-gap',
  },
  {
    id: 'q7-15',
    question:
      'Why are "sticky deposits" important for monetary policy transmission through banks?',
    options: [
      'They initially protect bank margins during rate hikes, but prolonged hikes eventually cause deposit flight to higher-yielding alternatives',
      'They prevent the Fed from changing interest rates',
      'They guarantee depositors a fixed return regardless of market conditions',
      'They make banks immune to interest rate risk',
    ],
    correctIndex: 0,
    explanation:
      'Sticky deposits adjust slowly to rate hikes, initially preserving bank NIM. But as rate hikes persist, depositors eventually move funds to money market funds or T-bills offering higher yields, forcing banks to raise deposit rates or lose funding — amplifying the tightening effect.',
    difficulty: 'hard',
    moduleId: 7,
    conceptId: '7-sticky-deposits',
  },
];
