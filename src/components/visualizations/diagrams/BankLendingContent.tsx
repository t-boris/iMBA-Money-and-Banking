'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface LendingCategory {
  id: string;
  title: string;
  definition: string;
  items: {
    term: string;
    definition: string;
    example?: string;
  }[];
  color: string;
  colorRgb: string;
}

const lendingCategories: LendingCategory[] = [
  {
    id: 'consumer',
    title: 'Consumer Credit',
    definition: 'Loans made to households and individuals.',
    items: [
      {
        term: 'Mortgage',
        definition: 'A loan secured by residential real estate',
        example: 'Home purchase loan',
      },
      {
        term: 'Home Equity Loan',
        definition: "A loan backed by the borrower's home equity",
        example: 'Second mortgage for renovations',
      },
      {
        term: 'Credit Card Loan',
        definition: 'A revolving unsecured consumer loan',
        example: 'Visa, Mastercard balances',
      },
      { term: 'Auto Loan', definition: 'A loan to purchase vehicles', example: 'Car financing' },
      {
        term: 'Student Loan',
        definition: 'A loan for education expenses',
        example: 'Federal and private education loans',
      },
    ],
    color: 'emerald',
    colorRgb: '16, 185, 129',
  },
  {
    id: 'commercial',
    title: 'Commercial & Industrial (C&I)',
    definition: 'Loans made to businesses for operations and investment.',
    items: [
      {
        term: 'Commercial Real Estate',
        definition: 'Loans backed by income-producing property',
        example: 'Office building, retail center',
      },
      {
        term: 'Term Loan',
        definition: 'A long-term loan used for investment',
        example: 'Equipment purchase, expansion',
      },
      {
        term: 'Business Line of Credit',
        definition: 'A revolving credit facility for firms',
        example: 'Working capital needs',
      },
    ],
    color: 'primary',
    colorRgb: '99, 102, 241',
  },
];

const borrowerTypes = [
  {
    type: 'Large Corporations',
    description: 'Often bypass banks entirely',
    reason: 'Plenty of public information available',
    method: 'Direct Finance — issue bonds or stocks',
    icon: '🏢',
    bankRole: 'Low',
  },
  {
    type: 'Middle-Market Firms',
    description: "Banks' primary customer base",
    reason: 'Information-opaque, high adverse selection risk',
    method: 'Relationship Lending — long-term partnerships',
    icon: '🏭',
    bankRole: 'High',
  },
  {
    type: 'Small Business',
    description: 'Highest risk segment',
    reason: 'Limited track record, high failure rates',
    method: 'Personal Guarantee or SBA Guarantee',
    icon: '🏪',
    bankRole: 'Medium',
  },
  {
    type: 'Households',
    description: 'High volume, standardized products',
    reason: 'Requires scale for profitability',
    method: 'Automated underwriting, securitization',
    icon: '🏠',
    bankRole: 'Medium',
  },
];

const loanFeatures = [
  {
    term: 'Interest Rate',
    definition: 'The price paid for borrowing money',
    details: [
      "Fixed rate — doesn't change, reduces uncertainty",
      'Variable rate — moves with market, shifts risk to borrower',
    ],
  },
  {
    term: 'Collateral',
    definition: 'Assets pledged by the borrower to secure a loan',
    details: ['Reduces bank risk', 'Lowers interest rate', 'Examples: house, car, equipment'],
  },
  {
    term: 'Covenants',
    definition: 'Contractual clauses that restrict borrower behavior',
    details: [
      'Limits on additional debt',
      'Financial ratio requirements',
      'Disclosure obligations',
    ],
  },
  {
    term: 'Senior Debt',
    definition: 'Debt that has first priority in bankruptcy',
    details: ['Senior debt paid first', 'Then subordinated debt', 'Shareholders paid last'],
  },
];

export function BankLendingContent({ className }: { className?: string }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Section 1: Loan Features */}
      <section style={{ marginBottom: '40px' }}>
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
          }}
        >
          Key Loan Features
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
          }}
        >
          {loanFeatures.map((feature, index) => (
            <motion.div
              key={feature.term}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveFeature(activeFeature === feature.term ? null : feature.term)}
              style={{
                padding: '16px',
                backgroundColor: 'var(--color-surface-1)',
                borderRadius: '12px',
                border:
                  activeFeature === feature.term
                    ? '2px solid var(--color-primary-500)'
                    : '2px solid var(--color-surface-2)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '4px',
                }}
              >
                {feature.term}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.5',
                }}
              >
                {feature.definition}
              </div>
              <AnimatePresence>
                {activeFeature === feature.term && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      marginTop: '12px',
                      paddingLeft: '16px',
                      fontSize: '11px',
                      color: 'var(--color-text-muted)',
                      lineHeight: '1.6',
                    }}
                  >
                    {feature.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 2: Lending Categories */}
      <section style={{ marginBottom: '40px' }}>
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
          }}
        >
          Types of Bank Loans
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {lendingCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.15 }}
              onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              style={{
                padding: '20px',
                backgroundColor: `rgba(${category.colorRgb}, 0.1)`,
                borderRadius: '12px',
                border:
                  activeCategory === category.id
                    ? `2px solid rgb(${category.colorRgb})`
                    : `2px solid rgba(${category.colorRgb}, 0.3)`,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <h4
                    style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: `rgb(${category.colorRgb})`,
                    }}
                  >
                    {category.title}
                  </h4>
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--color-text-secondary)',
                      marginTop: '4px',
                    }}
                  >
                    {category.definition}
                  </p>
                </div>
                <div
                  style={{
                    fontSize: '20px',
                    transform: activeCategory === category.id ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s',
                  }}
                >
                  ▼
                </div>
              </div>

              <AnimatePresence>
                {activeCategory === category.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '10px',
                        marginTop: '16px',
                      }}
                    >
                      {category.items.map((item) => (
                        <div
                          key={item.term}
                          style={{
                            padding: '12px',
                            backgroundColor: `rgba(${category.colorRgb}, 0.08)`,
                            borderRadius: '8px',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '13px',
                              fontWeight: 600,
                              color: 'var(--color-text-primary)',
                            }}
                          >
                            {item.term}
                          </div>
                          <div
                            style={{
                              fontSize: '11px',
                              color: 'var(--color-text-secondary)',
                              marginTop: '4px',
                            }}
                          >
                            {item.definition}
                          </div>
                          {item.example && (
                            <div
                              style={{
                                fontSize: '10px',
                                color: 'var(--color-text-muted)',
                                marginTop: '4px',
                                fontStyle: 'italic',
                              }}
                            >
                              e.g., {item.example}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 3: Who Borrows from Banks */}
      <section style={{ marginBottom: '24px' }}>
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
          }}
        >
          Who Borrows from Banks?
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
          }}
        >
          {borrowerTypes.map((borrower, index) => (
            <motion.div
              key={borrower.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              style={{
                padding: '16px',
                backgroundColor: 'var(--color-surface-1)',
                borderRadius: '12px',
                border: '1px solid var(--color-surface-2)',
              }}
            >
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}
              >
                <span style={{ fontSize: '24px' }}>{borrower.icon}</span>
                <span
                  style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text-primary)' }}
                >
                  {borrower.type}
                </span>
              </div>
              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '8px',
                }}
              >
                {borrower.description}
              </p>
              <div
                style={{ fontSize: '11px', color: 'var(--color-text-muted)', lineHeight: '1.6' }}
              >
                <div>
                  <strong>Why:</strong> {borrower.reason}
                </div>
                <div>
                  <strong>How:</strong> {borrower.method}
                </div>
              </div>
              <div
                style={{
                  marginTop: '10px',
                  padding: '4px 8px',
                  backgroundColor:
                    borrower.bankRole === 'High'
                      ? 'rgba(16, 185, 129, 0.2)'
                      : borrower.bankRole === 'Medium'
                        ? 'rgba(245, 158, 11, 0.2)'
                        : 'rgba(239, 68, 68, 0.2)',
                  borderRadius: '4px',
                  display: 'inline-block',
                  fontSize: '10px',
                  fontWeight: 600,
                  color:
                    borrower.bankRole === 'High'
                      ? 'rgb(16, 185, 129)'
                      : borrower.bankRole === 'Medium'
                        ? 'rgb(245, 158, 11)'
                        : 'rgb(239, 68, 68)',
                }}
              >
                Bank Role: {borrower.bankRole}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Key Concepts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{
          padding: '16px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
        }}
      >
        <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>
          <strong style={{ color: 'var(--color-primary-500)' }}>
            Key Concept — Relationship Lending:
          </strong>{' '}
          For information-opaque borrowers (middle-market firms), banks provide value through
          long-term relationships and private information gathering. Credit officers develop deep
          understanding of the business, reducing adverse selection risk that would make direct
          market financing impossible.
        </div>
      </motion.div>

      <p
        style={{
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          marginTop: '16px',
        }}
      >
        Click on any section to expand details
      </p>
    </div>
  );
}
