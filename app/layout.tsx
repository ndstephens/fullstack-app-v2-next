import { inter } from '@/assets/fonts';

import '@/styles/global.css';

export const metadata = {
  title: { default: 'Task App', template: '%s | Task App' },
  description: 'Fullstack task app with Next.js 13',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Task App',
    description: 'Fullstack task app with Next.js 13',
    siteName: 'Task App',
    locale: 'en-US',
    type: 'website',
  },
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable}`}>
      <body style={{ WebkitTapHighlightColor: 'transparent' }}>{children}</body>
    </html>
  );
}
