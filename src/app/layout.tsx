import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Nunito, Work_Sans } from 'next/font/google';
import { Toaster } from 'sonner';

import '@/styles/global.css';

import { NoSmartphone } from '@/components/data-display/no-smartphone';

export const metadata: Metadata = {
  title: 'Le Fredo | Admin',
  description: 'Gerencie sua loja de maneira simples e rápida',
};

const nunitoSans = Nunito({
  weight: ['500', '600', '800'],
  subsets: ['latin'],
  variable: '--font-sans',
});

const workSans = Work_Sans({
  weight: ['500', '600'],
  subsets: ['latin'],
  variable: '--font-work-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang='pt-BR'
        className={`${nunitoSans.variable} ${workSans.variable}`}
      >
        <body>
          <NoSmartphone />
          <ReactQueryProvider>
            <Toaster richColors />
            {children}
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
