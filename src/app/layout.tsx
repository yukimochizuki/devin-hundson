import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Devin Task Board',
  description: 'タスク管理アプリケーション',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
