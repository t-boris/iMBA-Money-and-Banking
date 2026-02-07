'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface ProcessStep {
  id: string;
  number: number;
  title: string;
  icon: string;
  description: string;
  details: string[];
  color: string;
}

const processSteps: ProcessStep[] = [
  {
    id: 'offsite',
    number: 1,
    title: 'Offsite Monitoring',
    icon: '\u{1F4CA}',
    description: 'Continuous surveillance of bank financial health',
    details: [
      'Bank submits quarterly financial reports',
      'Regulators analyze metrics and flag anomalies',
      'Peer group comparison and trend analysis',
      'Early warning systems detect deterioration',
    ],
    color: 'rgb(99, 102, 241)', // indigo
  },
  {
    id: 'onsite',
    number: 2,
    title: 'Onsite Examination',
    icon: '\u{1F3E2}',
    description: 'Physical inspection at bank premises',
    details: [
      'At least annually, sometimes surprise visits',
      'Examiners review loan files and operations',
      'Interview management and board members',
      'Megabanks: permanent supervision teams onsite',
    ],
    color: 'rgb(139, 92, 246)', // violet
  },
  {
    id: 'camels',
    number: 3,
    title: 'CAMELS Rating',
    icon: '\u2B50',
    description: 'Score across 6 dimensions',
    details: [
      'C - Capital Adequacy',
      'A - Asset Quality',
      'M - Management Quality',
      'E - Earnings Strength',
      'L - Liquidity Position',
      'S - Sensitivity to Market Risk',
    ],
    color: 'rgb(236, 72, 153)', // pink
  },
  {
    id: 'outcome',
    number: 4,
    title: 'Outcome',
    icon: '\u{1F3AF}',
    description: 'Determination of bank health and next steps',
    details: [],
    color: 'rgb(245, 158, 11)', // amber
  },
];

interface OutcomeBranch {
  label: string;
  status: string;
  color: string;
  bgColor: string;
  description: string;
}

const outcomeBranches: OutcomeBranch[] = [
  {
    label: 'Healthy',
    status: 'CAMELS 1-2',
    color: 'rgb(16, 185, 129)',
    bgColor: 'rgba(16, 185, 129, 0.12)',
    description: 'Continue normal operations',
  },
  {
    label: 'Concerns',
    status: 'CAMELS 3',
    color: 'rgb(245, 158, 11)',
    bgColor: 'rgba(245, 158, 11, 0.12)',
    description: 'Required improvements, increased monitoring',
  },
  {
    label: 'Problem',
    status: 'CAMELS 4-5',
    color: 'rgb(239, 68, 68)',
    bgColor: 'rgba(239, 68, 68, 0.12)',
    description: 'Problem Bank List, restrictions imposed',
  },
];

const enforcementActions = [
  'Ban individuals from banking',
  'Block M&A transactions',
  'Prohibit dividend payments',
  'Monetary fines',
];

const problemBankData = [
  { label: '2006', value: 50, phase: 'calm' },
  { label: '2008', value: 252, phase: 'crisis' },
  { label: '2010', value: 860, phase: 'peak' },
  { label: '2012', value: 651, phase: 'recovery' },
  { label: '2014', value: 291, phase: 'recovery' },
  { label: '2016', value: 123, phase: 'calm' },
  { label: '2020', value: 56, phase: 'calm' },
];

interface SupervisoryProcessFlowProps {
  className?: string;
}

export function SupervisoryProcessFlow({ className }: SupervisoryProcessFlowProps) {
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [showEnforcement, setShowEnforcement] = useState(false);
  const [showProblemBanks, setShowProblemBanks] = useState(false);

  const currentStep = processSteps.find((s) => s.id === selectedStep);
  const maxBarValue = Math.max(...problemBankData.map((d) => d.value));

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
          Bank Supervisory Process
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          From reporting to enforcement -- how regulators monitor and evaluate banks
        </p>
      </div>

      {/* Main Flow */}
      <div
        style={{
          padding: '24px',
          backgroundColor: 'var(--color-surface-1)',
          borderRadius: '16px',
          border: '1px solid var(--color-surface-2)',
          marginBottom: '16px',
        }}
      >
        {/* Process Steps */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {processSteps.map((step, index) => (
            <div key={step.id} style={{ display: 'flex', alignItems: 'center' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                style={{
                  padding: '12px 16px',
                  backgroundColor:
                    selectedStep === step.id ? step.color : `${step.color}15`,
                  borderRadius: '12px',
                  border: `2px solid ${step.color}`,
                  textAlign: 'center',
                  minWidth: '110px',
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
                      backgroundColor:
                        selectedStep === step.id ? 'rgba(255,255,255,0.3)' : step.color,
                      color: 'white',
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
                    color:
                      selectedStep === step.id ? 'white' : 'var(--color-text-primary)',
                    lineHeight: '1.3',
                  }}
                >
                  {step.title}
                </div>
              </motion.div>

              {/* Arrow Connector */}
              {index < processSteps.length - 1 && (
                <StepArrow
                  color={step.color}
                  nextColor={processSteps[index + 1].color}
                />
              )}
            </div>
          ))}
        </div>

        {/* Outcome Branches (always visible for step 4) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {outcomeBranches.map((branch, i) => (
            <motion.div
              key={branch.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              style={{
                padding: '12px 18px',
                backgroundColor: branch.bgColor,
                borderRadius: '10px',
                border: `1px solid ${branch.color}40`,
                textAlign: 'center',
                minWidth: '160px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  marginBottom: '4px',
                }}
              >
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: branch.color,
                  }}
                />
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: branch.color,
                  }}
                >
                  {branch.label}
                </span>
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: branch.color,
                  opacity: 0.8,
                  marginBottom: '4px',
                }}
              >
                {branch.status}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {branch.description}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Step Detail Panel */}
      <AnimatePresence>
        {currentStep && currentStep.details.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', marginBottom: '16px' }}
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
                <span style={{ fontSize: '32px' }}>{currentStep.icon}</span>
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
                  gap: '10px',
                }}
              >
                {currentStep.details.map((detail, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      padding: '10px 12px',
                      backgroundColor: `${currentStep.color}10`,
                      borderRadius: '8px',
                      border: `1px solid ${currentStep.color}25`,
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

      {/* Enforcement Actions */}
      <div style={{ marginBottom: '16px' }}>
        <button
          onClick={() => setShowEnforcement(!showEnforcement)}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '12px',
            border: showEnforcement
              ? '2px solid rgb(239, 68, 68)'
              : '1px solid var(--color-surface-2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>{'\u26A0\uFE0F'}</span>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: showEnforcement ? 'rgb(239, 68, 68)' : 'var(--color-text-primary)',
              }}
            >
              When Banks Break Rules
            </span>
          </div>
          <motion.span
            animate={{ rotate: showEnforcement ? 180 : 0 }}
            style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}
          >
            {'\u25BC'}
          </motion.span>
        </button>

        <AnimatePresence>
          {showEnforcement && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ marginTop: '12px' }}>
                {/* Enforcement Actions List */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '10px',
                    marginBottom: '16px',
                  }}
                >
                  {enforcementActions.map((action, i) => (
                    <motion.div
                      key={action}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      style={{
                        padding: '12px 14px',
                        backgroundColor: 'rgba(239, 68, 68, 0.06)',
                        borderRadius: '8px',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        fontSize: '13px',
                        color: 'var(--color-text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <div
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: 'rgb(239, 68, 68)',
                          flexShrink: 0,
                        }}
                      />
                      {action}
                    </motion.div>
                  ))}
                </div>

                {/* Case Study: London Whale */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    padding: '16px',
                    backgroundColor: 'var(--color-surface-1)',
                    borderRadius: '12px',
                    border: '2px solid rgba(245, 158, 11, 0.4)',
                    marginBottom: '12px',
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
                    <span
                      style={{
                        padding: '3px 8px',
                        backgroundColor: 'rgba(245, 158, 11, 0.15)',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: 'rgb(245, 158, 11)',
                      }}
                    >
                      CASE STUDY
                    </span>
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      London Whale (2012)
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.6',
                      margin: '0 0 8px 0',
                    }}
                  >
                    JP Morgan trader Bruno Iksil made outsized credit derivative bets, resulting in
                    ~$6B in trading losses for the bank.
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      gap: '16px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div
                      style={{
                        padding: '8px 12px',
                        backgroundColor: 'rgba(239, 68, 68, 0.08)',
                        borderRadius: '6px',
                        fontSize: '12px',
                      }}
                    >
                      <span style={{ color: 'rgb(239, 68, 68)', fontWeight: 600 }}>Loss: </span>
                      <span style={{ color: 'var(--color-text-secondary)' }}>~$6 billion</span>
                    </div>
                    <div
                      style={{
                        padding: '8px 12px',
                        backgroundColor: 'rgba(245, 158, 11, 0.08)',
                        borderRadius: '6px',
                        fontSize: '12px',
                      }}
                    >
                      <span style={{ color: 'rgb(245, 158, 11)', fontWeight: 600 }}>Fines: </span>
                      <span style={{ color: 'var(--color-text-secondary)' }}>~$1B total</span>
                    </div>
                  </div>
                </motion.div>

                {/* Logic Flow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  {['Violation', 'Financial Cost', 'Deterrence'].map((label, i) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          padding: '8px 16px',
                          backgroundColor: 'rgba(239, 68, 68, 0.08)',
                          borderRadius: '8px',
                          border: '1px solid rgba(239, 68, 68, 0.2)',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: 'rgb(239, 68, 68)',
                        }}
                      >
                        {label}
                      </div>
                      {i < 2 && (
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '16px' }}>
                          {'\u2192'}
                        </span>
                      )}
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Problem Bank List */}
      <div style={{ marginBottom: '16px' }}>
        <button
          onClick={() => setShowProblemBanks(!showProblemBanks)}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '12px',
            border: showProblemBanks
              ? '2px solid rgb(139, 92, 246)'
              : '1px solid var(--color-surface-2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>{'\u{1F4C9}'}</span>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: showProblemBanks ? 'rgb(139, 92, 246)' : 'var(--color-text-primary)',
              }}
            >
              Problem Bank List
            </span>
          </div>
          <motion.span
            animate={{ rotate: showProblemBanks ? 180 : 0 }}
            style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}
          >
            {'\u25BC'}
          </motion.span>
        </button>

        <AnimatePresence>
          {showProblemBanks && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ marginTop: '12px' }}>
                {/* Bar Chart */}
                <div
                  style={{
                    padding: '20px',
                    backgroundColor: 'var(--color-surface-1)',
                    borderRadius: '12px',
                    border: '1px solid var(--color-surface-2)',
                    marginBottom: '12px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      marginBottom: '16px',
                      textAlign: 'center',
                    }}
                  >
                    FDIC Problem Bank Count (Cyclical Pattern)
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      gap: '8px',
                      height: '140px',
                    }}
                  >
                    {problemBankData.map((d, i) => {
                      const heightPercent = (d.value / maxBarValue) * 100;
                      const barColor =
                        d.phase === 'peak'
                          ? 'rgb(239, 68, 68)'
                          : d.phase === 'crisis'
                            ? 'rgb(245, 158, 11)'
                            : d.phase === 'recovery'
                              ? 'rgb(139, 92, 246)'
                              : 'rgb(16, 185, 129)';

                      return (
                        <div
                          key={d.label}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '10px',
                              fontWeight: 600,
                              color: barColor,
                            }}
                          >
                            {d.value}
                          </span>
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${heightPercent}%` }}
                            transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                            style={{
                              width: '40px',
                              backgroundColor: barColor,
                              borderRadius: '4px 4px 0 0',
                              opacity: 0.8,
                              minHeight: '4px',
                            }}
                          />
                          <span
                            style={{
                              fontSize: '11px',
                              color: 'var(--color-text-muted)',
                            }}
                          >
                            {d.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Note */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    padding: '10px 16px',
                    backgroundColor: 'rgba(139, 92, 246, 0.08)',
                    borderRadius: '8px',
                    border: '1px dashed rgba(139, 92, 246, 0.3)',
                    textAlign: 'center',
                  }}
                >
                  <span
                    style={{ fontSize: '12px', color: 'rgb(139, 92, 246)', fontWeight: 500 }}
                  >
                    List is confidential -- banks know their status, but the public does not
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <p
        style={{
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          marginTop: '16px',
        }}
      >
        Click on process steps and expand sections to explore the supervisory process
      </p>
    </div>
  );
}

// Step Arrow Component
interface StepArrowProps {
  color: string;
  nextColor: string;
}

function StepArrow({ color, nextColor }: StepArrowProps) {
  return (
    <div style={{ position: 'relative', width: '32px', height: '24px' }}>
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
