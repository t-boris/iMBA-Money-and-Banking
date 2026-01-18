'use client';

import { motion, fadeIn, staggerContainer } from '@/lib/motion';
import { Container, Section, Grid } from '@/components/ui';
import { ModuleCard } from '@/components/modules';
import { modules } from '@/data/modules';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Section spacing="lg" className="bg-gradient-to-b from-surface-0 to-surface-1">
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.span
              className="text-6xl mb-6 block"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              🎓
            </motion.span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
              Master{' '}
              <span className="text-gradient">Money & Banking</span>
            </h1>

            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
              Interactive study guide designed for visual learners.
              Explore complex financial concepts through animations,
              calculators, and engaging exercises.
            </p>

            <motion.div
              className="mt-8 flex items-center justify-center gap-4 text-text-muted text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-500 rounded-full" />
                8 Modules
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-500 rounded-full" />
                Interactive Content
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-500 rounded-full" />
                Visual Learning
              </span>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Module Grid Section */}
      <Section spacing="xl">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              Course Modules
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Click any module to start learning. Each contains interactive diagrams,
              calculators, quizzes, and more.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <Grid cols={4} gap="lg">
              {modules.map((module, index) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  index={index}
                />
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Section>

      {/* Bottom CTA Section */}
      <Section spacing="lg" className="bg-surface-1">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold text-text-primary mb-3">
              Ready to start learning?
            </h3>
            <p className="text-text-secondary mb-6">
              Begin with Module 1 for a structured approach, or jump to any topic that interests you.
            </p>
            <div className="text-4xl">
              👆
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
