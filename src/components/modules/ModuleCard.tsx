'use client';

import { motion } from '@/lib/motion';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui';
import { Module } from '@/types';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  module: Module;
  index?: number;
}

export function ModuleCard({ module, index = 0 }: ModuleCardProps) {
  return (
    <Link href={`/modules/${module.slug}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.1,
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        <Card
          variant="glass"
          hover
          className="h-full group relative overflow-hidden"
        >
          {/* Animated background gradient on hover */}
          <div
            className={cn(
              'absolute inset-0 opacity-0 group-hover:opacity-100',
              'bg-gradient-to-br from-primary-500/10 to-transparent',
              'transition-opacity duration-300'
            )}
          />

          <CardHeader className="relative">
            {/* Icon with pulse animation on hover */}
            <motion.span
              className="text-4xl mb-3 block"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              {module.icon}
            </motion.span>

            {/* Module number badge */}
            <span className="text-xs font-medium text-text-muted uppercase tracking-wider mb-1 block">
              Module {module.id}
            </span>

            <CardTitle className="group-hover:text-primary-500 transition-colors">
              {module.title}
            </CardTitle>
            <CardDescription>{module.description}</CardDescription>
          </CardHeader>

          <CardContent className="relative">
            {/* Preview hint that appears on hover */}
            <motion.div
              className="flex items-center gap-2 text-primary-500 text-sm font-medium"
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
            >
              <span>Explore module</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'easeInOut',
                }}
              >
                →
              </motion.span>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
