import { GlossaryTerm } from '@/types';
import { module1Concepts } from './module1/concepts';
import { module2Concepts } from './module2/concepts';
import { module3Concepts } from './module3/concepts';

// Helper to determine term type based on term content
function getTermType(term: string, definition: string): GlossaryTerm['type'] {
  const lowerTerm = term.toLowerCase();
  const lowerDef = definition.toLowerCase();

  // Formulas typically have mathematical notation or "formula" in name
  if (lowerTerm.includes('formula') || /[=×÷+\-]/.test(definition)) {
    return 'formula';
  }
  // Regulations are acts, laws, rules
  if (lowerTerm.includes('act') || lowerTerm.includes('rule') ||
      lowerDef.includes('regulation') || lowerDef.includes('legislation')) {
    return 'regulation';
  }
  // Concepts are abstract ideas
  if (lowerDef.includes('concept') || lowerDef.includes('principle') ||
      lowerDef.includes('theory')) {
    return 'concept';
  }
  // Default to term
  return 'term';
}

// Convert Concept to GlossaryTerm
function conceptToGlossaryTerm(concept: typeof module1Concepts[0], moduleId: number): GlossaryTerm {
  return {
    id: `${moduleId}-${concept.id}`,
    term: concept.term,
    definition: concept.definition,
    category: concept.category,
    type: getTermType(concept.term, concept.definition),
    moduleId,
    lessonId: concept.lessonId,
    relatedTerms: concept.relatedConcepts?.map(id => `${moduleId}-${id}`),
  };
}

// Aggregate all glossary terms
export const glossaryTerms: GlossaryTerm[] = [
  ...module1Concepts.map(c => conceptToGlossaryTerm(c, 1)),
  ...module2Concepts.map(c => conceptToGlossaryTerm(c, 2)),
  ...module3Concepts.map(c => conceptToGlossaryTerm(c, 3)),
].sort((a, b) => a.term.localeCompare(b.term));

// Get unique first letters for A-Z index
export const glossaryLetters = [...new Set(glossaryTerms.map(t => t.term[0].toUpperCase()))].sort();

// Get unique categories
export const glossaryCategories = [...new Set(glossaryTerms.map(t => t.category))];

// Get unique types
export const glossaryTypes = [...new Set(glossaryTerms.map(t => t.type))];
