'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface StepDetail {
  id: string;
  number: number;
  title: string;
  icon: string;
  description: string;
  details: string[];
  color: string;
}

const creditRiskSteps: StepDetail[] = [
  {
    id: 'application',
    number: 1,
    title: 'Loan Application',
    icon: '📋',
    description: 'Borrower submits application with relevant data',
    details: [
      'Borrower data: income, wealth, occupation',
      'Employment history and stability',
      'Credit bureau data and payment history',
      'Purpose of loan and collateral offered',
    ],
    color: 'rgb(99, 102, 241)', // indigo
  },
  {
    id: 'analysis',
    number: 2,
    title: 'Credit Analysis',
    icon: '🔍',
    description: 'Bank evaluates creditworthiness using multiple methods',
    details: [
      'Qualitative assessment (character, capacity)',
      'Statistical models (logistic regression)',
      'Machine learning scoring models',
      'Peer comparison and industry analysis',
    ],
    color: 'rgb(139, 92, 246)', // violet
  },
  {
    id: 'rating',
    number: 3,
    title: 'Credit Rating',
    icon: '⭐',
    description: 'Assign rating grade and probability of default',
    details: [
      'Corporate: AAA to D rating scale',
      'Consumer: FICO score (300-850)',
      'Probability of Default (PD) mapped to rating',
      'Loss Given Default (LGD) estimation',
    ],
    color: 'rgb(236, 72, 153)', // pink
  },
  {
    id: 'pricing',
    number: 4,
    title: 'Risk-Based Pricing',
    icon: '💰',
    description: 'Set interest rate based on risk assessment',
    details: [
      'Higher PD = Higher interest rate',
      'Loan Rate = Funding Cost + Expected Loss + Risk Premium',
      'Expected Loss = PD x LGD x EAD',
      'Risk premium covers unexpected losses',
    ],
    color: 'rgb(245, 158, 11)', // amber
  },
  {
    id: 'origination',
    number: 5,
    title: 'Loan Origination',
    icon: '✍️',
    description: 'Finalize loan with protective terms',
    details: [
      'Covenant requirements (financial ratios)',
      'Collateral and security agreements',
      'Seniority and priority structure',
      'Documentation and legal review',
    ],
    color: 'rgb(16, 185, 129)', // emerald
  },
  {
    id: 'monitoring',
    number: 6,
    title: 'Ongoing Monitoring',
    icon: '📊',
    description: 'Continuous risk assessment throughout loan life',
    details: [
      'Non-performing loan (NPL) detection',
      'Covenant compliance monitoring',
      'Early warning indicators',
      'Workout and restructuring if needed',
    ],
    color: 'rgb(6, 182, 212)', // cyan
  },
];

interface RiskTool {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const riskManagementTools: RiskTool[] = [
  {
    id: 'diversification',
    name: 'Diversification',
    icon: '🎯',
    description: 'Reduce concentration risk across industries, geographies, and borrower types',
  },
  {
    id: 'syndication',
    name: 'Loan Sales / Syndication',
    icon: '🤝',
    description: 'Share large loans with other banks or sell portions to reduce exposure',
  },
  {
    id: 'derivatives',
    name: 'Credit Derivatives',
    icon: '📜',
    description: 'Use CDS (Credit Default Swaps) to transfer credit risk to third parties',
  },
  {
    id: 'recovery',
    name: 'Recovery Rate',
    icon: '💵',
    description: 'Senior secured: ~80%, Senior unsecured: ~50%, Subordinated: ~25%',
  },
];

interface CreditRiskFlowProps {
  className?: string;
}

export function CreditRiskFlow({ className }: CreditRiskFlowProps) {
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [showRiskTools, setShowRiskTools] = useState(false);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const currentStep = creditRiskSteps.find((s) => s.id === selectedStep);

  return (
    <div className={cn('w-full', className)} style={{ maxWidth: '1000px', margin: '0 auto' }}>
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
          Credit Risk Management Process
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          From loan application to ongoing monitoring - how banks assess and manage credit risk
        </p>
      </div>

      {/* Main Flow Diagram */}
      <div
        style={{
          padding: '24px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          border: '1px solid var(--color-surface-2)',
          marginBottom: '20px',
        }}
      >
        {/* Flow Steps */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {creditRiskSteps.map((step, index) => (
            <div key={step.id} style={{ display: 'flex', alignItems: 'center' }}>
              {/* Step Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                style={{
                  padding: '12px 16px',
                  backgroundColor:
                    selectedStep === step.id
                      ? step.color
                      : `${step.color}15`,
                  borderRadius: '12px',
                  border: `2px solid ${step.color}`,
                  textAlign: 'center',
                  minWidth: '100px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    marginBottom: '4px',
                  }}
                >
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: selectedStep === step.id ? 'rgba(255,255,255,0.3)' : step.color,
                      color: selectedStep === step.id ? 'white' : 'white',
                      fontSize: '11px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {step.number}
                  </span>
                  <span style={{ fontSize: '20px' }}>{step.icon}</span>
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: selectedStep === step.id ? 'white' : 'var(--color-text-primary)',
                    lineHeight: '1.3',
                  }}
                >
                  {step.title}
                </div>
              </motion.div>

              {/* Arrow Connector */}
              {index < creditRiskSteps.length - 1 && (
                <FlowArrow color={step.color} nextColor={creditRiskSteps[index + 1].color} />
              )}
            </div>
          ))}
        </div>

        {/* Decision Paths */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(16, 185, 129, 0.3)',
            }}
          >
            <span style={{ color: 'rgb(16, 185, 129)', fontSize: '16px' }}>Approved</span>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              Loan proceeds through all steps
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}
          >
            <span style={{ color: 'rgb(239, 68, 68)', fontSize: '16px' }}>Rejected</span>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              Can exit at analysis or rating stage
            </span>
          </div>
        </motion.div>
      </div>

      {/* Step Detail Panel */}
      <AnimatePresence>
        {currentStep && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', marginBottom: '20px' }}
          >
            <div
              style={{
                padding: '20px',
                backgroundColor: 'var(--color-surface-1)',
                borderRadius: '12px',
                border: `2px solid ${currentStep.color}`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <span
                  style={{
                    fontSize: '32px',
                  }}
                >
                  {currentStep.icon}
                </span>
                <div>
                  <div
                    style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: currentStep.color,
                    }}
                  >
                    Step {currentStep.number}: {currentStep.title}
                  </div>
                  <div
                    style={{
                      fontSize: '13px',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {currentStep.description}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px',
                }}
              >
                {currentStep.details.map((detail, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      padding: '12px',
                      backgroundColor: `${currentStep.color}10`,
                      borderRadius: '8px',
                      border: `1px solid ${currentStep.color}30`,
                      fontSize: '13px',
                      color: 'var(--color-text-secondary)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                    }}
                  >
                    <span style={{ color: currentStep.color, fontWeight: 600 }}>*</span>
                    {detail}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Risk Management Tools Toggle */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setShowRiskTools(!showRiskTools)}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '12px',
            border: showRiskTools
              ? '2px solid rgb(245, 158, 11)'
              : '1px solid var(--color-surface-2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>🛡️</span>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: showRiskTools ? 'rgb(245, 158, 11)' : 'var(--color-text-primary)',
              }}
            >
              Risk Management Tools
            </span>
          </div>
          <motion.span
            animate={{ rotate: showRiskTools ? 180 : 0 }}
            style={{
              fontSize: '12px',
              color: 'var(--color-text-muted)',
            }}
          >
            V
          </motion.span>
        </button>

        <AnimatePresence>
          {showRiskTools && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div
                style={{
                  marginTop: '12px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px',
                }}
              >
                {riskManagementTools.map((tool, i) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onMouseEnter={() => setHoveredTool(tool.id)}
                    onMouseLeave={() => setHoveredTool(null)}
                    style={{
                      padding: '16px',
                      backgroundColor:
                        hoveredTool === tool.id
                          ? 'rgba(245, 158, 11, 0.1)'
                          : 'var(--color-surface-1)',
                      borderRadius: '12px',
                      border:
                        hoveredTool === tool.id
                          ? '2px solid rgb(245, 158, 11)'
                          : '1px solid var(--color-surface-2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '8px',
                      }}
                    >
                      <span style={{ fontSize: '20px' }}>{tool.icon}</span>
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: 600,
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        {tool.name}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: '12px',
                        color: 'var(--color-text-secondary)',
                        lineHeight: '1.5',
                        margin: 0,
                      }}
                    >
                      {tool.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Key Formula */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          padding: '20px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '12px',
          border: '1px solid var(--color-surface-2)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '13px',
            color: 'var(--color-text-muted)',
            marginBottom: '12px',
          }}
        >
          Core Credit Risk Pricing Formula
        </div>
        <div
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            padding: '12px 24px',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderRadius: '8px',
            display: 'inline-block',
          }}
        >
          <span style={{ color: 'rgb(99, 102, 241)' }}>Loan Rate</span>
          {' = '}
          <span style={{ color: 'rgb(16, 185, 129)' }}>Funding Cost</span>
          {' + '}
          <span style={{ color: 'rgb(245, 158, 11)' }}>Expected Loss</span>
          {' + '}
          <span style={{ color: 'rgb(236, 72, 153)' }}>Risk Premium</span>
        </div>
        <div
          style={{
            fontSize: '12px',
            color: 'var(--color-text-muted)',
            marginTop: '12px',
          }}
        >
          Where Expected Loss = PD (Probability of Default) x LGD (Loss Given Default) x EAD
          (Exposure at Default)
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
        Click on any step to see detailed information
      </p>
    </div>
  );
}

// Flow Arrow Component
interface FlowArrowProps {
  color: string;
  nextColor: string;
}

function FlowArrow({ color, nextColor }: FlowArrowProps) {
  return (
    <div style={{ position: 'relative', width: '32px', height: '24px' }}>
      {/* Line with gradient */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: '6px',
          height: '2px',
          background: `linear-gradient(to right, ${color}, ${nextColor})`,
          transform: 'translateY(-50%)',
        }}
      />
      {/* Arrow head */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 0,
          height: 0,
          borderTop: '5px solid transparent',
          borderBottom: '5px solid transparent',
          borderLeft: `8px solid ${nextColor}`,
        }}
      />
      {/* Animated dot */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: `linear-gradient(to right, ${color}, ${nextColor})`,
          transform: 'translateY(-50%)',
        }}
        animate={{
          left: ['0%', '85%'],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
          times: [0, 0.2, 0.8, 1],
        }}
      />
    </div>
  );
}
