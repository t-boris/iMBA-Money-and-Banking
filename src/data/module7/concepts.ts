import { Concept } from '@/types';

export const module7Concepts: Concept[] = [
  // === Lesson 7-0: Overview ===
  {
    id: '7-dual-mandate-goals',
    term: 'Dual Mandate',
    definition:
      'The Fed\'s two statutory objectives — maximum employment and stable prices (~2% inflation). All monetary policy actions aim to move the economy toward these goals simultaneously.',
    category: 'regulation',
    relatedConcepts: ['7-output-gap', '7-inflation-gap', '7-taylor-rule'],
    lessonId: '7-0',
  },
  {
    id: '7-gdp',
    term: 'Gross Domestic Product (GDP)',
    definition:
      'The total market value of all final goods and services produced within a country in a given period. Nominal GDP uses current prices; Real GDP adjusts for inflation to measure actual output growth.',
    category: 'economy',
    relatedConcepts: ['7-real-gdp', '7-potential-gdp', '7-okuns-law'],
    lessonId: '7-0',
  },

  // === Lesson 7-1.1: Economic Growth and Unemployment ===
  {
    id: '7-real-gdp',
    term: 'Real GDP',
    definition:
      'GDP adjusted for changes in the price level, isolating true changes in the quantity of goods and services produced. Used to compare economic output across time periods without inflation distortion.',
    category: 'economy',
    relatedConcepts: ['7-gdp', '7-potential-gdp', '7-okuns-law'],
    lessonId: '7-1.1',
  },
  {
    id: '7-potential-gdp',
    term: 'Potential GDP',
    definition:
      'The maximum sustainable output an economy can produce when labor, capital, and technology are fully utilized without generating inflationary pressure. The gap between actual and potential GDP drives policy decisions.',
    category: 'economy',
    relatedConcepts: ['7-output-gap', '7-real-gdp', '7-natural-rate-unemployment'],
    lessonId: '7-1.1',
  },
  {
    id: '7-unemployment-rate',
    term: 'Unemployment Rate',
    definition:
      'The percentage of the labor force that is jobless and actively seeking work. It excludes discouraged workers and part-time workers who want full-time jobs.',
    category: 'economy',
    relatedConcepts: ['7-natural-rate-unemployment', '7-okuns-law', '7-phillips-curve'],
    lessonId: '7-1.1',
  },
  {
    id: '7-okuns-law',
    term: 'Okun\'s Law',
    definition:
      'An empirical relationship stating that for every 1 percentage point of GDP growth above trend, unemployment falls by roughly 0.5 percentage points. Conversely, a 2% GDP shortfall raises unemployment by ~1 point.',
    category: 'economy',
    relatedConcepts: ['7-real-gdp', '7-unemployment-rate', '7-natural-rate-unemployment'],
    lessonId: '7-1.1',
  },
  {
    id: '7-natural-rate-unemployment',
    term: 'Natural Rate of Unemployment',
    definition:
      'The unemployment rate consistent with stable inflation — includes frictional and structural unemployment but not cyclical. Estimated at roughly 4–5% for the U.S. economy.',
    category: 'economy',
    relatedConcepts: ['7-okuns-law', '7-phillips-curve', '7-output-gap'],
    lessonId: '7-1.1',
  },

  // === Lesson 7-1.2: Unemployment and Inflation ===
  {
    id: '7-cpi',
    term: 'Consumer Price Index (CPI)',
    definition:
      'A measure of the average change in prices paid by urban consumers for a fixed basket of goods and services. Headline CPI includes food and energy; core CPI excludes them for a less volatile reading.',
    category: 'economy',
    relatedConcepts: ['7-ppi', '7-inflation-expectations', '7-phillips-curve'],
    lessonId: '7-1.2',
  },
  {
    id: '7-ppi',
    term: 'Producer Price Index (PPI)',
    definition:
      'Measures the average change in selling prices received by domestic producers for their output. PPI often leads CPI because producer cost increases tend to be passed through to consumers.',
    category: 'economy',
    relatedConcepts: ['7-cpi', '7-inflation-expectations'],
    lessonId: '7-1.2',
  },
  {
    id: '7-phillips-curve',
    term: 'Phillips Curve',
    definition:
      'An inverse relationship between unemployment and inflation: when unemployment falls below the natural rate, inflation tends to rise, and vice versa. The curve shifts outward when inflation expectations increase.',
    category: 'economy',
    relatedConcepts: ['7-inflation-expectations', '7-natural-rate-unemployment', '7-stagflation'],
    lessonId: '7-1.2',
  },
  {
    id: '7-inflation-expectations',
    term: 'Inflation Expectations',
    definition:
      'The rate at which people expect prices to rise in the future. Well-anchored expectations (near 2%) keep the Phillips Curve stable; unanchored expectations cause it to shift, making the inflation-unemployment tradeoff worse.',
    category: 'economy',
    relatedConcepts: ['7-phillips-curve', '7-stagflation', '7-taylor-rule'],
    lessonId: '7-1.2',
  },

  // === Lesson 7-1.3: Monetary Policy Rules ===
  {
    id: '7-output-gap',
    term: 'Output Gap',
    definition:
      'The difference between actual GDP and potential GDP, expressed as a percentage. A positive gap signals overheating (inflationary pressure); a negative gap signals slack (recessionary conditions).',
    category: 'economy',
    relatedConcepts: ['7-potential-gdp', '7-taylor-rule', '7-inflation-gap'],
    lessonId: '7-1.3',
  },
  {
    id: '7-inflation-gap',
    term: 'Inflation Gap',
    definition:
      'The difference between the current inflation rate and the central bank\'s target rate (typically 2%). A positive inflation gap calls for tighter policy; a negative gap may call for easing.',
    category: 'economy',
    relatedConcepts: ['7-output-gap', '7-taylor-rule', '7-dual-mandate-goals'],
    lessonId: '7-1.3',
  },
  {
    id: '7-taylor-rule',
    term: 'Taylor Rule',
    definition:
      'A formula prescribing the fed funds rate: i = r* + \u03C0 + 0.5(\u03C0 \u2212 \u03C0*) + 0.5(y \u2212 y*), where r* is the equilibrium real rate, \u03C0 is inflation, \u03C0* is target inflation, and (y \u2212 y*) is the output gap. Provides a systematic benchmark for rate-setting.',
    category: 'regulation',
    relatedConcepts: ['7-output-gap', '7-inflation-gap', '7-k-rule'],
    lessonId: '7-1.3',
  },
  {
    id: '7-k-rule',
    term: 'K-rule (Constant Money Growth Rule)',
    definition:
      'Milton Friedman\'s proposal that the central bank should increase the money supply at a fixed rate (k%) each year, eliminating discretionary policy. Criticized for being too rigid when money demand shifts unpredictably.',
    category: 'regulation',
    relatedConcepts: ['7-taylor-rule', '7-dual-mandate-goals'],
    lessonId: '7-1.3',
  },
  {
    id: '7-nominal-interest-rate',
    term: 'Nominal Interest Rate',
    definition:
      'The stated interest rate not adjusted for inflation. The Fisher equation links it to the real rate: nominal rate = real rate + expected inflation. Central banks set nominal rate targets.',
    category: 'financial-system',
    relatedConcepts: ['7-taylor-rule', '7-inflation-expectations'],
    lessonId: '7-1.3',
  },

  // === Lesson 7-2.1: Market Rates, Spending, and Lags ===
  {
    id: '7-transmission-mechanism',
    term: 'Monetary Policy Transmission Mechanism',
    definition:
      'The chain of effects through which a central bank rate change influences market interest rates, asset prices, spending decisions, and ultimately GDP and inflation. Operates with significant lags of 6 to 18 months.',
    category: 'economy',
    relatedConcepts: ['7-transmission-lag', '7-net-interest-margin'],
    lessonId: '7-2.1',
  },
  {
    id: '7-transmission-lag',
    term: 'Transmission Lag',
    definition:
      'The delay between a policy rate change and its full impact on the real economy. Short-term rates adjust quickly, but effects on GDP take ~6 months and inflation ~12–18 months, making monetary policy inherently forward-looking.',
    category: 'economy',
    relatedConcepts: ['7-transmission-mechanism', '7-taylor-rule'],
    lessonId: '7-2.1',
  },

  // === Lesson 7-2.2: Transmission Through Banks ===
  {
    id: '7-net-interest-margin',
    term: 'Net Interest Margin (NIM)',
    definition:
      'The spread between a bank\'s interest income on loans/securities and its interest expense on deposits/borrowings, divided by average earning assets. Rate hikes can compress NIM when deposit rates rise faster than loan yields adjust.',
    category: 'financial-system',
    relatedConcepts: ['7-sticky-deposits', '7-transmission-mechanism'],
    lessonId: '7-2.2',
  },
  {
    id: '7-sticky-deposits',
    term: 'Sticky Deposits',
    definition:
      'Bank deposits whose rates adjust slowly and incompletely to market rate changes, giving banks a funding advantage during rate hikes. However, large and prolonged hikes eventually cause depositors to seek higher-yielding alternatives.',
    category: 'financial-system',
    relatedConcepts: ['7-net-interest-margin', '7-transmission-mechanism'],
    lessonId: '7-2.2',
  },

  // === Lesson 7-3.1: Supply Shocks and Stagflation ===
  {
    id: '7-stagflation',
    term: 'Stagflation',
    definition:
      'A combination of stagnant economic growth (or recession) with high inflation — the worst-case scenario for monetary policy because fighting inflation with higher rates worsens unemployment and vice versa. Occurred in the U.S. in the 1970s after oil price shocks.',
    category: 'economy',
    relatedConcepts: ['7-phillips-curve', '7-inflation-expectations', '7-supply-shock'],
    lessonId: '7-3.1',
  },
  {
    id: '7-supply-shock',
    term: 'Supply Shock',
    definition:
      'An unexpected event that suddenly changes the supply of a commodity or service, shifting costs economy-wide. The 1973 and 1979 oil embargoes are classic examples: oil prices quadrupled, raising production costs and consumer prices simultaneously.',
    category: 'economy',
    relatedConcepts: ['7-stagflation', '7-phillips-curve'],
    lessonId: '7-3.1',
  },

  // === Lesson 7-3.2: Jobless Recoveries and Risk-Taking ===
  {
    id: '7-jobless-recovery',
    term: 'Jobless Recovery',
    definition:
      'An economic recovery in which GDP growth resumes but unemployment remains elevated for an extended period. Firms boost output through productivity gains and technology rather than new hiring, leaving workers behind.',
    category: 'economy',
    relatedConcepts: ['7-okuns-law', '7-natural-rate-unemployment'],
    lessonId: '7-3.2',
  },
  {
    id: '7-risk-taking-channel',
    term: 'Risk-Taking Channel',
    definition:
      'The mechanism through which prolonged low interest rates encourage banks, businesses, and households to take on excessive risk — reaching for yield in riskier assets, over-leveraging through cheap borrowing, and inflating asset bubbles.',
    category: 'risk',
    relatedConcepts: ['7-jobless-recovery', '7-stagflation'],
    lessonId: '7-3.2',
  },
];
