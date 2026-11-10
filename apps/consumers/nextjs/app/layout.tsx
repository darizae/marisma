import type { ReactNode } from 'react';
import './globals.css';

export const metadata = { title: 'Marisma Next.js consumer', description: 'Integration scaffold' };
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" data-marisma-accent="reedwater"><body>{children}</body></html>;
}
