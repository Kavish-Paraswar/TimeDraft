import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TimeDraft — Premium Calendar',
  description:
    'A beautifully designed, interactive wall calendar with date range selection, integrated notes, dynamic Indian themes, and smooth animations.',
  keywords: ['calendar', 'wall calendar', 'date picker', 'notes', 'interactive', 'India'],
  openGraph: {
    title: 'TimeDraft — Premium Calendar',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0d0f14" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
