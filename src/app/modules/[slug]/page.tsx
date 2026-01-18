import { modules } from '@/data/modules';
import { notFound } from 'next/navigation';
import {
  Container,
  Section,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui';
import Link from 'next/link';

// Generate static params for all modules (required for static export)
export function generateStaticParams() {
  return modules.map((module) => ({
    slug: module.slug,
  }));
}

// Generate metadata for each module
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const module = modules.find((m) => m.slug === slug);
  if (!module) return { title: 'Module Not Found' };

  return {
    title: `${module.title} | iMBA Money & Banking`,
    description: module.description,
  };
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const module = modules.find((m) => m.slug === slug);

  if (!module) {
    notFound();
  }

  // Find adjacent modules for navigation
  const currentIndex = modules.findIndex((m) => m.id === module.id);
  const prevModule = currentIndex > 0 ? modules[currentIndex - 1] : null;
  const nextModule =
    currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;

  return (
    <>
      {/* Module Header */}
      <Section
        spacing="md"
        className="bg-gradient-to-b from-surface-0 to-surface-1"
      >
        <Container>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-6"
          >
            <span>&larr;</span>
            <span>Back to modules</span>
          </Link>

          <div className="flex items-start gap-6">
            <span className="text-5xl">{module.icon}</span>
            <div>
              <span className="text-sm font-medium text-text-muted uppercase tracking-wider">
                Module {module.id} of {modules.length}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mt-1">
                {module.title}
              </h1>
              <p className="text-lg text-text-secondary mt-2 max-w-2xl">
                {module.description}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Content Placeholder */}
      <Section spacing="lg">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder cards for future content */}
            <Card variant="default">
              <CardHeader>
                <CardTitle className="text-lg">Visualizations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary text-sm">
                  Interactive diagrams and animations will appear here in Phase
                  4.
                </p>
              </CardContent>
            </Card>

            <Card variant="default">
              <CardHeader>
                <CardTitle className="text-lg">Calculators</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary text-sm">
                  Financial calculators will appear here in Phase 5.
                </p>
              </CardContent>
            </Card>

            <Card variant="default">
              <CardHeader>
                <CardTitle className="text-lg">Quizzes & Flashcards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary text-sm">
                  Learning tools will appear here in Phase 6.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Module Navigation */}
      <Section spacing="md" className="border-t border-surface-2">
        <Container>
          <div className="flex justify-between items-center">
            {prevModule ? (
              <Link
                href={`/modules/${prevModule.slug}`}
                className="flex items-center gap-2 text-text-secondary hover:text-primary-500 transition-colors"
              >
                <span>&larr;</span>
                <div className="text-left">
                  <span className="text-xs text-text-muted block">
                    Previous
                  </span>
                  <span className="font-medium">{prevModule.title}</span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextModule ? (
              <Link
                href={`/modules/${nextModule.slug}`}
                className="flex items-center gap-2 text-text-secondary hover:text-primary-500 transition-colors"
              >
                <div className="text-right">
                  <span className="text-xs text-text-muted block">Next</span>
                  <span className="font-medium">{nextModule.title}</span>
                </div>
                <span>&rarr;</span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
