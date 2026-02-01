'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { cn } from '@/lib/utils';

type LendingModel = 'originate-hold' | 'originate-distribute';

interface StepDetail {
  title: string;
  description: string;
  details: string[];
}

const stepDetails: Record<string, StepDetail> = {
  origination: {
    title: 'Origination',
    description: 'The process of creating a new loan',
    details: [
      'Credit evaluation and scoring',
      'Document verification',
      'Setting loan terms (rate, amount, duration)',
      'Loan approval and closing',
    ],
  },
  financing: {
    title: 'Financing',
    description: 'Source of funds for the loan',
    details: [
      'Traditional: Customer deposits',
      'Modern: Capital markets funding',
      'Cost of funds affects loan pricing',
      'Liquidity management required',
    ],
  },
  securitization: {
    title: 'Securitization',
    description: 'Packaging loans into securities',
    details: [
      'Pool similar loans together',
      'Create MBS (Mortgage-Backed Securities)',
      'Tranching by risk level',
      'Credit enhancement techniques',
    ],
  },
  servicing: {
    title: 'Servicing',
    description: 'Ongoing loan administration',
    details: ['Payment collection', 'Customer service', 'Default monitoring', 'Escrow management'],
  },
};

interface LendingProcessFlowProps {
  className?: string;
}

export function LendingProcessFlow({ className }: LendingProcessFlowProps) {
  const [selectedModel, setSelectedModel] = useState<LendingModel>('originate-hold');
  const [selectedStep, setSelectedStep] = useState<string | null>(null);

  const isHold = selectedModel === 'originate-hold';

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
          Evolution of Lending: From Hold to Distribute
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          How banks transformed from keeping loans on their books to selling them to investors
        </p>
      </div>

      {/* Model Toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <div
          style={{
            display: 'flex',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '12px',
            padding: '4px',
            border: '1px solid var(--color-surface-2)',
          }}
        >
          <button
            onClick={() => {
              setSelectedModel('originate-hold');
              setSelectedStep(null);
            }}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              backgroundColor: isHold ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              color: isHold ? 'rgb(99, 102, 241)' : 'var(--color-text-secondary)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Originate & Hold
          </button>
          <button
            onClick={() => {
              setSelectedModel('originate-distribute');
              setSelectedStep(null);
            }}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              backgroundColor: !isHold ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
              color: !isHold ? 'rgb(16, 185, 129)' : 'var(--color-text-secondary)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Originate & Distribute
          </button>
        </div>
      </div>

      {/* Visualization Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedModel}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{
            padding: '24px',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '16px',
            border: `2px solid ${isHold ? 'rgb(99, 102, 241)' : 'rgb(16, 185, 129)'}`,
            marginBottom: '20px',
          }}
        >
          {isHold ? (
            <OriginateAndHold selectedStep={selectedStep} onSelectStep={setSelectedStep} />
          ) : (
            <OriginateAndDistribute selectedStep={selectedStep} onSelectStep={setSelectedStep} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedStep && stepDetails[selectedStep] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              overflow: 'hidden',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                padding: '16px',
                backgroundColor: 'var(--color-surface-1)',
                borderRadius: '12px',
                border: `1px solid ${isHold ? 'rgba(99, 102, 241, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px',
                }}
              >
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: '15px',
                    color: isHold ? 'rgb(99, 102, 241)' : 'rgb(16, 185, 129)',
                  }}
                >
                  {stepDetails[selectedStep].title}
                </span>
              </div>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '12px',
                }}
              >
                {stepDetails[selectedStep].description}
              </p>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '16px',
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.8',
                }}
              >
                {stepDetails[selectedStep].details.map((detail, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
        }}
      >
        {/* Originate & Hold */}
        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '12px',
            border: isHold ? '2px solid rgb(99, 102, 241)' : '1px solid var(--color-surface-2)',
            opacity: isHold ? 1 : 0.7,
            transition: 'all 0.2s',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
            }}
          >
            <span style={{ fontSize: '16px' }}>🏦</span>
            <span style={{ fontWeight: 600, color: 'rgb(99, 102, 241)', fontSize: '14px' }}>
              Traditional Model
            </span>
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: '16px',
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.8',
            }}
          >
            <li>Bank keeps loan on balance sheet</li>
            <li>
              <strong style={{ color: 'rgb(245, 158, 11)' }}>Risk stays with bank</strong>
            </li>
            <li>Profit: Interest income (spread)</li>
            <li>Requires deposit funding</li>
          </ul>
        </div>

        {/* Originate & Distribute */}
        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--color-surface-1)',
            borderRadius: '12px',
            border: !isHold ? '2px solid rgb(16, 185, 129)' : '1px solid var(--color-surface-2)',
            opacity: !isHold ? 1 : 0.7,
            transition: 'all 0.2s',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
            }}
          >
            <span style={{ fontSize: '16px' }}>📊</span>
            <span style={{ fontWeight: 600, color: 'rgb(16, 185, 129)', fontSize: '14px' }}>
              Modern Model
            </span>
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: '16px',
              fontSize: '13px',
              color: 'var(--color-text-secondary)',
              lineHeight: '1.8',
            }}
          >
            <li>Bank sells loan to investors</li>
            <li>
              <strong style={{ color: 'rgb(245, 158, 11)' }}>Risk transfers to investors</strong>
            </li>
            <li>Profit: Fee income (origination, servicing)</li>
            <li>Frees up capital for more lending</li>
          </ul>
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
        Click on any step in the flow to learn more
      </p>
    </div>
  );
}

// Sub-components for each model

interface ModelProps {
  selectedStep: string | null;
  onSelectStep: (step: string | null) => void;
}

function OriginateAndHold({ selectedStep, onSelectStep }: ModelProps) {
  const color = 'rgb(99, 102, 241)';
  const bgColor = 'rgba(99, 102, 241, 0.15)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '6px 16px',
            backgroundColor: bgColor,
            color: color,
            fontWeight: 600,
            fontSize: '14px',
            borderRadius: '8px',
          }}
        >
          Originate and Hold
        </span>
        <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
          Traditional banking: Bank does everything
        </p>
      </div>

      {/* Flow */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {/* Borrower */}
        <FlowEntity
          icon="👤"
          label="Borrower"
          subtext="Needs funds"
          color={color}
          bgColor={bgColor}
        />

        <FlowConnector color={color} label="Applies" animated />

        {/* Bank - Origination */}
        <FlowStep
          icon="📝"
          label="Bank"
          subtext="Origination"
          color={color}
          bgColor={bgColor}
          isSelected={selectedStep === 'origination'}
          onClick={() => onSelectStep(selectedStep === 'origination' ? null : 'origination')}
          riskHighlight
        />

        <FlowConnector color={color} label="Funds from deposits" animated />

        {/* Bank - Financing */}
        <FlowStep
          icon="💰"
          label="Bank"
          subtext="Financing"
          color={color}
          bgColor={bgColor}
          isSelected={selectedStep === 'financing'}
          onClick={() => onSelectStep(selectedStep === 'financing' ? null : 'financing')}
          riskHighlight
        />

        <FlowConnector color={color} label="Holds loan" animated />

        {/* Bank - Servicing */}
        <FlowStep
          icon="📋"
          label="Bank"
          subtext="Servicing"
          color={color}
          bgColor={bgColor}
          isSelected={selectedStep === 'servicing'}
          onClick={() => onSelectStep(selectedStep === 'servicing' ? null : 'servicing')}
          riskHighlight
        />
      </div>

      {/* Risk indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          marginTop: '12px',
          padding: '10px 16px',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '14px' }}>Risk</span>
        <span style={{ fontSize: '12px', color: 'rgb(245, 158, 11)', fontWeight: 500 }}>
          Bank bears all credit risk throughout loan life
        </span>
      </motion.div>
    </div>
  );
}

function OriginateAndDistribute({ selectedStep, onSelectStep }: ModelProps) {
  const color = 'rgb(16, 185, 129)';
  const bgColor = 'rgba(16, 185, 129, 0.15)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '6px 16px',
            backgroundColor: bgColor,
            color: color,
            fontWeight: 600,
            fontSize: '14px',
            borderRadius: '8px',
          }}
        >
          Originate and Distribute
        </span>
        <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
          Modern banking: Specialized roles, risk transfer
        </p>
      </div>

      {/* Flow - Top row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {/* Borrower */}
        <FlowEntity
          icon="👤"
          label="Borrower"
          subtext="Needs funds"
          color={color}
          bgColor={bgColor}
        />

        <FlowConnector color={color} label="Applies" animated />

        {/* Bank - Origination */}
        <FlowStep
          icon="📝"
          label="Bank"
          subtext="Origination"
          color={color}
          bgColor={bgColor}
          isSelected={selectedStep === 'origination'}
          onClick={() => onSelectStep(selectedStep === 'origination' ? null : 'origination')}
        />

        <FlowConnector color={color} label="Packages" animated />

        {/* Securitization */}
        <FlowStep
          icon="📦"
          label="SPV"
          subtext="Securitization"
          color={color}
          bgColor={bgColor}
          isSelected={selectedStep === 'securitization'}
          onClick={() => onSelectStep(selectedStep === 'securitization' ? null : 'securitization')}
        />

        <FlowConnector color={color} label="Sells MBS" animated />

        {/* Investors */}
        <FlowEntity
          icon="💼"
          label="Investors"
          subtext="Buy securities"
          color="rgb(245, 158, 11)"
          bgColor="rgba(245, 158, 11, 0.15)"
          riskHighlight
        />
      </div>

      {/* Flow - Bottom row (servicing) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
        <FlowStep
          icon="📋"
          label="Servicer"
          subtext="Servicing"
          color={color}
          bgColor={bgColor}
          isSelected={selectedStep === 'servicing'}
          onClick={() => onSelectStep(selectedStep === 'servicing' ? null : 'servicing')}
        />
        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
          (may be bank or third party)
        </span>
      </div>

      {/* Risk indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          marginTop: '12px',
          padding: '10px 16px',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '14px' }}>Risk</span>
        <span style={{ fontSize: '12px', color: 'rgb(245, 158, 11)', fontWeight: 500 }}>
          Investors bear credit risk after securitization
        </span>
      </motion.div>
    </div>
  );
}

// Helper components

interface FlowEntityProps {
  icon: string;
  label: string;
  subtext: string;
  color: string;
  bgColor: string;
  riskHighlight?: boolean;
}

function FlowEntity({ icon, label, subtext, color, bgColor, riskHighlight }: FlowEntityProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        padding: '12px 16px',
        backgroundColor: bgColor,
        borderRadius: '10px',
        border: riskHighlight ? '2px solid rgb(245, 158, 11)' : `1px solid ${color}`,
        textAlign: 'center',
        minWidth: '80px',
      }}
    >
      <div style={{ fontSize: '24px', marginBottom: '4px' }}>{icon}</div>
      <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
        {label}
      </div>
      <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>{subtext}</div>
      {riskHighlight && (
        <div
          style={{
            marginTop: '4px',
            fontSize: '9px',
            color: 'rgb(245, 158, 11)',
            fontWeight: 600,
          }}
        >
          RISK HERE
        </div>
      )}
    </motion.div>
  );
}

interface FlowStepProps extends FlowEntityProps {
  isSelected: boolean;
  onClick: () => void;
}

function FlowStep({
  icon,
  label,
  subtext,
  color,
  bgColor,
  isSelected,
  onClick,
  riskHighlight,
}: FlowStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        padding: '12px 16px',
        backgroundColor: isSelected ? color : bgColor,
        borderRadius: '10px',
        border: riskHighlight
          ? '2px solid rgb(245, 158, 11)'
          : isSelected
            ? `2px solid ${color}`
            : `1px solid ${color}`,
        textAlign: 'center',
        minWidth: '80px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
    >
      <div style={{ fontSize: '24px', marginBottom: '4px' }}>{icon}</div>
      <div
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: isSelected ? 'white' : 'var(--color-text-primary)',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: '10px',
          color: isSelected ? 'rgba(255,255,255,0.8)' : 'var(--color-text-muted)',
        }}
      >
        {subtext}
      </div>
      {riskHighlight && (
        <div
          style={{
            marginTop: '4px',
            fontSize: '9px',
            color: isSelected ? 'rgba(255,255,255,0.9)' : 'rgb(245, 158, 11)',
            fontWeight: 600,
          }}
        >
          RISK HERE
        </div>
      )}
    </motion.div>
  );
}

interface FlowConnectorProps {
  color: string;
  label: string;
  animated?: boolean;
}

function FlowConnector({ color, label, animated }: FlowConnectorProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
      <div style={{ position: 'relative', width: '40px', height: '12px' }}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: color,
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
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
            borderLeft: `6px solid ${color}`,
          }}
        />
        {/* Animated dot */}
        {animated && (
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: color,
              transform: 'translateY(-50%)',
            }}
            animate={{
              left: ['0%', '100%'],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
              times: [0, 0.2, 0.8, 1],
            }}
          />
        )}
      </div>
      <span style={{ fontSize: '9px', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
        {label}
      </span>
    </div>
  );
}
