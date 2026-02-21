import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Money & Banking Notes',
  description:
    'Personal study notes on money and banking concepts with interactive visualizations.',
  keywords: ['money', 'banking', 'finance', 'study notes', 'economics'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-surface-2 py-8">
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center text-text-muted text-sm">
                Personal notes. Not affiliated with any university.
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
