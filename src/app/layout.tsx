import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Nunito_Sans, Work_Sans } from 'next/font/google';
import { Toaster } from 'sonner';

import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'Le Fredo | Admin',
  description: 'Gerencie sua loja de maneira simples e rápida',
};

const nunitoSans = Nunito_Sans({
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
          <Toaster richColors />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
