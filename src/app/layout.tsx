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
  title: 'iMBA Money and Banking',
  description:
    'Interactive study guide for the Money and Banking course - University of Illinois Urbana-Champaign',
  keywords: ['money', 'banking', 'finance', 'iMBA', 'UIUC', 'economics'],
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
                University of Illinois Urbana-Champaign
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
