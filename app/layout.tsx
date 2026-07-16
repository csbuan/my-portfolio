import type { Metadata } from 'next';
import './globals.css';
import { AdminProvider } from './components/AdminProvider';

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'Personal portfolio showcasing my projects and skills',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AdminProvider>
          {children}
        </AdminProvider>
      </body>
    </html>
  );
}
