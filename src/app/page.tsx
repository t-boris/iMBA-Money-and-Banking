'use client';

import { motion, fadeIn, slideUp } from '@/lib/motion';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-slate-800 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6 }}
      >
        iMBA Money and Banking
      </motion.h1>

      <motion.p
        className="mt-6 text-lg text-slate-600 text-center max-w-2xl"
        initial="hidden"
        animate="visible"
        variants={slideUp}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        An interactive study guide for mastering money, banking, and financial systems. Explore
        concepts through visualizations, flashcards, and practice quizzes.
      </motion.p>

      <motion.div
        className="mt-8 px-6 py-3 rounded-lg bg-slate-100 text-slate-600 font-medium"
        initial="hidden"
        animate="visible"
        variants={slideUp}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        8 modules coming soon
      </motion.div>
    </div>
  );
}
