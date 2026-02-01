import { modules } from '@/data/modules';
import { notFound } from 'next/navigation';
import { Container, Section, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Module1Content, Module2Content, Module3Content } from '@/components/modules';
import Link from 'next/link';

// Generate static params for all modules (required for static export)
export function generateStaticParams() {
  return modules.map((module) => ({
    slug: module.slug,
  }));
}

// Generate metadata for each module
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const currentModule = modules.find((m) => m.slug === slug);
  if (!currentModule) return { title: 'Module Not Found' };

  return {
    title: `${currentModule.title} | iMBA Money & Banking`,
    description: currentModule.description,
  };
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const currentModule = modules.find((m) => m.slug === slug);

  if (!currentModule) {
    notFound();
  }

  // Find adjacent modules for navigation
  const currentIndex = modules.findIndex((m) => m.id === currentModule.id);
  const prevModule = currentIndex > 0 ? modules[currentIndex - 1] : null;
  const nextModule = currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;

  return (
    <>
      {/* Module Header */}
      <Section spacing="md" className="bg-gradient-to-b from-surface-0 to-surface-1">
        <Container>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-6"
          >
            <span>&larr;</span>
            <span>Back to modules</span>
          </Link>

          <div className="flex items-start gap-6">
            <span className="text-5xl flex-shrink-0">{currentModule.icon}</span>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-text-muted uppercase tracking-wider">
                Module {currentModule.id} of {modules.length}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary mt-1">
                {currentModule.title}
              </h1>
              <p
                className="text-lg text-text-secondary mt-2"
                style={{ maxWidth: '700px', lineHeight: '1.6' }}
              >
                {currentModule.description}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Module Content */}
      <Section spacing="lg">
        <Container>
          {currentModule.id === 1 ? (
            <Module1Content />
          ) : currentModule.id === 2 ? (
            <Module2Content />
          ) : currentModule.id === 3 ? (
            <Module3Content />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card variant="default">
                <CardHeader>
                  <CardTitle className="text-lg">Coming Soon</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary text-sm">
                    Interactive content for this module is under development.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
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
                  <span className="text-xs text-text-muted block">Previous</span>
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
