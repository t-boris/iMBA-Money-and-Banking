'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

type OrgType = 'unit' | 'branch' | 'bhc' | 'fhc';

interface OrgForm {
  id: OrgType;
  name: string;
  subtitle: string;
  era: string;
  pros: string[];
  cons: string[];
  color: string;
  colorRgb: string;
}

const orgForms: OrgForm[] = [
  {
    id: 'unit',
    name: 'Unit Bank',
    subtitle: 'One location only',
    era: '1870-1985 (Illinois model)',
    pros: ['Local focus & community ties', 'Deep knowledge of local market', 'Quick decision-making'],
    cons: ['No geographic diversification', 'Vulnerable to local economic shocks', 'Limited growth potential'],
    color: 'amber',
    colorRgb: '245, 158, 11',
  },
  {
    id: 'branch',
    name: 'Branch Network',
    subtitle: 'Many branches, one bank',
    era: 'California model',
    pros: ['Geographic diversification', 'Economies of scale', 'Broader customer base'],
    cons: ['Still limited by state borders', 'More complex management', 'Less local autonomy'],
    color: 'emerald',
    colorRgb: '16, 185, 129',
  },
  {
    id: 'bhc',
    name: 'Bank Holding Company',
    subtitle: 'One owner, many banks',
    era: '1956 onwards',
    pros: ['Bypass branching restrictions', 'Regulatory arbitrage', 'Cross-state operations'],
    cons: ['Complex corporate structure', 'Regulatory oversight challenges', 'Coordination costs'],
    color: 'primary',
    colorRgb: '99, 102, 241',
  },
  {
    id: 'fhc',
    name: 'Financial Holding Company',
    subtitle: 'Financial supermarket',
    era: '1999 (Gramm-Leach-Bliley)',
    pros: ['Cross-selling opportunities', 'Information advantage', 'Economies of scope'],
    cons: ['Too Big To Fail risk', 'Systemic risk concerns', 'Regulatory complexity'],
    color: 'purple',
    colorRgb: '168, 85, 247',
  },
];

interface BankOrganizationComparisonProps {
  className?: string;
}

function OrgChart({ form, isSelected, onClick }: { form: OrgForm; isSelected: boolean; onClick: () => void }) {
  const renderOrgStructure = () => {
    switch (form.id) {
      case 'unit':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{
              padding: '16px 24px',
              backgroundColor: `rgba(${form.colorRgb}, 0.15)`,
              borderRadius: '12px',
              textAlign: 'center',
              border: `2px solid rgba(${form.colorRgb}, 0.4)`,
            }}>
              <span style={{ fontSize: '32px' }}>🏦</span>
              <div style={{ fontSize: '13px', fontWeight: 600, color: `rgb(${form.colorRgb})`, marginTop: '4px' }}>
                Single Bank
              </div>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textAlign: 'center' }}>
              One location serves<br />the local community
            </div>
          </div>
        );

      case 'branch':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{
              padding: '14px 20px',
              backgroundColor: `rgba(${form.colorRgb}, 0.15)`,
              borderRadius: '12px',
              textAlign: 'center',
              border: `2px solid rgba(${form.colorRgb}, 0.4)`,
            }}>
              <span style={{ fontSize: '28px' }}>🏦</span>
              <div style={{ fontSize: '12px', fontWeight: 600, color: `rgb(${form.colorRgb})` }}>
                Headquarters
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '2px', height: '16px', backgroundColor: `rgb(${form.colorRgb})` }} />
                  <div style={{
                    padding: '8px 12px',
                    backgroundColor: `rgba(${form.colorRgb}, 0.1)`,
                    borderRadius: '8px',
                    textAlign: 'center',
                    border: `1px solid rgba(${form.colorRgb}, 0.3)`,
                  }}>
                    <span style={{ fontSize: '18px' }}>🏦</span>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>Branch {i}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'bhc':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{
              padding: '14px 20px',
              backgroundColor: `rgba(${form.colorRgb}, 0.15)`,
              borderRadius: '12px',
              textAlign: 'center',
              border: `2px solid rgba(${form.colorRgb}, 0.4)`,
            }}>
              <span style={{ fontSize: '28px' }}>🏢</span>
              <div style={{ fontSize: '12px', fontWeight: 600, color: `rgb(${form.colorRgb})` }}>
                Holding Company
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['Bank A', 'Bank B', 'Bank C'].map((name) => (
                <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '2px', height: '16px', backgroundColor: `rgb(${form.colorRgb})` }} />
                  <div style={{
                    padding: '8px 12px',
                    backgroundColor: `rgba(${form.colorRgb}, 0.1)`,
                    borderRadius: '8px',
                    textAlign: 'center',
                    border: `1px solid rgba(${form.colorRgb}, 0.3)`,
                  }}>
                    <span style={{ fontSize: '18px' }}>🏦</span>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>{name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'fhc':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{
              padding: '14px 20px',
              backgroundColor: `rgba(${form.colorRgb}, 0.15)`,
              borderRadius: '12px',
              textAlign: 'center',
              border: `2px solid rgba(${form.colorRgb}, 0.4)`,
            }}>
              <span style={{ fontSize: '28px' }}>🏢</span>
              <div style={{ fontSize: '12px', fontWeight: 600, color: `rgb(${form.colorRgb})` }}>
                Financial Holding Co.
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { icon: '🏦', label: 'Bank' },
                { icon: '📈', label: 'Investment' },
                { icon: '🛡️', label: 'Insurance' },
              ].map((sub) => (
                <div key={sub.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '2px', height: '16px', backgroundColor: `rgb(${form.colorRgb})` }} />
                  <div style={{
                    padding: '8px 12px',
                    backgroundColor: `rgba(${form.colorRgb}, 0.1)`,
                    borderRadius: '8px',
                    textAlign: 'center',
                    border: `1px solid rgba(${form.colorRgb}, 0.3)`,
                  }}>
                    <span style={{ fontSize: '18px' }}>{sub.icon}</span>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>{sub.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      style={{
        padding: '20px',
        borderRadius: '16px',
        backgroundColor: 'var(--color-surface-1)',
        border: isSelected ? `2px solid rgb(${form.colorRgb})` : '2px solid var(--color-surface-2)',
        cursor: 'pointer',
        transition: 'border-color 0.2s, transform 0.2s',
        minHeight: '280px',
        display: 'flex',
        flexDirection: 'column',
      }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <span style={{
          display: 'inline-block',
          padding: '4px 12px',
          backgroundColor: `rgba(${form.colorRgb}, 0.15)`,
          color: `rgb(${form.colorRgb})`,
          fontWeight: 600,
          fontSize: '13px',
          borderRadius: '6px',
        }}>
          {form.name}
        </span>
        <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
          {form.subtitle}
        </p>
        <p style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
          {form.era}
        </p>
      </div>

      {/* Org Chart */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {renderOrgStructure()}
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              marginTop: '16px',
              padding: '12px',
              backgroundColor: `rgba(${form.colorRgb}, 0.08)`,
              borderRadius: '8px',
              border: `1px solid rgba(${form.colorRgb}, 0.2)`,
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
              <div>
                <div style={{ fontWeight: 600, color: `rgb(${form.colorRgb})`, marginBottom: '6px' }}>
                  Advantages
                </div>
                <ul style={{ margin: 0, paddingLeft: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                  {form.pros.map((pro) => (
                    <li key={pro}>{pro}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                  Disadvantages
                </div>
                <ul style={{ margin: 0, paddingLeft: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                  {form.cons.map((con) => (
                    <li key={con}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function BankOrganizationComparison({ className }: BankOrganizationComparisonProps) {
  const [selectedForm, setSelectedForm] = useState<OrgType | null>(null);

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
          Evolution of Bank Organization
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          From single-location unit banks to diversified financial holding companies
        </p>
      </div>

      {/* Evolution Arrow */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '20px',
        padding: '12px',
        backgroundColor: 'var(--color-surface-1)',
        borderRadius: '8px',
        flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Evolution:</span>
        {orgForms.map((form, index) => (
          <span key={form.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              padding: '4px 8px',
              backgroundColor: `rgba(${form.colorRgb}, 0.15)`,
              color: `rgb(${form.colorRgb})`,
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 500,
            }}>
              {form.name}
            </span>
            {index < orgForms.length - 1 && (
              <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>→</span>
            )}
          </span>
        ))}
      </div>

      {/* Organization Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
      }}>
        {orgForms.map((form, index) => (
          <motion.div
            key={form.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <OrgChart
              form={form}
              isSelected={selectedForm === form.id}
              onClick={() => setSelectedForm(selectedForm === form.id ? null : form.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* Key Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
        }}
      >
        <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>
          <strong style={{ color: 'var(--color-text-primary)' }}>Key Insight:</strong>{' '}
          Banking organization evolved in response to regulatory constraints. Unit banking laws led to holding company structures,
          and Glass-Steagall's repeal enabled financial holding companies that combine banking, securities, and insurance.
        </div>
      </motion.div>

      <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '16px' }}>
        Click on any organization form to see its advantages and disadvantages
      </p>
    </div>
  );
}
