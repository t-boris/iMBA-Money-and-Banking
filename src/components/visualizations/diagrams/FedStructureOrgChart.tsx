'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { Entity } from '@/components/visualizations/Entity';

interface FedStructureOrgChartProps {
  className?: string;
}

type TabId = 'governors' | 'reserve-banks' | 'fomc';

const tabDefinitions: Array<{ id: TabId; label: string; icon: string }> = [
  { id: 'governors', label: 'Board of Governors', icon: '\u{1F3DB}' },
  { id: 'reserve-banks', label: '12 Reserve Banks', icon: '\u{1F3E6}' },
  { id: 'fomc', label: 'FOMC', icon: '\u{1F4CA}' },
];

interface ReserveBank {
  district: number;
  city: string;
  state: string;
  isNYFed: boolean;
  details: string;
}

const reserveBanks: ReserveBank[] = [
  { district: 1, city: 'Boston', state: 'MA', isNYFed: false, details: 'Covers New England region. Known for economic research on labor markets and regional economics.' },
  { district: 2, city: 'New York', state: 'NY', isNYFed: true, details: 'First among equals: its president always votes on the FOMC and it conducts open market operations on behalf of the entire System. Supervises the largest financial institutions.' },
  { district: 3, city: 'Philadelphia', state: 'PA', isNYFed: false, details: 'Publishes the Survey of Professional Forecasters and the Livingston Survey, two of the oldest economic forecast surveys.' },
  { district: 4, city: 'Cleveland', state: 'OH', isNYFed: false, details: 'Known for research on inflation expectations and monetary policy. Publishes the Median CPI measure.' },
  { district: 5, city: 'Richmond', state: 'VA', isNYFed: false, details: 'Covers the mid-Atlantic and Southeast. Hosts the Federal Reserve\'s technology infrastructure.' },
  { district: 6, city: 'Atlanta', state: 'GA', isNYFed: false, details: 'Covers the Deep South. Publishes the GDPNow real-time economic forecast widely followed by markets.' },
  { district: 7, city: 'Chicago', state: 'IL', isNYFed: false, details: 'Second largest Reserve Bank by assets. Covers the agricultural and industrial heartland of America.' },
  { district: 8, city: 'St. Louis', state: 'MO', isNYFed: false, details: 'Home to FRED (Federal Reserve Economic Data), the most comprehensive free economic database in the world.' },
  { district: 9, city: 'Minneapolis', state: 'MN', isNYFed: false, details: 'Known for research on too-big-to-fail policy and banking regulation. Covers the upper Midwest and Montana.' },
  { district: 10, city: 'Kansas City', state: 'MO', isNYFed: false, details: 'Hosts the annual Jackson Hole Economic Symposium, where central bankers worldwide gather each August.' },
  { district: 11, city: 'Dallas', state: 'TX', isNYFed: false, details: 'Covers Texas, northern Louisiana, and southern New Mexico. Known for energy sector analysis and Trimmed Mean PCE inflation measure.' },
  { district: 12, city: 'San Francisco', state: 'CA', isNYFed: false, details: 'Largest district by geography, covering the western U.S., Alaska, Hawaii, and Pacific territories.' },
];

interface FOMCMember {
  role: string;
  description: string;
  alwaysVotes: boolean;
  count: number;
}

const fomcMembers: FOMCMember[] = [
  { role: 'Board of Governors', description: 'All 7 governors are permanent voting members of the FOMC', alwaysVotes: true, count: 7 },
  { role: 'NY Fed President', description: 'Vice Chair of the FOMC and permanent voting member. Executes open market operations.', alwaysVotes: true, count: 1 },
  { role: 'Rotating Reserve Bank Presidents', description: '4 of the remaining 11 Reserve Bank presidents vote on a rotating annual basis. All 12 presidents attend and participate in discussions.', alwaysVotes: false, count: 4 },
];

const rotationGroups = [
  { group: 'Group A', banks: ['Cleveland', 'Chicago'], note: 'Alternate annually' },
  { group: 'Group B', banks: ['Boston', 'Philadelphia', 'Richmond'], note: 'One per year' },
  { group: 'Group C', banks: ['Atlanta', 'St. Louis', 'Dallas'], note: 'One per year' },
  { group: 'Group D', banks: ['Minneapolis', 'Kansas City', 'San Francisco'], note: 'One per year' },
];

export default function FedStructureOrgChart({ className }: FedStructureOrgChartProps) {
  const [activeTab, setActiveTab] = useState<TabId>('governors');
  const [selectedBank, setSelectedBank] = useState<number | null>(null);

  return (
    <div className={cn('w-full max-w-5xl mx-auto', className)}>
      {/* Header */}
      <div
        className={cn(
          'rounded-2xl border border-glass-border p-5 mb-6',
          'bg-gradient-to-br from-primary-500/10 to-surface-1'
        )}
      >
        <h3 className="text-lg font-bold text-text-primary">
          Structure of the Federal Reserve System
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          Three interconnected components: a Board of Governors, 12 regional Reserve Banks, and the FOMC
        </p>
      </div>

      {/* Tab Navigation */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '16px',
        }}
      >
        {tabDefinitions.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSelectedBank(null);
            }}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 600,
              border: '1px solid',
              borderColor:
                activeTab === tab.id
                  ? 'var(--color-primary)'
                  : 'var(--color-surface-2)',
              backgroundColor:
                activeTab === tab.id
                  ? 'color-mix(in srgb, var(--color-primary) 15%, transparent)'
                  : 'var(--color-surface-1)',
              color:
                activeTab === tab.id
                  ? 'var(--color-primary)'
                  : 'var(--color-text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'governors' && (
          <motion.div
            key="governors"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <GovernorsSection />
          </motion.div>
        )}

        {activeTab === 'reserve-banks' && (
          <motion.div
            key="reserve-banks"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <ReserveBanksSection
              selectedBank={selectedBank}
              onSelectBank={setSelectedBank}
            />
          </motion.div>
        )}

        {activeTab === 'fomc' && (
          <motion.div
            key="fomc"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <FOMCSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section 1: Board of Governors                                      */
/* ------------------------------------------------------------------ */

function GovernorsSection() {
  return (
    <div
      className={cn(
        'rounded-2xl p-6',
        'bg-glass-light backdrop-blur-md',
        'border border-glass-border shadow-glass'
      )}
    >
      {/* Section header */}
      <div className="mb-6">
        <h4 className="text-base font-bold text-text-primary mb-1">
          Board of Governors
        </h4>
        <p className="text-sm text-text-secondary">
          The central authority of the Federal Reserve System, based in Washington, D.C.
        </p>
      </div>

      {/* Key facts grid */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
      >
        {[
          { label: 'Members', value: '7', icon: '\u{1F465}' },
          { label: 'Term Length', value: '14 years', icon: '\u{23F3}' },
          { label: 'Chair Term', value: '4 years', icon: '\u{1F451}' },
          { label: 'Location', value: 'Washington, D.C.', icon: '\u{1F4CD}' },
        ].map((fact, index) => (
          <motion.div
            key={fact.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <Entity
              icon={fact.icon}
              label={fact.label}
              value={fact.value}
            />
          </motion.div>
        ))}
      </div>

      {/* Governor seats visualization */}
      <div
        className={cn(
          'p-5 rounded-xl',
          'bg-surface-1 border border-surface-2'
        )}
      >
        <h5 className="text-sm font-semibold text-text-primary mb-4">
          7 Governor Seats (14-year staggered terms)
        </h5>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          {Array.from({ length: 7 }, (_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.15 + i * 0.06,
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
              className={cn(
                'flex flex-col items-center gap-1 p-3 rounded-lg',
                'border transition-all',
                i === 0
                  ? 'bg-primary-500/15 border-primary-500/50'
                  : 'bg-surface-1 border-surface-2'
              )}
            >
              <span className="text-2xl">
                {i === 0 ? '\u{1F451}' : '\u{1F464}'}
              </span>
              <span
                className={cn(
                  'text-xs font-medium',
                  i === 0 ? 'text-primary-500' : 'text-text-secondary'
                )}
              >
                {i === 0 ? 'Chair' : `Seat ${i + 1}`}
              </span>
              <span className="text-[10px] text-text-muted">
                {i === 0 ? '4-yr term' : '14-yr term'}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Appointment process */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={cn(
          'mt-4 p-4 rounded-lg',
          'bg-surface-secondary/50 border border-glass-border'
        )}
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary-500/10 flex-shrink-0">
            <svg
              className="w-5 h-5 text-primary-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary mb-1">
              Appointment Process
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Governors are appointed by the President of the United States and confirmed by the
              Senate. The 14-year staggered terms ensure no single president can pack the Board.
              One term expires every two years on January 31. The Chair is designated from among
              the governors for a renewable 4-year term.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section 2: 12 Federal Reserve Banks                                */
/* ------------------------------------------------------------------ */

interface ReserveBanksSectionProps {
  selectedBank: number | null;
  onSelectBank: (district: number | null) => void;
}

function ReserveBanksSection({ selectedBank, onSelectBank }: ReserveBanksSectionProps) {
  const selected = reserveBanks.find((b) => b.district === selectedBank);

  return (
    <div
      className={cn(
        'rounded-2xl p-6',
        'bg-glass-light backdrop-blur-md',
        'border border-glass-border shadow-glass'
      )}
    >
      {/* Section header */}
      <div className="mb-6">
        <h4 className="text-base font-bold text-text-primary mb-1">
          12 Federal Reserve Banks
        </h4>
        <p className="text-sm text-text-secondary">
          Each Reserve Bank serves its district and provides a regional perspective on the economy
        </p>
      </div>

      {/* Bank grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-5">
        {reserveBanks.map((bank, index) => (
          <motion.div
            key={bank.district}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.04,
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
          >
            <Entity
              icon={bank.isNYFed ? '\u{2B50}' : '\u{1F3E6}'}
              label={bank.city}
              value={`District ${bank.district}`}
              subtext={bank.isNYFed ? 'First among equals' : bank.state}
              highlighted={selectedBank === bank.district}
              onClick={() =>
                onSelectBank(
                  selectedBank === bank.district ? null : bank.district
                )
              }
            />
          </motion.div>
        ))}
      </div>

      {/* Selected bank detail panel */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.district}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className={cn(
              'p-5 rounded-xl mb-5',
              'bg-surface-1 border',
              selected.isNYFed
                ? 'border-amber-500/50'
                : 'border-primary-500/50'
            )}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">
                {selected.isNYFed ? '\u{2B50}' : '\u{1F3E6}'}
              </span>
              <div>
                <h5 className="text-base font-bold text-text-primary">
                  Federal Reserve Bank of {selected.city}
                </h5>
                <span className="text-xs text-text-muted">
                  District {selected.district}
                </span>
              </div>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {selected.details}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NY Fed callout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={cn(
          'p-4 rounded-lg',
          'bg-amber-500/10 border border-amber-500/30'
        )}
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">{'\u{2B50}'}</span>
          <div>
            <p className="text-sm font-semibold text-amber-500 mb-1">
              NY Fed: First Among Equals
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              The Federal Reserve Bank of New York holds a unique position. Its president is a
              permanent voting member and Vice Chair of the FOMC. The NY Fed executes all open
              market operations (buying and selling Treasury securities), manages the System Open
              Market Account (SOMA), and serves as the U.S. government&apos;s fiscal agent. It
              also supervises some of the world&apos;s largest financial institutions.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Hint */}
      {!selected && (
        <p className="text-center text-sm text-text-tertiary mt-4">
          Click on any Reserve Bank to see details about its district
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section 3: FOMC Composition                                        */
/* ------------------------------------------------------------------ */

function FOMCSection() {
  return (
    <div
      className={cn(
        'rounded-2xl p-6',
        'bg-glass-light backdrop-blur-md',
        'border border-glass-border shadow-glass'
      )}
    >
      {/* Section header */}
      <div className="mb-6">
        <h4 className="text-base font-bold text-text-primary mb-1">
          Federal Open Market Committee (FOMC)
        </h4>
        <p className="text-sm text-text-secondary">
          The monetary policy decision-making body that sets the federal funds rate target
        </p>
      </div>

      {/* Meeting frequency */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'mb-6 p-4 rounded-xl text-center',
          'bg-surface-1 border border-surface-2'
        )}
      >
        <span className="text-3xl">{'\u{1F4C5}'}</span>
        <p className="text-sm font-semibold text-text-primary mt-2">
          Meets 8 times per year
        </p>
        <p className="text-xs text-text-muted mt-1">
          Approximately every 6 weeks, with additional meetings as needed
        </p>
      </motion.div>

      {/* Voting breakdown visualization */}
      <div className="mb-6">
        <h5 className="text-sm font-semibold text-text-primary mb-4">
          12 Voting Members
        </h5>

        {/* Visual bar showing composition */}
        <div className="mb-4">
          <div className="flex h-10 rounded-lg overflow-hidden border border-surface-2">
            <motion.div
              className="flex items-center justify-center bg-primary-500/80"
              initial={{ width: 0 }}
              animate={{ width: `${(7 / 12) * 100}%` }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="text-xs font-bold text-white whitespace-nowrap px-2">
                7 Governors
              </span>
            </motion.div>
            <motion.div
              className="flex items-center justify-center bg-amber-500/80"
              initial={{ width: 0 }}
              animate={{ width: `${(1 / 12) * 100}%` }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <span className="text-xs font-bold text-white whitespace-nowrap px-1">
                NY
              </span>
            </motion.div>
            <motion.div
              className="flex items-center justify-center bg-emerald-500/80"
              initial={{ width: 0 }}
              animate={{ width: `${(4 / 12) * 100}%` }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <span className="text-xs font-bold text-white whitespace-nowrap px-2">
                4 Rotating
              </span>
            </motion.div>
          </div>
          <div className="flex mt-2 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-primary-500/80" />
              <span className="text-xs text-text-secondary">
                Board of Governors (always vote)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-amber-500/80" />
              <span className="text-xs text-text-secondary">
                NY Fed (always votes)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-emerald-500/80" />
              <span className="text-xs text-text-secondary">
                Rotating presidents
              </span>
            </div>
          </div>
        </div>

        {/* Member cards */}
        <div className="space-y-3">
          {fomcMembers.map((member, index) => (
            <motion.div
              key={member.role}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={cn(
                'p-4 rounded-lg border',
                member.alwaysVotes
                  ? 'bg-primary-500/5 border-primary-500/30'
                  : 'bg-emerald-500/5 border-emerald-500/30'
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {member.alwaysVotes ? '\u{2705}' : '\u{1F504}'}
                  </span>
                  <span className="text-sm font-semibold text-text-primary">
                    {member.role}
                  </span>
                </div>
                <span
                  className={cn(
                    'text-xs font-bold px-2 py-1 rounded-full',
                    member.alwaysVotes
                      ? 'bg-primary-500/15 text-primary-500'
                      : 'bg-emerald-500/15 text-emerald-500'
                  )}
                >
                  {member.count} {member.count === 1 ? 'vote' : 'votes'}
                </span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Rotation groups */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className={cn(
          'p-5 rounded-xl',
          'bg-surface-1 border border-surface-2'
        )}
      >
        <h5 className="text-sm font-semibold text-text-primary mb-4">
          Rotation Schedule for Reserve Bank Votes
        </h5>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {rotationGroups.map((group, index) => (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.08 }}
              className={cn(
                'p-3 rounded-lg',
                'bg-surface-secondary/50 border border-glass-border'
              )}
            >
              <p className="text-xs font-bold text-emerald-500 mb-2">
                {group.group}
              </p>
              {group.banks.map((bank) => (
                <p
                  key={bank}
                  className="text-sm text-text-primary leading-relaxed"
                >
                  {bank}
                </p>
              ))}
              <p className="text-[10px] text-text-muted mt-2 italic">
                {group.note}
              </p>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-text-muted mt-3 text-center">
          Non-voting presidents still attend all meetings and participate fully in policy discussions
        </p>
      </motion.div>

      {/* Key insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className={cn(
          'mt-5 p-4 rounded-lg',
          'bg-surface-secondary/50 border border-glass-border'
        )}
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary-500/10 flex-shrink-0">
            <svg
              className="w-5 h-5 text-primary-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary mb-1">
              Why This Structure Matters
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              The FOMC blends centralized expertise (Board governors, appointed by the
              President) with decentralized regional intelligence (Reserve Bank presidents,
              chosen by their boards). This design ensures monetary policy reflects both
              national priorities and local economic conditions across a diverse continental
              economy.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
