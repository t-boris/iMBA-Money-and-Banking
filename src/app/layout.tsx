import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'iMBA Money and Banking',
  description:
    'Interactive study guide for the Money and Banking course - University of Illinois Urbana-Champaign',
  keywords: ['money', 'banking', 'finance', 'iMBA', 'UIUC', 'economics'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen bg-slate-50 text-slate-900`}
      >
        <div className="flex flex-col min-h-screen">
          {/* Header placeholder for future navigation */}
          <header className="border-b border-slate-200 bg-white">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <span className="text-xl font-semibold text-slate-800">iMBA Money & Banking</span>
            </div>
          </header>

          {/* Main content area */}
          <main className="flex-1">{children}</main>

          {/* Footer placeholder */}
          <footer className="border-t border-slate-200 bg-white py-6">
            <div className="max-w-6xl mx-auto px-4 text-center text-sm text-slate-500">
              University of Illinois Urbana-Champaign
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
