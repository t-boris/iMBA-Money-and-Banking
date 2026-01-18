import { Container, Section, Button } from '@/components/ui';
import Link from 'next/link';

export default function ModuleNotFound() {
  return (
    <Section spacing="xl">
      <Container size="sm" className="text-center">
        <span className="text-6xl mb-6 block">?</span>
        <h1 className="text-3xl font-bold text-text-primary mb-4">
          Module Not Found
        </h1>
        <p className="text-text-secondary mb-8">
          The module you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="primary">Back to All Modules</Button>
        </Link>
      </Container>
    </Section>
  );
}
