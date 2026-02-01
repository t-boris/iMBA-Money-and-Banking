'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface Division {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  revenue: number; // percentage
  activities: {
    name: string;
    description: string;
    examples: string[];
  }[];
}

const divisions: Division[] = [
  {
    id: 'banking',
    name: 'Banking Division',
    icon: '📊',
    color: 'rgb(99, 102, 241)',
    bgColor: 'rgba(99, 102, 241, 0.15)',
    revenue: 25,
    activities: [
      {
        name: 'M&A Advisory',
        description: 'Advise companies on mergers and acquisitions',
        examples: ['Buy-side advisory', 'Sell-side advisory', 'Valuations', 'Due diligence'],
      },
      {
        name: 'Equity Underwriting',
        description: 'Help companies raise equity capital',
        examples: ['IPOs', 'Seasoned offerings', 'Book building', 'Price discovery'],
      },
      {
        name: 'Debt Underwriting',
        description: 'Help companies raise debt capital',
        examples: ['Bond issuance', 'Syndicated loans', 'Leveraged finance', 'High-yield bonds'],
      },
    ],
  },
  {
    id: 'markets',
    name: 'Markets Division',
    icon: '📈',
    color: 'rgb(245, 158, 11)',
    bgColor: 'rgba(245, 158, 11, 0.15)',
    revenue: 75,
    activities: [
      {
        name: 'Equities',
        description: 'Stock trading and research',
        examples: ['Sales & trading', 'Market making', 'Equity research', 'Program trading'],
      },
      {
        name: 'Fixed Income',
        description: 'Bond and derivative trading',
        examples: [
          'Bonds trading',
          'Interest rate derivatives',
          'FX/Commodities',
          'Credit products',
        ],
      },
      {
        name: 'Prime Brokerage',
        description: 'Services for hedge funds and institutions',
        examples: ['Securities lending', 'Custody services', 'Margin financing', 'Clearing'],
      },
    ],
  },
];

interface InvestmentBankStructureProps {
  className?: string;
}

export function InvestmentBankStructure({ className }: InvestmentBankStructureProps) {
  const [expandedDivision, setExpandedDivision] = useState<string | null>('banking');
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const toggleDivision = (id: string) => {
    setExpandedDivision(expandedDivision === id ? null : id);
    setSelectedActivity(null);
  };

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '8px',
          }}
        >
          Investment Bank Structure
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          How investment banks organize their business activities
        </p>
      </div>

      {/* Top Level Entity */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: '20px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          border: '2px solid var(--color-surface-2)',
          textAlign: 'center',
          marginBottom: '16px',
        }}
      >
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏛️</div>
        <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
          Investment Bank
        </div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
          Corporate & Investment Banking
        </div>
      </motion.div>

      {/* Connecting line */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            width: '2px',
            height: '24px',
            backgroundColor: 'var(--color-surface-2)',
          }}
        />
      </div>

      {/* Revenue Split Bar */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{
          marginBottom: '24px',
          padding: '12px 16px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
        }}
      >
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
            marginBottom: '8px',
            textAlign: 'center',
          }}
        >
          Typical Revenue Split
        </div>
        <div
          style={{
            display: 'flex',
            height: '24px',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '25%' }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              backgroundColor: divisions[0].color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'white' }}>25%</span>
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              backgroundColor: divisions[1].color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'white' }}>75%</span>
          </motion.div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
          <span style={{ fontSize: '10px', color: divisions[0].color }}>Banking</span>
          <span style={{ fontSize: '10px', color: divisions[1].color }}>Markets/Trading</span>
        </div>
      </motion.div>

      {/* Divisions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {divisions.map((division, index) => (
          <motion.div
            key={division.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            {/* Division Header */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleDivision(division.id)}
              style={{
                padding: '16px',
                backgroundColor:
                  expandedDivision === division.id ? division.bgColor : 'var(--color-surface-1)',
                borderRadius: expandedDivision === division.id ? '12px 12px 0 0' : '12px',
                border: `2px solid ${expandedDivision === division.id ? division.color : 'var(--color-surface-2)'}`,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '28px' }}>{division.icon}</span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color:
                        expandedDivision === division.id
                          ? division.color
                          : 'var(--color-text-primary)',
                    }}
                  >
                    {division.name}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                    ~{division.revenue}% of revenue
                  </div>
                </div>
                <motion.span
                  animate={{ rotate: expandedDivision === division.id ? 180 : 0 }}
                  style={{
                    fontSize: '16px',
                    color: division.color,
                  }}
                >
                  v
                </motion.span>
              </div>
            </motion.div>

            {/* Expanded Activities */}
            <AnimatePresence>
              {expandedDivision === division.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    overflow: 'hidden',
                    backgroundColor: 'var(--color-surface-1)',
                    borderRadius: '0 0 12px 12px',
                    border: `2px solid ${division.color}`,
                    borderTop: 'none',
                  }}
                >
                  <div style={{ padding: '12px' }}>
                    {division.activities.map((activity, actIndex) => (
                      <motion.div
                        key={activity.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: actIndex * 0.1 }}
                      >
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedActivity(
                              selectedActivity === activity.name ? null : activity.name
                            );
                          }}
                          style={{
                            padding: '10px 12px',
                            backgroundColor:
                              selectedActivity === activity.name ? division.bgColor : 'transparent',
                            borderRadius: '8px',
                            marginBottom: actIndex < division.activities.length - 1 ? '8px' : 0,
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '13px',
                                fontWeight: 500,
                                color:
                                  selectedActivity === activity.name
                                    ? division.color
                                    : 'var(--color-text-primary)',
                              }}
                            >
                              {activity.name}
                            </span>
                            <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
                              {selectedActivity === activity.name ? '-' : '+'}
                            </span>
                          </div>

                          {/* Activity Details */}
                          <AnimatePresence>
                            {selectedActivity === activity.name && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{ overflow: 'hidden' }}
                              >
                                <p
                                  style={{
                                    fontSize: '11px',
                                    color: 'var(--color-text-secondary)',
                                    marginTop: '8px',
                                    marginBottom: '8px',
                                  }}
                                >
                                  {activity.description}
                                </p>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '4px',
                                  }}
                                >
                                  {activity.examples.map((example) => (
                                    <span
                                      key={example}
                                      style={{
                                        padding: '3px 8px',
                                        backgroundColor: division.bgColor,
                                        borderRadius: '4px',
                                        fontSize: '10px',
                                        color: division.color,
                                      }}
                                    >
                                      {example}
                                    </span>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Revenue Type Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
        }}
      >
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
            marginBottom: '12px',
          }}
        >
          Revenue Types by Activity
        </div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '3px',
                backgroundColor: 'rgb(99, 102, 241)',
              }}
            />
            <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
              Advisory: Fee-based
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '3px',
                backgroundColor: 'rgb(16, 185, 129)',
              }}
            />
            <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
              Underwriting: Commission-based
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '3px',
                backgroundColor: 'rgb(245, 158, 11)',
              }}
            />
            <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
              Trading: Spread-based
            </span>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <p
        style={{
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          marginTop: '16px',
        }}
      >
        Click on divisions to expand, then click activities for details
      </p>
    </div>
  );
}
